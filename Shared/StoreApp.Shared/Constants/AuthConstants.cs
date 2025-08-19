namespace StoreApp.Shared.Constants;

public static class AuthConstants
{
    public const string AccessTokenCookie = "access_token";
    public const string RefreshTokenCookie = "refresh_token";
    public const int AccessTokenExpiresMinutes = 15;
    public const int RefreshTokenExpiresDays = 7;
}
