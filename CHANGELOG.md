# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[unreleased]: https://github.com/TN-Figueiredo/cms/compare/v0.1.0-beta.3...HEAD
[0.1.0-beta.3]: https://github.com/TN-Figueiredo/cms/compare/v0.1.0-beta.2...v0.1.0-beta.3
[0.1.0-beta.2]: https://github.com/TN-Figueiredo/cms/compare/v0.1.0-beta.1...v0.1.0-beta.2
[0.1.0-beta.1]: https://github.com/TN-Figueiredo/cms/releases/tag/v0.1.0-beta.1
