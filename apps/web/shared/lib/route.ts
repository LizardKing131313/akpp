export const normalizeAppPath = (value: string | null | undefined): string => {
  const normalizedValue = value?.trim() ?? ''

  if (normalizedValue.length === 0 || normalizedValue === '/') {
    return '/'
  }

  if (
    normalizedValue.startsWith('/') ||
    normalizedValue.startsWith('#') ||
    /^[a-z]+:/i.test(normalizedValue)
  ) {
    return normalizedValue
  }

  return `/${normalizedValue}`
}
