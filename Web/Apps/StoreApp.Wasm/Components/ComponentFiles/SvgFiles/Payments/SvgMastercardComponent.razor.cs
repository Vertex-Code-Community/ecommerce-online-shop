using Microsoft.AspNetCore.Components;

namespace StoreApp.Wasm.Components.ComponentFiles.SvgFiles.Payments;

public partial class SvgMastercardComponent
{
    [Parameter] public string? Width { get; set; } = "26";
    [Parameter] public string? Height { get; set; } = "16";
}
