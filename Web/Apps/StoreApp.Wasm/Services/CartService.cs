using StoreApp.Wasm.Models;
using System.Net.Http.Json;
using SharedCartItemModel = StoreApp.Models.CartItemModel;

namespace StoreApp.Wasm.Services;

public class CartService(
    ILocalStorageService localStorageService,
    HttpClient httpClient) : ICartService
{
    private const string CartKey = "cart";
    
    public event Action<int>? OnCartItemCountChanged;

    public async Task AddToCartAsync(OrderItemModel orderItem)
    {
        if (orderItem == null)
        {
            throw new ArgumentNullException(nameof(orderItem));
        }

        var cartItems = (await GetCartItemsAsync()).ToList();
        
        var existingItem = cartItems.FirstOrDefault(item => 
            item.ProductModel.Id == orderItem.ProductModel.Id &&
            AreColorsEqual(item.SelectedColor, orderItem.SelectedColor) &&
            AreSizesEqual(item.SelectedSize, orderItem.SelectedSize));

        if (existingItem is null)
        {
            cartItems.Add(orderItem);
            await httpClient.PostAsync(
                $"cartItems?productId={orderItem.ProductModel.Id}&quantity={orderItem.Quantity}",
                null);
        }
        else
        {
            existingItem.Quantity += orderItem.Quantity;
            await httpClient.PutAsync($"cartItems?productId={orderItem.ProductModel.Id}&quantity={existingItem.Quantity}", null);
        }

        await localStorageService.SetItemAsync(CartKey, cartItems);
        OnCartItemCountChanged?.Invoke(cartItems.Count);
    }

    public async Task RemoveFromCartAsync(int productId)
    {
        var cartItems = (await GetCartItemsAsync()).ToList();
        var itemToRemove = cartItems.FirstOrDefault(item => item.ProductModel.Id == productId);

        if (itemToRemove is not null)
        {
            cartItems.Remove(itemToRemove);
            
            await httpClient.DeleteAsync($"cartItems?productId={productId}");
            await localStorageService.SetItemAsync(CartKey, cartItems);
            
            OnCartItemCountChanged?.Invoke(cartItems.Count);
        }
    }

    public async Task ClearCartAsync()
    {
        await localStorageService.RemoveItemAsync(CartKey);
        await httpClient.DeleteAsync("cartItems/clear");

        OnCartItemCountChanged?.Invoke(0);
    }

    public async Task<IEnumerable<OrderItemModel>> GetCartItemsAsync()
    {
        var cartItems = await localStorageService.GetItemAsync<List<OrderItemModel>>(CartKey);
        
        if (cartItems is not null && cartItems.Any())
        {
            return cartItems;
        }

        var apiCartItems = await httpClient.GetFromJsonAsync<List<SharedCartItemModel>>("cartItems");
        cartItems = (apiCartItems ?? new List<SharedCartItemModel>())
            .Select(MapToClientCartItem)
            .ToList();

        if (cartItems is null)
        {
            cartItems = new List<OrderItemModel>();
        }

        await localStorageService.SetItemAsync(CartKey, cartItems);
        OnCartItemCountChanged?.Invoke(cartItems.Count);

        return cartItems;
    }

    public async Task<decimal> GetTotalPriceAsync()
    {
        var cartItems = await GetCartItemsAsync();
        return cartItems.Sum(item => (decimal)item.ProductModel.CurrentPrice * item.Quantity);
    }

    public async Task<int> GetCartItemCountAsync()
    {
        var cartItems = await GetCartItemsAsync();
        return cartItems.Count();
    }

    public async Task ChangeCartItemQuantityAsync(int productId, int quantity)
    {
        await ChangeCartItemQuantity(productId, quantity);
    }

    private async Task<List<OrderItemModel>> ChangeCartItemQuantity(int productId, int quantity)
    {
        var cartItems = (await GetCartItemsAsync()).ToList();
        var itemToUpdate = cartItems.FirstOrDefault(item => item.ProductModel.Id == productId);

        if (itemToUpdate is not null)
        {
            itemToUpdate.Quantity = quantity;
            await httpClient.PutAsync($"cartItems?productId={productId}&quantity={quantity}", null);
            await localStorageService.SetItemAsync(CartKey, cartItems);
        }

        return cartItems;
    }

    private static OrderItemModel MapToClientCartItem(SharedCartItemModel apiCartItem)
    {
        return new OrderItemModel
        {
            Id = apiCartItem.Id,
            UserId = apiCartItem.UserId,
            ProductModel = new ProductModel
            {
                Id = apiCartItem.ProductModel.Id,
                Title = apiCartItem.ProductModel.Name,
                CurrentPrice = (double)apiCartItem.ProductModel.Price,
                ImageSrc = apiCartItem.ProductModel.ImageUrl ?? string.Empty,
                Description = apiCartItem.ProductModel.Description ?? string.Empty,
                UnitsInStock = apiCartItem.ProductModel.UnitsInStock
            },
            Quantity = apiCartItem.Quantity
        };
    }

    private static bool AreColorsEqual(ColorModel? color1, ColorModel? color2)
    {
        if (color1 == null && color2 == null) return true;
        if (color1 == null || color2 == null) return false;
        return color1.Id == color2.Id;
    }

    private static bool AreSizesEqual(SizeModel? size1, SizeModel? size2)
    {
        if (size1 == null && size2 == null) return true;
        if (size1 == null || size2 == null) return false;
        return size1.Id == size2.Id;
    }
}