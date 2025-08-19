using Microsoft.EntityFrameworkCore;
using StoreApp.DAL.Data;
using StoreApp.DAL.Entities;
using StoreApp.DAL.Repositories.Interfaces;

namespace StoreApp.DAL.Repositories;

public class CartItemRepository : ICartItemRepository
{
    private readonly AppDbContext _appDbContext;

    public CartItemRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public Task<CartItemEntity?> GetCartItemAsync(int userId, int productId)
    {
        return _appDbContext.CartItems
            .Include(c => c.Product)
            .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);
    }

    public async Task<List<CartItemEntity>> GetCartItemsByUserIdAsync(int id)
    {
        return await _appDbContext.CartItems
            .Include(c => c.Product)
            .Where(c => c.UserId == id)
            .ToListAsync();
    }

    public async Task AddCartItemAsync(CartItemEntity cartItem)
    {
        await _appDbContext.CartItems.AddAsync(cartItem);
        await _appDbContext.SaveChangesAsync();
    }

    public async Task UpdateCartItemAsync(CartItemEntity cartItem)
    {
        _appDbContext.CartItems.Update(cartItem);
        await _appDbContext.SaveChangesAsync();
    }

    public async Task DeleteCartItemAsync(CartItemEntity cartItem)
    {
        _appDbContext.CartItems.Remove(cartItem);
        await _appDbContext.SaveChangesAsync();
    }

    public async Task ClearCartItemsByUserIdAsync(int userId)
    {
        var userCartItems = await _appDbContext.CartItems
            .Where(c => c.UserId == userId)
            .ToListAsync();

        _appDbContext.CartItems.RemoveRange(userCartItems);
        await _appDbContext.SaveChangesAsync();
    }
}
