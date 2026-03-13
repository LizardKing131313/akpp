import type { ArticleItem } from '#shared/types/article'
import type { BrandItem } from '#shared/types/brand'
import type { CalculateSettings } from '#shared/types/calculate'
import type { CaseItem } from '#shared/types/case'
import type { CityItem } from '#shared/types/city'
import type { ErrorSettings } from '#shared/types/error'
import type { FaqItem, FaqListFilters } from '#shared/types/faq'
import type { FooterSettings } from '#shared/types/footer'
import type { HeaderSettings } from '#shared/types/header'
import type { HeroItem } from '#shared/types/hero'
import type { LocationItem } from '#shared/types/location'
import type { MenuItem, MenuPlacement } from '#shared/types/menu'
import type {
  CitySelectModalSettings,
  ShopModalSettings,
  SignupModalSettings,
} from '#shared/types/modal'
import type { ModelItem } from '#shared/types/model'
import type { PolicySettings } from '#shared/types/policy'
import type { QuizProblemItem, QuizSettings, QuizSymptomItem } from '#shared/types/quiz'
import type {
  ResolvedRouteLandingItem,
  RouteLandingItem,
  RouteLandingListFilters,
  RouteLandingPageType,
} from '#shared/types/route-landing'
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

const useOptionalQueryParamApiData = <ResponseType>(
  keyPrefix: string,
  path: string,
  queryParamName: string,
  paramInput?: MaybeRefOrGetter<string | undefined>
) => {
  const paramValue = computed<string | undefined>(() => {
    if (!paramInput) {
      return undefined
    }

    const normalizedValue = normalizeParamValue(toValue(paramInput))
    return normalizedValue.length > 0 ? normalizedValue : undefined
  })

  return useAsyncData<ResponseType[]>(
    () => `${keyPrefix}:${paramValue.value ?? 'all'}`,
    () => {
      if (!paramValue.value) {
        return fetchFromApi<ResponseType[]>(path)
      }

      return fetchFromApi<ResponseType[]>(
        `${path}?${queryParamName}=${encodeURIComponent(paramValue.value)}`
      )
    },
    {
      watch: [paramValue],
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

export const useFaqs = (filtersInput?: MaybeRefOrGetter<FaqListFilters | undefined>) => {
  const normalizedFilters = computed<FaqListFilters>(() => {
    const filters = toValue(filtersInput)

    return {
      route_landing_id: normalizeParamValue(filters?.route_landing_id) || undefined,
      show_on_homepage:
        typeof filters?.show_on_homepage === 'boolean' ? filters.show_on_homepage : undefined,
    }
  })

  return useAsyncData<FaqItem[]>(
    () =>
      `faqs:list:${normalizedFilters.value.route_landing_id ?? ''}:${String(normalizedFilters.value.show_on_homepage ?? '')}`,
    () => {
      const searchParams = new URLSearchParams()

      if (normalizedFilters.value.route_landing_id) {
        searchParams.set('routeLandingId', normalizedFilters.value.route_landing_id)
      }

      if (typeof normalizedFilters.value.show_on_homepage === 'boolean') {
        searchParams.set('showOnHomepage', String(normalizedFilters.value.show_on_homepage))
      }

      const queryString = searchParams.toString()
      const path = queryString.length > 0 ? `/api/faqs?${queryString}` : '/api/faqs'

      return fetchFromApi<FaqItem[]>(path)
    },
    {
      watch: [normalizedFilters],
    }
  )
}

export const usePerks = () => {
  return useStaticApiData<PerkItem[]>('perks:list', '/api/perks')
}

export const useHeroes = (cityIdInput?: MaybeRefOrGetter<string | undefined>) => {
  return useOptionalQueryParamApiData<HeroItem>('heroes:list', '/api/heroes', 'cityId', cityIdInput)
}

export const useLocations = (cityIdInput?: MaybeRefOrGetter<string | undefined>) => {
  return useOptionalQueryParamApiData<LocationItem>(
    'locations:list',
    '/api/locations',
    'cityId',
    cityIdInput
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

export const useMenus = (placement: MaybeRefOrGetter<MenuPlacement> = 'common') => {
  const normalizedPlacement = computed<MenuPlacement>(() => {
    const value = toValue(placement)
    return value === 'header' || value === 'footer' ? value : 'common'
  })

  return useAsyncData<MenuItem[]>(
    () => `menus:list:${normalizedPlacement.value}`,
    () => fetchFromApi<MenuItem[]>(`/api/menus?placement=${normalizedPlacement.value}`),
    {
      watch: [normalizedPlacement],
    }
  )
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

export const useRouteLandings = (
  filtersInput: MaybeRefOrGetter<RouteLandingListFilters | undefined>
) => {
  const normalizedFilters = computed<RouteLandingListFilters>(() => {
    const filters = toValue(filtersInput)

    return {
      page_type: filters?.page_type,
      brand_slug: normalizeParamValue(filters?.brand_slug),
      model_slug: normalizeParamValue(filters?.model_slug),
      service_slug: normalizeParamValue(filters?.service_slug),
    }
  })

  return useAsyncData<RouteLandingItem[]>(
    () =>
      `route-landings:list:${normalizedFilters.value.page_type ?? ''}:${normalizedFilters.value.brand_slug ?? ''}:${normalizedFilters.value.model_slug ?? ''}:${normalizedFilters.value.service_slug ?? ''}`,
    () => {
      const searchParams = new URLSearchParams()

      if (normalizedFilters.value.page_type) {
        searchParams.set('pageType', normalizedFilters.value.page_type)
      }

      if (normalizedFilters.value.brand_slug && normalizedFilters.value.brand_slug.length > 0) {
        searchParams.set('brandSlug', normalizedFilters.value.brand_slug)
      }

      if (normalizedFilters.value.model_slug && normalizedFilters.value.model_slug.length > 0) {
        searchParams.set('modelSlug', normalizedFilters.value.model_slug)
      }

      if (normalizedFilters.value.service_slug && normalizedFilters.value.service_slug.length > 0) {
        searchParams.set('serviceSlug', normalizedFilters.value.service_slug)
      }

      const queryString = searchParams.toString()
      const path =
        queryString.length > 0 ? `/api/route_landings?${queryString}` : '/api/route_landings'

      return fetchFromApi<RouteLandingItem[]>(path)
    },
    {
      watch: [normalizedFilters],
    }
  )
}

export const useResolvedRouteLanding = (
  pageTypeInput: MaybeRefOrGetter<RouteLandingPageType>,
  paramsInput: MaybeRefOrGetter<{
    readonly brand_slug?: string | undefined
    readonly model_slug?: string | undefined
    readonly service_slug?: string | undefined
    readonly city_id?: string | undefined
  }>
) => {
  const normalizedPageType = computed<RouteLandingPageType>(() => toValue(pageTypeInput))
  const normalizedParams = computed(() => {
    const params = toValue(paramsInput)

    return {
      brand_slug: normalizeParamValue(params?.brand_slug),
      model_slug: normalizeParamValue(params?.model_slug),
      service_slug: normalizeParamValue(params?.service_slug),
      city_id: normalizeParamValue(params?.city_id),
    }
  })

  return useAsyncData<ResolvedRouteLandingItem>(
    () =>
      `route-landings:resolve:${normalizedPageType.value}:${normalizedParams.value.brand_slug}:${normalizedParams.value.model_slug}:${normalizedParams.value.service_slug}:${normalizedParams.value.city_id}`,
    () => {
      const searchParams = new URLSearchParams()
      searchParams.set('pageType', normalizedPageType.value)

      if (normalizedParams.value.brand_slug.length > 0) {
        searchParams.set('brandSlug', normalizedParams.value.brand_slug)
      }

      if (normalizedParams.value.model_slug.length > 0) {
        searchParams.set('modelSlug', normalizedParams.value.model_slug)
      }

      if (normalizedParams.value.service_slug.length > 0) {
        searchParams.set('serviceSlug', normalizedParams.value.service_slug)
      }

      if (normalizedParams.value.city_id.length > 0) {
        searchParams.set('cityId', normalizedParams.value.city_id)
      }

      return fetchFromApi<ResolvedRouteLandingItem>(
        `/api/route_landings/resolve?${searchParams.toString()}`
      )
    },
    {
      watch: [normalizedPageType, normalizedParams],
    }
  )
}

export const useServicePrices = () => {
  return useStaticApiData<ServicePriceItem[]>('service-prices:list', '/api/service_prices')
}

export const useQuizProblems = (brandIdInput?: MaybeRefOrGetter<string | undefined>) => {
  return useOptionalQueryParamApiData<QuizProblemItem>(
    'quiz-problems:list',
    '/api/quiz/problems',
    'brandId',
    brandIdInput
  )
}

export const useQuizSymptoms = (problemIdInput?: MaybeRefOrGetter<string | undefined>) => {
  return useOptionalQueryParamApiData<QuizSymptomItem>(
    'quiz-symptoms:list',
    '/api/quiz/symptoms',
    'problemId',
    problemIdInput
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
