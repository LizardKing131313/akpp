import type { SlugEntityItem } from '#shared/types/entity'

export type MenuItem = SlugEntityItem & {
  readonly children: MenuItem[]
}
