import type { ArticleItem } from '#shared/types/article'
import type { BrandItem } from '#shared/types/brand'
import type { CalculateSettings } from '#shared/types/calculate'
import type { CaseItem } from '#shared/types/case'
import type { CityItem } from '#shared/types/city'
import type { ErrorSettings } from '#shared/types/error'
import type { FaqItem } from '#shared/types/faq'
import type { FooterSettings } from '#shared/types/footer'
import type { HeaderSettings } from '#shared/types/header'
import type { HeroItem } from '#shared/types/hero'
import type { LocationItem } from '#shared/types/location'
import type { MenuItem } from '#shared/types/menu'
import type { ModelItem } from '#shared/types/model'
import type { PolicySettings } from '#shared/types/policy'
import type { QuizData } from '#shared/types/quiz'
import type { ServiceItem, ServicePriceItem } from '#shared/types/service'
import type { TransmissionItem, TransmissionRangeWithVariants } from '#shared/types/transmission'
import type { WhySettings } from '#shared/types/why'
import type { MaybeRefOrGetter } from 'vue'

import { computed, toValue } from 'vue'

const fetchFromApi = <ResponseType>(path: string): Promise<ResponseType> => {
  return $fetch(path) as Promise<ResponseType>
}

const normalizeParamValue = (rawValue: string): string => {
  return rawValue.trim()
}

const ensureParamValue = (value: string, paramName: string): string => {
  if (value.length > 0) {
    return value
  }

  throw createError({
    statusCode: 400,
    statusMessage: `${paramName} is required`,
  })
}

export const useCalculateSettings = () => {
  return useAsyncData<CalculateSettings>('calculate:settings', () =>
    fetchFromApi<CalculateSettings>('/api/calculate')
  )
}

export const useErrorSettings = () => {
  return useAsyncData<ErrorSettings>('error:settings', () =>
    fetchFromApi<ErrorSettings>('/api/error')
  )
}

export const useFooterSettings = () => {
  return useAsyncData<FooterSettings>('footer:settings', () =>
    fetchFromApi<FooterSettings>('/api/footer')
  )
}

export const useHeaderSettings = () => {
  return useAsyncData<HeaderSettings>('header:settings', () =>
    fetchFromApi<HeaderSettings>('/api/header')
  )
}

export const usePolicySettings = () => {
  return useAsyncData<PolicySettings>('policy:settings', () =>
    fetchFromApi<PolicySettings>('/api/policy')
  )
}

export const useWhySettings = () => {
  return useAsyncData<WhySettings>('why:settings', () => fetchFromApi<WhySettings>('/api/why'))
}

export const useArticles = () => {
  return useAsyncData<ArticleItem[]>('articles:list', () =>
    fetchFromApi<ArticleItem[]>('/api/articles')
  )
}

export const useArticleBySlug = (slugInput: MaybeRefOrGetter<string>) => {
  const slugValue = computed<string>(() => normalizeParamValue(toValue(slugInput)))

  return useAsyncData<ArticleItem>(
    () => `articles:slug:${slugValue.value}`,
    () => {
      const slug = ensureParamValue(slugValue.value, 'article slug')
      return fetchFromApi<ArticleItem>(`/api/articles/${encodeURIComponent(slug)}`)
    },
    {
      watch: [slugValue],
    }
  )
}

export const useBrands = () => {
  return useAsyncData<BrandItem[]>('brands:list', () => fetchFromApi<BrandItem[]>('/api/brands'))
}

export const useCases = () => {
  return useAsyncData<CaseItem[]>('cases:list', () => fetchFromApi<CaseItem[]>('/api/cases'))
}

export const useCaseBySlug = (slugInput: MaybeRefOrGetter<string>) => {
  const slugValue = computed<string>(() => normalizeParamValue(toValue(slugInput)))

  return useAsyncData<CaseItem>(
    () => `cases:slug:${slugValue.value}`,
    () => {
      const slug = ensureParamValue(slugValue.value, 'case slug')
      return fetchFromApi<CaseItem>(`/api/cases/${encodeURIComponent(slug)}`)
    },
    {
      watch: [slugValue],
    }
  )
}

export const useCities = () => {
  return useAsyncData<CityItem[]>('cities:list', () => fetchFromApi<CityItem[]>('/api/cities'))
}

