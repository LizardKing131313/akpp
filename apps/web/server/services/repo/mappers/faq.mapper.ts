import type { FaqApiItem } from '#shared/types/api/faq'
import type { FaqItem } from '#shared/types/faq'

const normalizeRequiredText = (value: string | null | undefined): string => {
  return value?.trim() ?? ''
}

const normalizeOptionalText = (value: string | null | undefined): string | undefined => {
  const normalizedValue = value?.trim() ?? ''
  return normalizedValue.length > 0 ? normalizedValue : undefined
}

export const mapFaqApiItemToFaqItem = (apiItem: FaqApiItem): FaqItem => {
  const serviceId = normalizeOptionalText(apiItem.service_id)

  if (!serviceId) {
    return {
      id: apiItem.id,
      question: normalizeRequiredText(apiItem.question),
      answer: normalizeRequiredText(apiItem.answer),
    }
  }

  return {
    id: apiItem.id,
    question: normalizeRequiredText(apiItem.question),
    answer: normalizeRequiredText(apiItem.answer),
    service_id: serviceId,
  }
}
