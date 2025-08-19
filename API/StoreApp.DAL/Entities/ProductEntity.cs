namespace StoreApp.DAL.Entities;

public class ProductEntity
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public required decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public decimal? Discount { get; set; }
    public int UnitsInStock { get; set; }

    public ICollection<CartItemEntity> CartItems { get; set; } = new List<CartItemEntity>();
    
    public ICollection<ReviewEntity> Reviews { get; set; } = new List<ReviewEntity>();

    public List<ProductVariant> Variants { get; set; } = [];
}
