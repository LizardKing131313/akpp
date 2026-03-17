import { describe, expect, it } from 'vitest'

import { normalizeAppPath } from '../../shared/lib/route'

describe('normalizeAppPath', () => {
  it('returns root for empty values', () => {
    expect(normalizeAppPath(undefined)).toBe('/')
    expect(normalizeAppPath('')).toBe('/')
    expect(normalizeAppPath('   ')).toBe('/')
    expect(normalizeAppPath('/')).toBe('/')
  })

  it('adds leading slash to local relative paths', () => {
    expect(normalizeAppPath('articles')).toBe('/articles')
    expect(normalizeAppPath('articles/page-2')).toBe('/articles/page-2')
  })

  it('keeps absolute, anchor and external urls intact', () => {
    expect(normalizeAppPath('/kontaktyi')).toBe('/kontaktyi')
    expect(normalizeAppPath('#services')).toBe('#services')
    expect(normalizeAppPath('https://akpp.example/path')).toBe('https://akpp.example/path')
  })
})
