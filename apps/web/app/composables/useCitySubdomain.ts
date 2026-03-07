import { computed } from 'vue'

export const useCitySubdomain = () => {
  const requestUrl = useRequestURL()

  return computed<string>(() => {
    const host = requestUrl.hostname.trim().toLowerCase()

    if (host.length === 0 || host === 'localhost') {
      return ''
    }

    const hostParts = host.split('.').filter((part: string) => part.length > 0)

    if (hostParts.length >= 3) {
      const firstHostPart = hostParts[0] ?? ''
      return firstHostPart === 'www' ? '' : firstHostPart
    }

    if (hostParts.length === 2 && hostParts[1] === 'localhost') {
      return hostParts[0] ?? ''
    }

    return ''
  })
}
