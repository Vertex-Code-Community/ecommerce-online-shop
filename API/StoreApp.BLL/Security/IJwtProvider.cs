using StoreApp.DAL.Entities;
using System.Security.Claims;

namespace StoreApp.BLL.Security;

public interface IJwtProvider
{
    string GenerateRefreshToken();
    string GenerateToken(UserEntity user, IEnumerable<Claim>? userClaims = null);
}