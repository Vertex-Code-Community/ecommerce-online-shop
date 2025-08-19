using StoreApp.Models;

namespace StoreApp.BLL.Services;

public interface IUserService
{
    Task<bool> DeleteUserByIdAsync(int id);
    Task<IEnumerable<UserModel>> GetAllUsersAsync();
    Task<UserModel?> GetUserByEmailAsync(string email);
    Task<UserModel?> GetUserByIdAsync(int id);
    Task<bool> UpdateUserByIdAsync(int id, UserModel user);
    Task<bool> UpdateRoleByIdAsync(int id, string role);
}