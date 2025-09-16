using Microsoft.EntityFrameworkCore;
using StoreApp.DAL.Data;
using StoreApp.DAL.Entities;
using StoreApp.DAL.Exceptions.Handlers;
using StoreApp.DAL.Repositories.Interfaces;

namespace StoreApp.DAL.Repositories;

public class ProductDetailRepository(AppDbContext appDbContext, IDbExceptionHandler handler)
    : GenericRepository<ProductDetailEntity, AppDbContext, long>(appDbContext, handler), IProductDetailRepository
{
    public async Task<IEnumerable<string>> GetAllSizesAsync()
    {
        return await Context.ProductDetails
            .Select(pd => pd.SizeName)
            .Distinct()
            .Where(size => !string.IsNullOrEmpty(size))
            .ToListAsync();
    }

    public async Task<IEnumerable<(string,string)>> GetAllColorsAsync()
    {
        return await Context.ProductDetails
            .Distinct()
            .Where(color => !string.IsNullOrEmpty(color.ColorHex))
            .Select(pd => new ValueTuple<string, string>(pd.ColorName, pd.ColorHex))
            .ToListAsync();
    }
}