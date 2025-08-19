using System.ComponentModel.DataAnnotations;

namespace StoreApp.DAL.Entities;

public class ReviewEntity
{
    public int Id { get; set; }
    
    public string? Comment { get; set; }

    [Range(0, 5)]
    public int Rating { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int ProductId { get; set; }
    
    public int UserId { get; set; }
    
    public ProductEntity? Product { get; set; }

    public UserEntity? User { get; set; }
}