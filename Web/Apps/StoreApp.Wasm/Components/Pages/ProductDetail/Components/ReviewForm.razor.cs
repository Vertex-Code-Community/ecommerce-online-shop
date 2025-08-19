using Microsoft.AspNetCore.Components;
using StoreApp.Wasm.Models;

namespace StoreApp.Wasm.Components.Pages.ProductDetail.Components;

public partial class ReviewForm : ComponentBase
{
    [Parameter]
    public EventCallback<ReviewModel> OnSubmit { get; set; }
    
    [Parameter]
    public EventCallback OnClose { get; set; }

    private ReviewModel review = new();
    private int HoveredRating = 0;

    private string GetStarClass(int i)
    {
        if (HoveredRating >= i)
            return "hovered";
        if (HoveredRating == 0 && review.Rating >= i)
            return "selected";
        return "";
    }

    private void ResetHover()
    {
        HoveredRating = 0;
    }

    private async Task SubmitReview()
    {
        if (review.Rating is < 1 or > 5)
            return;

        if (string.IsNullOrWhiteSpace(review.Comment))
            return;

        await OnSubmit.InvokeAsync(review);
        review = new ReviewModel();
        HoveredRating = 0;
    }
    
    private void CloseReviewForm()
    {
        OnClose.InvokeAsync();
    }
}