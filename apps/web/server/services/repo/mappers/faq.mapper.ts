import type { FaqApiItem } from '#shared/types/api/faq'
import type { FaqItem } from '#shared/types/faq'

export const mapFaqApiItemToFaqItem = (apiItem: FaqApiItem): FaqItem => {
  const questionText = apiItem.question ?? ''
  const answerText = apiItem.answer ?? ''
  const serviceId = apiItem.service_id

  if (!serviceId) {
    return {
      id: apiItem.id,
      question: questionText,
      answer: answerText,
    }
  }

  return {
    id: apiItem.id,
    question: questionText,
    answer: answerText,
    service_id: serviceId,
  }
}
