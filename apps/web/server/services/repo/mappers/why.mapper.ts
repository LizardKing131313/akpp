import type { WhyApiSettings } from '#shared/types/api/why'
import type { WhySettings } from '#shared/types/why'

export const mapWhyApiSettingsToWhySettings = (apiSettings: WhyApiSettings): WhySettings => {
  const title = apiSettings.title
  const description = apiSettings.description
  const diagnostic = apiSettings.diagnostic
  const diagnosticImage = apiSettings.diagnostic_image
  const diagnosticAlt = apiSettings.diagnostic_alt
  const tow = apiSettings.tow
  const towImage = apiSettings.tow_image
  const towAlt = apiSettings.tow_alt
  const guarantee = apiSettings.guarantee
  const guaranteeImage = apiSettings.guarantee_image
  const guaranteeAlt = apiSettings.guarantee_alt

  return {
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
