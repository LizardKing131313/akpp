const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const normalizeCmsImageSrc = (src: string): string => src.trim()
const directusAssetPathPattern = /^\/assets\/([0-9a-f-]{36})(?:\/.*)?$/i

const extractDirectusFileId = (src: string): string | null => {
  const normalizedSrc = normalizeCmsImageSrc(src)

  if (UUID_PATTERN.test(normalizedSrc)) {
    return normalizedSrc
  }

  try {
    const runtimeConfig = useRuntimeConfig()
    const directusBaseUrl = String(runtimeConfig.public.directusUrl ?? '').trim()

    if (directusBaseUrl.length === 0) {
      return null
    }

    const directusUrl = new URL(directusBaseUrl)
    const assetUrl = new URL(normalizedSrc, directusUrl)

    if (assetUrl.origin !== directusUrl.origin) {
      return null
    }

    const matchedPath = assetUrl.pathname.match(directusAssetPathPattern)
    const fileId = matchedPath?.[1]?.trim() ?? ''

    return UUID_PATTERN.test(fileId) ? fileId : null
  } catch {
    return null
  }
}

export const resolveCmsImageUrl = (src: string): string => {
  const normalizedSrc = normalizeCmsImageSrc(src)
  const fileId = extractDirectusFileId(normalizedSrc)

  if (!fileId) {
    return normalizedSrc
  }

  return `/api/files/${encodeURIComponent(fileId)}`
}

export const isCmsImageDirectusFileId = (src: string): boolean =>
  extractDirectusFileId(src) !== null

export const resolveCmsImageView = (
  src: string,
  options?: {
    image?: (src: string, modifiers?: Record<string, string | number>) => string
  }
): {
  directSrc: string
  ipxSrc: string
} => {
  const directSrc = resolveCmsImageUrl(src)
  const ipxSrc = options?.image ? options.image(directSrc, { quality: 75 }) : directSrc

  return {
    directSrc,
    ipxSrc,
  }
}
