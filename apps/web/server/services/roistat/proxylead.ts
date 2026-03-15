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
  roistat_visit?: string
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
    roistatPayload.roistat_visit = roistatVisit
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

export const sendRoistatProxyLead = async ({
  event,
  payload,
  comment,
  roistatVisit,
}: SendRoistatProxyLeadInput): Promise<void> => {
  const runtimeConfig = useRuntimeConfig(event)
  const proxyleadUrl = runtimeConfig.roistatProxyleadUrl?.trim()

  if (!proxyleadUrl) {
    return
  }

  try {
    await $fetch(proxyleadUrl, {
      method: 'POST',
      body: buildRoistatPayload(event, payload, comment, roistatVisit),
      headers: {
        'content-type': 'application/json',
      },
    })
  } catch (error) {
    console.error('[roistat] proxylead submit failed', error)
  }
}
