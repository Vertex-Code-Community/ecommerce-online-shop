using Microsoft.AspNetCore.Components;
using StoreApp.Wasm.Models;
using StoreApp.Wasm.Services;
using StoreApp.Wasm.Components.ComponentFiles.Breadcrumb;

namespace StoreApp.Wasm.Components.Pages.Cart;

public partial class CartPage : ComponentBase
{
    [Inject] public required ICartService CartService { get; set; }
    [Inject] public required NavigationManager NavigationManager { get; set; }

    private readonly List<OrderItemModel> _items = [];
    private bool _isLoading = true;

    private decimal _subtotal;
    private decimal _deliveryFee = 15m;
    private decimal _discountAmount;
    private decimal _total;

    private string _promoCode = string.Empty;
    private bool _promoApplied;

    private List<BreadcrumbComponent.BreadcrumbItem> _breadcrumbItems = new();

    protected override async Task OnInitializedAsync()
    {
        _breadcrumbItems = new List<BreadcrumbComponent.BreadcrumbItem>
        {
            new() { Text = "Home", Url = "/" },
            new() { Text = "Cart", Url = "/cart" }
        };

        await LoadAsync();
    }

    private async Task LoadAsync()
    {
        _isLoading = true;
        _items.Clear();
        _items.AddRange(await CartService.GetCartItemsAsync());

        await RecalculateAsync();
        _isLoading = false;
    }

    private async Task RecalculateAsync()
    {
        _subtotal = await CartService.GetTotalPriceAsync();
        _discountAmount = _promoApplied ? Math.Round(_subtotal * 0.20m, 2) : 0m;
        _total = Math.Max(0, _subtotal - _discountAmount) + (_items.Count > 0 ? _deliveryFee : 0);
        StateHasChanged();
    }

    private async Task RemoveItem(OrderItemModel item)
    {
        await CartService.RemoveFromCartAsync(item.ProductModel.Id);
        await LoadAsync();
    }

    private async Task Increase(OrderItemModel item)
    {
        var newQty = item.Quantity + 1;
        
        if (newQty > item.ProductModel.UnitsInStock)
        {
            return;
        }

        await CartService.ChangeCartItemQuantityAsync(item.ProductModel.Id, newQty);
        item.Quantity = newQty;
        await RecalculateAsync();
    }

    private async Task Decrease(OrderItemModel item)
    {
        var newQty = Math.Max(1, item.Quantity - 1);
        await CartService.ChangeCartItemQuantityAsync(item.ProductModel.Id, newQty);
        item.Quantity = newQty;
        await RecalculateAsync();
    }

    private async Task ApplyPromoCode()
    {
        _promoApplied = !string.IsNullOrWhiteSpace(_promoCode);
        await RecalculateAsync();
    }

    private void GoToCheckout()
    {
        NavigationManager.NavigateTo("/checkout", forceLoad: false);
    }
}


