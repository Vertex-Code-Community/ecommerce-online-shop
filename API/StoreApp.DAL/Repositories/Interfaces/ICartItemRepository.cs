using StoreApp.DAL.Entities;

namespace StoreApp.DAL.Repositories.Interfaces;

public interface ICartItemRepository : IGenericRepository<CartItemEntity, int>
{
    Task<List<CartItemEntity>> GetCartItemsByUserIdAsync(string userId);
    Task<CartItemEntity?> GetCartItemAsync(string userId, long productDetailId);
    Task ClearCartItemsByUserIdAsync(string userId);
}
