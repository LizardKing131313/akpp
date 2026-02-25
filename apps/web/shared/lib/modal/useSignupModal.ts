import { useModal } from '#shared/lib/modal/useModal'

export const useSignupModal = () => {
  const { open, close, isOpen } = useModal()

  const openSignupModal = (source?: string): void => {
    open('signup', source === undefined ? {} : { source })
  }

  return {
    openSignupModal,
    closeModal: close,
    isSignupModalOpen: (): boolean => isOpen('signup'),
  }
}
