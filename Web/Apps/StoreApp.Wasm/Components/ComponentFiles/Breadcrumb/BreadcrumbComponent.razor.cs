using Microsoft.AspNetCore.Components;

namespace StoreApp.Wasm.Components.ComponentFiles.Breadcrumb;

public partial class BreadcrumbComponent
{
    [Parameter] public List<BreadcrumbItem> BreadcrumbItems { get; set; } = new();

    public class BreadcrumbItem
    {
        public string Text { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
    }
}
