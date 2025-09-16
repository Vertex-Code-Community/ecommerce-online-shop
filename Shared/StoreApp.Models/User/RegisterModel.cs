using System.ComponentModel.DataAnnotations;

namespace StoreApp.Models;

public class RegisterModel : CredentialsDto
{
    [Required]
    [Compare("Password", ErrorMessage = "Passwords do not match")]
    public string ConfirmPassword { get; set; } = string.Empty;
    
    [Phone]
    public string? PhoneNumber { get; set; }
}