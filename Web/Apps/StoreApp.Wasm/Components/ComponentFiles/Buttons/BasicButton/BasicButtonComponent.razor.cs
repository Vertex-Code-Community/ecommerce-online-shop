using Microsoft.AspNetCore.Components;

namespace StoreApp.Wasm.Components.ComponentFiles.Buttons.BasicButton;

public partial class BasicButtonComponent
{
    [Parameter] public string? Width { get; set; } = "100%";
    [Parameter] public string? Height { get; set; } = "100%";
    [Parameter] public string? Text { get; set; }
    [Parameter] public string FontSize { get; set; } = "16px";
    [Parameter] public bool IsRevert { get; set; }
    [Parameter] public string? BackgroundColor { get; set; }
    [Parameter] public bool Disabled { get; set; }
    [Parameter] public EventCallback OnClick { get; set; }

    protected override void OnInitialized() { }

    private string GetButtonStyle()
    {
        return $"width: {Width}; height: {Height}; background-color: {BackgroundColor};";
    }
}
