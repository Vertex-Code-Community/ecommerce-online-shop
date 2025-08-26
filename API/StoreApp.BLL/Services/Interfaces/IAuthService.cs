using StoreApp.Models;

namespace StoreApp.BLL.Services.Interfaces;

public interface IAuthService
{
    Task RegisterUserAsync(CredentialsDto dto);
    Task<string> LoginUserAsync(CredentialsDto dto);
}