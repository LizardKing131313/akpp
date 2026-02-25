import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
// noinspection JSUnusedGlobalSymbols
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  vue: {
    runtimeCompiler: true,
  },

  vite: {
    plugins: [
      // @ts-ignore
      tailwindcss(),
    ],
  },

  modules: ['@nuxtjs/google-fonts', '@nuxt/image'],

  googleFonts: {
    families: {
      'Open Sans': [400, 600, 700],
    },
    display: 'swap',
    preconnect: true,
    preload: true,
    download: true,
  },

  image: {
    provider: 'ipx',
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
    },
    directusSecret: process.env.DIRECTUS_SECRET ?? 'secret',
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
