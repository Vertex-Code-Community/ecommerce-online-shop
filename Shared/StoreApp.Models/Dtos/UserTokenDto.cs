using StoreApp.Shared.Enums;

namespace StoreApp.Models.Dtos;

public class UserTokenDto
{
    public int Id { get; set; }
    public required string Email { get; set; }
    public UserRole Role { get; set; }
}
