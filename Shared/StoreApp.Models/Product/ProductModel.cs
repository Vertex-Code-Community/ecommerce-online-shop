namespace StoreApp.Models;

public class ProductModel
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public string? ImageUrl { get; set; }
	
    public decimal? Discount { get; set; }
	
    public ProductDetailModel DefaultDetail { get; set; } = new();

    public double Rating { get; set; }
	
    public int UnitsInStock { get; set; }
}