using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace StoreApp.BLL.Interfaces.Security;

public interface IJwtProvider
{
    string GenerateRefreshToken();
    string GenerateToken(IdentityUser user, IEnumerable<Claim>? userClaims = null);
}