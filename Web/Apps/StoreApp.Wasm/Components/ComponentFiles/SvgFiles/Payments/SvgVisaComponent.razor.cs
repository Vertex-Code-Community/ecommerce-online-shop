using Microsoft.AspNetCore.Components;

namespace StoreApp.Wasm.Components.ComponentFiles.SvgFiles.Payments;

public partial class SvgVisaComponent
{
    [Parameter] public string? Width { get; set; } = "34";
    [Parameter] public string? Height { get; set; } = "12";
}
