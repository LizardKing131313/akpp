import type { CaseApiItem } from '#shared/types/api/case'
import type { BrandItem } from '#shared/types/brand'
import type { CaseItem } from '#shared/types/case'

const normalizeText = (value: string | null | undefined): string => value?.trim() ?? ''

const normalizeNumber = (value: number | null | undefined): number =>
  typeof value === 'number' && Number.isFinite(value) ? value : 0

const normalizeWorks = (
  rawWorks:
    | readonly string[]
    | readonly {
        readonly text?: string | null
        readonly sort?: number | null
      }[]
    | null
    | undefined
): string[] => {
  if (!Array.isArray(rawWorks)) {
    return []
  }

  return rawWorks
    .slice()
    .sort((left, right) => {
      if (typeof left === 'string' || typeof right === 'string') {
        return 0
      }

      return (left.sort ?? Number.MAX_SAFE_INTEGER) - (right.sort ?? Number.MAX_SAFE_INTEGER)
    })
    .map((work) => (typeof work === 'string' ? work.trim() : normalizeText(work.text)))
    .filter((work) => work.length > 0)
}

const normalizeImages = (
  rawImages:
    | readonly string[]
    | readonly {
        readonly directus_files_id?: string | null
      }[]
    | null
    | undefined
): string[] => {
  if (!Array.isArray(rawImages)) {
    return []
  }

  return rawImages
    .map((image) =>
      typeof image === 'string' ? image.trim() : normalizeText(image.directus_files_id)
    )
    .filter((imageId) => imageId.length > 0)
}

const normalizeBrand = (brand: CaseApiItem['brand']): BrandItem => ({
  id: normalizeText(brand?.id),
  slug: normalizeText(brand?.slug),
  name: normalizeText(brand?.name),
  image_source: normalizeText(brand?.image_source),
  image_alt: normalizeText(brand?.image_alt),
})

export const mapCaseApiItemToCaseItem = (apiItem: CaseApiItem): CaseItem => ({
  id: apiItem.id,
  slug: apiItem.slug,
  name: normalizeText(apiItem.name),
  image_source: normalizeText(apiItem.image_source),
  image_alt: normalizeText(apiItem.image_alt),
  case_date: normalizeText(apiItem.case_date),
  transmission: normalizeText(apiItem.transmission),
  model_date: normalizeText(apiItem.model_date),
  engine: normalizeText(apiItem.engine),
  mileage: normalizeText(apiItem.mileage),
  reason: normalizeText(apiItem.reason),
  works: normalizeWorks(apiItem.works),
  part_price: normalizeNumber(apiItem.part_price),
  work_price: normalizeNumber(apiItem.work_price),
  images: normalizeImages(apiItem.images),
  brand: normalizeBrand(apiItem.brand),
})
