using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreApp.DAL.Entities;

namespace StoreApp.DAL.Data.Configurations;

public class ProductDetailEntityConfigurations : IEntityTypeConfiguration<ProductDetailEntity>
{
    public void Configure(EntityTypeBuilder<ProductDetailEntity> builder)
    {
        builder.HasKey(r => r.Id);
        builder.Property(x => x.Id).ValueGeneratedOnAdd();

        builder.Property(x => x.ColorName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.ColorHex)
            .IsRequired()
            .HasMaxLength(7);

        builder.Property(x => x.SizeName)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(x => x.UnitsInStock)
            .IsRequired();
        
        builder.ToTable(t =>
        {
            t.HasCheckConstraint("CK_ProductDetails_UnitsInStock", "[UnitsInStock] >= 0");
        });

        builder.Property(x => x.SKU)
            .IsRequired()
            .HasMaxLength(50);

        builder.HasOne(r => r.Product)
            .WithMany(p => p.ProductDetails)
            .HasForeignKey(r => r.ProductId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(r => r.ProductImages)
            .WithMany()
            .HasForeignKey(r => r.ProductImagesId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(r => new { r.ProductId, r.ColorName, r.SizeName })
            .IsUnique()
            .HasDatabaseName("UX_ProductDetails_Product_Color_Size");
    }
}