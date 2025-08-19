namespace StoreApp.DAL.Entities;

public abstract class Entity<TKey>
{
    public abstract TKey Id { get; set; }
}