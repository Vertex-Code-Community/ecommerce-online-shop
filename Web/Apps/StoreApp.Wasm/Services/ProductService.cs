using System.Net.Http.Json;
using StoreApp.Wasm.Models;
using SharedProductModel = StoreApp.Models.ProductModel;

namespace StoreApp.Wasm.Services;

public class ProductService(HttpClient httpClient) : IProductService
{
    public async Task<ProductModel?> GetProductByIdAsync(int productId)
    {
        var apiProduct = await httpClient.GetFromJsonAsync<SharedProductModel>($"product/{productId}");
        return apiProduct is null ? null : MapToClientModel(apiProduct, httpClient.BaseAddress!);
    }

    public async Task<List<ProductModel>> GetAlsoLikeProductsAsync(int productId)
    {
        var apiProducts = await httpClient.GetFromJsonAsync<List<SharedProductModel>>("product/recommendations/" + productId) ?? new();
        return apiProducts.Select(p => MapToClientModel(p, httpClient.BaseAddress!)).ToList();
    }

    public async Task<List<ProductModel>> GetAllProductsAsync()
    {
        var apiProducts = await httpClient.GetFromJsonAsync<List<SharedProductModel>>("product") ?? new();
        return apiProducts.Select(p => MapToClientModel(p, httpClient.BaseAddress!)).ToList();
    }

    public async Task<List<ProductModel>> GetAllProductsAsyncWithFiltersAsync(decimal? minPrice, decimal? maxPrice, string? search)
    {
        var url = $"product?minPrice={(minPrice?.ToString() ?? string.Empty)}&maxPrice={(maxPrice?.ToString() ?? string.Empty)}&search={Uri.EscapeDataString(search ?? string.Empty)}";
        var apiProducts = await httpClient.GetFromJsonAsync<List<SharedProductModel>>(url) ?? new();
        return apiProducts.Select(p => MapToClientModel(p, httpClient.BaseAddress!)).ToList();
    }

    public async Task<List<ProductModel>> GetNewArrivalsAsync(int take = 8)
    {
        var apiProducts = await httpClient.GetFromJsonAsync<List<SharedProductModel>>($"product/new-arrivals?take={take}") ?? new();
        return apiProducts.Select(p => MapToClientModel(p, httpClient.BaseAddress!)).ToList();
    }

    public async Task<List<ProductModel>> GetTopSellingAsync(int take = 8)
    {
        var apiProducts = await httpClient.GetFromJsonAsync<List<SharedProductModel>>($"product/top-selling?take={take}") ?? new();
        return apiProducts.Select(p => MapToClientModel(p, httpClient.BaseAddress!)).ToList();
    }

    public async Task<List<ProductModel>> GetRecommendationsAsync(int productId, int take = 4)
    {
        var apiProducts = await httpClient.GetFromJsonAsync<List<SharedProductModel>>($"product/recommendations/{productId}?take={take}") ?? new();
        return apiProducts.Select(p => MapToClientModel(p, httpClient.BaseAddress!)).ToList();
    }

    private static ProductModel MapToClientModel(SharedProductModel apiProduct, Uri baseAddress)
    {
        var apiRoot = new Uri(baseAddress, "../");
        var imageSrc = string.IsNullOrWhiteSpace(apiProduct.ImageUrl)
            ? string.Empty
            : new Uri(apiRoot, apiProduct.ImageUrl.TrimStart('/')).ToString();

        var availableColors = apiProduct.AvailableColors?.Select(c => new ColorModel
        {
            Id = c.Id,
            Name = c.Name,
            HexCode = c.HexCode
        }).ToList() ?? new List<ColorModel>();

        var availableSizes = apiProduct.AvailableSizes?.Select(s => new SizeModel
        {
            Id = s.Id,
            Name = s.Name,
            Description = s.Description
        }).ToList() ?? new List<SizeModel>();

        var colors = availableColors.Select(c => c.HexCode).ToList();
        var sizes = availableSizes.Select(s => s.Name).ToList();

        var unitsInStock = apiProduct.UnitsInStock > 0 
                            ? apiProduct.UnitsInStock 
                            : apiProduct.Variants.Sum(v => v.UnitsInStock);

        var basePrice = apiProduct.Price;
        var discount = apiProduct.Discount ?? 0m;
        var discountedPrice = basePrice * (1 - discount);

        var roundedRating = Math.Round(apiProduct.Rating, 1, MidpointRounding.AwayFromZero);

        return new ProductModel
        {
            Id = apiProduct.Id,
            Title = apiProduct.Name,
            Description = apiProduct.Description ?? string.Empty,
            CurrentPrice = (double)discountedPrice,
            OldPrice = discount > 0 ? (double)basePrice : null,
            Discount = discount > 0 ? (double)discount : null,
            ImageSrc = imageSrc,
            Images = string.IsNullOrWhiteSpace(imageSrc) ? new List<string>() : new List<string> { imageSrc },
            AvailableColors = availableColors,
            AvailableSizes = availableSizes,
            Colors = colors,
            Sizes = sizes,
            UnitsInStock = unitsInStock,
            Rating = roundedRating
        };
    }
}