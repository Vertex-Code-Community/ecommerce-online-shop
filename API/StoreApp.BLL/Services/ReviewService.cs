using AutoMapper;
using StoreApp.BLL.Exceptions;
using StoreApp.BLL.Services.Interfaces;
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
    
    public async Task<IEnumerable<ReviewModel>> GetTopRatingReviewsAsync(int count)
    {
        if (count <= 0)
        {
            throw new BadRequestException("Count must be greater than zero.");
        }

        var topReviews = await repository.GetTopRatingReviewsAsync(count);
        return mapper.Map<IEnumerable<ReviewModel>>(topReviews);
    }

    public async Task<ReviewModel> GetReviewByIdAsync(long reviewId)
    {
        var review = await repository.GetByIdAsync(reviewId) ??
            throw new KeyNotFoundException($"Review with ID {reviewId} not found.");
        
        return mapper.Map<ReviewModel>(review);
    }

    public async Task AddReviewAsync(CreateReview reviewModel, string userId)
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

    public async Task<bool> UserHasReviewedProductAsync(string userId, int productId)
    {
        var review = await repository.GetReviewByUserIdAndProductIdAsync(userId, productId);
        return review != null;
    }
}