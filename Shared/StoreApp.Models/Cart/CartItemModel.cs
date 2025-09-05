namespace StoreApp.Models;

public class CartItemModel
{
	public required ProductModel Product { get; set; }

	public required ProductDetailModel ProductDetail { get; set; }

	public required int Quantity { get; set; }
}
