using Microsoft.EntityFrameworkCore;
using StoreApp.DAL.Data;
using StoreApp.DAL.Entities;
using StoreApp.DAL.Exceptions.Handlers;
using StoreApp.DAL.Repositories.Interfaces;

namespace StoreApp.DAL.Repositories;

public class CartItemRepository(AppDbContext appDbContext, IDbExceptionHandler handler)
    : GenericRepository<CartItemEntity, AppDbContext, int>(appDbContext, handler), ICartItemRepository
{
    public Task<CartItemEntity?> GetCartItemAsync(string userId, long productDetailId)
    {
        return Context.CartItems.FirstOrDefaultAsync(c => c.UserId == userId && c.ProductDetailId == productDetailId);
    }

    public async Task<List<CartItemEntity>> GetCartItemsByUserIdAsync(string id)
    {
        return await Context.CartItems
            .Include(c => c.ProductDetail)
                .ThenInclude(p => p.Product)
            .Where(c => c.UserId == id)
            .ToListAsync();
    }

    public async Task ClearCartItemsByUserIdAsync(string userId)
    {
        var userCartItems = await Context.CartItems
            .Where(c => c.UserId == userId)
            .ToListAsync();

        Context.CartItems.RemoveRange(userCartItems);
        await Context.SaveChangesAsync();
    }
}
