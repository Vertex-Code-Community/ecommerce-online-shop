namespace StoreApp.Models;

public class ReviewModel
{
	public long Id { get; set; }
	
	public int ProductId { get; set; }
	
	public string UserName { get; set; } = string.Empty;
	
	public string? Comment { get; set; } = string.Empty;
	
	public int Rating { get; set; }
	
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
