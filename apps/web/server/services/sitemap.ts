import { createDirectusClient } from '#server/services/directus'
import { RouteLandingsRepository } from '#server/services/repo/entity/route_landings.repo'
import { xmlDoc, xmlRawTag, xmlTag } from '#server/utils/xml'

type SitemapPageItem = {
  slug: string | null
  date_updated?: string | null
}

type SitemapEntityItem = {
  slug: string | null
  date_updated?: string | null
}

type SitemapUrlItem = {
  path: string
  lastmod?: string | null
}

const PUBLISHED_FILTER_KEY = 'filter[status][_eq]'
const SLUG_AND_UPDATED_FIELDS = 'slug,date_updated'

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

const normalizeSlug = (value: string | null | undefined): string => {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().replace(/^\/+|\/+$/g, '')
}

const addUrlItem = (
  pathMap: Map<string, string | null>,
  rawPath: string,
  lastmod: string | null | undefined
): void => {
  const normalizedPath = normalizePath(rawPath).replace(/\/+$/, '') || '/'
  const normalizedLastmod = toIsoDate(lastmod)
  const previousLastmod = pathMap.get(normalizedPath)

  if (!previousLastmod || (normalizedLastmod && normalizedLastmod > previousLastmod)) {
    pathMap.set(normalizedPath, normalizedLastmod)
  }
}

const addStaticRoutes = (paths: Map<string, string | null>): void => {
  addUrlItem(paths, '/', null)
  addUrlItem(paths, '/articles', null)
  addUrlItem(paths, '/work', null)
  addUrlItem(paths, '/transmission', null)
  addUrlItem(paths, '/policy', null)
  addUrlItem(paths, '/kontaktyi', null)
  addUrlItem(paths, '/opredelit-akpp', null)
  addUrlItem(paths, '/sale-akpp', null)
}

const addPageRoutes = (
  paths: Map<string, string | null>,
  pages: readonly SitemapPageItem[]
): void => {
  for (const page of pages) {
    const slug = normalizeSlug(page.slug)
    if (slug.length === 0) {
      continue
    }

    addUrlItem(paths, slug === 'home' ? '/' : `/${slug}`, page.date_updated)
  }
}

const addArticleRoutes = (
  paths: Map<string, string | null>,
  articles: readonly SitemapEntityItem[]
): void => {
  for (const article of articles) {
    const articleSlug = normalizeSlug(article.slug)
    if (articleSlug.length === 0) {
      continue
    }

    addUrlItem(paths, `/articles/${articleSlug}`, article.date_updated)
  }
}

const addCaseRoutes = (
  paths: Map<string, string | null>,
  cases: readonly SitemapEntityItem[]
): void => {
  for (const caseItem of cases) {
    const caseSlug = normalizeSlug(caseItem.slug)
    if (caseSlug.length === 0) {
      continue
    }

    addUrlItem(paths, `/work/${caseSlug}`, caseItem.date_updated)
  }
}

const addRouteLandingRoutes = async (paths: Map<string, string | null>): Promise<void> => {
  const routeLandings = await new RouteLandingsRepository().listPublished()

  for (const landing of routeLandings) {
    if (landing.path === '/') {
      continue
    }

    addUrlItem(paths, landing.path, landing.date_updated)
  }
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
  const pagesQuery: Record<string, string> = {
    fields,
    limit: '5000',
    [`filter[${statusField}][_eq]`]: publishedValue,
  }

  const [pages, articles, cases] = await Promise.all([
    directusClient.getItems<SitemapPageItem>(pagesCollection, pagesQuery),
    directusClient.getItems<SitemapEntityItem>('articles', {
      fields: SLUG_AND_UPDATED_FIELDS,
      limit: '5000',
      [PUBLISHED_FILTER_KEY]: publishedValue,
    }),
    directusClient.getItems<SitemapEntityItem>('cases', {
      fields: SLUG_AND_UPDATED_FIELDS,
      limit: '5000',
      [PUBLISHED_FILTER_KEY]: publishedValue,
    }),
  ])

  const paths = new Map<string, string | null>()

  addStaticRoutes(paths)
  addPageRoutes(paths, pages)
  addArticleRoutes(paths, articles)
  addCaseRoutes(paths, cases)
  await addRouteLandingRoutes(paths)

  const urlItems: SitemapUrlItem[] = [...paths.entries()]
    .map(([path, lastmod]) => ({ path, lastmod }))
    .sort((firstItem, secondItem) => firstItem.path.localeCompare(secondItem.path))

  const urlsXml = urlItems
    .map((urlItem) => {
      const loc = xmlTag('loc', joinUrl(siteUrl, urlItem.path))
      const lastmod = urlItem.lastmod ? xmlTag('lastmod', urlItem.lastmod) : ''
      return xmlRawTag('url', `${loc}${lastmod}`)
    })
    .join('')

  // noinspection HttpUrlsUsage
  const urlset =
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` + urlsXml + `</urlset>`

  return xmlDoc(urlset)
}
