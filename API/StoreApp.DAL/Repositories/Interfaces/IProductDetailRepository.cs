using StoreApp.DAL.Entities;

namespace StoreApp.DAL.Repositories.Interfaces;

public interface IProductDetailRepository : IGenericRepository<ProductDetailEntity, long>
{
    Task<IEnumerable<string>> GetAllSizesAsync();

    Task<IEnumerable<(string, string)>> GetAllColorsAsync();
}