using StoreApp.Models;

namespace StoreApp.BLL.Services.Interfaces;

public interface ICartItemService
{
    Task<List<CartItemModel>> GetCartItemsByUserIdAsync(string userId);
    Task AddToCartAsync(string userId, UpdateCartItem dto);
    Task UpdateCartItemAsync(string userId, UpdateCartItem dto);
    Task DeleteCartItemAsync(string userId, long productDetailId);
    Task ClearCartItemsByUserIdAsync(string userId);
}
