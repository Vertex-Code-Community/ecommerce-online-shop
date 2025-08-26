using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.BLL.Services.Interfaces;
using StoreApp.Models;

namespace StoreApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthService authService) : ControllerBase
{
    [Authorize]
    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync([FromBody] CredentialsDto model)
    {
        await authService.RegisterUserAsync(model);
        return NoContent();
    }

    [Authorize]
    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync([FromBody] CredentialsDto dto)
    {
        var accessToken = await authService.LoginUserAsync(dto);
        return Ok(accessToken);
    }
}
