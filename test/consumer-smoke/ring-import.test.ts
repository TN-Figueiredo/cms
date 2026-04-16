import { describe, it, expect } from 'vitest'

describe('@tn-figueiredo/cms/ring subpath', () => {
  it('exports SupabaseRingContext without pulling barrel', async () => {
    const ring = await import('../../src/ring')
    expect(ring.SupabaseRingContext).toBeDefined()
    expect(typeof ring.SupabaseRingContext).toBe('function')
  })

  it('does NOT re-export barrel symbols (compileMdx, PostEditor)', async () => {
    const ring = await import('../../src/ring')
    const keys = Object.keys(ring)
    expect(keys).not.toContain('compileMdx')
    expect(keys).not.toContain('PostEditor')
    expect(keys).not.toContain('MdxRunner')
  })
})
