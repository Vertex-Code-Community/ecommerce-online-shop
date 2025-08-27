using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StoreApp.DAL.Entities;
using StoreApp.Shared.Enums;

namespace StoreApp.DAL.Data;

public class Seeder(RoleManager<IdentityRole> roleManager, UserManager<UserEntity> userManager, AppDbContext dbContext)
{
    public async Task Seed()
    {
        await SeedRoles();
        await SeedAdmin();
        await SeedProducts();
        await SeedUsers();
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

    private async Task SeedProducts()
    {
        if (await dbContext.Products.AnyAsync())
        {
            Console.WriteLine("Products already exist in database. Skipping seeding.");
            return;
        }

        Console.WriteLine("Starting products seeding...");
        
        var products = new List<ProductEntity>();
        var random = new Random();
        
        var productNames = new[]
        {
            "Classic T-Shirt", "Slim Fit Jeans", "Wool Sweater", "Demiseason Jacket", "Sports Pants",
            "Winter Coat", "Business Shirt", "Evening Dress", "Hooded Sweater", "Office Pants",
            "Leather Jacket", "Polo T-Shirt", "Mom Fit Jeans", "Patterned Sweater", "Denim Pants",
            "Spring Coat", "Casual Shirt", "Day Dress", "Mole Skin Sweater", "Classic Pants"
        };

        var productDescriptions = new[]
        {
            "High-quality material, comfortable fit, perfect for everyday wear.",
            "Stylish design, comfortable fit, excellent sewing quality.",
            "Soft and warm material, comfortable fit, perfect for cool weather.",
            "Light and practical jacket, protects from rain and wind.",
            "Comfortable pants for active lifestyle, dries quickly.",
            "Warm winter coat made of natural materials, stylish design.",
            "Elegant shirt for office and business meetings.",
            "Luxurious evening dress for special occasions.",
            "Comfortable hooded sweater, perfect for casual style.",
            "Classic office pants, comfortable and stylish.",
            "Stylish leather jacket, durable and fashionable.",
            "Elegant polo t-shirt, suitable for various occasions.",
            "Fashionable high-waist jeans, comfortable fit.",
            "Bright sweater with unique pattern, eye-catching.",
            "Classic denim pants, universal for any style.",
            "Light spring coat, perfect for inter-season.",
            "Comfortable casual shirt for everyday wear.",
            "Stylish day dress, suitable for various events.",
            "Soft mole skin sweater, very comfortable and warm.",
            "Classic pants, universal for any occasion."
        };

        for (int i = 0; i < 20; i++)
        {
            var product = new ProductEntity
            {
                Name = productNames[i],
                Description = productDescriptions[i],
                Price = random.Next(100, 5000),
                MainImageUrl = null, 
                Discount = random.Next(0, 3) == 0 ? (decimal?)random.Next(5, 25) / 100 : null,
                UnitsInStock = random.Next(10, 100),
                CreatedAt = DateTime.UtcNow.AddDays(-random.Next(0, 30))
            };

            products.Add(product);
        }

        await dbContext.Products.AddRangeAsync(products);
        await dbContext.SaveChangesAsync();
        
        Console.WriteLine($"Added {products.Count} products to database.");

        Console.WriteLine("Adding product details...");
        
        var productDetails = new List<ProductDetailEntity>();
        var colors = new[] { "Black", "White", "Blue", "Red", "Green", "Yellow", "Gray", "Brown" };
        var colorHexes = new[] { "#000000", "#FFFFFF", "#0000FF", "#FF0000", "#008000", "#FFFF00", "#808080", "#A52A2A" };
        var sizes = new[] { "XS", "S", "M", "L", "XL", "XXL" };

        foreach (var t in products)
        {
            var colorIndex = random.Next(colors.Length);
            var sizeIndex = random.Next(sizes.Length);
            
            var productDetail = new ProductDetailEntity
            {
                ProductId = t.Id,
                ColorName = colors[colorIndex],
                ColorHex = colorHexes[colorIndex],
                SizeName = sizes[sizeIndex],
                UnitsInStock = random.Next(5, 50),
                SKU = $"SKU-{t.Id:D4}-{colors[colorIndex][0]}{sizes[sizeIndex]}",
                ProductImagesId = null
            };

            productDetails.Add(productDetail);
        }

        await dbContext.ProductDetails.AddRangeAsync(productDetails);
        await dbContext.SaveChangesAsync();
        
        Console.WriteLine($"Added {productDetails.Count} product details to database.");
        Console.WriteLine("Products seeding completed successfully!");
    }

    private async Task SeedUsers()
    {
        if (await dbContext.Users.AnyAsync(u => u.UserName != "admin@example.com"))
        {
            Console.WriteLine("Users already exist in database. Skipping seeding.");
            return;
        }

        Console.WriteLine("Starting users seeding...");
        
        var users = new List<UserEntity>();
        var userEmails = new[]
        {
            "john.doe@example.com",
            "jane.smith@example.com",
            "mike.johnson@example.com",
            "sarah.wilson@example.com",
            "david.brown@example.com"
        };

        const string password = "Password123!";

        foreach (var t in userEmails)
        {
            var user = new UserEntity
            {
                UserName = t,
                Email = t,
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(user, password);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, UserRole.User.ToString());
                users.Add(user);
                Console.WriteLine($"Created user({t})");
            }
            else
            {
                Console.WriteLine($"Failed to create user({t}): {string.Join(", ", result.Errors.Select(e => e.Description))}");
            }
        }

        await dbContext.SaveChangesAsync();
        Console.WriteLine($"Created {users.Count} users successfully.");

        Console.WriteLine("Adding cart items for users...");
        
        var cartItems = new List<CartItemEntity>();
        var random = new Random();
        
        var productDetails = await dbContext.ProductDetails.ToListAsync();
        
        if (!productDetails.Any())
        {
            Console.WriteLine("No product details found. Cannot create cart items.");
            return;
        }

        foreach (var user in users)
        {
            var itemsCount = random.Next(1, 5);
            var selectedProducts = productDetails.OrderBy(_ => random.Next()).Take(itemsCount).ToList();

            cartItems.AddRange(selectedProducts.Select(
                productDetail => new CartItemEntity
            {
                UserId = user.Id,
                ProductDetailId = productDetail.Id,
                Quantity = random.Next(1, 4)
            }));

            Console.WriteLine($"Added {itemsCount} cart items for user: {user.UserName}");
        }

        await dbContext.CartItems.AddRangeAsync(cartItems);
        await dbContext.SaveChangesAsync();
        
        Console.WriteLine($"Added {cartItems.Count} cart items to database.");
        
        Console.WriteLine("Adding reviews for users...");
        
        var reviews = new List<ReviewEntity>();
        var reviewComments = new[]
        {
            "Great product! Highly recommend.",
            "Excellent quality, very satisfied.",
            "Good value for money.",
            "Nice design and comfortable fit.",
            "Perfect for everyday use.",
            "Amazing product, exceeded expectations.",
            "Very good quality, fast delivery.",
            "Beautiful design, love it!",
            "Comfortable and stylish.",
            "Great purchase, would buy again."
        };
        
        var products = await dbContext.Products.ToListAsync();
        
        if (!products.Any())
        {
            Console.WriteLine("No products found. Cannot create reviews.");
            return;
        }
        
        foreach (var user in users)
        {
            var randomProduct = products.OrderBy(_ => random.Next()).First();
            var randomComment = reviewComments.OrderBy(_ => random.Next()).First();
            var randomRating = random.Next(3, 6);
            
            var review = new ReviewEntity
            {
                Comment = randomComment,
                Rating = randomRating,
                CreatedAt = DateTime.UtcNow.AddDays(-random.Next(0, 30)),
                ProductId = randomProduct.Id,
                UserId = user.Id
            };
            
            reviews.Add(review);
            Console.WriteLine($"Added review with rating {randomRating} for user: {user.UserName} on product: {randomProduct.Name}");
        }
        
        await dbContext.Reviews.AddRangeAsync(reviews);
        await dbContext.SaveChangesAsync();
        
        Console.WriteLine($"Added {reviews.Count} reviews to database.");
        Console.WriteLine("Users seeding completed successfully!");
    }
}
