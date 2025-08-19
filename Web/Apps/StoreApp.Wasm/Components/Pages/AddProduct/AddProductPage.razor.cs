using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Components.WebAssembly.Http;
using System.Net.Http.Json;
using SharedProductModel = StoreApp.Models.ProductModel;

namespace StoreApp.Wasm.Components.Pages.AddProduct;

public partial class AddProductPage : ComponentBase
{
    [Inject] public required HttpClient HttpClient { get; set; }
    [Inject] public required NavigationManager NavigationManager { get; set; }
	
	private ProductFormModel product = new();
	private string? imagePreviewDataUrl;
	private byte[]? imageBytes;
	private ProductFormModel? lastSavedProduct;
	private string? lastSavedImageDataUrl;
    private bool isSubmitting;
    private string? errorMessage;
    private bool isSuccess;

	private async Task OnImageSelected(InputFileChangeEventArgs e)
	{
		var file = e.File;
		if (file is null)
		{
			imagePreviewDataUrl = null;
			return;
		}

		using var stream = file.OpenReadStream(maxAllowedSize: 4 * 1024 * 1024);
		using var ms = new MemoryStream();
		await stream.CopyToAsync(ms);
		imageBytes = ms.ToArray();
		var base64 = Convert.ToBase64String(imageBytes);
		imagePreviewDataUrl = $"data:{file.ContentType};base64,{base64}";
	}

	private async Task HandleSubmit()
	{
		isSubmitting = true;
		errorMessage = null;
		isSuccess = false;

		try
		{
			var apiProduct = new SharedProductModel
			{
				Name = product.Name,
				Description = product.Description,
				Price = product.Price,
				Discount = product.Discount,
				UnitsInStock = product.UnitsInStock,
				ImageData = imageBytes
			};

			var request = new HttpRequestMessage(HttpMethod.Post, "product")
			{
				Content = JsonContent.Create(apiProduct)
			};
			request.SetBrowserRequestCredentials(BrowserRequestCredentials.Include);

			var response = await HttpClient.SendAsync(request);
			if (response.IsSuccessStatusCode)
			{
				isSuccess = true;
				// keep a local echo for confirmation
				lastSavedProduct = new ProductFormModel
				{
					Name = product.Name,
					Description = product.Description,
					Price = product.Price,
					UnitsInStock = product.UnitsInStock,
				};
				lastSavedImageDataUrl = imagePreviewDataUrl;
			}
			else
			{
				errorMessage = $"Error: {(int)response.StatusCode} {response.ReasonPhrase}";
			}
		}
		catch (Exception ex)
		{
			errorMessage = ex.Message;
		}
		finally
		{
			isSubmitting = false;
		}
	}

	private class ProductFormModel
	{
		[Required]
		[MaxLength(100)]
		public string Name { get; set; } = string.Empty;

		[MaxLength(400)]
		public string? Description { get; set; }

		[Range(0.01, double.MaxValue)]
		public decimal Price { get; set; }

		[Range(0, 1)]
		public decimal? Discount { get; set; }

		[Range(0, int.MaxValue)]
		public int UnitsInStock { get; set; } = 1;
	}
}
