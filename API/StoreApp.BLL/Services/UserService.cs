using AutoMapper;
using StoreApp.DAL.Repositories.Interfaces;
using StoreApp.Shared.Enums;
using StoreApp.BLL.Interfaces.Security;
using StoreApp.Models;

namespace StoreApp.BLL.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IMapper _mapper;

    public UserService(
        IUserRepository userRepository,
        IPasswordHasher passwordHasher,
        IMapper mapper)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _mapper = mapper;
    }

    public async Task<IEnumerable<UserModel>> GetAllUsersAsync()
    {
        var userEntities = await _userRepository.GetAllUsersAsync();

        return _mapper.Map<IEnumerable<UserModel>>(userEntities);
    }

    public async Task<UserModel?> GetUserByIdAsync(int id)
    {
        var userEntity = await _userRepository.GetUserByIdAsync(id);
        if (userEntity != null)
        {
            return _mapper.Map<UserModel>(userEntity);
        }

        return null;
    }

    public async Task<UserModel?> GetUserByEmailAsync(string email)
    {
        var userEntity = await _userRepository.GetUserByEmailAsync(email);
        if (userEntity != null)
        {
            return _mapper.Map<UserModel>(userEntity);
        }

        return null;
    }

    public async Task<bool> UpdateUserByIdAsync(int id, UserModel user)
    {
        if (!await _userRepository.UserExistsAsync(id))
        {
            return false;
        }

        var existingUser = await _userRepository.GetUserByEmailAsync(user.Email);
        if (existingUser != null && existingUser.Id != id)
        {
            return false;
        }

        if (existingUser == null)
        {
            return false;
        }

        existingUser.Email = user.Email;
        existingUser.PasswordHash = _passwordHasher.Hash(user.Password);

        await _userRepository.UpdateUserAsync(existingUser);

        return true;
    }

    public async Task<bool> UpdateRoleByIdAsync(int id, string role)
    {
        var existingUser = await _userRepository.GetUserByIdAsync(id);
        if (existingUser == null)
        {
            return false;
        }

        if (Enum.TryParse(role, out UserRole newRole))
        {
            existingUser.Role = newRole;
            await _userRepository.UpdateUserAsync(existingUser);
            
            return true;
        }
        else
        {
            return false;
        }
    }

    public async Task<bool> DeleteUserByIdAsync(int id)
    {
        if (!await _userRepository.UserExistsAsync(id))
        {
            return false;
        }

        await _userRepository.DeleteUserByIdAsync(id);

        return true;
    }
}
