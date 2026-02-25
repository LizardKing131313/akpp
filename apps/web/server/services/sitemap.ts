import { createDirectusClient } from '#server/services/directus'
import { xmlDoc, xmlRawTag, xmlTag } from '#server/utils/xml'

type SitemapPageItem = {
  slug: string | null
  date_updated?: string | null
}

const normalizePath = (raw: string): string => {
  const trimmed = raw.trim()
  if (trimmed.length === 0) return '/'
  if (trimmed.startsWith('/')) return trimmed
  return `/${trimmed}`
}

const joinUrl = (siteUrl: string, path: string): string => {
  const base = siteUrl.replace(/\/+$/, '')
  const normalizedPath = normalizePath(path)
  return `${base}${normalizedPath}`
}

const toIsoDate = (value: string | null | undefined): string | null => {
  if (!value) return null
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return null
  return parsed.toISOString()
}

export const buildSitemapXml = async (): Promise<string> => {
  const runtimeConfig = useRuntimeConfig()
  const siteUrlRaw = runtimeConfig.public.siteUrl as string | undefined
  const siteUrl = siteUrlRaw?.replace(/\/+$/, '') ?? ''

  if (siteUrl.length === 0) {
    throw createError({ statusCode: 500, statusMessage: 'SITE url is not configured' })
  }

  const pagesCollection = (runtimeConfig.directusPagesCollection as string | undefined) ?? 'pages'

  const slugField = (runtimeConfig.directusPagesSlugField as string | undefined) ?? 'slug'

  const statusField = (runtimeConfig.directusPagesStatusField as string | undefined) ?? 'status'

  const publishedValue =
    (runtimeConfig.directusPagesPublishedValue as string | undefined) ?? 'published'

  const updatedField =
    (runtimeConfig.directusPagesUpdatedField as string | undefined) ?? 'date_updated'

  const directusClient = createDirectusClient()

  const fields = `${slugField},${updatedField}`
  const query: Record<string, string> = {
    fields,
    limit: '5000',
    [`filter[${statusField}][_eq]`]: publishedValue,
  }

  const items = await directusClient.getItems<SitemapPageItem>(pagesCollection, query)

  const urlsXml = items
    .filter((item) => typeof item.slug === 'string' && item.slug.length > 0)
    .map((item) => {
      const slug = item.slug ?? ''
      const path = slug === 'home' ? '/' : `/${slug}/`
      const loc = xmlTag('loc', joinUrl(siteUrl, path))
      const lastmodValue = toIsoDate(item.date_updated)
      const lastmod = lastmodValue ? xmlTag('lastmod', lastmodValue) : ''
      return xmlRawTag('url', `${loc}${lastmod}`)
    })
    .join('')

  // noinspection HttpUrlsUsage
  const urlset =
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` + urlsXml + `</urlset>`

  return xmlDoc(urlset)
}
