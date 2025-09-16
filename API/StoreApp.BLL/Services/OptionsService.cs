using StoreApp.BLL.Services.Interfaces;
using StoreApp.DAL.Repositories.Interfaces;
using StoreApp.Models.Options;

namespace StoreApp.BLL.Services;

public class OptionsService(IProductDetailRepository productDetailRepository) : IOptionsService
{
    public async Task<IEnumerable<ColorModel>> GetColors()
    {
        var colors = await productDetailRepository.GetAllColorsAsync();
        return colors.Select(c => new ColorModel { Name = c.Item1, Hex = c.Item2 });
    }

    public async Task<IEnumerable<string>> GetSizes()
    {
        return await productDetailRepository.GetAllSizesAsync();
    }
}