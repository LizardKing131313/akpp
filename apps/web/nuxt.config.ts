import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
// noinspection JSUnusedGlobalSymbols
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV === 'development' },

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
    format: ['avif', 'webp'],
    quality: 75,
  },

  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/_nuxt/**': {
        headers: {
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
      directusUrl: process.env.NUXT_PUBLIC_DIRECTUS_URL ?? 'http://localhost:8086',
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
