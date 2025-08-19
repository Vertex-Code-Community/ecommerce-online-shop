using Microsoft.AspNetCore.Components;
using StoreApp.Wasm.Models;

namespace StoreApp.Wasm.Components.Pages.Home.Components.PromotedProducts;

public partial class PromotedProductsComponent
{
    [Parameter] public List<ProductModel> ProductList { get; set; } = new ();
    [Parameter] public string HeaderText { get; set; } = string.Empty;
    [Parameter] public bool IsVisibleViewAllButton { get; set; } = true;
}
