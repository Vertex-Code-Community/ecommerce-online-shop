using System.ComponentModel.DataAnnotations;

namespace StoreApp.Models;

public record DeleteProductImage
{
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "ProductId must be a positive integer")]
    public required int ProductId { get; set; }
    
    [Required]
    [Url]
    public required string Url { get; set; }
}