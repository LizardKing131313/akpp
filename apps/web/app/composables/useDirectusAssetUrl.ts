export const useDirectusAssetUrl = () => {
  const runtimeConfig = useRuntimeConfig()

  const directusUrl = runtimeConfig.public.directusUrl.replace(/\/+$/, '')

  return (assetId: string | null | undefined): string | null => {
    if (!assetId) return null

    if (/^(?:https?:)?\/\//.test(assetId) || assetId.startsWith('/')) {
      return assetId
    }

    return `${directusUrl}/assets/${assetId}`
  }
}
