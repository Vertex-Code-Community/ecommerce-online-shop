using StoreApp.DAL.Entities;

namespace StoreApp.DAL.Repositories.Interfaces;

public interface IProductRepository
{
    Task AddProductAsync(ProductEntity product);
    Task DeleteProductByIdAsync(int id);
    Task<IEnumerable<ProductEntity>> GetAllProductsAsync();
    Task<ProductEntity?> GetProductByIdAsync(int id);
    Task<IEnumerable<ProductEntity>> GetFilteredProductsAsync(decimal? minPrice, decimal? maxPrice, string? searchTerm);
    Task<IEnumerable<ProductEntity>> GetNewArrivalsAsync(int take);
    Task<IEnumerable<ProductEntity>> GetTopSellingAsync(int take);
    Task<IEnumerable<ProductEntity>> GetRecommendationsAsync(int productId, int take);
    Task<bool> ProductExistsAsync(int id);
    Task UpdateProductAsync(ProductEntity product);
}