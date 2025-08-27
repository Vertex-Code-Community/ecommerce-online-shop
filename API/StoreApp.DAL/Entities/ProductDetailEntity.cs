namespace StoreApp.DAL.Entities;

public class ProductDetailEntity : IBaseEntity<long>
{
    public long Id { get; set; }
    
    public int ProductId { get; set; }

    public string ColorName { get; set; } = string.Empty;

    public string ColorHex { get; set; } = string.Empty;

    public string SizeName { get; set; } = string.Empty;

    public int UnitsInStock { get; set; }

    public string SKU { get; set; } = string.Empty;
    
    public long? ProductImagesId { get; set; }
	
    public ProductEntity? Product { get; set; }
    
    public ProductImagesEntity? ProductImages { get; set; }
}