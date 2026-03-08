export type CalculateApiPerk = {
  readonly text?: string | null
  readonly sort?: number | null
}

export type CalculateApiSettings = {
  readonly title_main?: string | null
  readonly title_accent?: string | null
  readonly description?: string | null
  readonly perks?: readonly CalculateApiPerk[] | null
}
