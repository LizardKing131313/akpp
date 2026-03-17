import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'

import { usePageHeader, usePageHeaderState } from '~/composables/usePageHeader'

describe('usePageHeader', () => {
  afterEach(() => {
    usePageHeaderState().value = null
  })

  it('stores normalized runtime page header state', async () => {
    const wrapper = await mountSuspended(
      defineComponent({
        setup() {
          usePageHeader({
            title: '  Контакты  ',
            baseItems: [{ name: 'Главная', slug: '/' }],
          })

          return () => null
        },
      }),
      {
        route: '/kontaktyi',
      }
    )

    expect(usePageHeaderState().value).toEqual({
      path: '/kontaktyi',
      meta: {
        breadcrumb: 'Контакты',
        breadcrumbs: [{ name: 'Главная', slug: '/' }, { name: 'Контакты' }],
      },
    })

    wrapper.unmount()

    expect(usePageHeaderState().value).toBeNull()
  })
})
