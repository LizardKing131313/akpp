import type { EntityItem } from '#shared/types/entity'

export type FaqItem = EntityItem & {
  readonly answer: string
  readonly question: string
  readonly service_id?: string
}
