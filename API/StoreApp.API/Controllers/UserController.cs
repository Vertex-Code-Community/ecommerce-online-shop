using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.BLL.Services;

namespace StoreApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        return Ok(await _userService.GetAllUsersAsync());
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        return user is not null
            ? Ok(user)
            : NotFound(); 
    }

    [Authorize]
    [HttpGet("by-email")]
    public async Task<IActionResult> GetByEmailAsync([FromQuery] string email)
    {
        var user = await _userService.GetUserByEmailAsync(email);
        return user is not null
            ? Ok(user)
            : NotFound();
    }

    [Authorize]
    [HttpPut("{id}/role")]
    public async Task<IActionResult> UpdateRoleByIdAsync(int id, [FromQuery] string role)
    {
        return (await _userService.UpdateRoleByIdAsync(id, role))
            ? Ok()
            : BadRequest();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteByIdAsync(int id)
    {
        return (await _userService.DeleteUserByIdAsync(id))
            ? NoContent()
            : BadRequest();
    }
}
