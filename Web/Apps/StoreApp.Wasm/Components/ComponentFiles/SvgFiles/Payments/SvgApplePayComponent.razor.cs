using Microsoft.AspNetCore.Components;

namespace StoreApp.Wasm.Components.ComponentFiles.SvgFiles.Payments;

public partial class SvgApplePayComponent
{
    [Parameter] public string? Width { get; set; } = "28";
    [Parameter] public string? Height { get; set; } = "12";
}
