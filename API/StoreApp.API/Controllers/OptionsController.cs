using Microsoft.AspNetCore.Mvc;
using StoreApp.BLL.Services.Interfaces;

namespace StoreApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OptionsController(IOptionsService service) : ControllerBase
{
    [HttpGet("colors")]
    public async Task<IActionResult> GetColors()
    {
        var colors = await service.GetColors();
        return Ok(colors);
    }

    [HttpGet("sizes")]
    public async Task<IActionResult> GetSizes()
    {
        var sizes = await service.GetSizes();
        return Ok(sizes);
    }
}