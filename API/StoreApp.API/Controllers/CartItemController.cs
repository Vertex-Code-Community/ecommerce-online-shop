using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Shared.Interfaces.Services;
using System.Security.Claims;

namespace StoreApp.API.Controllers;

// [Authorize] todo: uncomment when authentication is implemented
[ApiController]
[Route("api/[controller]")]
public class CartItemsController(ICartItemService cartItemService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetByUserIdAsync()
    {
        return Ok(await cartItemService.GetCartItemsByUserIdAsync(GetUserId()));
    }

    [HttpPost]
    public async Task<IActionResult> AddToCartAsync([FromQuery] int productId, [FromQuery] int quantity)
    {
        return await cartItemService.AddToCartAsync(GetUserId(), productId, quantity)
            ? Ok()
            : BadRequest();
    }

    [HttpPut]
    public async Task<IActionResult> UpdateQuantityAsync([FromQuery] int productId, [FromQuery] int quantity)
    {
        return await cartItemService.UpdateCartItemAsync(GetUserId(), productId, quantity)
            ? Ok() 
            : BadRequest();
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteItemAsync([FromQuery] int productId)
    {
        return await cartItemService.DeleteCartItemAsync(GetUserId(), productId)
            ? NoContent()
            : BadRequest();
    }

    [HttpDelete("clear")]
    public async Task<IActionResult> ClearCartAsync()
    {
        return await cartItemService.ClearCartItemsByUserIdAsync(GetUserId())
            ? NoContent()
            : BadRequest();
    }

    private int GetUserId()
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
        {
            // throw new UnauthorizedAccessException("User ID not found in claims.");
            userId = 1; // todo: uncomment when authentication is implemented
        }

        return userId;
    }
}
