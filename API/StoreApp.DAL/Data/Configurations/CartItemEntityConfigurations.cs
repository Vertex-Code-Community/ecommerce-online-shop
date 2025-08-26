using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreApp.DAL.Entities;

namespace StoreApp.DAL.Data.Configurations;

public class CartItemEntityConfigurations: IEntityTypeConfiguration<CartItemEntity>
{
    public void Configure(EntityTypeBuilder<CartItemEntity> builder)
    {
        builder.HasKey(r => r.Id);
        builder.Property(x => x.Id).ValueGeneratedOnAdd();

        builder.Property(x => x.Quantity)
            .IsRequired();

        builder.ToTable(t =>
        {
            t.HasCheckConstraint("CK_CartItems_Quantity", "[Quantity] > 0");
        });
        
        builder.HasOne(r => r.User)
            .WithMany(u => u.CartItems)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(r => r.ProductDetail)
            .WithMany()
            .HasForeignKey(r => r.ProductDetailId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(r => new { r.UserId, r.ProductDetailId })
            .IsUnique()
            .HasDatabaseName("UX_CartItems_User_ProductDetail");
    }
}