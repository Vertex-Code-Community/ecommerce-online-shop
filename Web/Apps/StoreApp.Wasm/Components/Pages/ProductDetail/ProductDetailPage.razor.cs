using Microsoft.AspNetCore.Components;
using StoreApp.Wasm.Models;
using StoreApp.Wasm.Services;
using StoreApp.Wasm.Components.ComponentFiles.Breadcrumb;
using StoreApp.Wasm.Components.Pages.ProductDetail.Components;

namespace StoreApp.Wasm.Components.Pages.ProductDetail;

public partial class ProductDetailPage()
{
    [Inject] public required IProductService ProductService { get; set; }
    [Inject] public required IReviewService ReviewService { get; set; }
    [Inject] public required ICartService CartService { get; set; }
    [Inject] public required NavigationManager NavigationManager { get; set; }

    [Parameter] public int Id { get; set; }
    
    private ProductModel? _product;
    private List<ProductModel>? _alsoLike;
    private List<ReviewModel>? _reviews;
    private bool _isLoading;

    private List<BreadcrumbComponent.BreadcrumbItem> _breadcrumbItems = new();
    
    protected override async Task OnParametersSetAsync()
    {
        _isLoading = true;

        var productModel = await ProductService.GetProductByIdAsync(Id);

        if (productModel is null)
        {
            NavigationManager.NavigateTo("/home");
            return;
        }

        _product = productModel;
        _breadcrumbItems = new List<BreadcrumbComponent.BreadcrumbItem>
        {
            new() { Text = "Home", Url = "/" },
            new() { Text = "Casual", Url = "/category/" },
            new() { Text = _product.Title, Url = $"/products/{_product.Id}" }
        };
        
        _alsoLike = await ProductService.GetRecommendationsAsync(Id, 4);
        _reviews = await ReviewService.GetProductReviewsAsync(Id);

        _isLoading = false;
    }

    private async Task OnAddToCartClicked(ProductSelection selection)
    {
        if (selection.Quantity <= 0)
        {
            return;
        }

        var cartItems = await CartService.GetCartItemsAsync();
        var existingItem = cartItems.FirstOrDefault(item => item.ProductModel.Id == selection.ProductId);
        var currentInCart = existingItem?.Quantity ?? 0;
        var availableStock = _product!.UnitsInStock;

        if (currentInCart + selection.Quantity > availableStock)
        {
            return;
        }

        var orderItem = new OrderItemModel
        {
            ProductModel = _product,
            Quantity = selection.Quantity,
            SelectedColor = selection.SelectedColor,
            SelectedSize = selection.SelectedSize
        };

        await CartService.AddToCartAsync(orderItem);
    }

    private async Task OnWriteReviewClicked(ReviewModel review)
    {
        await ReviewService.AddProductReviewAsync(Id, review);
        _reviews = await ReviewService.GetProductReviewsAsync(Id);
    }
}
