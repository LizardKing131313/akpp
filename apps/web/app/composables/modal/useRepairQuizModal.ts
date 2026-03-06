import type { UseModalReturnType } from '#shared/types/modal'

import { useModal } from '~/composables/modal/useModal'

export const useRepairQuizModal = (): UseModalReturnType => {
  const modalName = 'QuizModal'

  const { open, close, isOpen } = useModal()

  return {
    modalName,
    openModal: () => open(modalName, {}),
    closeModal: close,
    isModalOpen: (): boolean => isOpen(modalName),
  }
}
