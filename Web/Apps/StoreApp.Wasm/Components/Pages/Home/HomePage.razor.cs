using Microsoft.AspNetCore.Components;
using StoreApp.Wasm.Models;
using StoreApp.Wasm.Services;

namespace StoreApp.Wasm.Components.Pages.Home;

public partial class HomePage
{
    [Inject] public required IProductService ProductService { get; set; }

    private List<ProductModel> NewArrivals = new();
    private List<ProductModel> TopSelling = new();

    protected override async Task OnInitializedAsync()
    {
        NewArrivals = await ProductService.GetNewArrivalsAsync(4);
        TopSelling = await ProductService.GetTopSellingAsync(4);
    }
}
