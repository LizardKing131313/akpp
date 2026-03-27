export type LeadTrackingPayload = {
  readonly utmCampaign?: string
  readonly utmContent?: string
  readonly utmMedium?: string
  readonly utmSource?: string
  readonly utmTerm?: string
  readonly source?: string
}

export type LeadSubmitPayload = {
  readonly name?: string
  readonly phone: string
  readonly problem?: string
  readonly symptoms?: string
  readonly comment?: string
  readonly roistatVisit?: string
} & LeadTrackingPayload
