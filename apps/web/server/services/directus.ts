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

const normalizeDirectusIds = <Value>(value: Value): Value => {
  if (Array.isArray(value)) {
    return value.map((arrayItem) => normalizeDirectusIds(arrayItem)) as Value
  }

  if (typeof value !== 'object' || value === null) {
    return value
  }

  const normalizedEntries = Object.entries(value).map(([entryKey, entryValue]) => {
    if (entryKey === 'id' && entryValue !== null && entryValue !== undefined) {
      return [entryKey, String(entryValue)]
    }

    return [entryKey, normalizeDirectusIds(entryValue)]
  })

  return Object.fromEntries(normalizedEntries) as Value
}

const isDirectusErrorResponse = (value: unknown): value is DirectusErrorResponse => {
  if (typeof value !== 'object' || value === null) return false
  const maybe = value as { errors?: unknown }
  return Array.isArray(maybe.errors)
}

export type DirectusQuery = Record<string, string | number | boolean | undefined>

const normalizeQueryValue = (key: string, rawValue: string | number | boolean): string => {
  if (key === 'fields' && typeof rawValue === 'string') {
    return rawValue
      .split(',')
      .map((field) => field.trim())
      .filter((field) => field.length > 0)
      .join(',')
  }

  return String(rawValue)
}

const buildQueryString = (query: DirectusQuery): string => {
  const searchParams = new URLSearchParams()
  for (const [key, rawValue] of Object.entries(query)) {
    if (rawValue === undefined) continue
    searchParams.set(key, normalizeQueryValue(key, rawValue))
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

  const directusToken = runtimeConfig.directusToken as string | undefined

  const getAuthHeader = (): Record<string, string> => {
    if (!directusToken) return {}
    return { Authorization: `Bearer ${directusToken}` }
  }

  const collectionUrl = (collection: string) =>
    `${directusBaseUrl}/items/${encodeURIComponent(collection)}`

  const getSingleton = async <Item>(
    collection: string,
    query: DirectusQuery = {}
  ): Promise<Item> => {
    const url = `${collectionUrl(collection)}${buildQueryString(query)}`
    return await get(url)
  }

  const getItems = async <Item>(
    collection: string,
    query: DirectusQuery
  ): Promise<readonly Item[]> => {
    const url = `${collectionUrl(collection)}${buildQueryString(query)}`
    return await get(url)
  }

  const getItem = async <Item>(
    collection: string,
    id: string,
    query: DirectusQuery = {}
  ): Promise<Item> => {
    const url = `${collectionUrl(collection)}/${encodeURIComponent(id)}${buildQueryString(query)}`
    return await get(url)
  }

  const get = async <Item>(url: string): Promise<Item> => {
    try {
      const response = await $fetch<DirectusItemsResponse<Item>>(url, {
        method: 'GET',
        headers: {
          ...getAuthHeader(),
        },
      })
      return normalizeDirectusIds(response.data)
    } catch (unknownError: unknown) {
      return toNuxtError(unknownError)
    }
  }

  const createItem = async <Item, Payload extends DirectusPayload>(
    collection: string,
    payload: Payload
  ): Promise<Item> => {
    try {
      const response = await $fetch<DirectusItemsResponse<Item>>(collectionUrl(collection), {
        method: 'POST',
        headers: {
          ...getAuthHeader(),
        },
        body: payload as Record<string, unknown>,
      })
      return normalizeDirectusIds(response.data)
    } catch (unknownError: unknown) {
      return toNuxtError(unknownError)
    }
  }

  const updateItem = async <Item, Payload extends DirectusPayload>(
    collection: string,
    id: string,
    payload: Payload
  ): Promise<Item> => {
    const url = `${collectionUrl(collection)}/${encodeURIComponent(id)}`
    try {
      const response = await $fetch<DirectusItemsResponse<Item>>(url, {
        method: 'PATCH',
        headers: {
          ...getAuthHeader(),
        },
        body: payload as Record<string, unknown>,
      })
      return normalizeDirectusIds(response.data)
    } catch (unknownError: unknown) {
      return toNuxtError(unknownError)
    }
  }

  const deleteItem = async (collection: string, id: string): Promise<void> => {
    const url = `${collectionUrl(collection)}/${encodeURIComponent(id)}`
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

  return { getSingleton, getItems, getItem, createItem, updateItem, deleteItem, equals }
}
