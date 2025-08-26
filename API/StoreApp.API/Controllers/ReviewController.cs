using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.API.Extensions;
using StoreApp.BLL.Services.Interfaces;
using StoreApp.Models;

namespace StoreApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReviewController(IReviewService service) : ControllerBase
{
    [HttpGet("{productId:int}")]
    public async Task<IActionResult> GetByProductIdAsync(int productId)
    {
        var reviews = await service.GetReviewsByProductIdAsync(productId);
        return Ok(reviews);
    }
    
    [HttpGet("top-rating")]
    public async Task<IActionResult> GetTopRatingReviewsAsync([FromQuery] int count = 10)
    {
        var reviews = await service.GetTopRatingReviewsAsync(count);
        return Ok(reviews);
    }

    [HttpGet("{id:long}")]
    public async Task<IActionResult> GetByIdAsync(long id)
    {
        var review = await service.GetReviewByIdAsync(id);
        return Ok(review);
    }

    [Authorize]
    [HttpGet("{productId:int}/user")]
    public async Task<IActionResult> IsReviewedByUser(int productId)
    {
        var hasReviewed = await service.UserHasReviewedProductAsync(User.GetUserId(), productId);
        return Ok(hasReviewed);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] CreateReview dto)
    {
        await service.AddReviewAsync(dto, User.GetUserId());
        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id:long}")]
    public async Task<IActionResult> DeleteByIdAsync(long id)
    {
        await service.DeleteReviewAsync(id);
        return NoContent();
    }
}