using Microsoft.EntityFrameworkCore;
using StoreApp.DAL.Entities;

namespace StoreApp.DAL.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<UserEntity> Users { get; set; }
    public DbSet<ProductEntity> Products { get; set; }
    public DbSet<CartItemEntity> CartItems { get; set; }
    public DbSet<ReviewEntity> Reviews { get; set; }
    public DbSet<ColorEntity> Colors { get; set; }
    public DbSet<SizeEntity> Sizes { get; set; }
    public DbSet<ProductVariant> ProductVariants { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) 
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserEntity>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<CartItemEntity>()
            .HasOne(ci => ci.User)
            .WithMany(u => u.CartItems)
            .HasForeignKey(ci => ci.UserId);

        modelBuilder.Entity<CartItemEntity>()
            .HasOne(ci => ci.Product)
            .WithMany(p => p.CartItems)
            .HasForeignKey(ci => ci.ProductId);

        modelBuilder.Entity<ProductEntity>()
            .Property(p => p.Price)
            .HasColumnType("decimal(18,2)");
        
        modelBuilder.Entity<ProductEntity>()
            .Property(p => p.Discount)
            .HasColumnType("decimal(5,4)");
        
        modelBuilder.Entity<ProductEntity>()
            .Property(p => p.UnitsInStock)
            .HasDefaultValue(0);
        
        modelBuilder.Entity<ReviewEntity>()
            .HasOne(r => r.User)
            .WithMany(u => u.Reviews)
            .HasForeignKey(r => r.UserId);

        modelBuilder.Entity<ReviewEntity>()
            .HasOne(r => r.Product)
            .WithMany(u => u.Reviews)
            .HasForeignKey(r => r.ProductId);
        
        modelBuilder.Entity<SizeEntity>()
            .HasIndex(s => s.Name)
            .IsUnique();
        
        modelBuilder.Entity<ColorEntity>()
            .HasIndex(c => c.Name)
            .IsUnique();
        
        modelBuilder.Entity<ProductVariant>()
            .HasOne(pv => pv.Product)
            .WithMany(p => p.Variants)
            .HasForeignKey(pv => pv.ProductId);
        
        modelBuilder.Entity<ProductVariant>()
            .HasOne(pv => pv.Color)
            .WithMany()
            .HasForeignKey(pv => pv.ColorId);
        
        modelBuilder.Entity<ProductVariant>()
            .HasOne(pv => pv.Size)
            .WithMany()
            .HasForeignKey(pv => pv.SizeId);
    }
}
