import type { EntityItem } from '#shared/types/entity'

export type FaqItem = EntityItem & {
  readonly content: string
}
