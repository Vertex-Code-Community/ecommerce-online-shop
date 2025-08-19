using StoreApp.Wasm.Models;

namespace StoreApp.Wasm;

public static class Mocks
{
    public static ProductModel Product = new()
    {
        Id = 1,
        ImageSrc = "/images/card-item-1.png",
        Title = "T-shirt with Tape Details",
        Rating = 4.5,
        CurrentPrice = 120,
        OldPrice = 150,
        Discount = 0.2, // 20%
        Description = "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
        UnitsInStock = 10,
        Images =
        [
            "/images/card-item-1.png",
            "/images/card-item-3.png",
            "/images/card-item-4.png"
        ],
        Colors = ["#4F4631", "#314F4A", "#31344F"],
        Sizes = ["Small", "Medium", "Large", "X-Large"]
    };

    public static List<ProductModel> Products = [
        new()
        {
            Id = 2,
            ImageSrc = "/images/card-item-2.png",
            Description = "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
            Title = "Vertical Striped Shirt",
            Rating = 5.0,
            CurrentPrice = 212,
            OldPrice = 232,
            Discount = 0.2,
            Colors = ["#4F4631", "#314F4A", "#31344F"],
            Sizes = ["Small", "Medium", "Large", "X-Large"],
            UnitsInStock = 10,
            Images =
            [
                "/images/card-item-1.png",
                "/images/card-item-3.png",
                "/images/card-item-4.png"
            ],
        },
        new()
        {
            Id = 3,
            ImageSrc = "/images/card-item-3.png",
            Title = "Courage Graphic T-shirt",
            Description = "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
            Rating = 4.0,
            CurrentPrice = 212,
            OldPrice = 232,
            Discount = 0.2,
            UnitsInStock = 10,
            Images =
            [
                "/images/card-item-1.png",
                "/images/card-item-3.png",
                "/images/card-item-4.png"
            ],
            Colors = ["#4F4631", "#314F4A", "#31344F"],
            Sizes = ["Small", "Medium", "Large", "X-Large"],
            
        },
        new()
        {
            Id = 4,
            ImageSrc = "/images/card-item-4.png",
            Title = "Loose Fit Bermuda Shorts",
            Description = "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
            Rating = 3.0,
            CurrentPrice = 212,
            OldPrice = 232,
            Discount = 0.2,
            Colors = ["#4F4631", "#314F4A", "#31344F"],
            Sizes = ["Small", "Medium", "Large", "X-Large"],
            UnitsInStock = 10,
            Images =
            [
                "/images/card-item-1.png",
                "/images/card-item-3.png",
                "/images/card-item-4.png"
            ],
        },
        new()
        {
            Id = 5,
            ImageSrc = "/images/card-item-5.png",
            Title = "Faded Skinny Jeans",
            Rating = 4.5,
            Description = "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
            CurrentPrice = 212,
            OldPrice = 232,
            Discount = 0.2,
            Colors = ["#4F4631", "#314F4A", "#31344F"],
            Sizes = ["Small", "Medium", "Large", "X-Large"],
            UnitsInStock = 10,
            Images =
            [
                "/images/card-item-1.png",
                "/images/card-item-3.png",
                "/images/card-item-4.png"
            ],
        }
    ];
    
    public static List<ReviewModel> Reviews =
    [
        new()
        {
            UserName = "John Doe", Rating = 5, Comment = "Great quality and fit!", CreatedAt = DateTime.Now.AddDays(-2)
        },
        new()
        {
            UserName = "Jane Smith", Rating = 4, Comment = "Very comfortable, but a bit pricey.",
            CreatedAt = DateTime.Now.AddDays(-5)
        },
        new()
        {
            UserName = "Alice Johnson", Rating = 3, Comment = "Average product, nothing special.",
            CreatedAt = DateTime.Now.AddDays(-10)
        },
        new()
        {
            UserName = "Bob Brown", Rating = 2, Comment = "Not what I expected, quality could be better.",
            CreatedAt = DateTime.Now.AddDays(-15)
        },
        new()
        {
            UserName = "John Doe", Rating = 5, Comment = "Great quality and fit!", CreatedAt = DateTime.Now.AddDays(-2)
        },
        new()
        {
            UserName = "Jane Smith", Rating = 4, Comment = "Very comfortable, but a bit pricey.",
            CreatedAt = DateTime.Now.AddDays(-5)
        },
        new()
        {
            UserName = "Alice Johnson", Rating = 3, Comment = "Average product, nothing special.",
            CreatedAt = DateTime.Now.AddDays(-10)
        },
    ];
}