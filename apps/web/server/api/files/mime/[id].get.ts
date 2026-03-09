import { createDirectusClient } from '#server/services/directus'
import { badRequest, setCacheHeaders } from '#server/utils/http'

type DirectusFileItem = {
  readonly type?: string | null
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const normalizeUuid = (value: string | undefined): string => {
  const normalizedValue = value?.trim() ?? ''

  if (!UUID_PATTERN.test(normalizedValue)) {
    return badRequest('invalid file id')
  }

  return normalizedValue
}

export default defineEventHandler(async (event) => {
  const fileId = normalizeUuid(getRouterParam(event, 'id'))
  const directus = createDirectusClient()
  const fileItem = await directus.getItem<DirectusFileItem>('directus_files', fileId, {
    fields: 'type',
  })

  const runtimeConfig = useRuntimeConfig()
  const ttlSeconds = Number(runtimeConfig.directusCacheTtlSeconds ?? 300)
  setCacheHeaders(event, ttlSeconds)

  const mimeType = typeof fileItem.type === 'string' ? fileItem.type.trim() : ''

  return {
    mimeType: mimeType.length > 0 ? mimeType : null,
  }
})
