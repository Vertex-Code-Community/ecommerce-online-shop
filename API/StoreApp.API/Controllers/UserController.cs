using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.BLL.Services;

namespace StoreApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(IUserService userService) : ControllerBase
{
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        var users = await userService.GetAllUsersAsync();
        return Ok(users);
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(int id)
    {
        var user = await userService.GetUserByIdAsync(id);
        return Ok(user);
    }

    [Authorize]
    [HttpGet("by-email")]
    public async Task<IActionResult> GetByEmailAsync([FromQuery] string email)
    {
        var user = await userService.GetUserByEmailAsync(email);
        return Ok(user);
    }

    [Authorize]
    [HttpPut("{id}/role")]
    public async Task<IActionResult> UpdateRoleByIdAsync(int id, [FromQuery] string role)
    {
        await userService.UpdateRoleByIdAsync(id, role);
        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteByIdAsync(int id)
    {
        await userService.DeleteUserByIdAsync(id);
        return NoContent();
    }
}
