using Microsoft.AspNetCore.Components;

namespace StoreApp.Wasm.Components.ComponentFiles.SvgFiles;

public partial class SvgRatingStarTrimmedComponent
{
    [Parameter] public string? Width { get; set; } = "9";
    [Parameter] public string? Height { get; set; } = "17";
}
