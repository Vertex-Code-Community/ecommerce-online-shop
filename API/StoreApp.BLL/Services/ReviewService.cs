using AutoMapper;
using StoreApp.BLL.Interfaces.Services;
using StoreApp.DAL.Entities;
using StoreApp.DAL.Repositories.Interfaces;
using StoreApp.Models;

namespace StoreApp.BLL.Services;

public class ReviewService(IReviewRepository repository, IMapper mapper) : IReviewService
{
    public async Task<IEnumerable<ReviewModel>> GetReviewsByProductIdAsync(int productId)
    {
        var reviews = await repository.GetReviewsByProductIdAsync(productId);
        return mapper.Map<IEnumerable<ReviewModel>>(reviews);
    }
    
    public async Task<IEnumerable<ReviewModel>> GetTopRatingReviewsAsync()
    {
        //todo replace with filters
        var reviews = await repository.GetAllAsync();
        var topReviews = reviews
            .OrderByDescending(r => r.Rating)
            .ThenByDescending(r => r.CreatedAt)
            .Take(3);
        
        return mapper.Map<IEnumerable<ReviewModel>>(topReviews);
    }

    public async Task<ReviewModel> GetReviewByIdAsync(long reviewId)
    {
        var review = await repository.GetByIdAsync(reviewId) ??
            throw new KeyNotFoundException($"Review with ID {reviewId} not found.");
        
        return mapper.Map<ReviewModel>(review);
    }

    public async Task AddReviewAsync(CreateReview reviewModel, int userId)
    {
        var reviewEntity = mapper.Map<ReviewEntity>(reviewModel);
        reviewEntity.UserId = userId;
        
        await repository.CreateAsync(reviewEntity);
    }

    public async Task DeleteReviewAsync(long reviewId)
    {
        var review = await repository.GetByIdAsync(reviewId) ??
            throw new KeyNotFoundException($"Review with ID {reviewId} not found.");
        
        await repository.DeleteAsync(review);
    }

    public async Task<bool> UserHasReviewedProductAsync(int userId, int productId)
    {
        var review = await repository.GetReviewByUserIdAndProductIdAsync(userId, productId);
        return review != null;
    }
}