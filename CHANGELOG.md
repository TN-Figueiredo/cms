# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-04-16

### Added

- `<CmsSiteSwitcher>` — org-grouped site-switcher `<select>` for the CMS multi-site
  chrome. Consumes rows from the `user_accessible_sites` RPC (Sprint 4.75 Track A).
  Returns null when fewer than 2 sites are accessible. Exported from the main barrel.
- `<SubmitForReviewButton>` — reporter-facing action that flips a post from `draft` →
  `pending_review` via a consumer-provided `onSubmit(postId)` callback. Disables during
  the in-flight request; catches rejections internally to avoid unhandled-rejection
  noise.
- `<ReviewQueue>` — editor+ inbox rendering `pending_review` posts with Approve /
  Reject actions. Rejection opens `window.prompt` for a reason; skipped on cancel or
  empty input. Default copy pt-BR; date formatting and class names overrideable.
- `AccessibleSite` type mirrored from the `user_accessible_sites` RPC contract so
  consumers can adopt the switcher without importing from `@tn-figueiredo/auth-nextjs`.
- `SiteBranding` type mirrored from `@tn-figueiredo/admin@>=0.6.0` so CMS consumers
  can flow the per-site branding metadata (login page, chrome) without taking a hard
  `admin` dependency. Shape is structurally identical by design.
- `./review` is wired through the main barrel; a standalone `./site-switcher` subpath
  is not shipped in 0.2.0 — the components are tree-shakeable from the barrel.

### Changed

- **Exits beta.** First stable minor release of `@tn-figueiredo/cms`.
- Peer dep on `@tn-figueiredo/auth-nextjs` tightened from `>=2.1.1` to `^2.2.0` (Track C).
  Consumers get the new `requireSiteScope`/`is_member_staff`/`useAccessibleSites` RPC
  wiring surface when paired with this release, and the `/actions` subpath types keep
  compatibility with the `<CmsLogin>` family shipped in `0.1.0-beta.4`.

## [0.1.0-beta.4] - 2026-04-16

### Changed

- **Breaking (beta):** `ActionResult` is now a discriminated union — `({ ok: true } & TExtra) | { ok: false; error: string }` — imported from `@tn-figueiredo/auth-nextjs/actions` instead of the flat `{ ok: boolean; error?: string; url?: string }` interface shipped in `0.1.0-beta.3`. Consumers must narrow via `if (result.ok)` before accessing success-branch fields (e.g. `result.url` on the Google OAuth action). The cms login components do this narrowing internally; downstream consumers that mock or consume `ActionResult` directly need the same update.
- Flipped inline login primitives (`ActionResult`, `SignInPasswordInput`, `SignInGoogleInput`, `ForgotPasswordInput`, `ResetPasswordInput`, `AuthTheme`, `AuthStrings`) in `src/login/types.ts` to re-exports from `@tn-figueiredo/auth-nextjs/actions`. Closes the `TODO(phase4-consumer)` banner introduced in beta.3.
- `<CmsLogin>` Google OAuth handler narrows `ActionResult<{ url: string }>` before redirecting.

### Added

- `@tn-figueiredo/auth-nextjs` declared as a peer dependency at `>=2.1.1` (first release that ships the `/actions` subpath with the canonical login types).

### Notes

- The component-facing prop interfaces (`AuthPageProps`, `ForgotPasswordPageProps`, `ResetPasswordPageProps`) stay defined locally in this package — their `actions.*` sub-types are intentionally narrower than the canonical server-action inputs because components do not know consumer-specific fields (`appUrl`, `resetPath`, `callbackPath`). Consumers pre-bind those fields in a `'use server'` wrapper and hand the narrower fn to the component; the canonical primitives are available for typing the wrapper itself.

## [0.1.0-beta.3] - 2026-04-15

### Added

- `@tn-figueiredo/cms/login` subpath export — client-component-safe entry point exposing `<CmsLogin>`, `<CmsForgotPassword>`, `<CmsResetPassword>` and `getCmsAuthStrings(locale)` / `getCmsForgotPasswordStrings(locale)` / `getCmsResetPasswordStrings(locale)` i18n helpers (pt-BR + en). Isolated from the main barrel to avoid pulling MDX compiler and editor deps into a client bundle.
- `AuthTheme`, `AuthStrings`, `ForgotPasswordStrings`, `ResetPasswordStrings`, `AuthPageProps`, `ForgotPasswordPageProps`, `ResetPasswordPageProps` interfaces exported from `./login`.
- `CMS_THEME_DEFAULT` theme preset (stone-50 bg, zinc-900 accent — content-creator vibe). Consumers override via `theme` prop; all colors applied as CSS variables (`--auth-bg`, `--auth-accent`, etc.).
- Turnstile anti-bot widget support via optional `turnstile={{ siteKey }}` prop on all three components.
- Inline minimal `ActionResult` / `SignInPasswordInput` / `SignInGoogleInput` / `ForgotPasswordInput` / `ResetPasswordInput` types, to be replaced with imports from `@tn-figueiredo/auth-nextjs >= 2.1.0` once that package is published (peer dep + import flip deferred to a follow-up phase).

## [0.1.0-beta.2] - 2026-04-15

### Added

- `@tn-figueiredo/cms/ring` subpath export — Edge-runtime-safe entry point exposing only `SupabaseRingContext`, `IRingContext`, `Organization`, and `Site`. Use this in Next.js middleware instead of the main barrel to avoid pulling in MDX compiler and React editor components.

## [0.1.0-beta.1] - 2026-04-15

### Added

- First published release; initial extraction from the `bythiagofigueiredo` monorepo.
- `PostEditor` React component with toolbar, live preview, asset picker, and autosave hook.
- `SupabasePostRepository`, `SupabaseContentRepository`, `SupabaseCampaignRepository` — Supabase-backed repository implementations.
- `SupabaseRingContext` — multi-ring / multi-site host resolution against `sites.domains`.
- MDX pipeline: `compileMdx()` (compile-on-save), `MdxRunner` (render-time `run()`), `extractToc()`, `calculateReadingTime()`, `defaultComponents`.
- i18n editor strings for pt-BR (default) and en, extensible via `getEditorStrings(locale)`.
- Opt-in shiki code block via `@tn-figueiredo/cms/code` subpath export.
- Campaign editor components (`CampaignEditor`, `CampaignMetaForm`, `CampaignTranslationForm`) and landing-page markdown renderer.
- `uploadContentAsset()` helper for Supabase Storage uploads.
- `debug` namespaced loggers exported as `log` (`tn-figueiredo:cms:editor|repo|mdx|ring`).

[unreleased]: https://github.com/TN-Figueiredo/cms/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/TN-Figueiredo/cms/compare/v0.1.0-beta.4...v0.2.0
[0.1.0-beta.4]: https://github.com/TN-Figueiredo/cms/compare/v0.1.0-beta.3...v0.1.0-beta.4
[0.1.0-beta.3]: https://github.com/TN-Figueiredo/cms/compare/v0.1.0-beta.2...v0.1.0-beta.3
[0.1.0-beta.2]: https://github.com/TN-Figueiredo/cms/compare/v0.1.0-beta.1...v0.1.0-beta.2
[0.1.0-beta.1]: https://github.com/TN-Figueiredo/cms/releases/tag/v0.1.0-beta.1
