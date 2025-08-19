using Microsoft.AspNetCore.Components;
using StoreApp.Wasm.Services;
using StoreApp.Shared.Constants;

namespace StoreApp.Wasm.Components.ComponentFiles.Promo;

public partial class PromoComponent
{
    [Inject] public required ILocalStorageService LocalStorage { get; set; }

    private bool _isVisible;

    protected override async Task OnInitializedAsync()
    {
        var dismissed = await LocalStorage.GetItemAsync<bool?>(UiConstants.LocalStorageKeys.PromoDismissed);
        _isVisible = dismissed != true;
    }

    private async Task OnCloseClicked()
    {
        _isVisible = false;
        await LocalStorage.SetItemAsync(UiConstants.LocalStorageKeys.PromoDismissed, true);
        await InvokeAsync(StateHasChanged);
    }
}
