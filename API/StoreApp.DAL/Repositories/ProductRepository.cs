using Microsoft.EntityFrameworkCore;
using StoreApp.DAL.Data;
using StoreApp.DAL.Entities;
using StoreApp.DAL.Repositories.Interfaces;

namespace StoreApp.DAL.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _appDbContext;

    public ProductRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<IEnumerable<ProductEntity>> GetAllProductsAsync()
    {
        return await _appDbContext.Products
            .Include(p => p.Reviews)
            .Include(p => p.Variants)
                .ThenInclude(v => v.Color)
            .Include(p => p.Variants)
                .ThenInclude(v => v.Size)
            .ToListAsync();
    }

    public async Task<IEnumerable<ProductEntity>> GetFilteredProductsAsync(decimal? minPrice, decimal? maxPrice, string? searchTerm)
    {
        var query = _appDbContext.Products
            .Include(p => p.Reviews)
            .Include(p => p.Variants)
                .ThenInclude(v => v.Color)
            .Include(p => p.Variants)
                .ThenInclude(v => v.Size)
            .AsQueryable();

        if (minPrice.HasValue)
            query = query.Where(p => p.Price >= minPrice.Value);

        if (maxPrice.HasValue)
            query = query.Where(p => p.Price <= maxPrice.Value);

        if (!string.IsNullOrWhiteSpace(searchTerm))
        {
            var term = searchTerm.Trim();
            query = query.Where(
                p => p.Name.Contains(term) || 
                (p.Description != null && p.Description.Contains(term)));
        }

        return await query.ToListAsync();
    }

    public async Task<IEnumerable<ProductEntity>> GetNewArrivalsAsync(int take)
    {
        return await _appDbContext.Products
            .Include(p => p.Reviews)
            .Include(p => p.Variants).ThenInclude(v => v.Color)
            .Include(p => p.Variants).ThenInclude(v => v.Size)
            .OrderByDescending(p => p.Id)
            .Take(take)
            .ToListAsync();
    }

    public async Task<IEnumerable<ProductEntity>> GetTopSellingAsync(int take)
    {
        return await _appDbContext.Products
            .Include(p => p.CartItems)
            .Include(p => p.Reviews)
            .Include(p => p.Variants).ThenInclude(v => v.Color)
            .Include(p => p.Variants).ThenInclude(v => v.Size)
            .OrderByDescending(p => p.CartItems.Count)
            .ThenByDescending(p => p.Reviews.Any() ? p.Reviews.Average(r => r.Rating) : 0)
            .ThenByDescending(p => p.UnitsInStock)
            .Take(take)
            .ToListAsync();
    }

    public async Task<IEnumerable<ProductEntity>> GetRecommendationsAsync(int productId, int take)
    {
        var baseProduct = await _appDbContext.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Id == productId);
        var minPrice = baseProduct?.Price * 0.8m ?? 0m;
        var maxPrice = baseProduct?.Price * 1.2m ?? decimal.MaxValue;

        return await _appDbContext.Products
            .Include(p => p.Reviews)
            .Include(p => p.Variants).ThenInclude(v => v.Color)
            .Include(p => p.Variants).ThenInclude(v => v.Size)
            .Where(p => p.Id != productId && p.Price >= minPrice && p.Price <= maxPrice)
            .OrderByDescending(p => p.Reviews.Any() ? p.Reviews.Average(r => r.Rating) : 0)
            .ThenByDescending(p => p.Id)
            .Take(take)
            .ToListAsync();
    }

    public async Task<ProductEntity?> GetProductByIdAsync(int id)
    {
        return await _appDbContext.Products
            .Include(p => p.Reviews)
            .Include(p => p.Variants)
                .ThenInclude(v => v.Color)
            .Include(p => p.Variants)
                .ThenInclude(v => v.Size)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task AddProductAsync(ProductEntity product)
    {
        _appDbContext.Products.Add(product);
        await _appDbContext.SaveChangesAsync();
    }

    public async Task UpdateProductAsync(ProductEntity product)
    {
        _appDbContext.Products.Update(product);
        await _appDbContext.SaveChangesAsync();
    }

    public async Task DeleteProductByIdAsync(int id)
    {
        var product = await GetProductByIdAsync(id);
        if (product == null) return;

        _appDbContext.Products.Remove(product);
        await _appDbContext.SaveChangesAsync();
    }

    public async Task<bool> ProductExistsAsync(int id)
    {
        return await _appDbContext.Products.AnyAsync(p => p.Id == id);
    }
}