export const useCityBySlug = (slugInput: MaybeRefOrGetter<string>) => {
  const slugValue = computed<string>(() => normalizeParamValue(toValue(slugInput)))

  return useAsyncData<CityItem>(
    () => `cities:slug:${slugValue.value}`,
    () => {
      const slug = ensureParamValue(slugValue.value, 'city slug')
      return fetchFromApi<CityItem>(`/api/cities/${encodeURIComponent(slug)}`)
    },
    {
      watch: [slugValue],
    }
  )
}

export const useFaqs = () => {
  return useAsyncData<FaqItem[]>('faqs:list', () => fetchFromApi<FaqItem[]>('/api/faqs'))
}

export const useHeroes = () => {
  return useAsyncData<HeroItem[]>('heroes:list', () => fetchFromApi<HeroItem[]>('/api/heroes'))
}

export const useLocations = (cityIdInput?: MaybeRefOrGetter<string | undefined>) => {
  const cityIdValue = computed<string | undefined>(() => {
    if (!cityIdInput) {
      return undefined
    }

    const normalizedValue = normalizeParamValue(toValue(cityIdInput) ?? '')
    return normalizedValue.length > 0 ? normalizedValue : undefined
  })

  return useAsyncData<LocationItem[]>(
    () => `locations:list:${cityIdValue.value ?? 'all'}`,
    () => {
      if (!cityIdValue.value) {
        return fetchFromApi<LocationItem[]>('/api/locations')
      }

      return fetchFromApi<LocationItem[]>(
        `/api/locations?cityId=${encodeURIComponent(cityIdValue.value)}`
      )
    },
    {
      watch: [cityIdValue],
    }
  )
}

export const useLocationById = (idInput: MaybeRefOrGetter<string>) => {
  const idValue = computed<string>(() => normalizeParamValue(toValue(idInput)))

  return useAsyncData<LocationItem>(
    () => `locations:id:${idValue.value}`,
    () => {
      const id = ensureParamValue(idValue.value, 'location id')
      return fetchFromApi<LocationItem>(`/api/locations/${encodeURIComponent(id)}`)
    },
    {
      watch: [idValue],
    }
  )
}

export const useMenus = () => {
  return useAsyncData<MenuItem[]>('menus:list', () => fetchFromApi<MenuItem[]>('/api/menus'))
}

export const useModels = () => {
  return useAsyncData<ModelItem[]>('models:list', () =>
    fetchFromApi<ModelItem[]>('/api/models/models')
  )
}

export const useServices = () => {
  return useAsyncData<ServiceItem[]>('services:list', () =>
    fetchFromApi<ServiceItem[]>('/api/services')
  )
}

export const useServiceBySlug = (slugInput: MaybeRefOrGetter<string>) => {
  const slugValue = computed<string>(() => normalizeParamValue(toValue(slugInput)))

  return useAsyncData<ServiceItem>(
    () => `services:slug:${slugValue.value}`,
    () => {
      const slug = ensureParamValue(slugValue.value, 'service slug')
      return fetchFromApi<ServiceItem>(`/api/services/${encodeURIComponent(slug)}`)
    },
    {
      watch: [slugValue],
    }
  )
}

export const useServicePrices = () => {
  return useAsyncData<ServicePriceItem[]>('service-prices:list', () =>
    fetchFromApi<ServicePriceItem[]>('/api/service_prices')
  )
}

export const useQuizData = () => {
  return useAsyncData<QuizData>('quiz:data', () => fetchFromApi<QuizData>('/api/quiz/quiz'))
}

export const useTransmissions = () => {
  return useAsyncData<TransmissionItem[]>('transmissions:list', () =>
    fetchFromApi<TransmissionItem[]>('/api/transmissions')
  )
}

export const useTransmissionRangesWithVariants = () => {
  return useAsyncData<TransmissionRangeWithVariants[]>('transmission-ranges:list', () =>
    fetchFromApi<TransmissionRangeWithVariants[]>('/api/transmission_range_model_variants')
  )
}

export const useTransmissionRangeWithVariantsBySlug = (slugInput: MaybeRefOrGetter<string>) => {
  const slugValue = computed<string>(() => normalizeParamValue(toValue(slugInput)))

  return useAsyncData<TransmissionRangeWithVariants>(
    () => `transmission-ranges:slug:${slugValue.value}`,
    () => {
      const slug = ensureParamValue(slugValue.value, 'transmission range slug')
      return fetchFromApi<TransmissionRangeWithVariants>(
        `/api/transmission_range_model_variants/${encodeURIComponent(slug)}`
      )
    },
    {
      watch: [slugValue],
    }
  )
}
