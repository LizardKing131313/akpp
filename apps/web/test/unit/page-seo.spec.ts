import { describe, expect, it } from 'vitest'

import {
  normalizePageSeoDescription,
  normalizePageSeoText,
  stripPageSeoHtml,
} from '../../app/composables/pageSeo'

describe('pageSeo helpers', () => {
  it('normalizes extra spaces', () => {
    expect(normalizePageSeoText('  АКПП   центр \n Москва  ')).toBe('АКПП центр Москва')
  })

  it('strips html before description normalization', () => {
    expect(stripPageSeoHtml('<p>Hello <strong>world</strong></p>')).toBe(' Hello  world  ')
    expect(normalizePageSeoDescription('<p>  Текст   <strong>с</strong> html </p>')).toBe(
      'Текст с html'
    )
  })

  it('limits description to 320 characters', () => {
    const longText = 'a'.repeat(400)

    expect(normalizePageSeoDescription(longText)).toHaveLength(320)
  })
})
