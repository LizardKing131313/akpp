// noinspection JSUnusedGlobalSymbols
export default defineNuxtPlugin(() => {
  const route = useRoute()
  const { syncTrackingCookies } = useLeadTracking()

  syncTrackingCookies()
  watch(() => route.fullPath, syncTrackingCookies)
})
