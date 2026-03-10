import type { EntityItem, MapPoint } from '#shared/types/entity'

export type LocationItem = EntityItem &
  MapPoint & {
    readonly city_id: string

    readonly address: string
    readonly worktime: string
    readonly phone: string

    readonly metro: string
    readonly metro_color: string

    readonly images: ImageListItem[]
  }
