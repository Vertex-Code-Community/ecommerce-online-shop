using StoreApp.DAL.Entities;

namespace StoreApp.DAL.Repositories.Interfaces;

public interface IReviewRepository : ICrudRepository<ReviewEntity>
{
    Task<IEnumerable<ReviewEntity>> GetReviewsByProductIdAsync(int productId);
    
    Task<ReviewEntity?> GetReviewByUserIdAndProductIdAsync(int userId, int productId);
}