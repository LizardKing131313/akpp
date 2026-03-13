import tailwindcss from '@tailwindcss/vite'

const isProduction = process.env.NODE_ENV === 'production'

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL?.trim() ?? ''
const directusPublicUrl = process.env.NUXT_PUBLIC_DIRECTUS_PUBLIC_URL?.trim() ?? ''

const yandexMapApiKey = process.env.NUXT_PUBLIC_YANDEX_MAP_API_KEY?.trim() ?? ''
const yandexOrgId = process.env.NUXT_PUBLIC_YANDEX_ORG_ID?.trim() ?? ''

const directusToken = process.env.NUXT_DIRECTUS_TOKEN?.trim() ?? ''
const directusInternalUrl = process.env.NUXT_DIRECTUS_INTERNAL_URL?.trim() ?? ''
const directusCacheTtlSeconds = Number(process.env.NUXT_DIRECTUS_CACHE_TTL_SECONDS)

const nitroRedisHost = process.env.NITRO_REDIS_HOST?.trim() ?? ''
const nitroRedisPort = Number(process.env.NITRO_REDIS_PORT)
const nitroRedisDb = Number(process.env.NITRO_REDIS_DB)
const nitroApiCacheTtl = Number(process.env.NITRO_API_CACHE_TTL_SECONDS)
const nitroSsrSwr = Number(process.env.NITRO_SSR_SWR_SECONDS)

const yandexUrl = 'https://*.yandex'

const directusHost = (() => {
  try {
    return new URL(directusPublicUrl).host
  } catch {
    return ''
  }
})()

const directusOrigin = (() => {
  try {
    return new URL(directusPublicUrl).origin
  } catch {
    return ''
  }
})()

const compactDirective = (...values: Array<string | false | null | undefined>): string => {
  return values.filter(Boolean).join(' ')
}

const contentSecurityPolicy = [
  `default-src 'self'`,
  `base-uri 'self'`,
  `object-src 'none'`,
  `frame-ancestors 'self'`,
  `form-action 'self'`,
  compactDirective(
    'script-src',
    `'self'`,
    `'unsafe-inline'`,
    `'unsafe-eval'`,
    'https://api-maps.yandex.ru',
    'https://yastatic.net',
    'https://*.yastatic.net'
  ),
  compactDirective('style-src', `'self'`, `'unsafe-inline'`),
  compactDirective(
    'img-src',
    `'self'`,
    'data:',
    'blob:',
    `${yandexUrl}.ru`,
    `${yandexUrl}.net`,
    directusOrigin
  ),
  compactDirective('font-src', `'self'`, 'data:'),
  compactDirective(
    'connect-src',
    `'self'`,
    'https://api-maps.yandex.ru',
    `${yandexUrl}.ru`,
    `${yandexUrl}.net`,
    directusOrigin
  ),
  compactDirective('frame-src', `'self'`, 'https://yandex.ru', `${yandexUrl}.ru`),
  compactDirective('worker-src', `'self'`, 'blob:'),
  `manifest-src 'self'`,
  `upgrade-insecure-requests`,
].join('; ')

const securityHeaders = {
  'content-security-policy': contentSecurityPolicy,
  'cross-origin-opener-policy': 'same-origin',
  'x-frame-options': 'SAMEORIGIN',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  ...(isProduction
    ? {
        'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
      }
    : {}),
}

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
  devtools: { enabled: !isProduction },
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
      '/**': {
        headers: securityHeaders,
      },
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
      siteUrl,
      directusPublicUrl,
      yandexMapApiKey,
      yandexOrgId,
    },
    directusToken,
    directusInternalUrl,
    directusCacheTtlSeconds,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
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
