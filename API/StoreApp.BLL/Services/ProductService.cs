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
        var productEntity = await productRepository.GetByIdAsync(id, p => p.ProductDetails)
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
        var product = await productRepository.GetByIdAsync(id)
                        ?? throw new KeyNotFoundException("Product not found.");

        await imageService.DeleteProductImagesAsync(product.Id);

        await productRepository.DeleteAsync(product);
    }
}
