using StoreApp.Models;

namespace StoreApp.BLL.Services.Interfaces;

public interface IProductService
{
    Task<FullProductModel> GetProductByIdAsync(int id);
    Task<IEnumerable<FullProductModel>> GetFilteredProductsAsync(ProductFilter filter);
    Task AddProductAsync(CreateProduct model);
    Task UpdateProductByIdAsync(UpdateProduct model);
    Task DeleteProductByIdAsync(int id);
}