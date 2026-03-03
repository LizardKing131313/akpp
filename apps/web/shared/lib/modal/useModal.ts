import { useState } from '#imports'

export type ModalName = string

type ModalState = {
  isOpen: boolean
  name: ModalName | null
  payload: unknown
}

export const useModal = () => {
  const modalState = useState<ModalState>('global-modal', () => ({
    isOpen: false,
    name: null,
    payload: null,
  }))

  const open = (modalName: ModalName, payload?: unknown): void => {
    modalState.value = {
      isOpen: true,
      name: modalName,
      payload: payload ?? null,
    }
  }

  const close = (): void => {
    modalState.value = {
      isOpen: false,
      name: null,
      payload: null,
    }
  }

  const isOpen = (modalName: ModalName): boolean =>
    modalState.value.isOpen && modalState.value.name === modalName

  return {
    modalState,
    open,
    close,
    isOpen,
  }
}
