using StoreApp.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace StoreApp.Models;

public class UserModel
{
	public int Id { get; set; }

	[EmailAddress(ErrorMessage = "Incorrect email format")]
	public required string Email { get; set; }

	[MaxLength(32)]
	public required string Password { get; set; }
	public UserRole Role { get; set; }
}


