using StoreApp.Models;

namespace StoreApp.Shared.Interfaces.Services;

public interface ICartItemService
{
    Task<List<CartItemModel>> GetCartItemsByUserIdAsync(int userId);
    Task AddToCartAsync(int userId, long productDetailId, int quantity);
    Task UpdateCartItemAsync(int userId, long productDetailId, int quantity);
    Task DeleteCartItemAsync(int userId, long productDetailId);
    Task ClearCartItemsByUserIdAsync(int userId);
}
