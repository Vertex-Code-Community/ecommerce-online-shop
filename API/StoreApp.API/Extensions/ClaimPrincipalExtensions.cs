using System.Security.Claims;

namespace StoreApp.API.Extensions;

public static class ClaimPrincipalExtensions
{
    public static string GetUserId(this ClaimsPrincipal user)
    {
        var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || string.IsNullOrEmpty(userIdClaim.Value))
        {
            throw new UnauthorizedAccessException("User ID claim is missing.");
        }

        return userIdClaim.Value;
    }
}