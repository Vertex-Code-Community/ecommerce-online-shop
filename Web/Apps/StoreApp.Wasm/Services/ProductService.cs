using StoreApp.Models;
using System.Net.Http.Json;
using StoreApp.Wasm.Models;

namespace StoreApp.Wasm.Services;

public class ProductService(HttpClient httpClient) : IProductService
{
    public async Task<Models.ProductModel?> GetProductByIdAsync(int productId)
    {
        var apiProduct = await httpClient.GetFromJsonAsync<FullProductModel>($"product/{productId}");
        return apiProduct is null ? null : MapToClientModel(apiProduct, httpClient.BaseAddress!);
    }

    public async Task<List<Models.ProductModel>> GetAlsoLikeProductsAsync(int productId)
    {
        var apiProducts = await httpClient.GetFromJsonAsync<List<FullProductModel>>("product/recommendations/" + productId) ?? new();
        return apiProducts.Select(p => MapToClientModel(p, httpClient.BaseAddress!)).ToList();
    }

    public async Task<List<Models.ProductModel>> GetAllProductsAsync()
    {
        var apiProducts = await httpClient.GetFromJsonAsync<List<FullProductModel>>("product") ?? new();
        return apiProducts.Select(p => MapToClientModel(p, httpClient.BaseAddress!)).ToList();
    }

    public async Task<List<Models.ProductModel>> GetAllProductsAsyncWithFiltersAsync(decimal? minPrice, decimal? maxPrice, string? search)
    {
        var url = $"product?minPrice={(minPrice?.ToString() ?? string.Empty)}&maxPrice={(maxPrice?.ToString() ?? string.Empty)}&search={Uri.EscapeDataString(search ?? string.Empty)}";
        var apiProducts = await httpClient.GetFromJsonAsync<List<FullProductModel>>(url) ?? new();
        return apiProducts.Select(p => MapToClientModel(p, httpClient.BaseAddress!)).ToList();
    }

    public async Task<List<Models.ProductModel>> GetNewArrivalsAsync(int take = 8)
    {
        var apiProducts = await httpClient.GetFromJsonAsync<List<FullProductModel>>($"product/new-arrivals?take={take}") ?? new();
        return apiProducts.Select(p => MapToClientModel(p, httpClient.BaseAddress!)).ToList();
    }

    public async Task<List<Models.ProductModel>> GetTopSellingAsync(int take = 8)
    {
        var apiProducts = await httpClient.GetFromJsonAsync<List<FullProductModel>>($"product/top-selling?take={take}") ?? new();
        return apiProducts.Select(p => MapToClientModel(p, httpClient.BaseAddress!)).ToList();
    }

    public async Task<List<Models.ProductModel>> GetRecommendationsAsync(int productId, int take = 4)
    {
        var apiProducts = await httpClient.GetFromJsonAsync<List<FullProductModel>>($"product/recommendations/{productId}?take={take}") ?? new();
        return apiProducts.Select(p => MapToClientModel(p, httpClient.BaseAddress!)).ToList();
    }

    private static Models.ProductModel MapToClientModel(FullProductModel apiFullProduct, Uri baseAddress)
    {
        var apiRoot = new Uri(baseAddress, "../");
        var imageSrc = string.IsNullOrWhiteSpace(apiFullProduct.ImageUrl)
            ? string.Empty
            : new Uri(apiRoot, apiFullProduct.ImageUrl.TrimStart('/')).ToString();

        var availableColors = apiFullProduct.Details?.Select(c => new Models.ColorModel
        {
            Id = c.Id,
            Name = c.ColorName,
            HexCode = c.ColorHex
        }).ToList() ?? new List<Models.ColorModel>();

        var availableSizes = apiFullProduct.Details?.Select(s => new Models.SizeModel
        {
            Id = s.Id,
            Name = s.SizeName,
            Description = string.Empty
        }).ToList() ?? new List<Models.SizeModel>();

        var colors = availableColors.Select(c => c.HexCode).ToList();
        var sizes = availableSizes.Select(s => s.Name).ToList();

        var unitsInStock = apiFullProduct.UnitsInStock > 0 
                            ? apiFullProduct.UnitsInStock 
                            : apiFullProduct.Details.Sum(v => v.UnitsInStock);

        var basePrice = apiFullProduct.Price;
        var discount = apiFullProduct.Discount ?? 0m;
        var discountedPrice = basePrice * (1 - discount);

        var roundedRating = Math.Round(apiFullProduct.Rating, 1, MidpointRounding.AwayFromZero);

        return new Models.ProductModel
        {
            Id = apiFullProduct.Id,
            Title = apiFullProduct.Name,
            Description = apiFullProduct.Description ?? string.Empty,
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