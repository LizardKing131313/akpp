import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
// noinspection JSUnusedGlobalSymbols
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      // @ts-ignore
      tailwindcss(),
    ],
  },

  modules: ['@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      'Open Sans': [400, 600, 700],
    },
    display: 'swap',
    preconnect: true,
    preload: true,
    download: true,
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
      directusUrl: process.env.NUXT_PUBLIC_DIRECTUS_URL ?? 'http://localhost:8086',
    },
    directusSecret: process.env.DIRECTUS_SECRET ?? 'secret',
    directusCacheTtlSeconds: Number(process.env.DIRECTUS_CACHE_TTL_SECONDS ?? 300),
  },
})
