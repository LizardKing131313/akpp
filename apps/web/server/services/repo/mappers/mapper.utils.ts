type NullableSort = {
  readonly sort?: number | null
}

type TextListItem = {
  readonly text?: string | null
  readonly sort?: number | null
}

type DirectusFileReference = {
  readonly directus_files_id?: string | null
  readonly sort?: number | null
}

const compareBySort = (left: NullableSort, right: NullableSort): number =>
  (left.sort ?? Number.MAX_SAFE_INTEGER) - (right.sort ?? Number.MAX_SAFE_INTEGER)

export const normalizeText = (value: unknown): string => {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value).trim()
  }

  return ''
}

export const normalizeOptionalText = (value: unknown): string | undefined => {
  const normalizedValue = normalizeText(value)
  return normalizedValue.length > 0 ? normalizedValue : undefined
}

export const normalizeNumber = (value: unknown, fallback = 0): number =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback

export const normalizeCoordinate = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isFinite(value) ? value : undefined

export const mapTextList = (
  rawItems: readonly string[] | readonly TextListItem[] | null | undefined
): string[] => {
  if (!Array.isArray(rawItems)) {
    return []
  }

  if (rawItems.every((item) => typeof item === 'string')) {
    return rawItems.map((item) => normalizeText(item)).filter((item) => item.length > 0)
  }

  return (rawItems as readonly TextListItem[])
    .slice()
    .sort(compareBySort)
    .map((item) => normalizeText(item.text))
    .filter((item) => item.length > 0)
}

export const mapDirectusFileIds = (
  rawItems: readonly string[] | readonly DirectusFileReference[] | null | undefined
): string[] => {
  if (!Array.isArray(rawItems)) {
    return []
  }

  if (rawItems.every((item) => typeof item === 'string')) {
    return rawItems.map((item) => normalizeText(item)).filter((item) => item.length > 0)
  }

  return (rawItems as readonly DirectusFileReference[])
    .slice()
    .sort(compareBySort)
    .map((item) => normalizeText(item.directus_files_id))
    .filter((item) => item.length > 0)
}
