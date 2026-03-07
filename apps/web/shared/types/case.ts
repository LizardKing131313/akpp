import type { BrandItem } from '#shared/types/brand'
import type { ImageItem, SlugEntityItem } from '#shared/types/entity'

export type CaseItem = SlugEntityItem &
  ImageItem & {
    readonly reason: string
    readonly case_date: string
    readonly transmission: string
    readonly model_date: string
    readonly engine: string
    readonly mileage: string

    readonly brand: BrandItem

    readonly works: string[]

    readonly part_price: number
    readonly work_price: number

    readonly images: string[]
  }

export type CaseItemSetting = {
  readonly reason_label: string
  readonly transmission_label: string
  readonly model_date_label: string
  readonly engine_label: string
  readonly mileage_label: string
  readonly works_label: string
  readonly part_price_label: string
  readonly work_price_label: string
  readonly total_label: string

  readonly part_price_image: string
  readonly part_price_image_alt: string

  readonly work_price_image: string
  readonly work_price_image_alt: string

  readonly total_image: string
  readonly total_image_alt: string

  readonly calculate_label: string
  readonly signup_label: string
}
