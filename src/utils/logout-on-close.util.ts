/**
 * Whether the admin panel should send a best-effort logout beacon when the page
 * is hidden.
 *
 * Disabled unless PAYLOAD_LOGOUT_ON_CLOSE is explicitly "true", matching the
 * documented default in README.md and .env.example.
 *
 * Do not default this to enabled. The beacon fires on `pagehide`, which the
 * browser also emits during ordinary navigation, reloads and back/forward cache
 * transitions, not just when the tab closes. Because the users collection sets
 * `useSessions: true`, the beacon deletes the session server-side, so the JWT
 * cookie survives while the session behind it does not. The admin panel then
 * fails with "Unauthorized" on the next write and the form hangs mid-submit.
 *
 * Read at call time rather than module scope so the value reflects env vars
 * resolved from Secrets Manager at runtime.
 */
export const isLogoutOnCloseEnabled = (): boolean =>
  process.env.PAYLOAD_LOGOUT_ON_CLOSE === 'true'
