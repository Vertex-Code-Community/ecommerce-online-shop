namespace StoreApp.DAL.Entities;

//todo: configure
public class ProductDetailEntity
{
    public long Id { get; set; }
    
    public int ProductId { get; set; }

    public string ColorName { get; set; } = string.Empty;

    public string ColorHex { get; set; } = string.Empty;

    public string SizeName { get; set; } = string.Empty;

    public int UnitsInStock { get; set; }

    public string SKU { get; set; } = string.Empty;
	
    public List<string> ImageUrls { get; set; } = [];
    
    public ProductEntity? Product { get; set; }
}