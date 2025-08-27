namespace StoreApp.BLL.MediaStorage;

public interface IBlobService
{
    Task<string> UploadFileAsync(Stream fileStream, string blobName, string containerName, string contentType);

    Task<Stream?> GetFileAsync(string blobName, string containerName);

    Task<bool> DeleteFileAsync(string blobName, string containerName);

    Task DeleteFolderAsync(string folderName, string containerName);
}