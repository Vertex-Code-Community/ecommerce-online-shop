using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using StoreApp.Wasm.Services;

namespace StoreApp.Wasm;
public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebAssemblyHostBuilder.CreateDefault(args);
        builder.RootComponents.Add<App>("#app");
        builder.RootComponents.Add<HeadOutlet>("head::after");

        var apiUrl = builder.Configuration["ApiUrl"] ?? "https://localhost:7056/api/";
        builder.Services.AddScoped(_ => new HttpClient { BaseAddress = new Uri(apiUrl) });
        
        builder.Services.AddScoped<IProductService, ProductService>();
        builder.Services.AddScoped<IReviewService, ReviewService>();
        builder.Services.AddScoped<ILocalStorageService, LocalStorageService>();
        builder.Services.AddScoped<ICartService, CartService>();

        await builder.Build().RunAsync();
    }
}
