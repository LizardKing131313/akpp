import type { UseModalReturnType } from '#shared/types/modal'

import { useModal } from '~/composables/modal/useModal'

export const useShopModal = (): UseModalReturnType => {
  const modalName = 'ShopModal'

  const { open, close, isOpen } = useModal()

  return {
    modalName,
    openModal: () => open(modalName, {}),
    closeModal: close,
    isModalOpen: (): boolean => isOpen(modalName),
  }
}
