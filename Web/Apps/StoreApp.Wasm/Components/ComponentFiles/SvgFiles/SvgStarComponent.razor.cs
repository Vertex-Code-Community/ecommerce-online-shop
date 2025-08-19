using Microsoft.AspNetCore.Components;

namespace StoreApp.Wasm.Components.ComponentFiles.SvgFiles;

public partial class SvgStarComponent
{
    [Parameter] public string? Width { get; set; } = "48";
    [Parameter] public string? Height {  get; set; } = "48";
}
