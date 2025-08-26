using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using StoreApp.BLL.Exceptions;
using StoreApp.BLL.Security;
using StoreApp.BLL.Services.Interfaces;
using StoreApp.DAL.Entities;
using StoreApp.Models;
using StoreApp.Shared.Enums;
using System.Security.Claims;

namespace StoreApp.BLL.Services;

public class AuthService(UserManager<UserEntity> userManager, IJwtProvider jwtProvider) : IAuthService
{
    public async Task RegisterUserAsync(CredentialsDto dto)
    {
        var existingUser = await userManager.FindByEmailAsync(dto.Email);
        if (existingUser is not null)
        {
            throw new BadRequestException("User with this email already exists.");
        }
        
        var newUser = new UserEntity
        {
            UserName = dto.Email,
            Email = dto.Email,
        };
        
        var result = await userManager.CreateAsync(newUser, dto.Password);
        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new BadRequestException($"User creation failed: {errors}");
        }
        
        await userManager.AddToRoleAsync(newUser, UserRole.User.ToString());
    }

    public async Task<TokenModel> LoginUserAsync(CredentialsDto dto)
    {
        var existingUser = await userManager.FindByEmailAsync(dto.Email);
        if (existingUser is null)
        {
            throw new KeyNotFoundException($"User with email {dto.Email} not found.");
        }
        
        var isAuth = await userManager.CheckPasswordAsync(existingUser, dto.Password);
        if (!isAuth)
        {
            throw new UnauthorizedAccessException("Invalid password.");
        }
        
        var roles = await userManager.GetRolesAsync(existingUser);
        var roleClaims = roles.Select(r => new Claim(ClaimTypes.Role, r));

        var token = jwtProvider.GenerateToken(existingUser, roleClaims);
        var refreshToken = jwtProvider.GenerateRefreshToken();

        await userManager.SetAuthenticationTokenAsync(existingUser, "MyApp", "RefreshToken", refreshToken);
        return new TokenModel(token, refreshToken);
    }
    
    public async Task LogoutUserAsync(string userId)
    {
        var existingUser = await userManager.FindByIdAsync(userId);
        if (existingUser is null)
        {
            throw new KeyNotFoundException($"User with ID {userId} not found.");
        }
        
        await userManager.RemoveAuthenticationTokenAsync(existingUser, "MyApp", "RefreshToken");
    }
    
    public async Task<TokenModel> RefreshTokenAsync(TokenModel tokenModel)
    {
        string userId;
        try
        {
            userId = jwtProvider.GetUserIdFromExpiredToken(tokenModel.AccessToken);
        }
        catch (SecurityTokenException e)
        {
            throw new UnauthorizedAccessException("Invalid token.", e);
        }
        
        var existingUser = await userManager.FindByIdAsync(userId);

        if (existingUser is null)
        {
            throw new KeyNotFoundException($"User with ID {userId} not found.");
        }
        
        var storedRefreshToken = await userManager.GetAuthenticationTokenAsync(existingUser, "MyApp", "RefreshToken");
        if (storedRefreshToken != tokenModel.RefreshToken)
        {
            throw new UnauthorizedAccessException("Invalid refresh token.");
        }
        
        var roles = await userManager.GetRolesAsync(existingUser);
        var roleClaims = roles.Select(r => new Claim(ClaimTypes.Role, r));

        var newJwtToken = jwtProvider.GenerateToken(existingUser, roleClaims);
        var newRefreshToken = jwtProvider.GenerateRefreshToken();
        
        await userManager.SetAuthenticationTokenAsync(existingUser, "MyApp", "RefreshToken", newRefreshToken);
        
        return new TokenModel(newJwtToken, newRefreshToken);
    }
}
