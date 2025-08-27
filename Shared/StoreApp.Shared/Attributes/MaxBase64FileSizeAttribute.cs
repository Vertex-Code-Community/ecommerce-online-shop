using System.ComponentModel.DataAnnotations;

namespace StoreApp.Shared.Attributes;

public class MaxBase64FileSizeAttribute : ValidationAttribute
{
    private readonly long _maxBytes;

    public MaxBase64FileSizeAttribute(long maxBytes)
    {
        _maxBytes = maxBytes;
        ErrorMessage = $"File size cannot exceed {maxBytes / (1024 * 1024)} MB.";
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is not string base64)
        {
            return ValidationResult.Success;
        }

        var commaIndex = base64.IndexOf(',');
        if (commaIndex >= 0)
        {
            base64 = base64[(commaIndex + 1)..];
        }

        var byteCount = (long)(base64.Length * 3 / 4);
        
        return byteCount > _maxBytes ?
            new ValidationResult(ErrorMessage)
            : ValidationResult.Success;
    }
}