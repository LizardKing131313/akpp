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
      await submitLead({
        source: 'quiz',
        name: payload.customerName,
        phone: payload.customerPhone,
        problem: payload.problemTitle,
        symptoms: payload.symptomTitle,
        comment: `Марка: ${payload.brandTitle}`,
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
