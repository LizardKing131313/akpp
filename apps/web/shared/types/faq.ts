export type FaqItem = {
  readonly id: string
  readonly question: string
  readonly answer: string
  readonly route_landing_id?: string
  readonly show_on_homepage?: boolean
}

export type FaqListFilters = {
  readonly route_landing_id?: string | undefined
  readonly show_on_homepage?: boolean | undefined
}
