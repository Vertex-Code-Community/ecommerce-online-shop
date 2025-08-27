using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.BLL.Services.Interfaces;
using StoreApp.Shared.Enums;

namespace StoreApp.API.Controllers;

[ApiController]
[Authorize(Roles = nameof(UserRole.Admin))]
[Route("api/[controller]")]
public class UserController(IUserService userService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        var users = await userService.GetAllUsersAsync();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(string id)
    {
        var user = await userService.GetUserByIdAsync(id);
        return Ok(user);
    }

    [HttpGet("by-email")]
    public async Task<IActionResult> GetByEmailAsync([FromQuery] string email)
    {
        var user = await userService.GetUserByEmailAsync(email);
        return Ok(user);
    }

    [HttpPut("{id}/role")]
    public async Task<IActionResult> UpdateRoleByIdAsync(string id, [FromQuery] string role)
    {
        await userService.UpdateRoleByIdAsync(id, role);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteByIdAsync(string id)
    {
        await userService.DeleteUserByIdAsync(id);
        return NoContent();
    }
}
