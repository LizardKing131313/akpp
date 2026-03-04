import type { EntityItem } from '#shared/types/entity'

export type FaqItem = EntityItem & {
  readonly question: string
  readonly answer: string
}
