using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Models;
using StoreApp.BLL.Services.Interfaces;
using StoreApp.Shared.Enums;

namespace StoreApp.API.Controllers;

[ApiController]
[Authorize(Roles = nameof(UserRole.Admin))]
[Route("api/[controller]")]
public class ProductController(IProductService productService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllAsync([FromQuery] ProductFilter filter)
    {
        var products = await productService.GetFilteredProductsAsync(filter);
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(int id)
    {
        var product = await productService.GetProductByIdAsync(id);
        return Ok(product);
    }

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
