using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Png;
using StoreApp.BLL.Exceptions;
using System.Text.RegularExpressions;

namespace StoreApp.BLL.MediaStorage;

public class ProductImageService(IBlobService blobService) : IProductImageService
{
    private static readonly Regex ImageDataRegex = new("^data:(?<type>.+?);base64,(?<data>.+)$");

    private const string ContainerName = "product-images";
    private const string DefaultFormat = "image/png";
    private readonly string[] _supportedFormats = ["image/png", "image/jpeg", "image/jpg"];

    public async Task<string> UploadMainImageAsync(int productId, string base64Data)
    {
        var (contentType, imageBytes) = ParseBase64Image(base64Data);

        if (!_supportedFormats.Contains(contentType))
        {
            throw new BadRequestException("Invalid image format provided");
        }
        
        var pngBytes = await ConvertToPngAsync(imageBytes);
        var blobName = $"product-{productId}/main.png";

        using var stream = new MemoryStream(pngBytes);
        return await blobService.UploadFileAsync(stream, blobName, ContainerName, DefaultFormat);
    }

    public async Task<string> UploadColorImageAsync(int productId, string colorHex, string base64Data)
    {
        var (contentType, imageBytes) = ParseBase64Image(base64Data);

        if (!_supportedFormats.Contains(contentType))
        {
            throw new BadRequestException("Invalid image format provided");
        }

        var index = Guid.NewGuid().ToString("N")[..8];
        var pngBytes = await ConvertToPngAsync(imageBytes);
        var blobName = $"product-{productId}/{colorHex.TrimStart('#')}/{index}.png";

        using var stream = new MemoryStream(pngBytes);
        return await blobService.UploadFileAsync(stream, blobName, ContainerName, DefaultFormat);
    }

    public async Task DeleteProductImagesAsync(int productId)
    {
        var folderPrefix = $"product-{productId}";
        await blobService.DeleteFolderAsync(folderPrefix, ContainerName);
    }

    public async Task DeleteColorImagesAsync(int productId, string colorHex)
    {
        var folderPrefix = $"product-{productId}/{colorHex.TrimStart('#')}";
        await blobService.DeleteFolderAsync(folderPrefix, ContainerName);
    }

    private static (string ContentType, byte[] Data) ParseBase64Image(string dataUrl)
    {
        var match = ImageDataRegex.Match(dataUrl);

        if (!match.Success)
        {
            throw new BadRequestException("Invalid image format provided");
        }

        var contentType = match.Groups["type"].Value;
        var base64Data = match.Groups["data"].Value;

        return (contentType, Convert.FromBase64String(base64Data));
    }

    private static async Task<byte[]> ConvertToPngAsync(byte[] imageBytes)
    {
        using var msInput = new MemoryStream(imageBytes);
        using var image = await Image.LoadAsync(msInput);
        using var msOutput = new MemoryStream();

        await image.SaveAsPngAsync(msOutput, new PngEncoder());
        return msOutput.ToArray();
    }
}
