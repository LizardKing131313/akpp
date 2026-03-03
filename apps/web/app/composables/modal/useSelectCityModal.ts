import { useModal } from '~/composables/modal/useModal'

export type SelectCityPayload = {
  source?: string
}

export const useSelectCityModal = () => {
  const { open, close, isOpen } = useModal()

  const openSelectCityModal = (source?: string): void => {
    open('selectCity', source === undefined ? {} : { source })
  }

  return {
    openSelectCityModal,
    closeModal: close,
    isSelectCityModalOpen: (): boolean => isOpen('selectCity'),
  }
}
