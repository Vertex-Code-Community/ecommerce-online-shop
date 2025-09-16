using StoreApp.Models;

namespace StoreApp.BLL.Services.Interfaces;

public interface IAuthService
{
    Task RegisterUserAsync(RegisterModel dto);
    Task<TokenModel> LoginUserAsync(CredentialsDto dto);
    
    Task LogoutUserAsync(string userId);

    Task<TokenModel> RefreshTokenAsync(TokenModel tokenModel);
}