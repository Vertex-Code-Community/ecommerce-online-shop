using StoreApp.DAL.Entities;

namespace StoreApp.DAL.Repositories.Interfaces;

public interface IReviewRepository : IGenericRepository<ReviewEntity, long>
{
    Task<IEnumerable<ReviewEntity>> GetReviewsByProductIdAsync(int productId);
    
    Task<ReviewEntity?> GetReviewByUserIdAndProductIdAsync(string userId, int productId);
}