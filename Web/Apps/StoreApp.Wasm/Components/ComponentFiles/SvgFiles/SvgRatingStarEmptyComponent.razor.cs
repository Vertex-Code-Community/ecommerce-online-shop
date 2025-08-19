using Microsoft.AspNetCore.Components;

namespace StoreApp.Wasm.Components.ComponentFiles.SvgFiles;

public partial class SvgRatingStarEmptyComponent
{
    [Parameter] public string? Width { get; set; } = "19";
    [Parameter] public string? Height { get; set; } = "17";
}
