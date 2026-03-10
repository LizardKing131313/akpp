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
import type {
  CitySelectModalSettings,
  ShopModalSettings,
  SignupModalSettings,
} from '#shared/types/modal'
import type { ModelItem } from '#shared/types/model'
import type { ResolvedPageItem } from '#shared/types/page'
import type { PolicySettings } from '#shared/types/policy'
import type { QuizProblemItem, QuizSettings, QuizSymptomItem } from '#shared/types/quiz'
import type {
  RoutePageOverrideItem,
  RoutePageOverrideType,
} from '#shared/types/route-page-override'
import type { RoutePageSettings } from '#shared/types/route-page-settings'
import type { ServiceItem, ServicePriceItem } from '#shared/types/service'
import type { TransmissionItem, TransmissionRangeWithVariants } from '#shared/types/transmission'
import type { WhySettings } from '#shared/types/why'
import type { MaybeRefOrGetter } from 'vue'

import { computed, toValue } from 'vue'

const fetchFromApi = <ResponseType>(path: string): Promise<ResponseType> => {
  return $fetch(path) as Promise<ResponseType>
}

const normalizeParamValue = (rawValue: unknown): string => {
  if (typeof rawValue === 'string') {
    return rawValue.trim()
  }

  if (Array.isArray(rawValue)) {
    const firstValue = rawValue[0]
    return normalizeParamValue(firstValue)
  }

  if (rawValue === null || rawValue === undefined) {
    return ''
  }

  return String(rawValue).trim()
}

const ensureParamValue = (value: string, paramName: string): string =>
  value.length > 0
    ? value
    : (() => {
        throw createError({
          statusCode: 400,
          statusMessage: `${paramName} is required`,
        })
      })()

const useStaticApiData = <ResponseType>(key: string, path: string) => {
  return useAsyncData<ResponseType>(key, () => fetchFromApi<ResponseType>(path))
}

const useByParamApiData = <ResponseType>(
  keyPrefix: string,
  paramName: string,
  paramInput: MaybeRefOrGetter<string>,
  buildPath: (value: string) => string
) => {
  const normalizedParamValue = computed<string>(() => normalizeParamValue(toValue(paramInput)))

  return useAsyncData<ResponseType>(
    () => `${keyPrefix}:${normalizedParamValue.value}`,
    () => {
      const paramValue = ensureParamValue(normalizedParamValue.value, paramName)
      return fetchFromApi<ResponseType>(buildPath(paramValue))
    },
    {
      watch: [normalizedParamValue],
    }
  )
}

export const useCalculateSettings = () => {
  return useStaticApiData<CalculateSettings>('calculate:settings', '/api/calculate')
}

export const useErrorSettings = () => {
  return useStaticApiData<ErrorSettings>('error:settings', '/api/error')
}

export const useFooterSettings = () => {
  return useStaticApiData<FooterSettings>('footer:settings', '/api/footer')
}

export const useHeaderSettings = () => {
  return useStaticApiData<HeaderSettings>('header:settings', '/api/header')
}

export const usePolicySettings = () => {
  return useStaticApiData<PolicySettings>('policy:settings', '/api/policy')
}

export const useRoutePageSettings = () => {
  return useStaticApiData<RoutePageSettings>('route-page:settings', '/api/route_page_settings')
}

export const useCitySelectModalSettings = () => {
  return useStaticApiData<CitySelectModalSettings>(
    'city-select-modal:settings',
    '/api/city_select_modal'
  )
}

export const useShopModalSettings = () => {
  return useStaticApiData<ShopModalSettings>('shop-modal:settings', '/api/shop_modal')
}

export const useSignupModalSettings = () => {
  return useStaticApiData<SignupModalSettings>('signup-modal:settings', '/api/signup_modal')
}

export const useWhySettings = () => {
  return useStaticApiData<WhySettings>('why:settings', '/api/why')
}

export const useArticles = () => {
  return useStaticApiData<ArticleItem[]>('articles:list', '/api/articles')
}

export const useArticleBySlug = (slugInput: MaybeRefOrGetter<string>) => {
  return useByParamApiData<ArticleItem>(
    'articles:slug',
    'article slug',
    slugInput,
    (slug: string) => `/api/articles/${encodeURIComponent(slug)}`
  )
}

export const useBrands = () => {
  return useStaticApiData<BrandItem[]>('brands:list', '/api/brands')
}

export const useBrandBySlug = (slugInput: MaybeRefOrGetter<string>) => {
  return useByParamApiData<BrandItem>('brands:slug', 'brand slug', slugInput, (slug: string) => {
    return `/api/brands/${encodeURIComponent(slug)}`
  })
}

