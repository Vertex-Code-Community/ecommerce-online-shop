using StoreApp.DAL.Entities;

namespace StoreApp.DAL.Repositories.Interfaces;

public interface IUserRepository
{
    Task<IEnumerable<UserEntity>> GetAllUsersAsync();
    Task<UserEntity?> GetUserByIdAsync(int id);
    Task<UserEntity?> GetUserByEmailAsync(string email);
    Task<UserEntity?> GetUserByRefreshTokenAsync(string refreshToken);
    Task AddUserAsync(UserEntity user);
    Task UpdateUserAsync(UserEntity user);
    Task DeleteUserByIdAsync(int id);
    Task<bool> UserExistsAsync(int id);
}