namespace StoreApp.BLL.MediaStorage;

public interface IProductImageService
{
    Task<string> UploadMainImageAsync(int productId, string base64Data);

    Task<string> UploadColorImageAsync(int productId, string colorHex, string base64Data);

    Task DeleteProductImagesAsync(int productId);
    
    Task DeleteColorImagesAsync(int productId, string colorHex);
}