import { describe, expect, it } from 'vitest'

import {
  normalizePageHeaderBreadcrumbs,
  normalizePageHeaderMeta,
  normalizePageHeaderText,
} from '../../app/composables/pageHeader'

const HOME_NAME = 'Главная'
const CONTACTS_NAME = 'Контакты'
const REPAIR_TITLE = 'Ремонт АКПП'

describe('pageHeader helpers', () => {
  it('normalizes text values', () => {
    expect(normalizePageHeaderText('  Контакты  ')).toBe('Контакты')
    expect(normalizePageHeaderText(42)).toBe('')
  })

  it('drops invalid breadcrumbs and trims valid ones', () => {
    expect(
      normalizePageHeaderBreadcrumbs([
        { name: `  ${HOME_NAME}  `, slug: ' / ' },
        { name: '   ' },
        { name: CONTACTS_NAME, slug: ' kontaktyi ' },
      ])
    ).toEqual([
      { name: HOME_NAME, slug: '/' },
      { name: CONTACTS_NAME, slug: 'kontaktyi' },
    ])
  })

  it('normalizes page header meta', () => {
    expect(
      normalizePageHeaderMeta({
        breadcrumb: `  ${REPAIR_TITLE} `,
        breadcrumbs: [{ name: ` ${HOME_NAME} `, slug: '/' }, { name: ` ${REPAIR_TITLE} ` }],
      })
    ).toEqual({
      breadcrumb: REPAIR_TITLE,
      breadcrumbs: [{ name: HOME_NAME, slug: '/' }, { name: REPAIR_TITLE }],
    })
  })
})
