using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace StoreApp.BLL.MediaStorage;

public class AzureBlobService(BlobServiceClient blobServiceClient) : IBlobService
{
    public async Task<string> UploadFileAsync(Stream fileStream, string blobName, string containerName, string contentType)
    {
        var containerClient = GetContainerClient(containerName);
        await containerClient.CreateIfNotExistsAsync();

        var blobClient = containerClient.GetBlobClient(blobName);
        await blobClient.UploadAsync(fileStream, new BlobHttpHeaders { ContentType = contentType });
        
        return blobClient.Uri.ToString();
    }

    public async Task<Stream?> GetFileAsync(string blobName, string containerName)
    {
        var containerClient = GetContainerClient(containerName);
        var blobClient = containerClient.GetBlobClient(blobName);

        return await blobClient.ExistsAsync() ? await blobClient.OpenReadAsync() : null;
    }

    public async Task<bool> DeleteFileAsync(string blobName, string containerName)
    {
        var containerClient = GetContainerClient(containerName);
        var blobClient = containerClient.GetBlobClient(blobName);

        var response = await blobClient.DeleteIfExistsAsync();
        return response.Value;
    }

    public async Task DeleteFolderAsync(string folderName, string containerName)
    {
        var containerClient = GetContainerClient(containerName);

        await foreach (var blobItem in containerClient.GetBlobsAsync(prefix: folderName + "/"))
        {
            var blobClient = containerClient.GetBlobClient(blobItem.Name);
            await blobClient.DeleteIfExistsAsync();
        }
    }

    private BlobContainerClient GetContainerClient(string containerName)
    {
        return blobServiceClient.GetBlobContainerClient(containerName);
    }
}
