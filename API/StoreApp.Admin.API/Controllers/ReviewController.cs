using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.BLL.Services.Interfaces;
using StoreApp.Shared.Enums;

namespace StoreApp.Admin.API.Controllers;

[ApiController]
[Authorize(Roles = nameof(UserRole.Admin))]
[Route("api/admin/[controller]")]
public class ReviewController(IReviewService service) : ControllerBase
{
    [HttpDelete("{id:long}")]
    public async Task<IActionResult> DeleteByIdAsync(long id)
    {
        await service.DeleteReviewAsync(id);
        return NoContent();
    }
}