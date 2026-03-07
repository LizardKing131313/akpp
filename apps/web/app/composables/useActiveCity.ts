import type { CityItem } from '#shared/types/city'

import { computed } from 'vue'

import { useCitySubdomain } from '~/composables/useCitySubdomain'
import { useCities } from '~/composables/useRepoApi'

export const useActiveCity = () => {
  const { data: citiesData } = useCities()
  const citySubdomain = useCitySubdomain()

  return computed<CityItem | undefined>(() => {
    const cityItems = citiesData.value ?? []
    const normalizedSubdomain = citySubdomain.value

    if (normalizedSubdomain.length > 0) {
      const matchedBySubdomain = cityItems.find((cityItem) => {
        return cityItem.slug.trim().toLowerCase() === normalizedSubdomain
      })

      if (matchedBySubdomain) {
        return matchedBySubdomain
      }
    }

    const defaultCity = cityItems.find((cityItem) => cityItem.is_default)
    return defaultCity ?? undefined
  })
}
