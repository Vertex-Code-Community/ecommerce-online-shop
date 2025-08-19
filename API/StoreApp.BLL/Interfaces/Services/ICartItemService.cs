using StoreApp.Models;

namespace StoreApp.Shared.Interfaces.Services;

public interface ICartItemService
{
    Task<List<CartItemModel>> GetCartItemsByUserIdAsync(int userId);
    Task<bool> AddToCartAsync(int userId, int productId, int quantity);
    Task<bool> UpdateCartItemAsync(int userId, int productId, int quantity);
    Task<bool> DeleteCartItemAsync(int userId, int productId);
    Task<bool> ClearCartItemsByUserIdAsync(int userId);
}
