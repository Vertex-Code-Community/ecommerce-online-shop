using Microsoft.AspNetCore.Identity;
using StoreApp.Models.Dtos;
using StoreApp.BLL.Security;
using StoreApp.BLL.Services.Interfaces;
using StoreApp.DAL.Entities;
using StoreApp.Shared.Enums;

namespace StoreApp.BLL.Services;

public class AuthService(UserManager<UserEntity> userManager, IJwtProvider jwtProvider) : IAuthService
{
    public async Task RegisterUserAsync(CredentialsDto dto)
    {
        var existingUser = await userManager.FindByEmailAsync(dto.Email);
        if (existingUser is not null)
        {
            //todo custom exception
            throw new InvalidOperationException("User with this email already exists.");
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
            //todo custom exception
            throw new InvalidOperationException($"User creation failed: {errors}");
        }
        
        await userManager.AddToRoleAsync(newUser, UserRole.User.ToString());
    }

    public async Task<string> LoginUserAsync(CredentialsDto dto)
    {
        var existingUser = await userManager.FindByEmailAsync(dto.Email);
        if (existingUser is null)
        {
            //todo custom exception
            throw new InvalidOperationException("User not found.");
        }
        
        var isAuth = await userManager.CheckPasswordAsync(existingUser, dto.Password);
        if (!isAuth)
        {
            throw new UnauthorizedAccessException("Invalid password.");
        }
        
        var token = jwtProvider.GenerateToken(existingUser);
        return token;
    }
}
