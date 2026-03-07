import type { WhyApiSettings } from '#shared/types/api/why'
import type { WhySettings } from '#shared/types/why'

const normalizeOptionalText = (value: string | null | undefined): string | undefined => {
  const normalizedValue = value?.trim() ?? ''
  return normalizedValue.length > 0 ? normalizedValue : undefined
}

export const mapWhyApiSettingsToWhySettings = (apiSettings: WhyApiSettings): WhySettings => {
  const title = normalizeOptionalText(apiSettings.title)
  const description = normalizeOptionalText(apiSettings.description)
  const diagnostic = normalizeOptionalText(apiSettings.diagnostic)
  const diagnosticImage = normalizeOptionalText(apiSettings.diagnostic_image)
  const diagnosticAlt = normalizeOptionalText(apiSettings.diagnostic_alt)
  const tow = normalizeOptionalText(apiSettings.tow)
  const towImage = normalizeOptionalText(apiSettings.tow_image)
  const towAlt = normalizeOptionalText(apiSettings.tow_alt)
  const guarantee = normalizeOptionalText(apiSettings.guarantee)
  const guaranteeImage = normalizeOptionalText(apiSettings.guarantee_image)
  const guaranteeAlt = normalizeOptionalText(apiSettings.guarantee_alt)

  return {
    image_source: '/images/transmission.png',
    image_alt: 'transmission',
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(diagnostic ? { diagnostic } : {}),
    ...(diagnosticImage ? { diagnostic_image: diagnosticImage } : {}),
    ...(diagnosticAlt ? { diagnostic_alt: diagnosticAlt } : {}),
    ...(tow ? { tow } : {}),
    ...(towImage ? { tow_image: towImage } : {}),
    ...(towAlt ? { tow_alt: towAlt } : {}),
    ...(guarantee ? { guarantee } : {}),
    ...(guaranteeImage ? { guarantee_image: guaranteeImage } : {}),
    ...(guaranteeAlt ? { guarantee_alt: guaranteeAlt } : {}),
  }
}
