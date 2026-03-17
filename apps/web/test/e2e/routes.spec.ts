import { $fetch, setup, url } from '@nuxt/test-utils/e2e'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

process.env.NUXT_CACHE_PURGE_TOKEN = 'test-purge-token'
process.env.NUXT_DIRECTUS_CACHE_TTL_SECONDS = '600'
process.env.NUXT_PUBLIC_SITE_URL = 'https://akpp.example'

await setup({
  rootDir: fileURLToPath(new URL('../../', import.meta.url)),
})

describe('nitro routes', () => {
  it('returns dev robots.txt with noindex policy', async () => {
    const response = await fetch(url('/robots.txt'))

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('text/plain')
    expect(await response.text()).toContain('Disallow: /')
  })

  it('rejects cache purge without valid token', async () => {
    const response = await fetch(url('/api/cache/purge'), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({}),
    })

    expect(response.status).toBe(403)
  })

  it('accepts cache purge with valid token', async () => {
    const response = await $fetch('/api/cache/purge', {
      method: 'POST',
      body: {
        reason: 'test run',
        token: 'test-purge-token',
      },
    })

    expect(response).toMatchObject({
      ok: true,
      reason: 'test run',
    })
    expect(typeof response.purgedAt).toBe('string')
  })
})
