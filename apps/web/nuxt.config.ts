import tailwindcss from '@tailwindcss/vite'

const isProduction = process.env.NODE_ENV === 'production'
const directusUrl = process.env.NUXT_PUBLIC_DIRECTUS_URL ?? 'http://localhost:8086'
const directusHost = (() => {
  try {
    return new URL(directusUrl).host
  } catch {
    return ''
  }
})()

const nitroRedisHost = process.env.NITRO_REDIS_HOST?.trim()
const nitroRedisPortRaw = Number(process.env.NITRO_REDIS_PORT ?? 6379)
const nitroRedisPort =
  Number.isFinite(nitroRedisPortRaw) && nitroRedisPortRaw > 0 ? nitroRedisPortRaw : 6379
const nitroRedisDbRaw = Number(process.env.NITRO_REDIS_DB ?? 0)
const nitroRedisDb = Number.isFinite(nitroRedisDbRaw) && nitroRedisDbRaw >= 0 ? nitroRedisDbRaw : 0
const nitroApiCacheTtlRaw = Number(
  process.env.NITRO_API_CACHE_TTL_SECONDS ?? process.env.DIRECTUS_CACHE_TTL_SECONDS ?? 300
)
const nitroApiCacheTtl =
  Number.isFinite(nitroApiCacheTtlRaw) && nitroApiCacheTtlRaw > 0 ? nitroApiCacheTtlRaw : 300
const nitroSsrSwrRaw = Number(process.env.NITRO_SSR_SWR_SECONDS ?? 300)
const nitroSsrSwr = Number.isFinite(nitroSsrSwrRaw) && nitroSsrSwrRaw > 0 ? nitroSsrSwrRaw : 300

const nitroCacheStorage = nitroRedisHost
  ? {
      driver: 'redis' as const,
      host: nitroRedisHost,
      port: nitroRedisPort,
      db: nitroRedisDb,
      ...(process.env.NITRO_REDIS_PASSWORD ? { password: process.env.NITRO_REDIS_PASSWORD } : {}),
    }
  : {
      driver: 'memory' as const,
    }

const prodOnlyRouteRule = <RuleType>(rule: RuleType): RuleType | Record<string, never> => {
  return isProduction ? rule : {}
}

// https://nuxt.com/docs/api/configuration/nuxt-config
// noinspection JSUnusedGlobalSymbols
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  vue: {
    runtimeCompiler: true,
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      // @ts-ignore
      tailwindcss(),
    ],
    build: {
      sourcemap: false,
    },
  },

  modules: ['@nuxtjs/google-fonts', '@nuxt/image'],

  googleFonts: {
    families: {
      'Open Sans': [400, 600, 700],
    },
    subsets: ['cyrillic', 'latin'],
    display: 'swap',
    preconnect: true,
    preload: true,
    download: true,
  },

  image: {
    provider: 'ipx',
    ...(directusHost ? { domains: [directusHost] } : {}),
    format: ['avif', 'webp'],
    quality: 75,
  },

  nitro: {
    compressPublicAssets: true,
    storage: {
      cache: nitroCacheStorage,
    },
    routeRules: {
      '/api/**': {
        ...prodOnlyRouteRule({
          cache: {
            maxAge: nitroApiCacheTtl,
            staleMaxAge: 60,
          },
        }),
      },
      '/api/health/**': {
        cache: false,
      },
      '/api/leads': {
        cache: false,
      },
      '/': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/policy': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/articles': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/articles/**': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/kontaktyi': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/kontaktyi/**': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/opredelit-akpp': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/opredelit-akpp/**': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/remont-akpp-*': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/remont-akpp-*/**': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/sale-akpp': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/sale-akpp/**': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/transmission': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/transmission/**': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/uslugi': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/uslugi/**': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/work': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/work/**': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/sitemap.xml': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/robots.txt': {
        ...prodOnlyRouteRule({
          swr: nitroSsrSwr,
        }),
      },
      '/_nuxt/**': {
        headers: {
          // eslint-disable-next-line sonarjs/no-duplicate-string
          'cache-control': 'public, max-age=31536000, immutable',
        },
      },
      '/images/**': {
        headers: {
          'cache-control': 'public, max-age=31536000, immutable',
        },
      },
      '/fonts/**': {
        headers: {
          'cache-control': 'public, max-age=31536000, immutable',
        },
      },
      '/favicon.ico': {
        headers: {
          'cache-control': 'public, max-age=2592000',
        },
      },
    },
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
      directusUrl,
      yandexMapApiKey: process.env.YANDEX_MAP_API_KEY ?? '',
      yandexOrgId: process.env.YANDEX_ORG_ID ?? '',
    },
    directusToken: process.env.DIRECTUS_TOKEN ?? 'token',
    directusCacheTtlSeconds: Number(process.env.DIRECTUS_CACHE_TTL_SECONDS ?? 300),
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#E62A2A' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      meta: [{ name: 'theme-color', content: '#E62A2A' }],
    },
  },
})
