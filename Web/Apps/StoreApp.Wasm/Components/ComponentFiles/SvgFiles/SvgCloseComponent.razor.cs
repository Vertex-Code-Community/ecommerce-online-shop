using Microsoft.AspNetCore.Components;

namespace StoreApp.Wasm.Components.ComponentFiles.SvgFiles;

public partial class SvgCloseComponent
{
    [Parameter] public string? Width { get; set; } = "14";
    [Parameter] public string? Height { get; set; } = "14";
    [Parameter] public string? Color { get; set; } = "#000000";
}
