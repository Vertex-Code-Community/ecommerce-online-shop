using StoreApp.Models.Dtos.Review;
using StoreApp.Models;

namespace StoreApp.Shared.Interfaces.Services;

public interface IReviewService
{
    Task<IEnumerable<ReviewModel>> GetReviewsByProductIdAsync(int productId);
    
    Task<ReviewModel> GetReviewByIdAsync(int reviewId);
    
    Task AddReviewAsync(CreateReview reviewModel, int userId);
    
    Task DeleteReviewAsync(int reviewId);
    
    Task<bool> UserHasReviewedProductAsync(int userId, int productId);
}