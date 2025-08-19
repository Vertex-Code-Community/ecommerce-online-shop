using Microsoft.AspNetCore.Components;

namespace StoreApp.Wasm.Components.ComponentFiles.SvgFiles;

public partial class SvgArrowComponent
{
    [Parameter] public string? Width { get; set; } = "20";
    [Parameter] public string? Height { get; set; } = "16";
    [Parameter] public bool RevertIcon { get; set; }
}
