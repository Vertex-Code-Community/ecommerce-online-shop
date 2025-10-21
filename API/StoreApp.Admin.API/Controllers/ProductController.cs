using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.BLL.Services.Interfaces;
using StoreApp.Models;
using StoreApp.Shared.Enums;

namespace StoreApp.Admin.API.Controllers;

[ApiController]
[Authorize(Roles = nameof(UserRole.Admin))]
[Route("api/admin/[controller]")]
public class ProductController(IProductService productService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] CreateProduct model)
    {
        await productService.AddProductAsync(model);
        return Ok(model);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateByIdAsync([FromBody] UpdateProduct model)
    {
        await productService.UpdateProductByIdAsync(model);
        return NoContent();
    }
    
    [HttpPost("image")]
    public async Task<IActionResult> UploadImageAsync([FromBody] UploadProductImage model)
    {
        await productService.UploadProductImageAsync(model);
        return NoContent();
    }
    
    [HttpDelete("image")]
    public async Task<IActionResult> DeleteImageAsync([FromBody] DeleteProductImage model)
    {
        await productService.DeleteProductImageAsync(model);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteByIdAsync(int id)
    {
        await productService.DeleteProductByIdAsync(id);
        return NoContent();
    }
}
