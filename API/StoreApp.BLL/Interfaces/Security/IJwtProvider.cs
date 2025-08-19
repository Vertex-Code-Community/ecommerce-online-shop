using StoreApp.Models.Dtos;

namespace StoreApp.BLL.Interfaces.Security;

public interface IJwtProvider
{
    string GenerateRefreshToken();
    string GenerateToken(UserTokenDto user);
}