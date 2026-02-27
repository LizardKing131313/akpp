import { useModal } from '#shared/lib/modal/useModal'

type BrandLike = {
  title: string
}

export type RepairQuizModalPayload = {
  brands: readonly BrandLike[]
  problems: readonly string[]
  symptoms: Readonly<Record<string, readonly string[]>>
}

export const useRepairQuizModal = () => {
  const { open } = useModal()

  const openRepairQuizModal = (payload: RepairQuizModalPayload): void => {
    open('repairQuiz', payload)
  }

  return {
    openRepairQuizModal,
  }
}
