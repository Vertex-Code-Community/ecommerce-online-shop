using StoreApp.DAL.Entities;

namespace StoreApp.DAL.Filtering;

public class ProductFilter : BaseFilter<ProductEntity>
{
    public decimal? MinPrice { get; set; }
    
    public decimal? MaxPrice { get; set; }
    
    public bool? HasDiscount { get; set; }
    
    public string? Color { get; set; }
    
    public string? Size { get; set; }

    public override IQueryable<ProductEntity> ApplyFilter(IQueryable<ProductEntity> query)
    {
        var baseQuery = base.ApplyFilter(query);
        
        if (MinPrice.HasValue)
            baseQuery = baseQuery.Where(p => p.Price >= MinPrice.Value);
        
        if (MaxPrice.HasValue)
            baseQuery = baseQuery.Where(p => p.Price <= MaxPrice.Value);

        if (HasDiscount.HasValue && HasDiscount.Value)
            baseQuery = baseQuery.Where(p => p.Discount != null && p.Discount > 0);
        
        if (!string.IsNullOrWhiteSpace(Color))
            baseQuery = baseQuery.Where(p => p.ProductDetails.Any(pd => pd.ColorHex.ToLower() == Color.ToLower()));
        
        if (!string.IsNullOrWhiteSpace(Size))
            baseQuery = baseQuery.Where(p => p.ProductDetails.Any(pd => pd.SizeName.ToLower() == Size.ToLower()));

        return baseQuery;
    }

    protected override IQueryable<ProductEntity> ApplySearchFilter(IQueryable<ProductEntity> query, string searchQuery)
    {
        return query.Where(p => p.Name.Contains(searchQuery));
    }

    protected override IQueryable<ProductEntity> ApplySortingFilter(IQueryable<ProductEntity> query, string sortBy, bool ascending)
    {
        return sortBy.ToLower() switch
        {
            "name" => ascending ? query.OrderBy(p => p.Name) : query.OrderByDescending(p => p.Name),
            "price" => ascending ? query.OrderBy(p => p.Price) : query.OrderByDescending(p => p.Price),
            "unitsinstock" => ascending ? query.OrderBy(p => p.UnitsInStock) : query.OrderByDescending(p => p.UnitsInStock),
            "discount" => ascending ? query.OrderBy(p => p.Discount) : query.OrderByDescending(p => p.Discount),
            "topselling" => ascending ? query.OrderBy(p => p.CartItems.Count) : query.OrderByDescending(p => p.CartItems.Count),
            "newarrival" => ascending ? query.OrderBy(p => p.CreatedAt) : query.OrderByDescending(p => p.CreatedAt),
            _ => query
        };
    }
}