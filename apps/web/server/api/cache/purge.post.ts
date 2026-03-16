import type { H3Event } from 'h3'

type PurgeBody = {
  token?: string
  reason?: string
}

const normalizeToken = (value: unknown): string => {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
}

const extractToken = (event: H3Event, bodyToken: string): string => {
  if (bodyToken.length > 0) {
    return bodyToken
  }

  const headerToken = normalizeToken(getHeader(event, 'x-cache-purge-token'))
  if (headerToken.length > 0) {
    return headerToken
  }

  const authorization = normalizeToken(getHeader(event, 'authorization'))
  if (authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.slice(7).trim()
  }

  const queryToken = normalizeToken(getQuery(event).token)
  if (queryToken.length > 0) {
    return queryToken
  }

  return ''
}

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'no-store')

  const runtimeConfig = useRuntimeConfig(event)
  const expectedToken = normalizeToken(runtimeConfig.cachePurgeToken)

  if (expectedToken.length === 0) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Cache purge token is not configured',
    })
  }

  const body = await readBody<PurgeBody>(event)
  const incomingToken = extractToken(event, normalizeToken(body?.token))

  if (incomingToken !== expectedToken) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  await useStorage('cache').clear()

  return {
    ok: true,
    reason: typeof body?.reason === 'string' ? body.reason : undefined,
    purgedAt: new Date().toISOString(),
  }
})
