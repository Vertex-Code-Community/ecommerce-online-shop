using Microsoft.AspNetCore.Components;
using StoreApp.Wasm.Services;

namespace StoreApp.Wasm.Components.ComponentFiles.Header;

public partial class HeaderComponent(ICartService cartService) : ComponentBase
{
    [Inject] public required NavigationManager NavigationManager { get; set; }
    
    private int cartItemCount;

    protected override async Task OnInitializedAsync()
    {
        cartItemCount = await cartService.GetCartItemCountAsync();
        cartService.OnCartItemCountChanged += OnCartItemCountChanged;
    }

    private void OnCartItemCountChanged(int count)
    {
        cartItemCount = count;
        StateHasChanged();
    }

    private void OnCartClick()
    {
        NavigationManager.NavigateTo("/cart");
    }

    private void NavigateToAddProduct()
    {
        NavigationManager.NavigateTo("/add-product");
    }
}
