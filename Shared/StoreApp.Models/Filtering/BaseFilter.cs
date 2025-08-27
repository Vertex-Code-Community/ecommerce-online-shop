using System.ComponentModel.DataAnnotations;

namespace StoreApp.Models;

public record BaseFilter
{
    [Range(1, int.MaxValue, ErrorMessage = "PageNumber must be greater than 0.")]
    public int PageNumber { get; set; } = 1;
    
    [Range(1, 100, ErrorMessage = "PageSize must be between 1 and 100.")]
    public int PageSize { get; set; } = 10;
    
    [StringLength(50, ErrorMessage = "SortBy length can't be more than 50.")]
    public string? SortBy { get; set; }
    
    public bool? SortAscending { get; set; } = true;
    
    [StringLength(100, ErrorMessage = "SearchQuery length can't be more than 100.")]
    public string? SearchQuery { get; set; }
    
    [StringLength(50, ErrorMessage = "SearchField length can't be more than 50.")]
    public string? SearchField { get; set; }
}