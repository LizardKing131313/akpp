import type { SlugEntityItem } from '#shared/types/entity'

export type CaseItem = SlugEntityItem & {
  readonly description: string
  readonly case_date: string
  readonly transmission: string
  readonly model_date: string
  readonly engine: string
  readonly mileage: string

  readonly works: string[]

  readonly part_price: number
  readonly work_price: number
  readonly total: number

  readonly images: string[]
}
