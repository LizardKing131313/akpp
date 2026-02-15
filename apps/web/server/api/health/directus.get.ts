// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (_event) => {
  const config = useRuntimeConfig()
  const directusUrl = config.public.directusUrl

  if (!directusUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'NUXT_PUBLIC_DIRECTUS_URL is not set',
    })
  }

  const response = await $fetch<Record<string, unknown>>(`${directusUrl}/server/health`, {
    retry: 0,
  })

  return {
    ok: true,
    directus: response,
  }
})
