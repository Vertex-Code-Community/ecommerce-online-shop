using StoreApp.Shared.Attributes;
using System.ComponentModel.DataAnnotations;

namespace StoreApp.Models;

public record UploadProductImage
{
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "ProductId must be a positive integer")]
    public required int ProductId { get; set; }
    
    [Required]
    [MaxBase64FileSize(4 * 1024 * 1024)]
    public required string Base64Data { get; set; }
    
    public string? ColorHex { get; set; }
    
    public bool IsMain { get; set; } = false;
}