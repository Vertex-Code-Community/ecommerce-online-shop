using StoreApp.DAL.Entities;

namespace StoreApp.DAL.Data;

public static class SeedData
{
    public static void SeedColorsAndSizes(AppDbContext context)
    {
        if (!context.Set<ColorEntity>().Any())
        {
            var colors = new List<ColorEntity>
            {
                new() { Name = "Black", HexCode = "#000000" },
                new() { Name = "White", HexCode = "#FFFFFF" },
                new() { Name = "Red", HexCode = "#FF0000" },
                new() { Name = "Blue", HexCode = "#0000FF" },
                new() { Name = "Green", HexCode = "#008000" },
                new() { Name = "Yellow", HexCode = "#FFFF00" },
                new() { Name = "Purple", HexCode = "#800080" },
                new() { Name = "Orange", HexCode = "#FFA500" },
                new() { Name = "Pink", HexCode = "#FFC0CB" },
                new() { Name = "Brown", HexCode = "#A52A2A" },
                new() { Name = "Gray", HexCode = "#808080" },
                new() { Name = "Navy", HexCode = "#000080" }
            };

            context.Set<ColorEntity>().AddRange(colors);
        }

        if (!context.Set<SizeEntity>().Any())
        {
            var sizes = new List<SizeEntity>
            {
                new() { Name = "XS", Description = "Extra Small" },
                new() { Name = "S", Description = "Small" },
                new() { Name = "M", Description = "Medium" },
                new() { Name = "L", Description = "Large" },
                new() { Name = "XL", Description = "Extra Large" },
                new() { Name = "XXL", Description = "Double Extra Large" },
                new() { Name = "XXXL", Description = "Triple Extra Large" }
            };

            context.Set<SizeEntity>().AddRange(sizes);
        }

        context.SaveChanges();
    }

    public static void SeedProductVariants(AppDbContext context)
    {
        if (!context.Set<ProductVariant>().Any())
        {
            var products = context.Products.ToList();
            var colors = context.Set<ColorEntity>().ToList();
            var sizes = context.Set<SizeEntity>().ToList();

            if (products.Any() && colors.Any() && sizes.Any())
            {
                var variants = new List<ProductVariant>();

                foreach (var product in products)
                {
                    var productColors = colors.Take(3).ToList();
                    var productSizes = sizes.Take(4).ToList();

                    foreach (var color in productColors)
                    {
                        foreach (var size in productSizes)
                        {
                            variants.Add(new ProductVariant
                            {
                                ProductId = product.Id,
                                ColorId = color.Id,
                                SizeId = size.Id,
                                UnitsInStock = Random.Shared.Next(5, 20),
                                SKU = $"{product.Id}-{color.Id}-{size.Id}"
                            });
                        }
                    }
                }

                context.Set<ProductVariant>().AddRange(variants);
                context.SaveChanges();
            }
        }
    }
}
