using StoreApp.Models.Options;

namespace StoreApp.BLL.Services.Interfaces;

public interface IOptionsService
{
    Task<IEnumerable<ColorModel>> GetColors();
    Task<IEnumerable<string>> GetSizes();
}