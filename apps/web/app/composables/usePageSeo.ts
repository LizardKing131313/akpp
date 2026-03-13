import type { MaybeRefOrGetter } from 'vue'

import { computed, toValue } from 'vue'

const normalizeText = (value: unknown): string => {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
}

const stripHtml = (value: string): string => {
  return value.replace(/<[^>]*>/g, ' ')
}

const normalizeDescription = (value: unknown): string => {
  const normalizedValue = normalizeText(stripHtml(String(value ?? '')))
  return normalizedValue.slice(0, 320)
}

type UsePageSeoOptions = {
  readonly title: MaybeRefOrGetter<string>
  readonly description?: MaybeRefOrGetter<string | undefined>
  readonly image?: MaybeRefOrGetter<string | undefined>
  readonly type?: MaybeRefOrGetter<'website' | 'article' | undefined>
  readonly robots?: MaybeRefOrGetter<string | undefined>
  readonly siteName?: MaybeRefOrGetter<string | undefined>
  readonly locale?: MaybeRefOrGetter<string | undefined>
}

export const usePageSeo = (options: UsePageSeoOptions) => {
  const route = useRoute()
  const requestUrl = useRequestURL()
  const runtimeConfig = useRuntimeConfig()

  const seoTitle = computed<string>(() => normalizeText(toValue(options.title)))
  const seoDescription = computed<string>(() => normalizeDescription(toValue(options.description)))
  const canonicalUrl = computed<string>(() => new URL(route.fullPath, requestUrl.origin).toString())
  const seoType = computed<'website' | 'article'>(() => {
    const value = toValue(options.type)
    return value === 'article' ? 'article' : 'website'
  })
  const seoRobots = computed<string>(() => {
    const explicitRobots = normalizeText(toValue(options.robots))

    if (explicitRobots.length > 0) {
      return explicitRobots
    }

    return runtimeConfig.public.siteIndexable ? 'index,follow' : 'noindex,nofollow'
  })
  const seoSiteName = computed<string>(() =>
    normalizeText(toValue(options.siteName) || 'АКПП Центр')
  )
  const seoLocale = computed<string>(() => normalizeText(toValue(options.locale) || 'ru_RU'))
  const seoImage = computed<string>(() => {
    const rawValue = normalizeText(toValue(options.image))
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
