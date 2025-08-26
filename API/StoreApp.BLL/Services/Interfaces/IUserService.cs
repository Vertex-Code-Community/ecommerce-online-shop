using StoreApp.Models;

namespace StoreApp.BLL.Services.Interfaces;

public interface IUserService
{
    Task DeleteUserByIdAsync(string id);
    Task<IEnumerable<UserModel>> GetAllUsersAsync();
    Task<UserModel> GetUserByEmailAsync(string email);
    Task<UserModel> GetUserByIdAsync(string id);
    Task UpdateRoleByIdAsync(string id, string role);
}