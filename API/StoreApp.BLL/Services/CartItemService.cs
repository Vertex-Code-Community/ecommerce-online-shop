using AutoMapper;
using StoreApp.BLL.Services.Interfaces;
using StoreApp.DAL.Entities;
using StoreApp.DAL.Repositories.Interfaces;
using StoreApp.Models;

namespace StoreApp.BLL.Services;

public class CartItemService(
    ICartItemRepository cartItemRepository,
    IProductDetailRepository productRepository,
    IMapper mapper) : ICartItemService
{
    public async Task<List<CartItemModel>> GetCartItemsByUserIdAsync(string userId)
    {
        var cartItems = await cartItemRepository.GetCartItemsByUserIdAsync(userId);

        return mapper.Map<List<CartItemModel>>(cartItems);
    }

    public async Task AddToCartAsync(string userId, UpdateCartItem dto)
    {
        _ = await productRepository.GetByIdAsync(dto.ProductDetailId)
            ?? throw new KeyNotFoundException($"Product detail with ID {dto.ProductDetailId} not found.");

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

    public async Task DeleteCartItemAsync(string userId, long productDetailId)
    {
        var cartItem = await cartItemRepository.GetCartItemAsync(userId, productDetailId)
                          ?? throw new KeyNotFoundException("Cart item not found.");
        
        await cartItemRepository.DeleteAsync(cartItem);
    }

    public async Task UpdateCartItemAsync(string userId, UpdateCartItem dto)
    {
        var cartItem = await cartItemRepository.GetCartItemAsync(userId, dto.ProductDetailId)
                         ?? throw new KeyNotFoundException("Cart item not found.");
        
        cartItem.Quantity = dto.Quantity;
        
        await cartItemRepository.UpdateAsync(cartItem);
    }

    public async Task ClearCartItemsByUserIdAsync(string userId)
    {
        await cartItemRepository.ClearCartItemsByUserIdAsync(userId);
    }
}
