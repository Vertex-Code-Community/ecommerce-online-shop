using Microsoft.AspNetCore.Components;

namespace StoreApp.Wasm.Components.ComponentFiles.SvgFiles;

public partial class SvgDropdownArrowComponent
{
    [Parameter] public string? Width { get; set; } = "16";
    [Parameter] public string? Height { get; set; } = "16";
    [Parameter] public string? Color { get; set; } = "#000000";
}
