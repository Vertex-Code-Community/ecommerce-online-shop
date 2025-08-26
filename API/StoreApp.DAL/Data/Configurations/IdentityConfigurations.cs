using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StoreApp.DAL.Entities;

namespace StoreApp.DAL.Data.Configurations;

public static class IdentityConfigurations
{
    public static void ConfigureIdentity(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserEntity>(entity => 
        {
            entity.ToTable(name: "Users");
        });
        
        modelBuilder.Entity<IdentityRole>(entity => 
        {
            entity.ToTable(name: "Roles");
        });
        
        modelBuilder.Entity<IdentityUserRole<string>>(entity => 
        {
            entity.ToTable("UserRoles");
        });
        
        modelBuilder.Entity<IdentityUserClaim<string>>(entity => 
        {
            entity.ToTable("UserClaims");
        });
        
        modelBuilder.Entity<IdentityUserLogin<string>>(entity => 
        {
            entity.ToTable("UserLogins");
        });
        
        modelBuilder.Entity<IdentityRoleClaim<string>>(entity => 
        {
            entity.ToTable("RoleClaims");
        });
        
        modelBuilder.Entity<IdentityUserToken<string>>(entity => 
        {
            entity.ToTable("UserTokens");
        });
    }
}