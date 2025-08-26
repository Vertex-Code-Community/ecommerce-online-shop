using AutoMapper;
using StoreApp.DAL.Entities;
using StoreApp.DAL.Repositories.Interfaces;
using StoreApp.Shared.Constants;
using StoreApp.Models;
using StoreApp.BLL.Services.Interfaces;

namespace StoreApp.BLL.Services;

public class ProductService(IProductRepository productRepository, IMapper mapper) : IProductService
{
    public async Task<IEnumerable<ProductModel>> GetFilteredProductsAsync(ProductFilter filter)
    {
        var dbFilter = mapper.Map<DAL.Filtering.ProductFilter>(filter);
        var productEntities = await productRepository.GetFilteredAsync(dbFilter);
        
        return mapper.Map<IEnumerable<ProductModel>>(productEntities);
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
        //todo: use cloud storage in future
        productEntity.ImageUrl = await SaveImageToDiskAsync(model.ImageData);

        await productRepository.CreateAsync(productEntity);
    }

    public async Task UpdateProductByIdAsync(UpdateProduct model)
    {
        var existingProduct = await productRepository.GetByIdAsync(model.Id)
                                ?? throw new KeyNotFoundException("Product not found.");

        mapper.Map(model, existingProduct);

        if (model.ImageData?.Length > 0)
        {
            DeleteImageFile(existingProduct.ImageUrl);

            existingProduct.ImageUrl = await SaveImageToDiskAsync(model.ImageData);
        }

        await productRepository.UpdateAsync(existingProduct);
    }

    public async Task DeleteProductByIdAsync(int id)
    {
        var product = await productRepository.GetByIdAsync(id)
                        ?? throw new KeyNotFoundException("Product not found.");

        DeleteImageFile(product.ImageUrl);

        await productRepository.DeleteAsync(product);
    }

    private async Task<string?> SaveImageToDiskAsync(byte[]? imageData)
    {
        if (imageData is null || imageData.Length == 0)
            return null;

        var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), FilesConstants.ImageFolder);
        if (!Directory.Exists(uploadsPath))
            Directory.CreateDirectory(uploadsPath);

        var fileName = $"{Guid.NewGuid()}.jpg";
        var filePath = Path.Combine(uploadsPath, fileName);

        await File.WriteAllBytesAsync(filePath, imageData);

        return $"/images/{fileName}";
    }

    private void DeleteImageFile(string? imageUrl)
    {
        if (string.IsNullOrEmpty(imageUrl)) return;

        var webRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        var imagePath = Path.Combine(webRootPath, imageUrl.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));

        if (File.Exists(imagePath))
        {
            try
            {
                File.Delete(imagePath);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
