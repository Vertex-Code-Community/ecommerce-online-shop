namespace StoreApp.DAL.Entities;

public class CartItemEntity : IBaseEntity<int>
{
    public int Id { get; set; }

    public int UserId { get; set; }
    
    public long ProductDetailId { get; set; }
    
    public int Quantity { get; set; }

    public UserEntity? User { get; set; }

    public ProductDetailEntity? ProductDetail { get; set; }
}
