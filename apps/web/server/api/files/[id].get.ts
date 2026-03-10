import { badRequest, setCacheHeaders } from '#server/utils/http'

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const normalizeUuid = (value: string | undefined): string => {
  const normalizedValue = value?.trim() ?? ''

  if (!UUID_PATTERN.test(normalizedValue)) {
    return badRequest('invalid file id')
  }

  return normalizedValue
}

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const fileId = normalizeUuid(getRouterParam(event, 'id'))
  const runtimeConfig = useRuntimeConfig()
  const directusBaseUrl = String(runtimeConfig.public.directusUrl ?? '').replace(/\/+$/, '')

  if (directusBaseUrl.length === 0) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Directus url is not configured',
    })
  }

  const directusToken = String(runtimeConfig.directusToken ?? '').trim()
  const assetUrl = `${directusBaseUrl}/assets/${encodeURIComponent(fileId)}`
  const requestOptions =
    directusToken.length > 0
      ? {
          headers: {
            Authorization: `Bearer ${directusToken}`,
          },
        }
      : undefined
  const upstreamResponse = await fetch(assetUrl, requestOptions)

  if (!upstreamResponse.ok) {
    throw createError({
      statusCode: upstreamResponse.status,
      statusMessage: upstreamResponse.statusText || 'Failed to fetch Directus asset',
    })
  }

  const contentType = upstreamResponse.headers.get('content-type')
  const contentLength = upstreamResponse.headers.get('content-length')
  const etag = upstreamResponse.headers.get('etag')
  const lastModified = upstreamResponse.headers.get('last-modified')
  const ttlSeconds = Number(runtimeConfig.directusCacheTtlSeconds ?? 300)

  if (contentType) {
    setHeader(event, 'Content-Type', contentType)
  }

  if (contentLength) {
    const contentLengthValue = Number(contentLength)

    if (Number.isFinite(contentLengthValue) && contentLengthValue >= 0) {
      setHeader(event, 'Content-Length', contentLengthValue)
    }
  }

  if (etag) {
    setHeader(event, 'ETag', etag)
  }

  if (lastModified) {
    setHeader(event, 'Last-Modified', lastModified)
  }

  setCacheHeaders(event, ttlSeconds)

  return Buffer.from(await upstreamResponse.arrayBuffer())
})
