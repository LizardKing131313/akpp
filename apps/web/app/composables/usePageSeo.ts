import type { MaybeRefOrGetter } from 'vue'

import { computed, toValue } from 'vue'

import {
  normalizePageSeoDescription,
  normalizePageSeoText,
  type PageSeoBaseOptions,
  type PageSeoType,
} from '~/composables/pageSeo'

type UsePageSeoOptions = PageSeoBaseOptions & {
  readonly siteName?: MaybeRefOrGetter<string | undefined>
  readonly locale?: MaybeRefOrGetter<string | undefined>
}

export const usePageSeo = (options: UsePageSeoOptions) => {
  const route = useRoute()
  const requestUrl = useRequestURL()
  const runtimeConfig = useRuntimeConfig()

  const seoTitle = computed<string>(() => normalizePageSeoText(toValue(options.title)))
  const seoDescription = computed<string>(() =>
    normalizePageSeoDescription(toValue(options.description))
  )
  const canonicalUrl = computed<string>(() => new URL(route.fullPath, requestUrl.origin).toString())
  const seoType = computed<PageSeoType>(() => {
    const value = toValue(options.type)
    return value === 'article' ? 'article' : 'website'
  })
  const seoRobots = computed<string>(() => {
    const explicitRobots = normalizePageSeoText(toValue(options.robots))

    if (explicitRobots.length > 0) {
      return explicitRobots
    }

    return runtimeConfig.public.siteIndexable ? 'index,follow' : 'noindex,nofollow'
  })
  const seoSiteName = computed<string>(() =>
    normalizePageSeoText(toValue(options.siteName) || 'АКПП Центр')
  )
  const seoLocale = computed<string>(() => normalizePageSeoText(toValue(options.locale) || 'ru_RU'))
  const seoImage = computed<string>(() => {
    const rawValue = normalizePageSeoText(toValue(options.image))
    if (rawValue.length === 0) {
      return ''
    }

    return new URL(rawValue, requestUrl.origin).toString()
  })

  useHead(() => ({
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl.value,
      },
    ],
  }))

  useSeoMeta({
    title: () => seoTitle.value,
    description: () => seoDescription.value,
    robots: () => seoRobots.value,
    ogTitle: () => seoTitle.value,
    ogDescription: () => seoDescription.value,
    ogUrl: () => canonicalUrl.value,
    ogType: () => seoType.value,
    ogSiteName: () => seoSiteName.value,
    ogLocale: () => seoLocale.value,
    ogImage: () => seoImage.value || undefined,
  })

  return {
    seoTitle,
    seoDescription,
    canonicalUrl,
    seoImage,
  }
}
