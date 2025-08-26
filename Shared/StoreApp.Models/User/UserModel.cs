using StoreApp.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace StoreApp.Models;

public class UserModel
{
	public int Id { get; set; }

	public required string Email { get; set; }

	public UserRole Role { get; set; }
}
