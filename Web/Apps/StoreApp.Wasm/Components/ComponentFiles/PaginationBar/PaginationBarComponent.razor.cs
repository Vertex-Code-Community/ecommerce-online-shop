using Microsoft.AspNetCore.Components;

namespace StoreApp.Wasm.Components.ComponentFiles.PaginationBar;

public partial class PaginationBarComponent
{
    [Parameter] public int CurrentPage { get; set; } = 1;
    [Parameter] public int TotalPages { get; set; }
    [Parameter] public int MaxVisiblePages { get; set; } = 5;
    [Parameter] public EventCallback<int> OnPageChanged { get; set; }

    private async Task SelectPage(int page)
    {
        if (page != CurrentPage && page > 0 && page <= TotalPages)
        {
            CurrentPage = page;
            await OnPageChanged.InvokeAsync(page);
        }
    }

    private IEnumerable<object> GetPageItems()
    {
        if (TotalPages <= MaxVisiblePages + 2)
            return Enumerable.Range(1, TotalPages).Cast<object>();

        var items = new List<object>();
        int side = MaxVisiblePages / 2;

        int start = Math.Max(2, CurrentPage - side);
        int end = Math.Min(TotalPages - 1, CurrentPage + side);

        if (start > 2)
        {
            items.Add(1);
            items.Add("...");
        }
        else
        {
            for (int i = 1; i < start; i++)
                items.Add(i);
        }

        for (int i = start; i <= end; i++)
            items.Add(i);

        if (end < TotalPages - 1)
        {
            items.Add("...");
            items.Add(TotalPages);
        }
        else
        {
            for (int i = end + 1; i <= TotalPages; i++)
                items.Add(i);
        }

        return items;
    }
}
