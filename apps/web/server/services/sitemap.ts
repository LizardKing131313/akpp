import { createDirectusClient } from '#server/services/directus'
import { xmlDoc, xmlRawTag, xmlTag } from '#server/utils/xml'

type SitemapPageItem = {
  slug: string | null
  date_updated?: string | null
}

type SitemapEntityItem = {
  slug: string | null
  date_updated?: string | null
}

type SitemapModelItem = {
  slug: string | null
  date_updated?: string | null
  brand_id: string | number | null
}

type SitemapBrandItem = {
  id: string | number
  slug: string | null
  date_updated?: string | null
}

type SitemapServiceBrandItem = {
  date_updated?: string | null
  service_id?: {
    slug?: string | null
  } | null
  brand_id?: {
    slug?: string | null
  } | null
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

const buildBrandsById = (brands: readonly SitemapBrandItem[]): Map<string, SitemapBrandItem> => {
  const brandsById = new Map<string, SitemapBrandItem>()

  for (const brand of brands) {
    brandsById.set(String(brand.id), brand)
  }

  return brandsById
}

const addBrandRoutes = (
  paths: Map<string, string | null>,
  brands: readonly SitemapBrandItem[]
): void => {
  for (const brand of brands) {
    const brandSlug = normalizeSlug(brand.slug)
    if (brandSlug.length === 0) {
      continue
    }

    addUrlItem(paths, `/remont-akpp-${brandSlug}`, brand.date_updated)
    addUrlItem(paths, `/transmission/${brandSlug}`, brand.date_updated)
  }
}

const addModelRoutes = (
  paths: Map<string, string | null>,
  models: readonly SitemapModelItem[],
  brandsById: ReadonlyMap<string, SitemapBrandItem>
): void => {
  for (const model of models) {
    const modelSlug = normalizeSlug(model.slug)
    if (modelSlug.length === 0 || model.brand_id === null) {
      continue
    }

    const brand = brandsById.get(String(model.brand_id))
    const brandSlug = normalizeSlug(brand?.slug)
    if (brandSlug.length === 0) {
      continue
    }

    addUrlItem(paths, `/remont-akpp-${brandSlug}/${modelSlug}`, model.date_updated)
  }
}

const addServiceRoutes = (
  paths: Map<string, string | null>,
  services: readonly SitemapEntityItem[],
  serviceBrands: readonly SitemapServiceBrandItem[]
): void => {
  for (const service of services) {
    const serviceSlug = normalizeSlug(service.slug)
    if (serviceSlug.length === 0) {
      continue
    }

    addUrlItem(paths, `/uslugi/${serviceSlug}`, service.date_updated)
  }

  for (const serviceBrand of serviceBrands) {
    const serviceSlug = normalizeSlug(serviceBrand.service_id?.slug)
    const brandSlug = normalizeSlug(serviceBrand.brand_id?.slug)
    if (serviceSlug.length === 0 || brandSlug.length === 0) {
      continue
    }

    addUrlItem(paths, `/uslugi/${serviceSlug}/${brandSlug}`, serviceBrand.date_updated)
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

  const [pages, articles, cases, brands, models, services, serviceBrands] = await Promise.all([
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
    directusClient.getItems<SitemapBrandItem>('brands', {
      fields: 'id,slug,date_updated',
      limit: '5000',
      [PUBLISHED_FILTER_KEY]: publishedValue,
    }),
    directusClient.getItems<SitemapModelItem>('models', {
      fields: 'slug,brand_id,date_updated',
      limit: '10000',
      [PUBLISHED_FILTER_KEY]: publishedValue,
      'filter[brand_id][_nnull]': true,
    }),
    directusClient.getItems<SitemapEntityItem>('services', {
      fields: SLUG_AND_UPDATED_FIELDS,
      limit: '5000',
      [PUBLISHED_FILTER_KEY]: publishedValue,
    }),
    directusClient.getItems<SitemapServiceBrandItem>('service_brands', {
      fields: 'service_id.slug,brand_id.slug,date_updated',
      limit: '10000',
      [PUBLISHED_FILTER_KEY]: publishedValue,
      'filter[service_id][_nnull]': true,
      'filter[brand_id][_nnull]': true,
    }),
  ])

  const paths = new Map<string, string | null>()
  const brandsById = buildBrandsById(brands)

  addStaticRoutes(paths)
  addPageRoutes(paths, pages)
  addArticleRoutes(paths, articles)
  addCaseRoutes(paths, cases)
  addBrandRoutes(paths, brands)
  addModelRoutes(paths, models, brandsById)
  addServiceRoutes(paths, services, serviceBrands)

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
