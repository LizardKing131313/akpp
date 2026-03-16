import type { LeadSubmitPayload } from '#shared/types/lead'
import type { H3Event } from 'h3'

type SendRoistatProxyLeadInput = {
  readonly event: H3Event
  readonly payload: LeadSubmitPayload
  readonly comment: string | undefined
  readonly roistatVisit: string | undefined
}

type RoistatProxyLeadPayload = {
  title: string
  phone: string
  fields: Record<string, string>
  name?: string
  comment?: string
  roistat?: string
}

const roistatApiEndpoint = 'https://cloud.roistat.com/api/proxy/1.0/leads/add'

type RoistatProxyLeadRequest = {
  key: string
  title: string
  phone: string
  fields: string
  name?: string
  comment?: string
  roistat?: string
}

const normalizeText = (value: string | undefined): string | undefined => {
  const normalizedValue = value?.trim()
  return normalizedValue && normalizedValue.length > 0 ? normalizedValue : undefined
}

const buildLeadTitle = (source: LeadSubmitPayload['source']): string => {
  switch (source) {
    case 'signup':
      return 'Заявка с формы записи'
    case 'shop':
      return 'Заявка с формы магазина'
    case 'quiz':
      return 'Заявка с квиза'
  }
}

const buildRoistatPayload = (
  event: H3Event,
  payload: LeadSubmitPayload,
  comment: string | undefined,
  roistatVisit: string | undefined
): RoistatProxyLeadPayload => {
  const requestUrl = getRequestURL(event)
  const roistatPayload: RoistatProxyLeadPayload = {
    title: buildLeadTitle(payload.source),
    phone: payload.phone,
    fields: {
      source: payload.source,
      source_page: `${requestUrl.origin}${requestUrl.pathname}`,
    },
  }

  const customerName = normalizeText(payload.name)
  if (customerName) {
    roistatPayload.name = customerName
  }

  if (comment) {
    roistatPayload.comment = comment
  }

  if (roistatVisit) {
    roistatPayload.roistat = roistatVisit
  }

  const refererHeader = getHeader(event, 'referer')
  if (refererHeader) {
    roistatPayload.fields.referer = refererHeader
  }

  const userAgentHeader = getHeader(event, 'user-agent')
  if (userAgentHeader) {
    roistatPayload.fields.user_agent = userAgentHeader
  }

  return roistatPayload
}

const toRequestPayload = (
  payload: RoistatProxyLeadPayload,
  apiKey: string
): RoistatProxyLeadRequest => {
  const requestPayload: RoistatProxyLeadRequest = {
    key: apiKey,
    title: payload.title,
    phone: payload.phone,
    fields: JSON.stringify(payload.fields),
  }

  if (payload.name) {
    requestPayload.name = payload.name
  }

  if (payload.comment) {
    requestPayload.comment = payload.comment
  }

  if (payload.roistat) {
    requestPayload.roistat = payload.roistat
  }

  return requestPayload
}

export const sendRoistatProxyLead = async ({
  event,
  payload,
  comment,
  roistatVisit,
}: SendRoistatProxyLeadInput): Promise<void> => {
  const runtimeConfig = useRuntimeConfig(event)
  const roistatApiKey = runtimeConfig.roistatApiKey?.trim()

  if (!roistatApiKey) {
    return
  }

  const roistatPayload = buildRoistatPayload(event, payload, comment, roistatVisit)
  const requestPayload = toRequestPayload(roistatPayload, roistatApiKey)
  const requestBody = new URLSearchParams()
  requestBody.set('key', requestPayload.key)
  requestBody.set('title', requestPayload.title)
  requestBody.set('phone', requestPayload.phone)
  requestBody.set('fields', requestPayload.fields)

  if (requestPayload.name) {
    requestBody.set('name', requestPayload.name)
  }

  if (requestPayload.comment) {
    requestBody.set('comment', requestPayload.comment)
  }

  if (requestPayload.roistat) {
    requestBody.set('roistat', requestPayload.roistat)
  }

  try {
    await $fetch(roistatApiEndpoint, {
      method: 'POST',
      body: requestBody.toString(),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
  } catch (error) {
    console.error('[roistat] proxylead submit failed', error)
  }
}
