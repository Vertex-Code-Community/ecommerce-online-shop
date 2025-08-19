using Microsoft.AspNetCore.Components;

namespace StoreApp.Wasm.Components.ComponentFiles.SvgFiles;

public partial class SvgCheckMarkComponent : ComponentBase
{
    [Parameter]
    public string? Width { get; set; } = "16";

    [Parameter]
    public string? Height { get; set; } = "16";
}