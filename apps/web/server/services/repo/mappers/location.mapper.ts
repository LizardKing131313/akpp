import type { LocationApiItem } from '#shared/types/api/location'
import type { LocationItem } from '#shared/types/location'

import {
  mapDirectusFileIds,
  normalizeCoordinate,
  normalizeOptionalText,
  normalizeText,
} from '#server/services/repo/mappers/mapper.utils'

export const mapLocationApiItemToLocationItem = (apiItem: LocationApiItem): LocationItem => {
  const latValue = normalizeCoordinate(apiItem.lat) ?? normalizeCoordinate(apiItem.latitude) ?? 0
  const lngValue = normalizeCoordinate(apiItem.lng) ?? normalizeCoordinate(apiItem.longitude) ?? 0
  const locationName = normalizeOptionalText(apiItem.name)

  const mappedLocation: LocationItem = {
    id: apiItem.id,
    city_id: normalizeText(apiItem.city_id),
    address: normalizeText(apiItem.address),
    worktime: normalizeText(apiItem.worktime),
    phone: normalizeText(apiItem.phone),
    metro: normalizeText(apiItem.metro),
    metro_color: normalizeText(apiItem.metro_color),
    images: mapDirectusFileIds(apiItem.images),
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
