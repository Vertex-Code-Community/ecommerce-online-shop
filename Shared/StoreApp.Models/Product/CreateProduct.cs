using System.ComponentModel.DataAnnotations;

namespace StoreApp.Models;

public record CreateProduct
{
    [Required]
    [MaxLength(100)]
    public required string Name { get; set; }

    [MaxLength(400)]
    public string? Description { get; set; }

    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
    public required decimal Price { get; set; }

    [MaxLength(4 * 1024 * 1024, ErrorMessage = "Image size should not exceed 4MB")]
    public string? ImageData { get; set; }

    [Range(0, 1, ErrorMessage = "Discount must be between 0 and 1 (e.g., 0.15 for 15%)")]
    public decimal? Discount { get; set; }
	
    [Required]
    public int UnitsInStock { get; set; }
}