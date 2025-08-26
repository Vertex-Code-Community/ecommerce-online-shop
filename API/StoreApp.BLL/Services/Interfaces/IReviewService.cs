using StoreApp.Models;

namespace StoreApp.BLL.Services.Interfaces;

public interface IReviewService
{
    Task<IEnumerable<ReviewModel>> GetReviewsByProductIdAsync(int productId);
    
    Task<IEnumerable<ReviewModel>> GetTopRatingReviewsAsync();
    
    Task<ReviewModel> GetReviewByIdAsync(long reviewId);
    
    Task AddReviewAsync(CreateReview reviewModel, string userId);
    
    Task DeleteReviewAsync(long reviewId);
    
    Task<bool> UserHasReviewedProductAsync(string userId, int productId);
}