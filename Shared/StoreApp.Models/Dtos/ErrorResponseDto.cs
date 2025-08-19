namespace StoreApp.Models.Dtos;

public record ErrorResponseDto(string Message, int StatusCode = 500);