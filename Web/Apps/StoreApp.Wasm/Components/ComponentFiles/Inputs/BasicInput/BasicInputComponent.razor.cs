using Microsoft.AspNetCore.Components;

namespace StoreApp.Wasm.Components.ComponentFiles.Inputs.BasicInput;

public partial class BasicInputComponent
{
    [Parameter] public string? Width { get; set; } = "100%";
    [Parameter] public string? Height { get; set; } = "100%";
    [Parameter] public string? Placeholder { get; set; }
    [Parameter] public string FontSize { get; set; } = "16px";
    [Parameter] public string? BackgroundColor { get; set; } = "#FFFFFF";
    [Parameter] public RenderFragment? Icon { get; set; }
    [Parameter] public RenderFragment? ChildContent { get; set; }
    [Parameter] public string IconOpacity { get; set; } = "1.0";
    [Parameter] public string? Value { get; set; }
    [Parameter] public EventCallback<string?> ValueChanged { get; set; }
    [Parameter] public string Type { get; set; } = "text";
    [Parameter(CaptureUnmatchedValues = true)] public Dictionary<string, object>? AdditionalAttributes { get; set; }


    private string GetWrapperStyle()
    {
        return $"width: {Width}; height: {Height}; background-color: {BackgroundColor};";
    }

    private string GetInputStyle()
    {
        return $"font-size: {FontSize};";
    }

    private async Task HandleInput(ChangeEventArgs e)
    {
        var newValue = e.Value?.ToString();
        if (!EqualityComparer<string?>.Default.Equals(newValue, Value))
        {
            Value = newValue;
            if (ValueChanged.HasDelegate)
            {
                await ValueChanged.InvokeAsync(Value);
            }
        }
    }
}
