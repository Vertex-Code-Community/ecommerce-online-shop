using Microsoft.AspNetCore.Identity;

namespace StoreApp.DAL.Entities;

public class UserEntity : IdentityUser<int>
{
    public ICollection<CartItemEntity> CartItems { get; set; } = new List<CartItemEntity>();
    
    public ICollection<ReviewEntity> Reviews { get; set; } = new List<ReviewEntity>();
}
