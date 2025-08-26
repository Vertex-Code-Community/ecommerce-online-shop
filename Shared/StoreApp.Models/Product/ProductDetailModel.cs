namespace StoreApp.Models;

public class ProductDetailModel
{
	public int Id { get; set; }

	public string ColorName { get; set; } = string.Empty;

	public string ColorHex { get; set; } = string.Empty;

	public string SizeName { get; set; } = string.Empty;

	public int UnitsInStock { get; set; }

	public string SKU { get; set; } = string.Empty;
	
	public List<string> ImageUrls { get; set; } = [];
}
