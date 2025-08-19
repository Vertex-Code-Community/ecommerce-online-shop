using System.ComponentModel.DataAnnotations;

namespace StoreApp.Models;

public class CartItemModel
{
	public int Id { get; set; }
	public int UserId { get; set; }

	public ProductModel ProductModel { get; set; }

	[Range(1, int.MaxValue, ErrorMessage = "Quantity must be greater than 0")]
	public required int Quantity { get; set; }
}


