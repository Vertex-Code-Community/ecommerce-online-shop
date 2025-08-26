using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StoreApp.DAL.Data.Configurations;
using StoreApp.DAL.Entities;

namespace StoreApp.DAL.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options)
    : IdentityDbContext<UserEntity>(options)
{
    public DbSet<ProductEntity> Products { get; set; }
    
    public DbSet<ProductDetailEntity> ProductDetails { get; set; }
    
    public DbSet<ProductImagesEntity> ProductImages { get; set; }

    public DbSet<CartItemEntity> CartItems { get; set; }
    
    public DbSet<ReviewEntity> Reviews { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) 
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        modelBuilder.ConfigureIdentity();
    }
}
