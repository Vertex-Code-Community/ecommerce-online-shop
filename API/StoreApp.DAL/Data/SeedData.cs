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
        await SeedProducts();
        await SeedUsers();
        await SeedReviews();
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

        foreach (var product in products)
        {
            var selectedColors = colors.Zip(colorHexes, (name, hex) => new { Name = name, Hex = hex })
                .OrderBy(_ => random.Next())
                .Take(Math.Max(3, random.Next(3, 6)))
                .ToList();

            var productDetailsCount = 0;

            foreach (var color in selectedColors)
            {
                var selectedSizes = sizes
                    .OrderBy(_ => random.Next())
                    .Take(Math.Max(3, random.Next(3, 5)))
                    .ToList();

                foreach (var size in selectedSizes)
                {
                    var productDetail = new ProductDetailEntity
                    {
                        ProductId = product.Id,
                        ColorName = color.Name,
                        ColorHex = color.Hex,
                        SizeName = size,
                        UnitsInStock = random.Next(5, 50),
                        SKU = $"SKU-{product.Id:D4}-{color.Name[0]}{size}",
                        ProductImagesId = null
                    };

                    productDetails.Add(productDetail);
                    productDetailsCount++;
                }
            }
            
            Console.WriteLine($"Added {selectedColors.Count} colors (total {productDetailsCount} product details) for product: {product.Name}");
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
            "david.brown@example.com",
            "emily.davis@example.com",
            "chris.miller@example.com",
            "lisa.garcia@example.com",
            "james.martinez@example.com",
            "anna.rodriguez@example.com",
            "robert.lopez@example.com",
            "maria.gonzalez@example.com",
            "william.anderson@example.com",
            "jennifer.taylor@example.com",
            "daniel.thomas@example.com",
            "jessica.jackson@example.com",
            "matthew.white@example.com",
            "ashley.harris@example.com",
            "joshua.martin@example.com",
            "amanda.thompson@example.com",
            "christopher.garcia@example.com",
            "melissa.clark@example.com",
            "andrew.rodriguez@example.com",
            "stephanie.lewis@example.com",
            "kenneth.lee@example.com",
            "nicole.walker@example.com",
            "steven.hall@example.com",
            "rachel.allen@example.com",
            "brian.young@example.com",
            "laura.hernandez@example.com",
            "kevin.king@example.com",
            "michelle.wright@example.com",
            "ryan.lopez@example.com",
            "kimberly.hill@example.com",
            "jason.scott@example.com",
            "donna.green@example.com",
            "jeff.adams@example.com",
            "carol.baker@example.com",
            "gary.gonzalez@example.com",
            "sandra.nelson@example.com",
            "mark.carter@example.com",
            "ruth.mitchell@example.com",
            "paul.perez@example.com",
            "sharon.roberts@example.com",
            "anthony.turner@example.com",
            "helen.phillips@example.com",
            "edward.campbell@example.com",
            "barbara.parker@example.com",
            "thomas.evans@example.com",
            "betty.edwards@example.com"
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
        Console.WriteLine("Users seeding completed successfully!");
    }

    private async Task SeedReviews()
    {
        if (await dbContext.Reviews.AnyAsync())
        {
            Console.WriteLine("Reviews already exist in database. Skipping seeding.");
            return;
        }

        Console.WriteLine("Starting reviews seeding...");

        var userIds = await dbContext.Users
            .Select(u => u.Id).ToListAsync();

        var products = await dbContext.Products.ToListAsync();

        if (!userIds.Any())
        {
            Console.WriteLine("No users found. Cannot create reviews.");
            return;
        }

        if (!products.Any())
        {
            Console.WriteLine("No products found. Cannot create reviews.");
            return;
        }

        var reviews = new List<ReviewEntity>();
        var random = new Random();
        
        var reviewComments = new[]
        {
            "Great product! Highly recommend.",
            "Excellent quality, very satisfied.",
            "Perfect for everyday use.",
            "Beautiful design, love it!",
            "Outstanding quality!",
            "Love the style and fit!",
            "Perfect size and great material.",
            "Beautiful color, fits perfectly.",
            
            "This product exceeded all my expectations! The quality is outstanding and the fit is perfect. I've been wearing it for weeks now and it still looks brand new. The material is soft and comfortable, and the design is exactly what I was looking for. Definitely worth every penny and I will be ordering more colors soon.",
            "Amazing purchase! I was a bit hesitant at first due to the price, but after receiving the item I can say it's absolutely worth it. The craftsmanship is excellent, attention to detail is impressive, and the customer service was top-notch. Fast shipping and beautiful packaging too. Highly recommend to anyone considering this product.",
            "I've been searching for something like this for months and finally found the perfect item. The quality is exceptional, much better than similar products I've tried before. It fits exactly as expected and the color is vibrant and true to the photos. Very happy with this purchase and will definitely shop here again.",
            "Fantastic product with incredible attention to detail. The material feels premium and the construction is solid. I've received many compliments when wearing this. The sizing chart was accurate and it arrived quickly. This has become one of my favorite pieces and I'm planning to buy it in other colors as well.",
            
            "Good value for money.",
            "Decent quality for the price.",
            "Not bad, but could be better.",
            "Exactly as described, very happy.",
            "It's okay, nothing special but does the job.",
            "Average quality, fits as expected.",
            
            "The product is decent overall. The quality is acceptable for the price point, though I've seen better materials elsewhere. It fits well and looks nice, but nothing particularly stands out about it. Shipping was reasonable and it arrived in good condition. It's a solid choice if you're looking for something basic.",
            "Mixed feelings about this purchase. On the positive side, it fits well and the color is nice. However, the material feels a bit cheaper than I expected based on the photos. It's not bad, just not as premium as I hoped. For the price, it's acceptable but I probably wouldn't buy it again.",
            
            "Poor quality, disappointed.",
            "Not worth the money.",
            "Cheap material, looks nothing like photos.",
            "Terrible fit, had to return.",
            "Very disappointed with this purchase.",
            "Low quality, falling apart already.",
            
            "Very disappointed with this product. The quality is much lower than expected - the material feels cheap and thin, and the stitching is already coming loose after just a few wears. The fit is completely off from the size chart, much smaller than indicated. The color also looks different from the website photos. Definitely not worth the price and I'll be returning this.",
            "I really wanted to love this product based on the reviews, but unfortunately it didn't meet my expectations. The material is scratchy and uncomfortable, and after one wash it started to lose its shape. The color faded significantly and now looks completely different. Customer service was unhelpful when I tried to address these issues. Would not recommend.",
            "Waste of money. The product arrived with loose threads and what appears to be stains or discoloration. The material is very thin and cheap feeling, nothing like what's described. It doesn't fit properly despite ordering my usual size. I've had much better experiences with similar products from other brands. Will not be shopping here again."
        };

        foreach (var product in products)
        {
            var reviewsCount = random.Next(5, 11);
            
            var selectedUserIds = userIds
                .OrderBy(_ => random.Next())
                .Take(reviewsCount)
                .ToList();
            
            for (int i = 0; i < selectedUserIds.Count; i++)
            {
                var userId = selectedUserIds[i];
                var commentIndex = random.Next(reviewComments.Length);
                var randomComment = reviewComments[commentIndex];
                
                int randomRating;
                if (commentIndex < 12) 
                {
                    randomRating = random.Next(4, 6); 
                }
                else if (commentIndex < 18)
                {
                    randomRating = 3; 
                }
                else 
                {
                    randomRating = random.Next(1, 3);
                }
                
                var review = new ReviewEntity
                {
                    Comment = randomComment,
                    Rating = randomRating,
                    CreatedAt = DateTime.UtcNow.AddDays(-random.Next(0, 60)),
                    ProductId = product.Id,
                    UserId = userId
                };
                
                reviews.Add(review);
            }
            
            Console.WriteLine($"Added {selectedUserIds.Count} reviews for product: {product.Name}");
        }

        await dbContext.Reviews.AddRangeAsync(reviews);
        await dbContext.SaveChangesAsync();
        
        Console.WriteLine($"Added {reviews.Count} reviews to database.");
        
        Console.WriteLine("Updating AverageRating for products...");
        
        var productRatings = reviews
            .GroupBy(r => r.ProductId)
            .Select(g => new 
            {
                ProductId = g.Key,
                AverageRating = g.Average(r => r.Rating)
            })
            .ToList();

        foreach (var productRating in productRatings)
        {
            var product = products.FirstOrDefault(p => p.Id == productRating.ProductId);
            if (product != null)
            {
                product.AverageRating = Math.Round(productRating.AverageRating, 2);
                Console.WriteLine($"Updated AverageRating for product {product.Name}: {product.AverageRating:F2}");
            }
        }

        await dbContext.SaveChangesAsync();
        Console.WriteLine("Reviews seeding completed successfully!");
    }
}
