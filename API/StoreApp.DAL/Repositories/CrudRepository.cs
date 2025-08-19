using Microsoft.EntityFrameworkCore;
using StoreApp.DAL.Data;
using StoreApp.DAL.Repositories.Interfaces;

namespace StoreApp.DAL.Repositories;

public abstract class CrudRepository<TEntity>(AppDbContext context) : ICrudRepository<TEntity>
where TEntity : class
{
    protected readonly AppDbContext Context = context;

    public async Task<IEnumerable<TEntity>> GetAllAsync()
    {
        return await GetQueryable().ToListAsync();
    }

    public async Task<TEntity?> GetByIdAsync(int id)
    {
        return await Context.Set<TEntity>().FindAsync(id);
    }

    public async Task AddAsync(TEntity entity)
    {
        await Context.Set<TEntity>().AddAsync(entity);
        await Context.SaveChangesAsync();
    }

    public async Task UpdateAsync(TEntity entity)
    {
        Context.Set<TEntity>().Update(entity);
        await Context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null)
        {
            Context.Set<TEntity>().Remove(entity);
            await Context.SaveChangesAsync();
        }
    }
    
    protected abstract IQueryable<TEntity> GetQueryable();
}