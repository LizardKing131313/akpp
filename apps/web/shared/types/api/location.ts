export type LocationApiItem = {
  readonly id: string
  readonly name?: string | null

  readonly lat?: number | null
  readonly lng?: number | null
  readonly latitude?: number | null
  readonly longitude?: number | null

  readonly address?: string | null
  readonly worktime?: string | null
  readonly phone?: string | null

  readonly metro?: string | null
  readonly metro_color?: string | null

  readonly images?: string[] | null
  readonly city_id?: string | null
}
