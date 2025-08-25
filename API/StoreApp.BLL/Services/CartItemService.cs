using AutoMapper;
using StoreApp.DAL.Entities;
using StoreApp.DAL.Repositories.Interfaces;
using StoreApp.Shared.Interfaces.Services;
using StoreApp.Models;

namespace StoreApp.BLL.Services;

public class CartItemService(ICartItemRepository cartItemRepository,
    IMapper mapper) : ICartItemService
{
    public async Task<List<CartItemModel>> GetCartItemsByUserIdAsync(int userId)
    {
        var cartItems = await cartItemRepository.GetCartItemsByUserIdAsync(userId);

        return mapper.Map<List<CartItemModel>>(cartItems);
    }

    public async Task AddToCartAsync(int userId, long productDetailId, int quantity)
    {
        // todo: check if productDetailId exists
        // var productExists = await _productRepository.ProductExistsAsync(productDetailId);
        // if (!productExists) return false;

        var existingItem = await cartItemRepository.GetCartItemAsync(userId, productDetailId);

        if (existingItem is not null)
        {
            existingItem.Quantity += quantity;
            await cartItemRepository.UpdateAsync(existingItem);
        }
        else
        {
            var newItem = new CartItemEntity
            {
                UserId = userId,
                ProductDetailId = productDetailId,
                Quantity = quantity
            };
            
            await cartItemRepository.CreateAsync(newItem);
        }
    }

    public async Task DeleteCartItemAsync(int userId, long productDetailId)
    {
        var cartItem = await cartItemRepository.GetCartItemAsync(userId, productDetailId)
                          ?? throw new KeyNotFoundException("Cart item not found.");
        
        await cartItemRepository.DeleteAsync(cartItem);
    }

    public async Task UpdateCartItemAsync(int userId, long productDetailId, int quantity)
    {
        var cartItem = await cartItemRepository.GetCartItemAsync(userId, productDetailId)
                         ?? throw new KeyNotFoundException("Cart item not found.");
        
        cartItem.Quantity = quantity;
        
        await cartItemRepository.UpdateAsync(cartItem);
    }

    public async Task ClearCartItemsByUserIdAsync(int userId)
    {
        await cartItemRepository.ClearCartItemsByUserIdAsync(userId);
    }
}
