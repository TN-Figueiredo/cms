import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import { CmsSiteSwitcher } from '../../src/site-switcher/site-switcher'
import type { AccessibleSite } from '../../src/site-switcher/site-switcher'

function siteA(): AccessibleSite {
  return {
    site_id: 'site-a',
    site_name: 'Site A',
    site_slug: 'site-a',
    primary_domain: 'site-a.example.com',
    org_id: 'org-1',
    org_name: 'Org One',
    user_role: 'editor',
    is_master_ring: false,
  }
}

function siteB(): AccessibleSite {
  return {
    site_id: 'site-b',
    site_name: 'Site B',
    site_slug: 'site-b',
    primary_domain: 'site-b.example.com',
    org_id: 'org-1',
    org_name: 'Org One',
    user_role: 'reporter',
    is_master_ring: false,
  }
}

function siteC(): AccessibleSite {
  return {
    site_id: 'site-c',
    site_name: 'Site C',
    site_slug: 'site-c',
    primary_domain: 'site-c.example.com',
    org_id: 'org-2',
    org_name: 'Org Two',
    user_role: 'org_admin',
    is_master_ring: false,
  }
}

describe('<CmsSiteSwitcher>', () => {
  it('returns null when fewer than 2 sites are available', () => {
    const { container } = render(
      <CmsSiteSwitcher sites={[siteA()]} currentSiteId="site-a" onChange={() => {}} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders grouped dropdown with optgroups per org and options showing site + role', () => {
    render(
      <CmsSiteSwitcher
        sites={[siteA(), siteB(), siteC()]}
        currentSiteId="site-a"
        onChange={() => {}}
      />
    )
    const combobox = screen.getByRole('combobox', { name: /selecionar site do cms/i })
    expect(combobox).toBeTruthy()
    const optgroups = combobox.querySelectorAll('optgroup')
    expect(optgroups.length).toBe(2)
    const orgLabels = Array.from(optgroups).map((g) => g.getAttribute('label'))
    expect(orgLabels).toContain('Org One')
    expect(orgLabels).toContain('Org Two')
    expect(screen.getByText(/Site A · editor/i)).toBeTruthy()
    expect(screen.getByText(/Site B · reporter/i)).toBeTruthy()
    expect(screen.getByText(/Site C · org_admin/i)).toBeTruthy()
  })

  it('calls onChange with the selected site id', () => {
    const onChange = vi.fn()
    render(
      <CmsSiteSwitcher
        sites={[siteA(), siteB()]}
        currentSiteId="site-a"
        onChange={onChange}
      />
    )
    const combobox = screen.getByRole('combobox', { name: /selecionar site do cms/i })
    fireEvent.change(combobox, { target: { value: 'site-b' } })
    expect(onChange).toHaveBeenCalledWith('site-b')
  })
})
