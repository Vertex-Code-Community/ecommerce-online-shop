using Microsoft.AspNetCore.Components;
using StoreApp.Wasm.Components.ComponentFiles.Breadcrumb;
using StoreApp.Wasm.Models;
using StoreApp.Wasm.Services;

namespace StoreApp.Wasm.Components.Pages.Category;

public partial class CategoryPage
{
    [Inject] public required IProductService ProductService { get; set; }

    private List<ProductModel> Casual = new();
    private bool _isLoading = true;

    private bool _isFiltersOpen = false;
    private decimal? _minPrice;
    private decimal? _maxPrice;
    private string? _search;

    private List<BreadcrumbComponent.BreadcrumbItem> _breadcrumbItems = new();

    protected override void OnInitialized()
    {
        _breadcrumbItems = new List<BreadcrumbComponent.BreadcrumbItem>
        {
            new() { Text = "Home", Url = "/" },
            new() { Text = "Casual", Url = "/category/" }
        };
    }

    private void ToggleFilters()
    {
        _isFiltersOpen = !_isFiltersOpen;
    }

    private void CloseFilters()
    {
        _isFiltersOpen = false;
    }

    protected override async Task OnInitializedAsync()
    {
        _isLoading = true;
        var products = await ProductService.GetAllProductsAsync();
        Casual = products;
        _isLoading = false;
    }

    private async Task OnPriceChanged((decimal? Min, decimal? Max) range)
    {
        _minPrice = range.Min;
        _maxPrice = range.Max;
        await FetchFilteredAsync();
    }

    private async Task OnSearchChanged(string? term)
    {
        _search = term;
        await FetchFilteredAsync();
    }

    private async Task FetchFilteredAsync()
    {
        _isLoading = true;
        Casual = await ProductService.GetAllProductsAsyncWithFiltersAsync(_minPrice, _maxPrice, _search);
        _isLoading = false;
    }
}
