export type LeadSource = 'signup' | 'shop' | 'quiz'

export type LeadSubmitPayload = {
  readonly source: LeadSource
  readonly name?: string
  readonly phone: string
  readonly problem?: string
  readonly symptoms?: string
  readonly comment?: string
  readonly roistatVisit?: string
}
