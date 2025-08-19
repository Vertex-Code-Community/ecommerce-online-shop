using StoreApp.DAL.Entities;

namespace StoreApp.DAL.Repositories.Interfaces;

public interface ICartItemRepository
{
    Task<List<CartItemEntity>> GetCartItemsByUserIdAsync(int userId);
    Task<CartItemEntity?> GetCartItemAsync(int userId, int productId);
    Task AddCartItemAsync(CartItemEntity cartItem);
    Task UpdateCartItemAsync(CartItemEntity cartItem);
    Task DeleteCartItemAsync(CartItemEntity cartItem);
    Task ClearCartItemsByUserIdAsync(int userId);
}
