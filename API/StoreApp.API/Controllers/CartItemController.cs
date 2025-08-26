using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Models;
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
        var cartItems = await cartItemService.GetCartItemsByUserIdAsync(GetUserId());
        return Ok(cartItems);
    }

    [HttpPost]
    public async Task<IActionResult> AddToCartAsync([FromBody] UpdateCartItem dto)
    {
        await cartItemService.AddToCartAsync(GetUserId(), dto);
        return NoContent();
    }

    [HttpPut]
    public async Task<IActionResult> UpdateQuantityAsync([FromBody] UpdateCartItem dto)
    {
        await cartItemService.UpdateCartItemAsync(GetUserId(), dto);
        return NoContent();
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteItemAsync([FromQuery] int productId)
    {
        await cartItemService.DeleteCartItemAsync(GetUserId(), productId);
        return NoContent();
    }

    [HttpDelete("clear")]
    public async Task<IActionResult> ClearCartAsync()
    {
        await cartItemService.ClearCartItemsByUserIdAsync(GetUserId());
        return NoContent();
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
