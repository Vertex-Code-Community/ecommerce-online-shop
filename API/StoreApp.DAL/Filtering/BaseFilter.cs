namespace StoreApp.DAL.Filtering;

public abstract class BaseFilter<TEntity> : IFilter<TEntity> where TEntity : class
{
    public int PageNumber { get; set; } = 1;
    
    public int PageSize { get; set; } = 10;
    
    public string? SortBy { get; set; }
    
    public bool SortAscending { get; set; } = true;
    
    public string? SearchQuery { get; set; }
    
    public string? SearchField { get; set; }
    
    public virtual IQueryable<TEntity> ApplyFilter(IQueryable<TEntity> query)
    {
        query = ApplySearch(query);
        
        query = ApplySorting(query);
        
        return query;
    }
    
    protected virtual IQueryable<TEntity> ApplySearch(IQueryable<TEntity> query)
    {
        return string.IsNullOrWhiteSpace(SearchQuery) || string.IsNullOrWhiteSpace(SearchField)
            ? query
            : ApplySearchFilter(query, SearchQuery);
    }
    
    protected virtual IQueryable<TEntity> ApplySorting(IQueryable<TEntity> query)
    {
        return string.IsNullOrWhiteSpace(SortBy)
            ? query
            : ApplySortingFilter(query, SortBy, SortAscending);
    }
    
    public virtual IQueryable<TEntity> ApplyPagination(IQueryable<TEntity> query)
    {
        if (PageSize <= 0)
            return query;
            
        var skip = (PageNumber - 1) * PageSize;
        return query.Skip(skip).Take(PageSize);
    }
    
    protected abstract IQueryable<TEntity> ApplySearchFilter(IQueryable<TEntity> query, string searchQuery);
    
    protected abstract IQueryable<TEntity> ApplySortingFilter(IQueryable<TEntity> query, string sortBy, bool ascending);
}
