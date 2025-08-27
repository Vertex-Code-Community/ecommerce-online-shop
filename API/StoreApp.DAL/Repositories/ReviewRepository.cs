using Microsoft.EntityFrameworkCore;
using StoreApp.DAL.Data;
using StoreApp.DAL.Entities;
using StoreApp.DAL.Exceptions.Handlers;
using StoreApp.DAL.Repositories.Interfaces;

namespace StoreApp.DAL.Repositories;

public class ReviewRepository(AppDbContext context, IDbExceptionHandler handler)
    : GenericRepository<ReviewEntity, AppDbContext, long>(context, handler), IReviewRepository
{
    public async Task<IEnumerable<ReviewEntity>> GetReviewsByProductIdAsync(int productId)
    {
        return await Context.Reviews
            .AsNoTracking()
            .Include(r => r.User)
            .Where(r => r.ProductId == productId)
            .ToListAsync();
    }
    
    public async Task<IEnumerable<ReviewEntity>> GetTopRatingReviewsAsync(int count)
    {
        return await Context.Reviews
            .AsNoTracking()
            .Include(r => r.User)
            .OrderByDescending(r => r.Rating)
            .ThenByDescending(r => r.CreatedAt)
            .Take(count)
            .ToListAsync();
    }
    
    public async Task<ReviewEntity?> GetReviewByUserIdAndProductIdAsync(string userId, int productId)
    {
        return await Context.Reviews
            .AsNoTracking()
            .Include(r => r.User)
            .Include(r => r.Product)
            .FirstOrDefaultAsync(r => r.UserId == userId && r.ProductId == productId);
    }
}