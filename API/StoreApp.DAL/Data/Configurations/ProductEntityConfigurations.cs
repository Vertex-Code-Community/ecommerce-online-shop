using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreApp.DAL.Entities;

namespace StoreApp.DAL.Data.Configurations;

public class ProductEntityConfigurations : IEntityTypeConfiguration<ProductEntity>
{
    public void Configure(EntityTypeBuilder<ProductEntity> builder)
    {
        builder.ToTable("Products");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(p => p.Description)
            .IsRequired(false)
            .HasMaxLength(1000);

        builder.Property(p => p.Price)
            .IsRequired()
            .HasColumnType("decimal(18,2)");
        
        builder.ToTable(t =>
        {
            t.HasCheckConstraint("CK_Products_Price", "[Price] >= 0");
        });
        
        builder.Property(p => p.MainImageUrl)
            .IsRequired(false)
            .HasMaxLength(2048);
        
        builder.Property(p => p.Discount)
            .IsRequired(false)
            .HasColumnType("decimal(5,4)");

        builder.ToTable(t =>
        {
            t.HasCheckConstraint("CK_Products_Discount", "[Discount] >= 0 AND [Discount] <= 1");
        });
        
        builder.Property(p => p.UnitsInStock)
            .IsRequired()
            .HasColumnType("int");

        builder.ToTable(t =>
        {
            t.HasCheckConstraint("CK_Products_UnitsInStock", "[UnitsInStock] >= 0");
        });
        
        builder.Property(x => x.CreatedAt)
            .HasDefaultValueSql("SYSUTCDATETIME()")
            .IsRequired();
    }
}