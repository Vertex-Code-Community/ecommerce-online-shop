using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using StoreApp.API.Middleware;
using StoreApp.BLL.MapperProvider;
using StoreApp.BLL.Options;
using StoreApp.BLL.Security;
using StoreApp.BLL.Services;
using StoreApp.DAL.Data;
using StoreApp.DAL.Repositories;
using StoreApp.DAL.Repositories.Interfaces;
using StoreApp.Shared.Constants;
using StoreApp.BLL.Interfaces.Security;
using StoreApp.Shared.Interfaces.Services;
using StoreApp.BLL.Interfaces.Services;
using System.Text;

namespace StoreApp.API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddOpenApi();
        builder.Services.AddControllers();

        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string"
            + "'DefaultConnection' not found.");

        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(connectionString));
        
        // Repositories
        builder.Services.AddScoped<IUserRepository, UserRepository>();
        builder.Services.AddScoped<IProductRepository, ProductRepository>();
        builder.Services.AddScoped<ICartItemRepository, CartItemRepository>();
        builder.Services.AddScoped<IReviewRepository, ReviewRepository>();

        // Services
        builder.Services.AddScoped<IJwtProvider, JwtProvider>();
        builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
        builder.Services.AddScoped<IAuthService, AuthService>();
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IProductService, ProductService>();
        builder.Services.AddScoped<ICartItemService, CartItemService>();
        builder.Services.AddScoped<IReviewService, ReviewService>();

        // Mapper
        builder.Services.AddAutoMapper(typeof(MappingProfile));

        // JWT options
        builder.Services.Configure<JwtOptions>(builder.Configuration
            .GetSection(nameof(JwtOptions)));

        var jwtOptions = builder.Configuration.GetSection(nameof(JwtOptions)).Get<JwtOptions>();
        if (jwtOptions is null)
        {
            throw new InvalidOperationException("Incorrectly configured JwtOptions");
        }

        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).
            AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.TokenValidationParameters = new()
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jwtOptions.SecretKey)),
                    ClockSkew = TimeSpan.Zero
                };

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        context.Token = context.Request.Cookies[AuthConstants.AccessTokenCookie];
                        return Task.CompletedTask;
                    }
                };
            });

        var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>();
        if (allowedOrigins is null || allowedOrigins.Length == 0)
        {
            throw new InvalidOperationException("CORS configuration is missing or empty");
        }

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("Cors", builder =>
            {
                builder
                    .WithOrigins(allowedOrigins)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });

        builder.Services.AddAuthorization();

        var app = builder.Build();

        app.UseStaticFiles();

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference(options =>
            {
                options
                    .WithTitle("StoreApp API")
                    .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient);
            });

            app.MapGet("/", context =>
            {
                context.Response.Redirect("/scalar");
                return Task.CompletedTask;
            });
        }

        app.UseRouting();

        app.UseCors("Cors");

        app.UseCookiePolicy(new CookiePolicyOptions()
        {
            MinimumSameSitePolicy = SameSiteMode.None,  // TODO: in future change to strict for more security
            HttpOnly = HttpOnlyPolicy.Always,
            Secure = CookieSecurePolicy.Always
        });

        app.UseAuthentication();
        app.UseAuthorization();
        
        app.UseMiddleware<ExceptionHandlingMiddleware>();

        app.MapControllers();

        using (var scope = app.Services.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            SeedData.SeedColorsAndSizes(context);
            SeedData.SeedProductVariants(context);
        }

        app.Run();
    }
}
