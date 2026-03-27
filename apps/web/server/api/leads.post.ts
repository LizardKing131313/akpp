import type { LeadSubmitPayload } from '#shared/types/lead'

import {
  type LeadDirectusCreatePayload,
  LeadsRepository,
} from '#server/services/repo/entity/leads.repo'
import { sendRoistatProxyLead } from '#server/services/roistat/proxylead'

const normalizeText = (value: unknown): string | undefined => {
  if (typeof value !== 'string') {
    return undefined
  }

  const normalizedValue = value.trim()
  return normalizedValue.length > 0 ? normalizedValue : undefined
}

const normalizeRequiredText = (value: unknown, fieldName: string): string => {
  const normalizedValue = normalizeText(value)
  if (normalizedValue) {
    return normalizedValue
  }

  throw createError({
    statusCode: 400,
    statusMessage: `${fieldName} is required`,
  })
}

const buildTrackingComment = (payload: LeadSubmitPayload): string[] => {
  const trackingEntries = [
    ['source', payload.source],
    ['utmCampaign', payload.utmCampaign],
    ['utmContent', payload.utmContent],
    ['utmMedium', payload.utmMedium],
    ['utmSource', payload.utmSource],
    ['utmTerm', payload.utmTerm],
  ] as const

  return trackingEntries.flatMap(([key, value]) => {
    const normalizedValue = normalizeText(value)
    return normalizedValue ? [`${key}: ${normalizedValue}`] : []
  })
}

const toDirectusPayload = (payload: LeadSubmitPayload): LeadDirectusCreatePayload => {
  const normalizedSource = normalizeText(payload.source) ?? 'unknown'
  const directusPayload: LeadDirectusCreatePayload = {
    phone: normalizeRequiredText(payload.phone, 'phone'),
    source: normalizedSource,
  }

  const normalizedName = normalizeText(payload.name)
  if (normalizedName) {
    directusPayload.name = normalizedName
  }

  const normalizedProblem = normalizeText(payload.problem)
  if (normalizedProblem) {
    directusPayload.problem = normalizedProblem
  }

  const normalizedSymptoms = normalizeText(payload.symptoms)
  if (normalizedSymptoms) {
    directusPayload.symptoms = normalizedSymptoms
  }

  const normalizedComment = normalizeText(payload.comment)
  const commentParts = [
    ...buildTrackingComment(payload),
    ...(normalizedComment ? [normalizedComment] : []),
  ]

  if (commentParts.length > 0) {
    directusPayload.comment = commentParts.join('\n')
  }

  return directusPayload
}

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const payload = await readBody<LeadSubmitPayload>(event)
  const directusPayload = toDirectusPayload(payload)
  const repo = new LeadsRepository()
  const leadItem = await repo.create(directusPayload)
  const roistatVisitCookie = getCookie(event, 'roistat_visit')?.trim()
  const roistatVisit = normalizeText(payload.roistatVisit) ?? roistatVisitCookie

  await sendRoistatProxyLead({
    event,
    payload,
    comment: directusPayload.comment,
    roistatVisit,
  })

  return {
    id: leadItem.id,
  }
})
