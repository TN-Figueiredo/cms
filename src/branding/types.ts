/**
 * SiteBranding — per-site visual + locale metadata consumed by CMS + admin
 * components (login pages, admin chrome). Canonical owner is
 * `@tn-figueiredo/admin@>=0.6.0`; this module mirrors the shape locally so
 * CMS consumers can receive branding from their own resolver (middleware,
 * server component) without taking a hard dependency on `admin`.
 *
 * Shapes MUST stay structurally identical to `@tn-figueiredo/admin`'s
 * `SiteBranding`; a mismatch would surface as a TS error at the consumer
 * call site that passes branding to both packages.
 */
export interface SiteBranding {
  siteName: string
  primaryDomain: string
  logoUrl?: string
  primaryColor?: string
  defaultLocale: string
}
