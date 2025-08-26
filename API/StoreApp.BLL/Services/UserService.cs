using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StoreApp.BLL.Services.Interfaces;
using StoreApp.DAL.Entities;
using StoreApp.Models;

namespace StoreApp.BLL.Services;

public class UserService(UserManager<UserEntity> userManager, IMapper mapper) : IUserService
{
    public async Task<IEnumerable<UserModel>> GetAllUsersAsync()
    {
        var userEntities = await userManager.Users.ToListAsync();
        return mapper.Map<IEnumerable<UserModel>>(userEntities);
    }

    public async Task<UserModel> GetUserByIdAsync(string id)
    {
        var userEntity = await userManager.FindByIdAsync(id)
            ?? throw new KeyNotFoundException("User not found.");
        
        return mapper.Map<UserModel>(userEntity);
    }

    public async Task<UserModel> GetUserByEmailAsync(string email)
    {
        var userEntity = await userManager.FindByEmailAsync(email)
            ?? throw new KeyNotFoundException("User not found.");
        
        return mapper.Map<UserModel>(userEntity);
    }

    public async Task UpdateRoleByIdAsync(string id, string role)
    {
        var existingUser = await userManager.FindByIdAsync(id)
            ?? throw new KeyNotFoundException("User not found.");
        
        var currentRoles = await userManager.GetRolesAsync(existingUser);
        var removeResult = await userManager.RemoveFromRolesAsync(existingUser, currentRoles);
        if (!removeResult.Succeeded)
        {
            //todo: custom exception
            throw new Exception("Failed to remove user roles.");
        }
        
        var addResult = await userManager.AddToRoleAsync(existingUser, role);
        if (!addResult.Succeeded)
        {
            //todo: custom exception
            throw new Exception("Failed to add user role.");
        }
    }

    public async Task DeleteUserByIdAsync(string id)
    {
        var user = await userManager.FindByIdAsync(id)
            ?? throw new KeyNotFoundException("User not found.");

        await userManager.DeleteAsync(user);
    }
}
