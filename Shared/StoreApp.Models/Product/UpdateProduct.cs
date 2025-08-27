using System.ComponentModel.DataAnnotations;

namespace StoreApp.Models;

public record UpdateProduct : CreateProduct
{
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Id must be a positive integer")]
    public int Id { get; set; }
}