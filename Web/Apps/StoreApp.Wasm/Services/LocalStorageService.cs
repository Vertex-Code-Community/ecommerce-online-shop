namespace StoreApp.Wasm.Services;

using System.Text.Json;
using Microsoft.JSInterop;

public class LocalStorageService(IJSRuntime js) : ILocalStorageService
{
    public async Task SetItemAsync<T>(string key, T value)
    {
        var json = JsonSerializer.Serialize(value);
        await js.InvokeVoidAsync("localStorage.setItem", key, json);
    }

    public async Task<T?> GetItemAsync<T>(string key)
    {
        var json = await js.InvokeAsync<string>("localStorage.getItem", key);
        return string.IsNullOrEmpty(json) ? default : JsonSerializer.Deserialize<T>(json);
    }

    public async Task RemoveItemAsync(string key)
    {
        await js.InvokeVoidAsync("localStorage.removeItem", key);
    }

    public async Task ClearAsync()
    {
        await js.InvokeVoidAsync("localStorage.clear");
    }

    public async Task<bool> ContainsKeyAsync(string key)
    {
        var value = await js.InvokeAsync<string>("localStorage.getItem", key);
        return !string.IsNullOrEmpty(value);
    }
}
