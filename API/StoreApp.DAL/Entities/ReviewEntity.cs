namespace StoreApp.DAL.Entities;

public class ReviewEntity : IBaseEntity<long>
{
    public long Id { get; set; }
    
    public string? Comment { get; set; }

    public int Rating { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int ProductId { get; set; }
    
    public string? UserId { get; set; }
    
    public ProductEntity? Product { get; set; }

    public UserEntity? User { get; set; }
}