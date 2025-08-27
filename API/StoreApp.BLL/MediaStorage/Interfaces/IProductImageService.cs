using StoreApp.Models;

namespace StoreApp.BLL.MediaStorage;

public interface IProductImageService
{
    Task<string> UploadMainImageAsync(int productId, string base64Data);

    Task<string> UploadImageAsync(UploadProductImage request);

    Task DeleteProductImagesAsync(int productId);
    
    Task DeleteColorImagesAsync(int productId, string colorHex);
}