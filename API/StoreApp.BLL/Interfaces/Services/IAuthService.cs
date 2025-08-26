using StoreApp.Models.Dtos;

namespace StoreApp.BLL.Interfaces.Services;

public interface IAuthService
{
    Task RegisterUserAsync(CredentialsDto dto);
    Task<string> LoginUserAsync(CredentialsDto dto);
}