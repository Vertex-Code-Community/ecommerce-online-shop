namespace StoreApp.Models;

public record ErrorResponseDto(string Message, int StatusCode = 500);