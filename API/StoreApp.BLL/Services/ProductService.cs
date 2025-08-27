using AutoMapper;
using StoreApp.BLL.MediaStorage;
using StoreApp.DAL.Entities;
using StoreApp.DAL.Repositories.Interfaces;
using StoreApp.Models;
using StoreApp.BLL.Services.Interfaces;
using StoreApp.Shared;

namespace StoreApp.BLL.Services;

public class ProductService(
    IProductRepository productRepository,
    IProductDetailRepository productDetailRepository,
    IProductImagesRepository productImagesRepository,
    IProductImageService imageService,
    IMapper mapper) : IProductService
{
    public async Task<FilterResult<ProductModel>> GetFilteredProductsAsync(ProductFilter filter)
    {
        var dbFilter = mapper.Map<DAL.Filtering.ProductFilter>(filter);
        var productEntities = await productRepository.GetFilteredAsync(dbFilter);
        
        var mapped = mapper.Map<IEnumerable<ProductModel>>(productEntities.Items);
        return productEntities.Clone(mapped);
    }

    public async Task<FullProductModel> GetProductByIdAsync(int id)
    {
        var productEntity = await productRepository.GetByIdAsync(id, p => p.ProductDetails, p => p.ProductImages)
                            ?? throw new KeyNotFoundException("Product not found.");

        return mapper.Map<FullProductModel>(productEntity);
    }

    public async Task AddProductAsync(CreateProduct model)
    {
        var productEntity = mapper.Map<ProductEntity>(model);
        await productRepository.CreateAsync(productEntity);

        if (model.ImageData?.Length > 0)
        {
            var url = await imageService.UploadMainImageAsync(productEntity.Id, model.ImageData);

            productEntity.MainImageUrl = url;
            await productRepository.UpdateAsync(productEntity);
        }
    }

    public async Task UpdateProductByIdAsync(UpdateProduct model)
    {
        var existingProduct = await productRepository.GetByIdAsync(model.Id)
                                ?? throw new KeyNotFoundException("Product not found.");

        mapper.Map(model, existingProduct);

        if (model.ImageData?.Length > 0)
        {
            await imageService.DeleteProductImagesAsync(existingProduct.Id);
            var url = await imageService.UploadMainImageAsync(existingProduct.Id, model.ImageData);
            existingProduct.MainImageUrl = url;
        }

        await productRepository.UpdateAsync(existingProduct);
    }

    public async Task DeleteProductByIdAsync(int id)
    {
        var product = await productRepository.GetByIdAsync(id, p => p.ProductDetails)
                        ?? throw new KeyNotFoundException("Product not found.");

        await imageService.DeleteProductImagesAsync(product.Id);

        await productDetailRepository.DeleteRangeAsync(product.ProductDetails);
        await productRepository.DeleteAsync(product);
    }

    public async Task UploadProductImageAsync(UploadProductImage model)
    {
        ProductEntity product;
        
        if (!model.IsMain && !string.IsNullOrWhiteSpace(model.ColorHex))
        {
            product = await productRepository.GetByIdAsync(model.ProductId, p => p.ProductImages, p => p.ProductDetails)
                ?? throw new KeyNotFoundException("Product not found.");
        }
        else
        {
            product = await productRepository.GetByIdAsync(model.ProductId)
                ?? throw new KeyNotFoundException("Product not found.");
        }

        var url = await imageService.UploadImageAsync(model);
        
        if (model.IsMain)
        {
            product.MainImageUrl = url;
            await productRepository.UpdateAsync(product);
        }

        if (!model.IsMain && !string.IsNullOrWhiteSpace(model.ColorHex))
        {
            var images = product.ProductImages?.FirstOrDefault(d => d.ColorHex.Equals(model.ColorHex, StringComparison.OrdinalIgnoreCase));
            var details = product.ProductDetails.FirstOrDefault(d => d.ColorHex.Equals(model.ColorHex, StringComparison.OrdinalIgnoreCase))
                ?? throw new KeyNotFoundException("Product details with the specified color not found.");
            
            if (images == null)
            {
                images = new ProductImagesEntity
                {
                    ColorHex = model.ColorHex,
                    ProductId = product.Id,
                    ImagesUrls = new List<string> { url }
                };
                
                await productImagesRepository.CreateAsync(images);
                details.ProductImagesId = images.Id;
                await productRepository.UpdateAsync(product);
            }
            else
            {
                var urls = images.ImagesUrls.ToList();
                urls.Add(url);
                images.ImagesUrls = urls;
                await productImagesRepository.UpdateAsync(images);
            }
        }
    }

    public async Task DeleteProductImageAsync(DeleteProductImage model)
    {
        var product = await productRepository.GetByIdAsync(model.ProductId, p => p.ProductImages)
            ?? throw new KeyNotFoundException("Product not found.");
        
        if (product.MainImageUrl == model.Url)
        {
            product.MainImageUrl = product.ProductImages.FirstOrDefault()?.ImagesUrls.FirstOrDefault();
            await productRepository.UpdateAsync(product);
        }
        else
        {
            var images = product.ProductImages?.FirstOrDefault(d => d.ImagesUrls.Contains(model.Url))
                ?? throw new KeyNotFoundException("Image not found.");
        
            images.ImagesUrls = images.ImagesUrls.Where(u => u != model.Url).ToList();
            await productImagesRepository.UpdateAsync(images);
        }
        
        await imageService.DeleteProductImageAsync(product.Id, model.Url);
    }
}
