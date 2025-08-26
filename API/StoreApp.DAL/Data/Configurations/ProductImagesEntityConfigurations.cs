using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreApp.DAL.Entities;
using System.Text.Json;

namespace StoreApp.DAL.Data.Configurations;

public class ProductImagesEntityConfigurations : IEntityTypeConfiguration<ProductImagesEntity>
{
    public void Configure(EntityTypeBuilder<ProductImagesEntity> builder)
    {
        builder.ToTable("ProductImages");

        builder.HasKey(pi => pi.Id);

        builder.Property(pi => pi.Id)
            .ValueGeneratedOnAdd();

        builder.Property(pi => pi.ProductId)
            .IsRequired();

        builder.Property(pi => pi.ColorHex)
            .IsRequired()
            .HasMaxLength(7);

        builder.Property(pi => pi.ImagesUrls)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null)!)
            .HasColumnType("nvarchar(max)")
            .IsRequired();

        builder.HasIndex(pi => new { pi.ProductId, pi.ColorHex })
            .IsUnique();

        builder.HasOne<ProductEntity>()
            .WithMany()
            .HasForeignKey(pi => pi.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}