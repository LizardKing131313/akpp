import type { QuizSubmitPayload } from '#shared/types/quiz'

import { ref } from 'vue'

import { useLeadSubmit } from '~/composables/useLeadSubmit'

type UseQuizSubmitOptions = {
  readonly onSuccess?: (() => void | Promise<void>) | undefined
}

export const useQuizSubmit = (options?: UseQuizSubmitOptions) => {
  const isSubmitting = ref<boolean>(false)
  const { submitLead } = useLeadSubmit()

  const submitQuiz = async (payload: QuizSubmitPayload): Promise<void> => {
    if (isSubmitting.value) {
      return
    }

    isSubmitting.value = true

    try {
      const contextParts = [
        payload.contextTitles.length > 0 ? `Контекст: ${payload.contextTitles.join(', ')}` : '',
        payload.contextText.length > 0 ? `Дополнительно: ${payload.contextText}` : '',
      ].filter((contextPart) => contextPart.length > 0)

      await submitLead({
        source: 'quiz',
        name: payload.customerName,
        phone: payload.customerPhone,
        problem: payload.problemTitle,
        symptoms: payload.symptomTitle,
        comment: [`Марка: ${payload.brandTitle}`, ...contextParts].join('; '),
      })

      await options?.onSuccess?.()
    } catch {
      console.error('[lead] quiz submit failed')
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    isSubmitting,
    submitQuiz,
  }
}
