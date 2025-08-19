using StoreApp.Wasm.Models;

namespace StoreApp.Wasm.Services;

public interface IProductService
{
    Task<List<ProductModel>> GetAllProductsAsync();
    Task<ProductModel?> GetProductByIdAsync(int productId);

    Task<List<ProductModel>> GetAlsoLikeProductsAsync(int productId);
    Task<List<ProductModel>> GetNewArrivalsAsync(int take = 8);
    Task<List<ProductModel>> GetTopSellingAsync(int take = 8);
    Task<List<ProductModel>> GetRecommendationsAsync(int productId, int take = 4);
    Task<List<ProductModel>> GetAllProductsAsyncWithFiltersAsync(decimal? minPrice, decimal? maxPrice, string? search);
}