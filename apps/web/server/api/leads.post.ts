import type { LeadSubmitPayload } from '#shared/types/lead'

import {
  type LeadDirectusCreatePayload,
  LeadsRepository,
} from '#server/services/repo/entity/leads.repo'

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

const toDirectusPayload = (payload: LeadSubmitPayload): LeadDirectusCreatePayload => {
  const directusPayload: LeadDirectusCreatePayload = {
    phone: normalizeRequiredText(payload.phone, 'phone'),
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
  const sourceComment = `source: ${payload.source}`

  directusPayload.comment = normalizedComment
    ? `${sourceComment}\n${normalizedComment}`
    : sourceComment

  return directusPayload
}

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const payload = await readBody<LeadSubmitPayload>(event)
  const directusPayload = toDirectusPayload(payload)
  const repo = new LeadsRepository()
  const leadItem = await repo.create(directusPayload)

  return {
    id: leadItem.id,
  }
})
