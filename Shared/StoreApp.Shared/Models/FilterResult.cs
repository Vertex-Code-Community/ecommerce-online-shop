namespace StoreApp.Shared;

public class FilterResult<TEntity>
where TEntity : class
{
    public IEnumerable<TEntity> Items { get; set; } = Enumerable.Empty<TEntity>();
    
    public int TotalCount { get; set; }
    
    public int PageNumber { get; set; }
    
    public int PageSize { get; set; }
    
    public int TotalPages { get; set; }
    
    public bool HasPreviousPage => PageNumber > 1;
    
    public bool HasNextPage => PageNumber < TotalPages;
    
    public FilterResult()
    {
    }
    
    public FilterResult(IEnumerable<TEntity> items, int totalCount, int pageNumber, int pageSize)
    {
        Items = items;
        TotalCount = totalCount;
        PageNumber = pageNumber;
        PageSize = pageSize;
        TotalPages = (int)Math.Ceiling((double)totalCount / pageSize);
    }

    public FilterResult<TNewEntity> Clone<TNewEntity>(IEnumerable<TNewEntity> newEntities)
    where TNewEntity : class
    {
        return new FilterResult<TNewEntity>
        {
            Items = newEntities,
            TotalCount = TotalCount,
            PageNumber = PageNumber,
            PageSize = PageSize,
            TotalPages = TotalPages
        };
    }
}
