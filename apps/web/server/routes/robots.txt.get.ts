import { setCacheHeaders, setTextHeaders } from '#server/utils/http'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig()
  const siteUrlRaw = runtimeConfig.public.siteUrl as string | undefined
  const siteUrl = siteUrlRaw?.replace(/\/+$/, '') ?? ''
  const siteHostname = (() => {
    try {
      return siteUrl.length > 0 ? new URL(siteUrl).hostname.toLowerCase() : ''
    } catch {
      return ''
    }
  })()
  const isDev = process.env.NODE_ENV !== 'production'
  const isDevSubdomain = siteHostname === 'dev' || siteHostname.startsWith('dev.')

  setTextHeaders(event, 'text/plain; charset=utf-8')

  if (isDev || isDevSubdomain) {
    return `User-agent: *\nDisallow: /\n`
  }

  const sitemapUrl = siteUrl.length > 0 ? `${siteUrl}/sitemap.xml` : '/sitemap.xml'
  const ttlSeconds = Number(runtimeConfig.directusCacheTtlSeconds ?? 300)
  setCacheHeaders(event, ttlSeconds)

  return [
    'User-agent: *',
    'Allow: /',
    'Allow: /*?page=',
    'Allow: /*?q=',
    'Allow: /*?page=*&q=',
    'Allow: /*?q=*&page=',
    'Disallow: /*?page=*&*',
    'Disallow: /*?q=*&*',
    'Disallow: /*?*&page=',
    'Disallow: /*?*&q=',
    'Disallow: /*?*',
    `Sitemap: ${sitemapUrl}`,
    '',
  ].join('\n')
})
