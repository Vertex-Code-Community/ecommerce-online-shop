using StoreApp.Wasm.Models;

namespace StoreApp.Wasm.Services;

public interface ICartService
{
    event Action<int> OnCartItemCountChanged;

    Task AddToCartAsync(OrderItemModel orderItem);
    
    Task RemoveFromCartAsync(int productId);
    
    Task ClearCartAsync();

    Task ChangeCartItemQuantityAsync(int productId, int quantity);
    
    Task<IEnumerable<OrderItemModel>> GetCartItemsAsync();
    
    Task<decimal> GetTotalPriceAsync();
    
    Task<int> GetCartItemCountAsync();
}