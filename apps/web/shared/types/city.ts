import type { SlugEntityItem } from '#shared/types/entity'

export type CityItem = SlugEntityItem & {
  readonly is_default: boolean

  readonly work_hours_text: string
  readonly work_hours_subtext: string

  readonly phone_number: string
  readonly phone_text: string

  readonly email_value: string
  readonly email_text: string
}
