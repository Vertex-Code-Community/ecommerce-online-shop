namespace StoreApp.Wasm.Models;

public class OrderItemModel
{
    public int Id { get; set; }
    public int UserId { get; set; }

    public ProductModel ProductModel { get; set; }

    public required int Quantity { get; set; }

    public ColorModel? SelectedColor { get; set; }
    public SizeModel? SelectedSize { get; set; }
}