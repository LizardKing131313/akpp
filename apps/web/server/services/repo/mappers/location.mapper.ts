import type { LocationApiItem } from '#shared/types/api/location'
import type { LocationItem } from '#shared/types/location'

const normalizeRequiredText = (value: string | null | undefined): string => {
  return value?.trim() ?? ''
}

const normalizeOptionalText = (value: string | null | undefined): string | undefined => {
  const normalizedValue = value?.trim() ?? ''
  return normalizedValue.length > 0 ? normalizedValue : undefined
}

const normalizeCoordinate = (value: number | null | undefined): number | undefined => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return undefined
  }

  return value
}

export const mapLocationApiItemToLocationItem = (apiItem: LocationApiItem): LocationItem => {
  const latValue = normalizeCoordinate(apiItem.lat) ?? normalizeCoordinate(apiItem.latitude) ?? 0
  const lngValue = normalizeCoordinate(apiItem.lng) ?? normalizeCoordinate(apiItem.longitude) ?? 0
  const locationName = normalizeOptionalText(apiItem.name)

  const mappedLocation: LocationItem = {
    id: apiItem.id,
    city_id: normalizeRequiredText(apiItem.city_id),
    address: normalizeRequiredText(apiItem.address),
    worktime: normalizeRequiredText(apiItem.worktime),
    phone: normalizeRequiredText(apiItem.phone),
    metro: normalizeRequiredText(apiItem.metro),
    metro_color: normalizeRequiredText(apiItem.metro_color),
    images: apiItem.images ?? [],
    lat: latValue,
    lng: lngValue,
  }

  if (!locationName) {
    return mappedLocation
  }

  return {
    ...mappedLocation,
    name: locationName,
  }
}
