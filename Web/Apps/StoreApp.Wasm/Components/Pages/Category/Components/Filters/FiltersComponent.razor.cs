using Microsoft.AspNetCore.Components;

namespace StoreApp.Wasm.Components.Pages.Category.Components.Filters;

public partial class FiltersComponent
{
    [Parameter] public bool IsMobileOverlay { get; set; } = false;
    [Parameter] public EventCallback OnClose { get; set; }
    [Parameter] public EventCallback<(decimal? Min, decimal? Max)> OnPriceChanged { get; set; }
    [Parameter] public EventCallback<string?> OnSearchChanged { get; set; }

    private decimal? minValue = 0;
    private decimal? maxValue = 500;
    private string? searchTerm;

    private async Task ApplyPriceFilters()
    {
        await OnPriceChanged.InvokeAsync((minValue, maxValue));
    }

    private async Task OnSearchInput(ChangeEventArgs e)
    {
        searchTerm = e.Value?.ToString();
        await OnSearchChanged.InvokeAsync(searchTerm);
    }
}
