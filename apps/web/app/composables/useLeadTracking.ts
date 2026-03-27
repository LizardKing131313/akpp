import type { LeadTrackingPayload } from '#shared/types/lead'

const normalizeTrackingValue = (value: unknown): string | undefined => {
  const rawValue = Array.isArray(value) ? value[0] : value
  if (typeof rawValue !== 'string') {
    return undefined
  }

  const normalizedValue = rawValue.trim()
  return normalizedValue.length > 0 ? normalizedValue : undefined
}

const trackingCookieKeys = {
  source: 'lead_source_marker',
  utmCampaign: 'lead_utm_campaign',
  utmContent: 'lead_utm_content',
  utmMedium: 'lead_utm_medium',
  utmSource: 'lead_utm_source',
  utmTerm: 'lead_utm_term',
} as const

const trackingQueryKeys = {
  source: 'source',
  utmCampaign: 'utm_campaign',
  utmContent: 'utm_content',
  utmMedium: 'utm_medium',
  utmSource: 'utm_source',
  utmTerm: 'utm_term',
} as const

export const useLeadTracking = () => {
  const route = useRoute()
  const trackingCookies = {
    source: useCookie<string | null>(trackingCookieKeys.source),
    utmCampaign: useCookie<string | null>(trackingCookieKeys.utmCampaign),
    utmContent: useCookie<string | null>(trackingCookieKeys.utmContent),
    utmMedium: useCookie<string | null>(trackingCookieKeys.utmMedium),
    utmSource: useCookie<string | null>(trackingCookieKeys.utmSource),
    utmTerm: useCookie<string | null>(trackingCookieKeys.utmTerm),
  }

  const getTrackingPayload = (): LeadTrackingPayload => {
    const trackingPayload = Object.fromEntries(
      Object.entries(trackingQueryKeys).flatMap(([payloadKey, queryKey]) => {
        const cookieValue = trackingCookies[payloadKey as keyof LeadTrackingPayload].value
        const normalizedValue =
          normalizeTrackingValue(route.query[queryKey]) ?? normalizeTrackingValue(cookieValue)

        return normalizedValue ? [[payloadKey, normalizedValue]] : []
      })
    )

    return trackingPayload as LeadTrackingPayload
  }

  const syncTrackingCookies = (): void => {
    for (const [payloadKey, queryKey] of Object.entries(trackingQueryKeys)) {
      const normalizedValue = normalizeTrackingValue(route.query[queryKey])
      if (!normalizedValue) {
        continue
      }

      trackingCookies[payloadKey as keyof LeadTrackingPayload].value = normalizedValue
    }
  }

  return {
    getTrackingPayload,
    syncTrackingCookies,
  }
}
