export type CalculateSettings = {
  readonly title_main: string
  readonly title_accent: string
  readonly description: string
  readonly perks: CalculatePerkItem[]
}

export type CalculatePerkItem = {
  readonly id: string
  readonly name: string
}
