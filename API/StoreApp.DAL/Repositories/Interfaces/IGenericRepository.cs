using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using StoreApp.DAL.Filtering;
using StoreApp.Shared;

namespace StoreApp.DAL.Repositories.Interfaces;

public interface IGenericRepository<TEntity, in TId> where TEntity : class
{
    DbSet<TEntity> DbSet { get; }
    
    public Task CreateAsync(TEntity item);
    
    public Task CreateRangeAsync(IEnumerable<TEntity> item);
    
    public Task UpdateAsync(TEntity item);
    
    public Task DeleteAsync(TEntity item);
    
    public Task DeleteRangeAsync(IEnumerable<TEntity> items);
    
    public Task<IEnumerable<TEntity>> GetAllAsync();
    
    public Task<TEntity?> GetByIdAsync(TId id);

    public Task<TEntity?> GetByIdAsync<TPrevProperty>(TId id,
        Expression<Func<TEntity, IEnumerable<TPrevProperty>>> navigationPropertyPath);
    
    public Task<TEntity?> GetByIdAsync(TId id,
        params Expression<Func<TEntity, object>>[] navigationPropertyPaths);
    
    public Task<TEntity?> GetByIdAsync<TPrevProperty, TProperty>(TId id,
        Expression<Func<TEntity, IEnumerable<TPrevProperty>>> navigationPropertyPath,
        Expression<Func<TPrevProperty, TProperty>> thenNavigationPropertyPath);
    
    public Task AddRangeAsync(IEnumerable<TEntity> item);
    
    public Task<int> GetCountAsync();
    
    public Task<List<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate);
    
    public Task<List<TEntity>> GetAsync<TPrevProperty>(Expression<Func<TEntity, bool>> predicate, Expression<Func<TEntity, TPrevProperty>> navigationPropertyPath);
    
    public Task<List<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] navigationPropertyPaths);
    
    public void Detach(TEntity item);
    
    public void DetachRange(IEnumerable<TEntity> items);
    
    Task<List<TEntity>> GetAllAsync(params Expression<Func<TEntity, object>>[] navigationPropertyPaths);
    
    Task<FilterResult<TEntity>> GetFilteredAsync(IFilter<TEntity> filter, params Expression<Func<TEntity, object>>[] navigationPropertyPaths);
}