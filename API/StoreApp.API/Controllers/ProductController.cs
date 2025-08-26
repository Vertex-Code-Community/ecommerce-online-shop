using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Models;
using StoreApp.BLL.Services.Interfaces;
using StoreApp.Shared.Enums;

namespace StoreApp.API.Controllers;

[ApiController]
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

    [Authorize(Roles = nameof(UserRole.Admin))]
    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] CreateProduct model)
    {
        await productService.AddProductAsync(model);
        return Ok(model);
    }

    [Authorize(Roles = nameof(UserRole.Admin))]
    [HttpPut]
    public async Task<IActionResult> UpdateByIdAsync([FromBody] UpdateProduct model)
    {
        await productService.UpdateProductByIdAsync(model);
        return NoContent();
    }

    [Authorize(Roles = nameof(UserRole.Admin))]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteByIdAsync(int id)
    {
        await productService.DeleteProductByIdAsync(id);
        return NoContent();
    }
}
