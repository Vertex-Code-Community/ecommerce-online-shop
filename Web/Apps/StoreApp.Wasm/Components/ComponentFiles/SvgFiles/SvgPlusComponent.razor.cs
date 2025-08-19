using Microsoft.AspNetCore.Components;

namespace StoreApp.Wasm.Components.ComponentFiles.SvgFiles;

public partial class SvgPlusComponent : ComponentBase
{
    [Parameter]
    public string? Width { get; set; } = "20";

    [Parameter]
    public string? Height { get; set; } = "20";
}