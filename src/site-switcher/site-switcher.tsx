'use client'

/**
 * AccessibleSite — shape of one row returned by the `user_accessible_sites`
 * RPC defined in Sprint 4.75 Track A migrations. This is mirrored locally
 * (rather than imported from `@tn-figueiredo/auth-nextjs`) because the
 * canonical owner of this type is the RPC contract, and mirroring keeps this
 * component decoupled from the auth package's client bundle.
 *
 * Consumers who already have `AccessibleSite` from `@tn-figueiredo/auth-nextjs`
 * may pass those rows directly — the shapes are identical by design.
 */
export interface AccessibleSite {
  site_id: string
  site_name: string
  site_slug: string
  primary_domain: string
  org_id: string
  org_name: string
  user_role: 'super_admin' | 'org_admin' | 'editor' | 'reporter'
  is_master_ring: boolean
}

export interface CmsSiteSwitcherProps {
  sites: AccessibleSite[]
  currentSiteId: string | null
  onChange: (siteId: string) => void
  /** Optional ARIA label override (default: pt-BR "Selecionar site do CMS"). */
  ariaLabel?: string
  /** Optional className override for the select element. */
  className?: string
}

const DEFAULT_CLASS_NAME = 'rounded border bg-white px-3 py-1.5 text-sm'

export function CmsSiteSwitcher({
  sites,
  currentSiteId,
  onChange,
  ariaLabel = 'Selecionar site do CMS',
  className = DEFAULT_CLASS_NAME,
}: CmsSiteSwitcherProps) {
  if (sites.length < 2) return null

  // Group sites by org_name preserving first-seen order for stable UI.
  const orderedOrgs: string[] = []
  const grouped: Record<string, AccessibleSite[]> = {}
  for (const s of sites) {
    if (!grouped[s.org_name]) {
      grouped[s.org_name] = []
      orderedOrgs.push(s.org_name)
    }
    grouped[s.org_name]!.push(s)
  }

  return (
    <select
      // Explicit role mirrors native a11y contract; improves happy-dom / RTL
      // role-based queries that don't normalize implicit `<select>` roles.
      role="combobox"
      aria-label={ariaLabel}
      value={currentSiteId ?? ''}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
      {orderedOrgs.map((org) => (
        <optgroup key={org} label={org}>
          {grouped[org]!.map((s) => (
            <option key={s.site_id} value={s.site_id}>
              {s.site_name} · {s.user_role}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  )
}
