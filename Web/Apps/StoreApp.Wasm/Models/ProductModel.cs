namespace StoreApp.Wasm.Models;

public class ProductModel
{
    public int Id { get; set; }
    public string Title { get; set; } = String.Empty;
    public double Rating { get; set; } = 0.0;
    public double CurrentPrice { get; set; }
    public double? OldPrice { get; set; }
    public double? Discount { get; set; }
    public string ImageSrc { get; set; } = String.Empty;

    public string Description { get; set; } = String.Empty;

    public int UnitsInStock { get; set; } = 1;
    public List<string> Images { get; set; } = [];

    public List<ColorModel> AvailableColors { get; set; } = [];
    public List<SizeModel> AvailableSizes { get; set; } = [];

    public List<string> Colors { get; set; } = [];
    public List<string> Sizes { get; set; } = [];
}

public class ColorModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string HexCode { get; set; } = string.Empty;
}

public class SizeModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
