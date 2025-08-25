using StoreApp.DAL.Entities;

namespace StoreApp.DAL.Repositories.Interfaces;

public interface ICartItemRepository : IGenericRepository<CartItemEntity, int>
{
    Task<List<CartItemEntity>> GetCartItemsByUserIdAsync(int userId);
    Task<CartItemEntity?> GetCartItemAsync(int userId, long productDetailId);
    Task ClearCartItemsByUserIdAsync(int userId);
}
