using Microsoft.AspNetCore.Components;

namespace StoreApp.Wasm.Components.ComponentFiles.SvgFiles;

public partial class SvgShoppingCartComponent
{
    [Parameter] public string? Width { get; set; } = "23";
    [Parameter] public string? Height { get; set; } = "22";
}
