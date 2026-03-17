import { describe, expect, it } from 'vitest'

import { xmlDoc, xmlRawTag, xmlTag } from '../../server/utils/xml'

describe('xml helpers', () => {
  it('escapes xml text values', () => {
    expect(xmlTag('title', `AT&T < "test" > 'ok'`)).toBe(
      '<title>AT&amp;T &lt; &quot;test&quot; &gt; &apos;ok&apos;</title>'
    )
  })

  it('keeps raw inner xml untouched when needed', () => {
    expect(xmlRawTag('url', '<loc>/articles</loc>')).toBe('<url><loc>/articles</loc></url>')
  })

  it('wraps xml document with declaration', () => {
    expect(xmlDoc('<root/>')).toBe('<?xml version="1.0" encoding="UTF-8"?>\n<root/>\n')
  })
})
