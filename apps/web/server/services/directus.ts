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

export type DirectusPayload = Readonly<Record<string, unknown>>

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

const toNuxtError = (unknownError: unknown): never => {
  if (isDirectusErrorResponse(unknownError)) {
    const firstError = unknownError.errors[0]
    throw createError({
      statusCode: 502,
      statusMessage: firstError?.message ?? 'Directus error',
    })
  }

  const maybeFetchError = unknownError as {
    statusCode?: number
    status?: number
    message?: string
  } | null
  const statusCode = maybeFetchError?.statusCode ?? maybeFetchError?.status

  if (typeof statusCode === 'number' && statusCode >= 400) {
    throw createError({
      statusCode,
      statusMessage: maybeFetchError?.message ?? 'Directus request failed',
    })
  }

  throw createError({
    statusCode: 502,
    statusMessage: 'Failed to fetch from Directus',
  })
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
      return toNuxtError(unknownError)
    }
  }

  const getItem = async <Item>(
    collection: string,
    id: string,
    query: DirectusQuery = {}
  ): Promise<Item> => {
    const url = `${directusBaseUrl}/items/${encodeURIComponent(collection)}/${encodeURIComponent(id)}${buildQueryString(query)}`
    try {
      const response = await $fetch<DirectusItemsResponse<Item>>(url, {
        method: 'GET',
        headers: {
          ...getAuthHeader(),
        },
      })
      return response.data
    } catch (unknownError: unknown) {
      return toNuxtError(unknownError)
    }
  }

  const createItem = async <Item, Payload extends DirectusPayload>(
    collection: string,
    payload: Payload
  ): Promise<Item> => {
    const url = `${directusBaseUrl}/items/${encodeURIComponent(collection)}`
    try {
      const response = await $fetch<DirectusItemsResponse<Item>>(url, {
        method: 'POST',
        headers: {
          ...getAuthHeader(),
        },
        body: payload as Record<string, unknown>,
      })
      return response.data
    } catch (unknownError: unknown) {
      return toNuxtError(unknownError)
    }
  }

  const updateItem = async <Item, Payload extends DirectusPayload>(
    collection: string,
    id: string,
    payload: Payload
  ): Promise<Item> => {
    const url = `${directusBaseUrl}/items/${encodeURIComponent(collection)}/${encodeURIComponent(id)}`
    try {
      const response = await $fetch<DirectusItemsResponse<Item>>(url, {
        method: 'PATCH',
        headers: {
          ...getAuthHeader(),
        },
        body: payload as Record<string, unknown>,
      })
      return response.data
    } catch (unknownError: unknown) {
      return toNuxtError(unknownError)
    }
  }

  const deleteItem = async (collection: string, id: string): Promise<void> => {
    const url = `${directusBaseUrl}/items/${encodeURIComponent(collection)}/${encodeURIComponent(id)}`
    try {
      await $fetch<unknown>(url, {
        method: 'DELETE',
        headers: {
          ...getAuthHeader(),
        },
      })
    } catch (unknownError: unknown) {
      return toNuxtError(unknownError)
    }
  }

  const equals = (field: string, value: string | number | boolean) => {
    return {
      [`filter[${field}][_eq]`]: value,
    }
  }

  return { getItems, getItem, createItem, updateItem, deleteItem, equals }
}
