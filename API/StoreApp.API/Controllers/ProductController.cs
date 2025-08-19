using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Models;
using StoreApp.BLL.Interfaces.Services;

namespace StoreApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAsync([FromQuery] decimal? minPrice, [FromQuery] decimal? maxPrice, [FromQuery] string? search)
    {
        return Ok(await _productService.GetFilteredProductsAsync(minPrice, maxPrice, search));
    }

    [HttpGet("new-arrivals")]
    public async Task<IActionResult> GetNewArrivalsAsync([FromQuery] int take = 8)
    {
        var result = await _productService.GetNewArrivalsAsync(take);
        return Ok(result);
    }

    [HttpGet("top-selling")]
    public async Task<IActionResult> GetTopSellingAsync([FromQuery] int take = 8)
    {
        var result = await _productService.GetTopSellingAsync(take);
        return Ok(result);
    }

    [HttpGet("recommendations/{id}")]
    public async Task<IActionResult> GetRecommendationsAsync(int id, [FromQuery] int take = 8)
    {
        var result = await _productService.GetRecommendationsAsync(id, take);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(int id)
    {
        var product = await _productService.GetProductByIdAsync(id);
        return product is not null 
            ? Ok(product) 
            : BadRequest();
    }

    //[Authorize] TODO: set authorize in future
    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] ProductModel model)
    {
        return(await _productService.AddProductAsync(model))
            ? Ok()
            : BadRequest();
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateByIdAsync(int id, [FromBody] ProductModel model)
    {
        return(await _productService.UpdateProductByIdAsync(id, model))
            ? Ok()
            : BadRequest();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteByIdAsync(int id)
    {
        return(await _productService.DeleteProductByIdAsync(id))
            ? NoContent()
            : BadRequest();
    }
}