export const useCases = () => {
  return useStaticApiData<CaseItem[]>('cases:list', '/api/cases')
}

export const useCaseBySlug = (slugInput: MaybeRefOrGetter<string>) => {
  return useByParamApiData<CaseItem>('cases:slug', 'case slug', slugInput, (slug: string) => {
    return `/api/cases/${encodeURIComponent(slug)}`
  })
}

export const useCaseSettings = () => {
  return useStaticApiData<CaseSettings>('cases:settings', '/api/cases/settings')
}

export const useCities = () => {
  return useStaticApiData<CityItem[]>('cities:list', '/api/cities')
}

export const useCityBySlug = (slugInput: MaybeRefOrGetter<string>) => {
  return useByParamApiData<CityItem>('cities:slug', 'city slug', slugInput, (slug: string) => {
    return `/api/cities/${encodeURIComponent(slug)}`
  })
}

export const useFaqs = () => {
  return useStaticApiData<FaqItem[]>('faqs:list', '/api/faqs')
}

export const useHeroes = () => {
  return useStaticApiData<HeroItem[]>('heroes:list', '/api/heroes')
}

export const useLocations = (cityIdInput?: MaybeRefOrGetter<string | undefined>) => {
  const cityIdValue = computed<string | undefined>(() => {
    if (!cityIdInput) {
      return undefined
    }

    const normalizedValue = normalizeParamValue(toValue(cityIdInput))
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
  return useByParamApiData<LocationItem>(
    'locations:id',
    'location id',
    idInput,
    (id: string) => `/api/locations/${encodeURIComponent(id)}`
  )
}

export const useMenus = () => {
  return useStaticApiData<MenuItem[]>('menus:list', '/api/menus')
}

export const useModels = () => {
  return useStaticApiData<ModelItem[]>('models:list', '/api/models/models')
}

export const useModelBySlug = (slugInput: MaybeRefOrGetter<string>) => {
  return useByParamApiData<ModelItem>('models:slug', 'model slug', slugInput, (slug: string) => {
    return `/api/models/${encodeURIComponent(slug)}`
  })
}

export const useServices = () => {
  return useStaticApiData<ServiceItem[]>('services:list', '/api/services')
}

export const useServiceBySlug = (slugInput: MaybeRefOrGetter<string>) => {
  return useByParamApiData<ServiceItem>(
    'services:slug',
    'service slug',
    slugInput,
    (slug: string) => `/api/services/${encodeURIComponent(slug)}`
  )
}

export const usePageBySlugFallback = (slugsInput: MaybeRefOrGetter<readonly string[]>) => {
  const normalizedSlugs = computed<string[]>(() => {
    const slugs = toValue(slugsInput)

    return [...slugs].map((slug) => normalizeParamValue(slug)).filter((slug) => slug.length > 0)
  })

  return useAsyncData<ResolvedPageItem>(
    () => `pages:resolve:${normalizedSlugs.value.join(',')}`,
    () => {
      const slugs = normalizedSlugs.value

      if (slugs.length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'slugs are required',
        })
      }

      const encodedSlugs = slugs.map((slug) => encodeURIComponent(slug)).join(',')
      return fetchFromApi<ResolvedPageItem>(`/api/pages/resolve?slugs=${encodedSlugs}`)
    },
    {
      watch: [normalizedSlugs],
    }
  )
}

export const useRoutePageOverride = (
  routeTypeInput: MaybeRefOrGetter<RoutePageOverrideType>,
  idsInput?: MaybeRefOrGetter<{
    readonly serviceId?: string | undefined
    readonly brandId?: string | undefined
    readonly modelId?: string | undefined
  }>
) => {
  const normalizedRouteType = computed<RoutePageOverrideType>(() => toValue(routeTypeInput))

  const normalizedIds = computed(() => {
    const ids = toValue(idsInput)

    return {
      serviceId: normalizeParamValue(ids?.serviceId),
      brandId: normalizeParamValue(ids?.brandId),
      modelId: normalizeParamValue(ids?.modelId),
    }
  })

  return useAsyncData<RoutePageOverrideItem | null>(
    () =>
      `route-page-overrides:${normalizedRouteType.value}:${normalizedIds.value.serviceId}:${normalizedIds.value.brandId}:${normalizedIds.value.modelId}`,
    () => {
      const searchParams = new URLSearchParams()
      searchParams.set('routeType', normalizedRouteType.value)

      if (normalizedIds.value.serviceId.length > 0) {
        searchParams.set('serviceId', normalizedIds.value.serviceId)
      }

      if (normalizedIds.value.brandId.length > 0) {
        searchParams.set('brandId', normalizedIds.value.brandId)
      }

      if (normalizedIds.value.modelId.length > 0) {
        searchParams.set('modelId', normalizedIds.value.modelId)
      }

      return fetchFromApi<RoutePageOverrideItem | null>(
        `/api/route_page_overrides/resolve?${searchParams.toString()}`
      )
    },
    {
      watch: [normalizedRouteType, normalizedIds],
    }
  )
}

