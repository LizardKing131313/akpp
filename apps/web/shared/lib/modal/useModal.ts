export type ModalName = 'signup'

export type SignupModalPayload = {
  source?: string
}

export type ModalPayloadByName = {
  signup: SignupModalPayload
}

type ModalState = {
  isOpen: boolean
  name: ModalName | null
  payload: ModalPayloadByName[ModalName] | null
}

export const useModal = () => {
  const modalState = useState<ModalState>('global-modal', () => ({
    isOpen: false,
    name: null,
    payload: null,
  }))

  const open = <TModalName extends ModalName>(
    modalName: TModalName,
    payload: ModalPayloadByName[TModalName]
  ): void => {
    modalState.value = {
      isOpen: true,
      name: modalName,
      payload,
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
