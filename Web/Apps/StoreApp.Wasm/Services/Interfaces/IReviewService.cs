using StoreApp.Wasm.Models;

namespace StoreApp.Wasm.Services;

public interface IReviewService
{
    Task<List<ReviewModel>> GetProductReviewsAsync(int productId);

    Task AddProductReviewAsync(int productId, ReviewModel review);
}