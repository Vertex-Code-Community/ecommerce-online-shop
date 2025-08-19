using Microsoft.AspNetCore.Components;

namespace StoreApp.Wasm.Components.ComponentFiles.SvgFiles;

public partial class SvgDotsComponent : ComponentBase
{
    [Parameter]
    public string? Width { get; set; } = "22";

    [Parameter]
    public string? Height { get; set; } = "6";
}