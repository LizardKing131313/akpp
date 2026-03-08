type CaseApiBrand = {
  readonly id?: string | null
  readonly slug?: string | null
  readonly name?: string | null
  readonly image_source?: string | null
  readonly image_alt?: string | null
}

type CaseApiWork = {
  readonly text?: string | null
  readonly sort?: number | null
}

type CaseApiImage = {
  readonly directus_files_id?: string | null
  readonly sort?: number | null
}

export type CaseApiItem = {
  readonly id: string
  readonly slug: string
  readonly name?: string | null

  readonly image_source?: string | null
  readonly image_alt?: string | null

  readonly case_date?: string | null
  readonly transmission?: string | null
  readonly model_date?: string | null
  readonly engine?: string | null
  readonly mileage?: string | null
  readonly reason?: string | null

  readonly works?: readonly string[] | readonly CaseApiWork[] | null
  readonly part_price?: number | null
  readonly work_price?: number | null
  readonly images?: readonly string[] | readonly CaseApiImage[] | null

  readonly brand?: CaseApiBrand | null
}
