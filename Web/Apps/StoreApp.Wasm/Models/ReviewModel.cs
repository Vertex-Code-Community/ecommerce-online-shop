namespace StoreApp.Wasm.Models;

public class ReviewModel
{
    public int Rating { get; set; }

    public string Comment { get; set; } = String.Empty;
    
    public string UserName { get; set; } = String.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}