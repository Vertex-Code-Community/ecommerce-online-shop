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
}
