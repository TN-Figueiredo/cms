import { describe, it, expect } from 'vitest'

describe('@tn-figueiredo/cms/login subpath', () => {
  it('exports CmsLogin without pulling barrel', async () => {
    const login = await import('../../src/login')
    expect(login.CmsLogin).toBeDefined()
    expect(typeof login.CmsLogin).toBe('function')
  })

  it('exports CmsForgotPassword', async () => {
    const login = await import('../../src/login')
    expect(login.CmsForgotPassword).toBeDefined()
    expect(typeof login.CmsForgotPassword).toBe('function')
  })

  it('exports CmsResetPassword', async () => {
    const login = await import('../../src/login')
    expect(login.CmsResetPassword).toBeDefined()
    expect(typeof login.CmsResetPassword).toBe('function')
  })

  it('exports getCmsAuthStrings', async () => {
    const login = await import('../../src/login')
    expect(typeof login.getCmsAuthStrings).toBe('function')
    const s = login.getCmsAuthStrings('pt-BR')
    expect(s.title).toBe('CMS')
  })

  it('exports getCmsForgotPasswordStrings', async () => {
    const login = await import('../../src/login')
    expect(typeof login.getCmsForgotPasswordStrings).toBe('function')
  })

  it('exports getCmsResetPasswordStrings', async () => {
    const login = await import('../../src/login')
    expect(typeof login.getCmsResetPasswordStrings).toBe('function')
  })

  it('exports CMS_THEME_DEFAULT with expected keys', async () => {
    const login = await import('../../src/login')
    expect(login.CMS_THEME_DEFAULT).toBeDefined()
    expect(login.CMS_THEME_DEFAULT.bg).toBe('#fafaf9')
    expect(login.CMS_THEME_DEFAULT.accent).toBe('#18181b')
  })

  it('does NOT re-export barrel symbols (compileMdx, PostEditor, MdxRunner)', async () => {
    const login = await import('../../src/login')
    const keys = Object.keys(login)
    expect(keys).not.toContain('compileMdx')
    expect(keys).not.toContain('PostEditor')
    expect(keys).not.toContain('MdxRunner')
    expect(keys).not.toContain('SupabasePostRepository')
  })

  it('does NOT re-export ring symbols (SupabaseRingContext)', async () => {
    const login = await import('../../src/login')
    const keys = Object.keys(login)
    expect(keys).not.toContain('SupabaseRingContext')
  })
})
