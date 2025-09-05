using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.API.Extensions;
using StoreApp.BLL.Services.Interfaces;
using StoreApp.Models;

namespace StoreApp.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CartItemsController(ICartItemService cartItemService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetByUserIdAsync()
    {
        var id = User.GetUserId();
        var cartItems = await cartItemService.GetCartItemsByUserIdAsync(id);
        return Ok(cartItems);
    }

    [HttpPost]
    public async Task<IActionResult> AddToCartAsync([FromBody] UpdateCartItem dto)
    {
        var id = User.GetUserId();
        await cartItemService.AddToCartAsync(id, dto);
        return NoContent();
    }

    [HttpPut]
    public async Task<IActionResult> UpdateQuantityAsync([FromBody] UpdateCartItem dto)
    {
        var id = User.GetUserId();
        await cartItemService.UpdateCartItemAsync(id, dto);
        return NoContent();
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteItemAsync([FromQuery] int productDetailId)
    {
        var id = User.GetUserId();
        await cartItemService.DeleteCartItemAsync(id, productDetailId);
        return NoContent();
    }

    [HttpDelete("clear")]
    public async Task<IActionResult> ClearCartAsync()
    {
        var id = User.GetUserId();
        await cartItemService.ClearCartItemsByUserIdAsync(id);
        return NoContent();
    }
}
