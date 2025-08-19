namespace StoreApp.DAL.Entities;

public class ProductVariant
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public int ColorId { get; set; }

    public int SizeId { get; set; }

    public int UnitsInStock { get; set; }

    public string SKU { get; set; } = string.Empty;

    public ProductEntity Product { get; set; } = null!;

    public ColorEntity Color { get; set; } = null!;

    public SizeEntity Size { get; set; } = null!;
}