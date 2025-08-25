namespace StoreApp.Models;

public class CartItemModel
{
	public int Id { get; set; }
	public int UserId { get; set; }

	public ProductModel ProductModel { get; set; }

	public required int Quantity { get; set; }
}
