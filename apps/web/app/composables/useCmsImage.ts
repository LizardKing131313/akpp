import type { MaybeRefOrGetter } from 'vue'

import { computed, toValue } from 'vue'

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const GIF_PATTERN = /\.gif($|[?#])/i

const joinUrl = (origin: string, path: string): string => {
  const normalizedOrigin = origin.replace(/\/+$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return `${normalizedOrigin}${normalizedPath}`
}

const normalizeCmsImageSrc = (src: string): string => src.trim()

const fetchCmsImageMimeType = async (src: string): Promise<string | null> => {
  try {
    const response = await $fetch<{ mimeType: string | null }>(
      `/api/files/mime/${encodeURIComponent(normalizeCmsImageSrc(src))}`
    )

    return response.mimeType
  } catch {
    return null
  }
}

export const resolveCmsImageUrl = (
  src: string,
  options?: {
    absolute?: boolean
  }
): string => {
  const normalizedSrc = normalizeCmsImageSrc(src)

  if (!UUID_PATTERN.test(normalizedSrc)) {
    return normalizedSrc
  }

  const directusAssetPath = `/api/files/${encodeURIComponent(normalizedSrc)}`

  if (!options?.absolute) {
    return directusAssetPath
  }

  const runtimeConfig = useRuntimeConfig()
  const requestUrl = useRequestURL()
  const fallbackOrigin = String(runtimeConfig.public.siteUrl ?? '').trim()
  const origin = requestUrl.origin === 'null' ? fallbackOrigin : requestUrl.origin

  return joinUrl(origin, directusAssetPath)
}

export const isCmsImageDirectusFileId = (src: string): boolean => UUID_PATTERN.test(src.trim())

export const resolveCmsImageView = (
  src: string,
  options?: {
    mimeType?: string | null | undefined
    image?: (src: string) => string
  }
): {
  directSrc: string
  ipxSrc: string
  resolvedSrc: string
  shouldBypassIpx: boolean
} => {
  const directSrc = resolveCmsImageUrl(src)
  const ipxBaseSrc = isCmsImageDirectusFileId(src)
    ? resolveCmsImageUrl(src, { absolute: true })
    : directSrc
  const ipxSrc = options?.image ? options.image(ipxBaseSrc) : ipxBaseSrc
  const shouldBypassIpx = GIF_PATTERN.test(directSrc) || options?.mimeType === 'image/gif'

  return {
    directSrc,
    ipxSrc,
    resolvedSrc: shouldBypassIpx ? directSrc : ipxSrc,
    shouldBypassIpx,
  }
}

export const useCmsImageMimeMap = async (sources: MaybeRefOrGetter<string[]>) => {
  const normalizedSources = computed<string[]>(() => toValue(sources).map(normalizeCmsImageSrc))

  const { data: mimeTypes } = await useAsyncData<Record<string, string | null>>(
    () => `gallery-mime:${normalizedSources.value.join('|')}`,
    async () => {
      const mimeEntries = await Promise.all(
        normalizedSources.value.map(async (src) => {
          if (!isCmsImageDirectusFileId(src)) {
            return [src, null] as const
          }

          return [src, await fetchCmsImageMimeType(src)] as const
        })
      )

      return Object.fromEntries(mimeEntries)
    },
    {
      watch: [normalizedSources],
    }
  )

  return computed<Record<string, string | null>>(() => mimeTypes.value ?? {})
}
