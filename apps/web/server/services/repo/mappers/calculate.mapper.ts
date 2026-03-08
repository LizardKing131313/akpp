import type { CalculateApiSettings } from '#shared/types/api/calculate'
import type { CalculateSettings } from '#shared/types/calculate'

const normalizeText = (value: string | null | undefined): string => value?.trim() ?? ''

const normalizePerks = (
  rawPerks: readonly { text?: string | null; sort?: number | null }[]
): string[] =>
  rawPerks
    .slice()
    .sort(
      (left, right) =>
        (left.sort ?? Number.MAX_SAFE_INTEGER) - (right.sort ?? Number.MAX_SAFE_INTEGER)
    )
    .map((perk) => normalizeText(perk.text))
    .filter((perk) => perk.length > 0)

export const mapCalculateApiSettingsToCalculateSettings = (
  apiSettings: CalculateApiSettings
): CalculateSettings => {
  const titleMain = normalizeText(apiSettings.title_main)
  const titleAccent = normalizeText(apiSettings.title_accent)
  const description = normalizeText(apiSettings.description)
  const perks = Array.isArray(apiSettings.perks) ? normalizePerks(apiSettings.perks) : []

  return {
    title_main: titleMain,
    title_accent: titleAccent,
    description,
    perks,
  }
}
