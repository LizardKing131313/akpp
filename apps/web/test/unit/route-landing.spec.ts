import type { RouteLandingItem } from '../../shared/types/route-landing'

import { describe, expect, it } from 'vitest'

import {
  buildRouteLandingPath,
  getRouteLandingDisplayTitle,
  getRouteLandingMenuTitle,
} from '../../shared/lib/route-landing'

const TITLE_FALLBACK = 'Title fallback'

const createLanding = (overrides: Partial<RouteLandingItem> = {}): RouteLandingItem => {
  return {
    id: 'landing-1',
    page_type: 'brand',
    title: 'Общий тайтл',
    h1: 'Общий H1',
    seo_title: 'SEO title',
    seo_description: 'SEO description',
    content: '<p>content</p>',
    menu_title: '',
    breadcrumb_title: '',
    is_active: true,
    path: '/remont-akpp-bmw',
    brand: {
      id: 'brand-1',
      slug: 'bmw',
      name: 'BMW',
      image_source: '/brand/bmw.webp',
    },
    model: null,
    service: null,
    ...overrides,
  }
}

describe('route landing helpers', () => {
  it('builds predictable paths for each page type', () => {
    expect(
      buildRouteLandingPath({
        page_type: 'brand',
        brand: { slug: 'audi' },
      })
    ).toBe('/remont-akpp-audi')

    expect(
      buildRouteLandingPath({
        page_type: 'brand_model',
        brand: { slug: 'audi' },
        model: { slug: 'a4' },
      })
    ).toBe('/remont-akpp-audi/a4')

    expect(
      buildRouteLandingPath({
        page_type: 'service',
        service: { slug: 'diagnostika' },
      })
    ).toBe('/uslugi/diagnostika')

    expect(
      buildRouteLandingPath({
        page_type: 'service_brand',
        service: { slug: 'remont' },
        brand: { slug: 'volvo' },
      })
    ).toBe('/uslugi/remont/volvo')

    expect(
      buildRouteLandingPath({
        page_type: 'service_brand',
        service: { slug: '' },
        brand: { slug: 'volvo' },
      })
    ).toBe('/')
  })

  it('picks display title by priority', () => {
    expect(
      getRouteLandingDisplayTitle(
        createLanding({
          breadcrumb_title: 'Хлебная крошка',
        })
      )
    ).toBe('Хлебная крошка')

    expect(
      getRouteLandingDisplayTitle(
        createLanding({
          breadcrumb_title: '',
          h1: 'Страница модели',
        })
      )
    ).toBe('Страница модели')

    expect(
      getRouteLandingDisplayTitle(
        createLanding({
          breadcrumb_title: '',
          h1: '',
          title: TITLE_FALLBACK,
        })
      )
    ).toBe(TITLE_FALLBACK)

    expect(
      getRouteLandingDisplayTitle(
        createLanding({
          page_type: 'brand_model',
          breadcrumb_title: '',
          h1: '',
          title: '',
          model: {
            id: 'model-1',
            slug: 'x5',
            name: 'X5',
            image_source: '/model/x5.webp',
          },
        })
      )
    ).toBe('X5')
  })

  it('picks menu title before display title', () => {
    expect(
      getRouteLandingMenuTitle(
        createLanding({
          menu_title: 'Меню BMW',
        })
      )
    ).toBe('Меню BMW')

    expect(
      getRouteLandingMenuTitle(
        createLanding({
          menu_title: '',
          breadcrumb_title: '',
          h1: '',
          title: TITLE_FALLBACK,
        })
      )
    ).toBe(TITLE_FALLBACK)
  })
})
