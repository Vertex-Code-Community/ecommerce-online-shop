using Microsoft.AspNetCore.Components;
using StoreApp.Wasm.Models;

namespace StoreApp.Wasm.Components.Pages.ProductDetail.Components;

public partial class ProductReview : ComponentBase
{
    [Parameter]
    public ReviewModel Review { get; set; }
}