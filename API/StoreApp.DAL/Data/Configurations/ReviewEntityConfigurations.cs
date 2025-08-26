using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreApp.DAL.Entities;

namespace StoreApp.DAL.Data.Configurations;

public class ReviewEntityConfigurations: IEntityTypeConfiguration<ReviewEntity>
{
    public void Configure(EntityTypeBuilder<ReviewEntity> builder)
    {
        builder.HasKey(r => r.Id);
        
        builder.Property(x => x.Id).ValueGeneratedOnAdd();

        builder.Property(r => r.Rating)
            .IsRequired()
            .HasColumnType("tinyint");
        
        builder.ToTable(t =>
        {
            t.HasCheckConstraint("CK_Reviews_Rating", "[Rating] >= 1 AND [Rating] <= 5");
        });

        builder.Property(r => r.Comment)
            .IsRequired(false)
            .HasMaxLength(500);

        builder.Property(x => x.CreatedAt)
            .HasDefaultValueSql("SYSUTCDATETIME()")
            .IsRequired();

        builder.HasOne(r => r.User)
            .WithMany(u => u.Reviews)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(r => r.Product)
            .WithMany(p => p.Reviews)
            .HasForeignKey(r => r.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(r => new { r.UserId, r.ProductId })
            .IsUnique()
            .HasDatabaseName("UX_Reviews_User_Product");
    }
}