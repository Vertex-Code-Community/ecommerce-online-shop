namespace StoreApp.DAL.Filtering;

public interface IFilter<TEntity> where TEntity : class
{
    IQueryable<TEntity> ApplyFilter(IQueryable<TEntity> query);

    IQueryable<TEntity> ApplyPagination(IQueryable<TEntity> query);
    
    int PageNumber { get; set; }
    
    int PageSize { get; set; }
}
