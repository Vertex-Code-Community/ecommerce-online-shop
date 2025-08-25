namespace StoreApp.DAL.Entities;

public class ProductEntity : IBaseEntity<int>
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public decimal? Discount { get; set; }
    public int UnitsInStock { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<CartItemEntity> CartItems { get; set; } = new List<CartItemEntity>();
    
    public ICollection<ReviewEntity> Reviews { get; set; } = new List<ReviewEntity>();

    public List<ProductDetailEntity> ProductDetails { get; set; } = [];
}
