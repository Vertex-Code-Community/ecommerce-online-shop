using StoreApp.Models;

namespace StoreApp.BLL.Interfaces.Services;

public interface IProductService
{
    Task<IEnumerable<ProductModel>> GetAllProductsAsync();
    Task<ProductModel?> GetProductByIdAsync(int id);
    Task<IEnumerable<ProductModel>> GetFilteredProductsAsync(decimal? minPrice, decimal? maxPrice, string? searchTerm);
    Task<IEnumerable<ProductModel>> GetNewArrivalsAsync(int take);
    Task<IEnumerable<ProductModel>> GetTopSellingAsync(int take);
    Task<IEnumerable<ProductModel>> GetRecommendationsAsync(int productId, int take);
    Task<bool> AddProductAsync(ProductModel product);
    Task<bool> UpdateProductByIdAsync(int id, ProductModel product);
    Task<bool> DeleteProductByIdAsync(int id);
}