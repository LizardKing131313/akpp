import type { LocationApiItem } from '#shared/types/api/location'
import type { LocationItem } from '#shared/types/location'

const normalizeCoordinate = (value: number | null | undefined): number | undefined => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return undefined
  }

  return value
}

export const mapLocationApiItemToLocationItem = (apiItem: LocationApiItem): LocationItem => {
  const latValue = normalizeCoordinate(apiItem.lat) ?? normalizeCoordinate(apiItem.latitude) ?? 0
  const lngValue = normalizeCoordinate(apiItem.lng) ?? normalizeCoordinate(apiItem.longitude) ?? 0
  const locationName = apiItem.name
  const cityId = apiItem.city_id ?? ''
  const address = apiItem.address ?? ''
  const worktime = apiItem.worktime ?? ''
  const phone = apiItem.phone ?? ''
  const metro = apiItem.metro ?? ''
  const metroColor = apiItem.metro_color ?? ''

  const mappedLocation: LocationItem = {
    id: apiItem.id,
    city_id: cityId,
    address,
    worktime,
    phone,
    metro,
    metro_color: metroColor,
    images: apiItem.images ?? [],
    lat: latValue,
    lng: lngValue,
  }

  if (locationName === null || locationName === undefined) {
    return mappedLocation
  }

  return {
    ...mappedLocation,
    name: locationName,
  }
}
