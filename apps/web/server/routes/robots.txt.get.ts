import { setCacheHeaders, setTextHeaders } from '#server/utils/http'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig()
  const siteUrlRaw = runtimeConfig.public.siteUrl as string | undefined
  const siteUrl = siteUrlRaw?.replace(/\/+$/, '') ?? ''
  const isDev = process.env.NODE_ENV !== 'production'

  setTextHeaders(event, 'text/plain; charset=utf-8')

  if (isDev) {
    return `User-agent: *\nDisallow: /\n`
  }

  const sitemapUrl = siteUrl.length > 0 ? `${siteUrl}/sitemap.xml` : '/sitemap.xml'
  const ttlSeconds = Number(runtimeConfig.directusCacheTtlSeconds ?? 300)
  setCacheHeaders(event, ttlSeconds)

  return `User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}\n`
})
