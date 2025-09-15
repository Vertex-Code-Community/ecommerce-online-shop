using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.API.Extensions;
using StoreApp.BLL.Services.Interfaces;
using StoreApp.Models;

namespace StoreApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel model)
    {
        await authService.RegisterUserAsync(model);
        return NoContent();
    }

    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync([FromBody] CredentialsDto dto)
    {
        var tokens = await authService.LoginUserAsync(dto);
        return Ok(tokens);
    }
    
    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> LogoutAsync()
    {
        var userId = User.GetUserId();
        
        await authService.LogoutUserAsync(userId);
        return NoContent();
    }
    
    [HttpPost("refresh-tokens")]
    public async Task<IActionResult> RefreshTokensAsync([FromBody] TokenModel model)
    {
        var tokens = await authService.RefreshTokenAsync(model);
        return Ok(tokens);
    }
}
