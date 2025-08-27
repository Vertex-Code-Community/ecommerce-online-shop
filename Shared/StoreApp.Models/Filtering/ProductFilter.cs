using System.ComponentModel.DataAnnotations;

namespace StoreApp.Models;

public record ProductFilter : BaseFilter
{
    [Range(0, double.MaxValue, ErrorMessage = "MinPrice must be a non-negative value.")]
    public decimal? MinPrice { get; set; }
    
    [Range(0, double.MaxValue, ErrorMessage = "MaxPrice must be a non-negative value.")]
    public decimal? MaxPrice { get; set; }
    
    public bool? HasDiscount { get; set; }
    
    [StringLength(7, MinimumLength = 4, ErrorMessage = "Color must be a valid hex color code.")]
    public string? Color { get; set; }
    
    [StringLength(20, ErrorMessage = "Size length can't be more than 20.")]
    public string? Size { get; set; }
}