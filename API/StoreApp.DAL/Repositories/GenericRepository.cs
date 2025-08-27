using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using StoreApp.DAL.Entities;
using StoreApp.DAL.Exceptions.Handlers;
using StoreApp.DAL.Filtering;
using StoreApp.DAL.Repositories.Interfaces;
using StoreApp.Shared;

namespace StoreApp.DAL.Repositories;

public class GenericRepository<TEntity, TDb, TId>
    : IGenericRepository<TEntity, TId> 
    where TEntity : class, IBaseEntity<TId>
    where TDb : DbContext
{
    protected readonly TDb Context;
    public DbSet<TEntity> DbSet { get; }
    
    private readonly IDbExceptionHandler handler;
    
    protected GenericRepository(TDb context, IDbExceptionHandler handler)
    {
        Context = context;
        DbSet = context.Set<TEntity>();
        this.handler = handler;
    }

    public virtual async Task CreateAsync(TEntity item)
    {
        try
        {
            await DbSet.AddAsync(item);
            await Context.SaveChangesAsync();
            Detach(item);
        }
        catch (DbUpdateException ex)
        {
            handler.DetermineTypeOfDbUpdateException(ex);
        }
    }

    public async Task CreateRangeAsync(IEnumerable<TEntity> items)
    {
        try
        {
            await DbSet.AddRangeAsync(items);
            await Context.SaveChangesAsync();
            DetachRange(items);
        }
        catch (DbUpdateException ex)
        {
            handler.DetermineTypeOfDbUpdateException(ex);
        }
    }

    public async Task DeleteAsync(TEntity item)
    {
        DbSet.Remove(item);
        await Context.SaveChangesAsync();
    }

    public async Task DeleteRangeAsync(IEnumerable<TEntity> items)
    {
        DbSet.RemoveRange(items);
        await Context.SaveChangesAsync();
        DetachRange(items);
    }

    public async Task<IEnumerable<TEntity>> GetAllAsync()
    {
        return await DbSet.AsNoTracking().ToListAsync();
    }

    public async Task UpdateAsync(TEntity item)
    {
        try
        {
            Context.Entry(item).State = EntityState.Modified;
            await Context.SaveChangesAsync();
        
            Detach(item);
        }
        catch (DbUpdateException ex)
        {
            handler.DetermineTypeOfDbUpdateException(ex);
        }
    }

    public Task<TEntity?> GetByIdAsync(TId id)
    {
        return DbSet.AsNoTracking().FirstOrDefaultAsync(x => x.Id.Equals(id));
    }

    public Task<TEntity?> GetByIdAsync<TPrevProperty>(TId id, 
        Expression<Func<TEntity, IEnumerable<TPrevProperty>>> navigationPropertyPath)
    {
        return DbSet
            .AsNoTracking()
            .Include(navigationPropertyPath)
            .FirstOrDefaultAsync(x => x.Id.Equals(id));
    }
    
    public Task<TEntity?> GetByIdAsync(TId id, params Expression<Func<TEntity, object>>[] navigationPropertyPaths)
    {
        var query = DbSet.AsNoTracking();

        query = navigationPropertyPaths
            .Aggregate(query, (current, navigationPropertyPath) => current.Include(navigationPropertyPath));

        return query.FirstOrDefaultAsync(x => x.Id.Equals(id));
    }

    public Task<TEntity?> GetByIdAsync<TPrevProperty, TProperty>(TId id, 
        Expression<Func<TEntity, TPrevProperty>> navigationPropertyPath, 
        Expression<Func<TPrevProperty, TProperty>> thenNavigationPropertyPath)
    {
        return DbSet
            .AsNoTracking()
            .Include(navigationPropertyPath)
            .ThenInclude(thenNavigationPropertyPath)
            .FirstOrDefaultAsync(x => x.Id.Equals(id));
    }
    
    public Task<TEntity?> GetByIdAsync<TPrevProperty, TProperty>(TId id, 
        Expression<Func<TEntity, IEnumerable<TPrevProperty>>> navigationPropertyPath, 
        Expression<Func<TPrevProperty, TProperty>> thenNavigationPropertyPath)
    {
        return DbSet
            .AsNoTracking()
            .Include(navigationPropertyPath)
            .ThenInclude(thenNavigationPropertyPath)
            .FirstOrDefaultAsync(x => x.Id.Equals(id));
    }

    public async Task AddRangeAsync(IEnumerable<TEntity> item)
    {
        try
        {
            await DbSet.AddRangeAsync(item);
            await Context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            handler.DetermineTypeOfDbUpdateException(ex);
        }
    }

    public Task<int> GetCountAsync()
    {
        return DbSet.CountAsync();
    }
    
    public Task<List<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate)
    {
        return DbSet.Where(predicate).ToListAsync();
    }

    public Task<List<TEntity>> GetAsync<TPrevProperty>(Expression<Func<TEntity, bool>> predicate, Expression<Func<TEntity, TPrevProperty>> navigationPropertyPath)
    {
        return DbSet.Where(predicate).Include(navigationPropertyPath).ToListAsync();
    }

    public async Task<List<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] navigationPropertyPaths)
    {
        var query = DbSet.AsNoTracking().Where(predicate);

        query = navigationPropertyPaths
            .Aggregate(query, (current, navigationPropertyPath) => current.Include(navigationPropertyPath));

        return await query.ToListAsync();
    }

    public void Detach(TEntity item)
    {
        Context.Entry(item).State = EntityState.Detached;
    }

    public void DetachRange(IEnumerable<TEntity> items)
    {
        foreach (var item in items)
            Context.Entry(item).State = EntityState.Detached;
    }

    public async Task<List<TEntity>> GetAllAsync(params Expression<Func<TEntity, object>>[] navigationPropertyPaths)
    {
        IQueryable<TEntity> query = DbSet;

        foreach (var include in navigationPropertyPaths)
        {
            query = query.Include(include);
        }

        return await query.ToListAsync();
    }

    public async Task<FilterResult<TEntity>> GetFilteredAsync(IFilter<TEntity> filter, params Expression<Func<TEntity, object>>[] navigationPropertyPaths)
    {
        var query = DbSet.AsNoTracking();
        query = navigationPropertyPaths.Aggregate(query, (current, include) => current.Include(include));
    
        var filteredQuery = filter.ApplyFilter(query);
        var totalCount = await filteredQuery.CountAsync();
        
        filteredQuery = filter.ApplyPagination(filteredQuery);
        var items = await filteredQuery.ToListAsync();
    
        return new FilterResult<TEntity>(items, totalCount, filter.PageNumber, filter.PageSize);
    }
}