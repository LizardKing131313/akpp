export const useDirectusAssetUrl = () => {
  const runtimeConfig = useRuntimeConfig()

  const directusPublicUrl = runtimeConfig.public.directusPublicUrl.replace(/\/+$/, '')

  return (assetId: string | null | undefined): string | null => {
    if (!assetId) return null

    if (/^(?:https?:)?\/\//.test(assetId) || assetId.startsWith('/')) {
      return assetId
    }

    return `${directusPublicUrl}/assets/${assetId}`
  }
}
