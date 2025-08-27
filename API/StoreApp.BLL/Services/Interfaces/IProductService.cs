using StoreApp.Models;
using StoreApp.Shared;

namespace StoreApp.BLL.Services.Interfaces;

public interface IProductService
{
    Task<FullProductModel> GetProductByIdAsync(int id);
    Task<FilterResult<ProductModel>> GetFilteredProductsAsync(ProductFilter filter);
    Task AddProductAsync(CreateProduct model);
    Task UpdateProductByIdAsync(UpdateProduct model);
    Task UploadProductImageAsync(UploadProductImage model);
    Task DeleteProductImageAsync(DeleteProductImage model);
    Task DeleteProductByIdAsync(int id);
}