using Microsoft.AspNetCore.Components;
using StoreApp.Wasm.Models;

namespace StoreApp.Wasm.Components.Pages.ProductDetail.Components;

public partial class ProductInfo : ComponentBase
{
    [Parameter]
    public ProductModel Product { get; set; }
    
    public int SelectedColorIndex { get; set; } = 0;

    public int SelectedSizeIndex { get; set; } = 0;

    [Parameter]
    public EventCallback<ProductSelection> OnAddToCartClicked { get; set; }

    private int quantity = 1;

    private void OnAddToCart()
    {
        if (OnAddToCartClicked.HasDelegate)
        {
            var selection = new ProductSelection
            {
                ProductId = Product.Id,
                Quantity = quantity,
                SelectedColor = Product.AvailableColors.Any() ? Product.AvailableColors[SelectedColorIndex] : null,
                SelectedSize = Product.AvailableSizes.Any() ? Product.AvailableSizes[SelectedSizeIndex] : null
            };
            
            OnAddToCartClicked.InvokeAsync(selection);
        }
    }

    private int GetMaxQuantity()
    {
        // If we have variants, calculate max quantity based on selected color and size
        if (Product.AvailableColors.Any() && Product.AvailableSizes.Any())
        {
            // For now, return the general stock
            return Product.UnitsInStock;
        }
        
        return Product.UnitsInStock;
    }
}

public class ProductSelection
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public ColorModel? SelectedColor { get; set; }
    public SizeModel? SelectedSize { get; set; }
}