using StoreApp.Models;

namespace StoreApp.Shared.Interfaces.Services;

public interface ICartItemService
{
    Task<List<CartItemModel>> GetCartItemsByUserIdAsync(int userId);
    Task AddToCartAsync(int userId, UpdateCartItem dto);
    Task UpdateCartItemAsync(int userId, UpdateCartItem dto);
    Task DeleteCartItemAsync(int userId, long productDetailId);
    Task ClearCartItemsByUserIdAsync(int userId);
}
