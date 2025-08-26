using Microsoft.AspNetCore.Identity;
using StoreApp.DAL.Entities;
using System.Security.Claims;

namespace StoreApp.BLL.Interfaces.Security;

public interface IJwtProvider
{
    string GenerateRefreshToken();
    string GenerateToken(UserEntity user, IEnumerable<Claim>? userClaims = null);
}