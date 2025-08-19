using Microsoft.EntityFrameworkCore;
using StoreApp.DAL.Data;
using StoreApp.DAL.Entities;
using StoreApp.DAL.Repositories.Interfaces;

namespace StoreApp.DAL.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _appDbContext;

    public UserRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<IEnumerable<UserEntity>> GetAllUsersAsync()
    {
        return await _appDbContext.Users.ToListAsync();
    }

    public async Task<UserEntity?> GetUserByIdAsync(int id)
    {
        return await _appDbContext.Users.FindAsync(id);
    }

    public async Task<UserEntity?> GetUserByEmailAsync(string email)
    {
        return await _appDbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<UserEntity?> GetUserByRefreshTokenAsync(string refreshToken)
    {
        return await _appDbContext.Users.FirstOrDefaultAsync(u =>
            u.RefreshToken == refreshToken);
    }

    public async Task AddUserAsync(UserEntity user)
    {
        _appDbContext.Users.Add(user);
        await _appDbContext.SaveChangesAsync();
    }

    public async Task UpdateUserAsync(UserEntity user)
    {
        _appDbContext.Users.Update(user);
        await _appDbContext.SaveChangesAsync();
    }

    public async Task DeleteUserByIdAsync(int id)
    {
        var user = await GetUserByIdAsync(id);
        if (user is not null)
        {
            _appDbContext.Users.Remove(user);
            await _appDbContext.SaveChangesAsync();
        }
    }

    public async Task<bool> UserExistsAsync(int id)
    {
        return await _appDbContext.Users.AnyAsync(u => u.Id == id);
    }
}
