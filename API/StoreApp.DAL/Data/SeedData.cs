using Microsoft.AspNetCore.Identity;
using StoreApp.DAL.Entities;
using StoreApp.Shared.Enums;

namespace StoreApp.DAL.Data;

public class Seeder(RoleManager<IdentityRole> roleManager, UserManager<UserEntity> userManager)
{
    public async Task Seed()
    {
        await SeedRoles();
        await SeedAdmin();
    }
    
    private async Task SeedRoles()
    {
        if (!roleManager.Roles.Any())
        {
            var roles = new List<IdentityRole>
            {
                new() { Name = UserRole.User.ToString(), NormalizedName = UserRole.User.ToString().ToUpper() },
                new() { Name = UserRole.Admin.ToString(), NormalizedName = UserRole.Admin.ToString().ToUpper() }
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
        }
    }

    private async Task SeedAdmin()
    {
        var admins = await userManager.GetUsersInRoleAsync(UserRole.Admin.ToString());
        if (admins.Any())
        {
            return;
        }

        const string email = "admin@example.com";
        var admin = new UserEntity
        {
            UserName = email,
            Email = email,
        };
        
        var result = await userManager.CreateAsync(admin, "Password123");
        if (!result.Succeeded)
        {
            await userManager.AddToRoleAsync(admin, UserRole.Admin.ToString());
        }
    }
}
