using System.ComponentModel.DataAnnotations;

namespace StoreApp.Models;

public record UpdateCartItem
{
    [Required]
    [Range(1, long.MaxValue, ErrorMessage = "ProductDetailId must be a positive number")]
    public long ProductDetailId { get; init; }

    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1")]
    public int Quantity { get; init; }
}