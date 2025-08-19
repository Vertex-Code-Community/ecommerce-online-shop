using AutoMapper;
using StoreApp.DAL.Entities;
using StoreApp.DAL.Repositories.Interfaces;
using StoreApp.Models.Dtos.Review;
using StoreApp.Shared.Interfaces.Services;
using StoreApp.Models;

namespace StoreApp.BLL.Services;

public class ReviewService(IReviewRepository repository, IMapper mapper) : IReviewService
{
    public async Task<IEnumerable<ReviewModel>> GetReviewsByProductIdAsync(int productId)
    {
        var reviews = await repository.GetReviewsByProductIdAsync(productId);
        return mapper.Map<IEnumerable<ReviewModel>>(reviews);
    }

    public async Task<ReviewModel> GetReviewByIdAsync(int reviewId)
    {
        var review = await repository.GetByIdAsync(reviewId) ??
            throw new KeyNotFoundException($"Review with ID {reviewId} not found.");
        
        return mapper.Map<ReviewModel>(review);
    }

    public async Task AddReviewAsync(CreateReview reviewModel, int userId)
    {
        var reviewEntity = mapper.Map<ReviewEntity>(reviewModel);
        reviewEntity.UserId = userId;
        
        await repository.AddAsync(reviewEntity);
    }

    public async Task DeleteReviewAsync(int reviewId)
    {
        await repository.DeleteAsync(reviewId);
    }

    public async Task<bool> UserHasReviewedProductAsync(int userId, int productId)
    {
        var review = await repository.GetReviewByUserIdAndProductIdAsync(userId, productId);
        return review != null;
    }
}