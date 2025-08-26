using StoreApp.API.Extensions;
using StoreApp.API.Middleware;
using StoreApp.DAL.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .ConfigureCors(builder.Configuration)
    .ConfigureAuthorization(builder.Configuration)
    .ConfigureSwagger()
    .ConfigureServices();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseRouting();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Cors");

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    SeedData.SeedProductVariants(context);
}

app.Run();