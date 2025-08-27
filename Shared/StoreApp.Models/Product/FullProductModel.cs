using System.ComponentModel.DataAnnotations;

namespace StoreApp.Models;

public class FullProductModel
{
	public int Id { get; set; }

	public required string Name { get; set; }

	public string? Description { get; set; }

	public required decimal Price { get; set; }

	public string? ImageUrl { get; set; }
	
	public decimal? Discount { get; set; }
	
	public List<ProductDetailModel> Details { get; set; } = [];

	public double Rating { get; set; }
	
	public int UnitsInStock { get; set; }
}
