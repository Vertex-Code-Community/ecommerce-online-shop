using StoreApp.SharedAPI.Extensions;
using StoreApp.SharedAPI.Middleware;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

builder.Services
    .ConfigureCors(configuration)
    .ConfigureAuthorization(configuration)
    .ConfigureSwagger()
    .ConfigureServices(configuration);

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

app.Run();