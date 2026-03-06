import type { UseModalReturnType } from '#shared/types/modal'

import { useModal } from '~/composables/modal/useModal'

export const useSelectCityModal = (): UseModalReturnType => {
  const modalName = 'CitySelectModal'

  const { open, close, isOpen } = useModal()

  return {
    modalName,
    openModal: (): void => open(modalName, {}),
    closeModal: close,
    isModalOpen: (): boolean => isOpen(modalName),
  }
}
