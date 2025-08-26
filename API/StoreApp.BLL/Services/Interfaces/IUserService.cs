using StoreApp.Models;

namespace StoreApp.BLL.Services.Interfaces;

public interface IUserService
{
    Task DeleteUserByIdAsync(int id);
    Task<IEnumerable<UserModel>> GetAllUsersAsync();
    Task<UserModel> GetUserByEmailAsync(string email);
    Task<UserModel> GetUserByIdAsync(int id);
    Task UpdateRoleByIdAsync(int id, string role);
}