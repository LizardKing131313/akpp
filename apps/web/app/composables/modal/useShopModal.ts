import { useModal } from '~/composables/modal/useModal'

export type ShopModalPayload = {
  source?: string
}

export const useShopModal = () => {
  const { open, close, isOpen } = useModal()

  const openShopModal = (source?: string): void => {
    open('shop', source === undefined ? {} : { source })
  }

  return {
    openShopModal,
    closeModal: close,
    isSellAkppModalOpen: (): boolean => isOpen('shop'),
  }
}
