using StoreApp.Entities.Interfaces;

namespace StoreApp.Entities.Entities;

public class ProductImagesEntity : IBaseEntity<long>
{
    public long Id { get; set; }

    public int ProductId { get; set; }

    public string ColorHex { get; set; } = string.Empty;
	
    public IEnumerable<string> ImagesUrls { get; set; } = [];
}