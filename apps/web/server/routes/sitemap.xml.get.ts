import { buildSitemapXml } from '#server/services/sitemap'
import { setCacheHeaders, setTextHeaders } from '#server/utils/http'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const isDev = process.env.NODE_ENV !== 'production'

  setTextHeaders(event, 'application/xml; charset=utf-8')

  if (isDev) {
    setHeader(event, 'Cache-Control', 'no-store')
  } else {
    const ttlSeconds = Number(runtimeConfig.directusCacheTtlSeconds ?? 300)
    setCacheHeaders(event, ttlSeconds)
  }

  return await buildSitemapXml()
})
