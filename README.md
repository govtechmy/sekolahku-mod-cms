# sekolahku-mod-cms
Sekolahku CMS

## Session Security

This project enforces server-side authentication expiration for admin users.

- `PAYLOAD_TOKEN_EXPIRATION_SECONDS`: JWT/session lifetime in seconds. Default fallback is `3600` (60 minutes).
- `admin.autoRefresh` is disabled to avoid silent token extension while users remain on admin pages.
- Cookie policy is set to `SameSite=Lax` and `Secure=true` in production.

Optional best-effort browser-close behavior is available:

- `PAYLOAD_LOGOUT_ON_CLOSE=true` enables a client-side logout signal on tab/window close events.
- This is best-effort only and not guaranteed on every browser/device scenario.
