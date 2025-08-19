using Microsoft.AspNetCore.Components;
using StoreApp.Wasm.Models;

namespace StoreApp.Wasm.Components.Pages.Category.Components.ProductList;

public partial class ProductListComponent
{
    [Parameter] public List<ProductModel> ProductList { get; set; } = new();
    [Parameter] public string HeaderText { get; set; } = string.Empty;
    [Parameter] public bool IsVisibleViewAllButton { get; set; } = true;
    [Parameter] public EventCallback OnToggleFilters { get; set; }
}
