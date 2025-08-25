namespace StoreApp.Models;

public record UpdateCartItem
{
    public int ProductDetailId { get; init; }

    public int Quantity { get; init; }
}