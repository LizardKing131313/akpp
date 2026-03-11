import type { BrandItem } from '#shared/types/brand'
import type { ImageItem, ImageListItem, SlugEntityItem } from '#shared/types/entity'

export type CaseItem = SlugEntityItem &
  ImageItem & {
    readonly reason: string
    readonly case_date: string
    readonly transmission: string
    readonly model_date: string
    readonly engine: string
    readonly mileage: string
    readonly part_price: number
    readonly work_price: number
    readonly problems: string

    readonly brand: BrandItem

    readonly works: EntityItem[]

    readonly images: ImageListItem[]
  }

export type CaseSettings = {
  readonly reason_label: string
  readonly transmission_label: string
  readonly model_date_label: string
  readonly engine_label: string
  readonly mileage_label: string
  readonly problems_label: string
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

  readonly page_title: string
  readonly show_all_button: string
  readonly show_all_link: string
}
