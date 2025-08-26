using AutoMapper;
using StoreApp.BLL.Services.Interfaces;
using StoreApp.DAL.Entities;
using StoreApp.DAL.Repositories.Interfaces;
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

    public async Task AddToCartAsync(int userId, UpdateCartItem dto)
    {
        // todo: check if productDetailId exists
        // var productExists = await _productRepository.ProductExistsAsync(productDetailId);
        // if (!productExists) return false;

        var existingItem = await cartItemRepository.GetCartItemAsync(userId, dto.ProductDetailId);

        if (existingItem is not null)
        {
            existingItem.Quantity += dto.Quantity;
            await cartItemRepository.UpdateAsync(existingItem);
        }
        else
        {
            var newItem = mapper.Map<CartItemEntity>(dto);
            newItem.UserId = userId;
            
            await cartItemRepository.CreateAsync(newItem);
        }
    }

    public async Task DeleteCartItemAsync(int userId, long productDetailId)
    {
        var cartItem = await cartItemRepository.GetCartItemAsync(userId, productDetailId)
                          ?? throw new KeyNotFoundException("Cart item not found.");
        
        await cartItemRepository.DeleteAsync(cartItem);
    }

    public async Task UpdateCartItemAsync(int userId, UpdateCartItem dto)
    {
        var cartItem = await cartItemRepository.GetCartItemAsync(userId, dto.ProductDetailId)
                         ?? throw new KeyNotFoundException("Cart item not found.");
        
        cartItem.Quantity = dto.Quantity;
        
        await cartItemRepository.UpdateAsync(cartItem);
    }

    public async Task ClearCartItemsByUserIdAsync(int userId)
    {
        await cartItemRepository.ClearCartItemsByUserIdAsync(userId);
    }
}
