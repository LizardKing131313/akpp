type DirectusItemsResponse<Data> = {
  data: Data
}

type DirectusError = {
  message: string
  extensions?: {
    code?: string
  }
}

type DirectusErrorResponse = {
  errors: DirectusError[]
}

const isDirectusErrorResponse = (value: unknown): value is DirectusErrorResponse => {
  if (typeof value !== 'object' || value === null) return false
  const maybe = value as { errors?: unknown }
  return Array.isArray(maybe.errors)
}

export type DirectusQuery = Record<string, string | number | boolean | undefined>

const buildQueryString = (query: DirectusQuery): string => {
  const searchParams = new URLSearchParams()
  for (const [key, rawValue] of Object.entries(query)) {
    if (rawValue === undefined) continue
    searchParams.set(key, String(rawValue))
  }
  const queryString = searchParams.toString()
  return queryString.length > 0 ? `?${queryString}` : ''
}

export const createDirectusClient = () => {
  const runtimeConfig = useRuntimeConfig()
  const directusBaseUrlRaw = runtimeConfig.public.directusUrl as string | undefined
  const directusBaseUrl = directusBaseUrlRaw?.replace(/\/+$/, '') ?? ''

  if (directusBaseUrl.length === 0) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Directus url is not configured',
    })
  }

  const directusSecret = runtimeConfig.directusSecret as string | undefined

  const getAuthHeader = (): Record<string, string> => {
    if (!directusSecret) return {}
    return { Authorization: `Bearer ${directusSecret}` }
  }

  const getItems = async <Item>(
    collection: string,
    query: DirectusQuery
  ): Promise<readonly Item[]> => {
    const url = `${directusBaseUrl}/items/${encodeURIComponent(collection)}${buildQueryString(query)}`
    try {
      const response = await $fetch<DirectusItemsResponse<readonly Item[]>>(url, {
        method: 'GET',
        headers: {
          ...getAuthHeader(),
        },
      })
      return response.data
    } catch (unknownError: unknown) {
      if (isDirectusErrorResponse(unknownError)) {
        const firstError = unknownError.errors[0]
        throw createError({
          statusCode: 502,
          statusMessage: firstError?.message ?? 'Directus error',
        })
      }
      throw createError({
        statusCode: 502,
        statusMessage: 'Failed to fetch from Directus',
      })
    }
  }

  return { getItems }
}
