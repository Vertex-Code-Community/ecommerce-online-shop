using StoreApp.Models;
using System.Text.Json;

namespace StoreApp.API.Middleware;

public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An unhandled exception occurred while processing the request.");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var errorResponse = GenerateErrorResponse(exception);

        context.Response.StatusCode = errorResponse.StatusCode;
        context.Response.ContentType = "application/json";

        return context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
    }

    private static ErrorResponseDto GenerateErrorResponse(Exception exception)
    {
        return exception switch
        {
            UnauthorizedAccessException uaEx => new ErrorResponseDto(uaEx.Message, StatusCodes.Status401Unauthorized),
            KeyNotFoundException knfEx => new ErrorResponseDto(knfEx.Message, StatusCodes.Status404NotFound),
            _ => new ErrorResponseDto("An unexpected error occurred. Please try again later.")
        };
    }
}
