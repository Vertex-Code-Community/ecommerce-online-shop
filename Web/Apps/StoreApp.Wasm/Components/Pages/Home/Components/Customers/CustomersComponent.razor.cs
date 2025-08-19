using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace StoreApp.Wasm.Components.Pages.Home.Components.Customers;

public partial class CustomersComponent
{
    [Inject] public required IJSRuntime JSRuntime { get; set; }
    private ElementReference reviewsWrapperRef;

    private async Task ScrollLeft()
    {
        await JSRuntime.InvokeVoidAsync("scrollReviews", reviewsWrapperRef, -425);
    }

    private async Task ScrollRight()
    {
        await JSRuntime.InvokeVoidAsync("scrollReviews", reviewsWrapperRef, 425);
    }
}