export const useServiceBrandExists = (
  idsInput: MaybeRefOrGetter<{
    readonly serviceId?: string | undefined
    readonly brandId?: string | undefined
  }>
) => {
  const normalizedIds = computed(() => {
    const ids = toValue(idsInput)

    return {
      serviceId: normalizeParamValue(ids?.serviceId),
      brandId: normalizeParamValue(ids?.brandId),
    }
  })

  return useAsyncData<{ exists: boolean }>(
    () => `service-brands:exists:${normalizedIds.value.serviceId}:${normalizedIds.value.brandId}`,
    () => {
      if (normalizedIds.value.serviceId.length === 0 || normalizedIds.value.brandId.length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'serviceId and brandId are required',
        })
      }

      const searchParams = new URLSearchParams()
      searchParams.set('serviceId', normalizedIds.value.serviceId)
      searchParams.set('brandId', normalizedIds.value.brandId)

      return fetchFromApi<{ exists: boolean }>(
        `/api/service_brands/exists?${searchParams.toString()}`
      )
    },
    {
      watch: [normalizedIds],
    }
  )
}

export const useServicePrices = () => {
  return useStaticApiData<ServicePriceItem[]>('service-prices:list', '/api/service_prices')
}

export const useQuizProblems = (brandIdInput?: MaybeRefOrGetter<string | undefined>) => {
  const brandIdValue = computed<string | undefined>(() => {
    if (!brandIdInput) {
      return undefined
    }

    const normalizedValue = normalizeParamValue(toValue(brandIdInput))
    return normalizedValue.length > 0 ? normalizedValue : undefined
  })

  return useAsyncData<QuizProblemItem[]>(
    () => `quiz-problems:list:${brandIdValue.value ?? 'all'}`,
    () => {
      if (!brandIdValue.value) {
        return fetchFromApi<QuizProblemItem[]>('/api/quiz/problems')
      }

      return fetchFromApi<QuizProblemItem[]>(
        `/api/quiz/problems?brandId=${encodeURIComponent(brandIdValue.value)}`
      )
    },
    {
      watch: [brandIdValue],
    }
  )
}

export const useQuizSymptoms = (problemIdInput?: MaybeRefOrGetter<string | undefined>) => {
  const problemIdValue = computed<string | undefined>(() => {
    if (!problemIdInput) {
      return undefined
    }

    const normalizedValue = normalizeParamValue(toValue(problemIdInput))
    return normalizedValue.length > 0 ? normalizedValue : undefined
  })

  return useAsyncData<QuizSymptomItem[]>(
    () => `quiz-symptoms:list:${problemIdValue.value ?? 'all'}`,
    () => {
      if (!problemIdValue.value) {
        return fetchFromApi<QuizSymptomItem[]>('/api/quiz/symptoms')
      }

      return fetchFromApi<QuizSymptomItem[]>(
        `/api/quiz/symptoms?problemId=${encodeURIComponent(problemIdValue.value)}`
      )
    },
    {
      watch: [problemIdValue],
    }
  )
}

export const useQuizSettings = () => {
  return useStaticApiData<QuizSettings>('quiz:settings', '/api/quiz/settings')
}

export const useTransmissions = () => {
  return useStaticApiData<TransmissionItem[]>('transmissions:list', '/api/transmissions')
}

export const useTransmissionRangesWithVariants = () => {
  return useStaticApiData<TransmissionRangeWithVariants[]>(
    'transmission-ranges:list',
    '/api/transmission_range_model_variants'
  )
}

export const useTransmissionRangeWithVariantsBySlug = (slugInput: MaybeRefOrGetter<string>) => {
  return useByParamApiData<TransmissionRangeWithVariants>(
    'transmission-ranges:slug',
    'transmission range slug',
    slugInput,
    (slug: string) => `/api/transmission_range_model_variants/${encodeURIComponent(slug)}`
  )
}
