using AutoMapper;
using StoreApp.DAL.Entities;
using StoreApp.DAL.Repositories.Interfaces;
using StoreApp.Models.Dtos;
using StoreApp.BLL.Interfaces.Security;
using StoreApp.Models;
using StoreApp.BLL.Interfaces.Services;

namespace StoreApp.BLL.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtProvider _jwtProvider;
    private readonly IMapper _mapper;

    public AuthService(
        IUserRepository userRepository,
        IPasswordHasher passwordHasher,
        IJwtProvider jwtProvider,
        IMapper mapper)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtProvider = jwtProvider;
        _mapper = mapper;
    }

    public async Task<bool> RegisterUserAsync(UserModel user)
    {
        var existingUser = await _userRepository.GetUserByEmailAsync(user.Email);
        if (existingUser is not null) return false;

        var userEntity = _mapper.Map<UserEntity>(user);

        var passwordHash = _passwordHasher.Hash(user.Password);
        userEntity.PasswordHash = passwordHash;

        await _userRepository.AddUserAsync(userEntity);

        return true;
    }

    public async Task<(string?, string?)> LoginUserAsync(UserModel user)
    {
        var existingUser = await _userRepository.GetUserByEmailAsync(user.Email);
        if (existingUser is null) return (null, null);

        if (!_passwordHasher.Verify(user.Password, existingUser.PasswordHash)) 
            return (null, null);

        return await GenerateAndSaveTokensAsync(existingUser);  // access, refresh
    }

    public async Task<(string?, string?)> RefreshTokenAsync(string refreshToken)
    {
        var user = await _userRepository.GetUserByRefreshTokenAsync(refreshToken);

        var isValid = user is not null &&
                  user.RefreshTokenExpiryTime is not null &&
                  user.RefreshTokenExpiryTime > DateTime.UtcNow;

        if (!isValid) return (null, null);

        return await GenerateAndSaveTokensAsync(user!);          // access, refresh
    }

    private async Task<(string, string)> GenerateAndSaveTokensAsync(UserEntity user)
    {
        var userTokenDto = _mapper.Map<UserTokenDto>(user);
        var accessToken = _jwtProvider.GenerateToken(userTokenDto);
        var refreshToken = _jwtProvider.GenerateRefreshToken();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        await _userRepository.UpdateUserAsync(user);

        return (accessToken, refreshToken);
    }
}
