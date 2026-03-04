import type { H3Event } from 'h3'

export const setTextHeaders = (event: H3Event, contentType: string): void => {
  setHeader(event, 'Content-Type', contentType)
  setHeader(event, 'X-Content-Type-Options', 'nosniff')
}

export const setCacheHeaders = (event: H3Event, secondsToLive: number): void => {
  const ttl = Number.isFinite(secondsToLive) && secondsToLive > 0 ? secondsToLive : 300
  setHeader(event, 'Cache-Control', `public, max-age=0, s-maxage=${ttl}, stale-while-revalidate=60`)
}

export const badRequest = (message: string): never => {
  throw createError({
    statusCode: 400,
    statusMessage: message,
  })
}

export const notFound = (message: string): never => {
  throw createError({
    statusCode: 404,
    statusMessage: message,
  })
}
