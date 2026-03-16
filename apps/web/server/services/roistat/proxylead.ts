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
  name?: string
  comment?: string
  roistat?: string
  sync?: '1'
}

const isRoistatTraceEnabled = (runtimeConfig: Record<string, unknown>): boolean => {
  const traceRaw = String(runtimeConfig.roistatTrace ?? '')
    .trim()
    .toLowerCase()
  return traceRaw === '1' || traceRaw === 'true' || traceRaw === 'yes'
}

const maskApiKey = (value: string): string => {
  if (value.length <= 8) {
    return '***'
  }

  return `${value.slice(0, 4)}***${value.slice(-4)}`
}

const traceRoistat = (
  isTraceEnabled: boolean,
  message: string,
  payload?: Record<string, unknown>
): void => {
  if (!isTraceEnabled) {
    return
  }

  if (payload) {
    console.warn(`[roistat][trace] ${message}`, payload)
    return
  }

  console.warn(`[roistat][trace] ${message}`)
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

  roistatPayload.roistat = roistatVisit ? roistatVisit : 'nocookie'

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
    sync: '1',
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
  const isTraceEnabled = isRoistatTraceEnabled(runtimeConfig)

  if (!roistatApiKey) {
    traceRoistat(isTraceEnabled, 'skip submit: roistat api key is empty')
    return
  }

  const roistatPayload = buildRoistatPayload(event, payload, comment, roistatVisit)
  const requestPayload = toRequestPayload(roistatPayload, roistatApiKey)
  const requestQueryParams = new URLSearchParams()
  requestQueryParams.set('key', requestPayload.key)
  requestQueryParams.set('title', requestPayload.title)
  requestQueryParams.set('phone', requestPayload.phone)
  requestQueryParams.set('sync', requestPayload.sync ?? '1')

  if (requestPayload.name) {
    requestQueryParams.set('name', requestPayload.name)
  }

  if (requestPayload.comment) {
    requestQueryParams.set('comment', requestPayload.comment)
  }

  if (requestPayload.roistat) {
    requestQueryParams.set('roistat', requestPayload.roistat)
  }

  for (const [fieldKey, fieldValue] of Object.entries(roistatPayload.fields)) {
    requestQueryParams.set(`fields[${fieldKey}]`, fieldValue)
  }

  const requestUrl = `${roistatApiEndpoint}?${requestQueryParams.toString()}`
  traceRoistat(isTraceEnabled, 'request prepared', {
    endpoint: roistatApiEndpoint,
    key: maskApiKey(requestPayload.key),
    source: payload.source,
    phone: requestPayload.phone,
    roistat: requestPayload.roistat ?? 'nocookie',
    fields: roistatPayload.fields,
  })

  try {
    const response = await $fetch<unknown>(requestUrl, {
      method: 'GET',
    })

    const normalizedResponse =
      typeof response === 'string'
        ? (() => {
            try {
              return JSON.parse(response) as unknown
            } catch {
              return response
            }
          })()
        : response

    if (typeof normalizedResponse === 'object' && normalizedResponse !== null) {
      const responseStatus = 'status' in normalizedResponse ? String(normalizedResponse.status) : ''
      const responseData = 'data' in normalizedResponse ? normalizedResponse.data : undefined
      const isSuccessStatus = responseStatus.toLowerCase() === 'success'
      const hasLeadId =
        typeof responseData === 'string' && responseData.trim().toLowerCase().startsWith('lead_')

      if (responseStatus && !isSuccessStatus) {
        console.error('[roistat] proxylead unexpected status', normalizedResponse)
      } else if (!responseStatus && !hasLeadId) {
        console.warn('[roistat] proxylead response has no status or lead id', normalizedResponse)
      }

      traceRoistat(isTraceEnabled, 'response received', {
        status: responseStatus || null,
        data: responseData ?? null,
      })
    } else {
      console.warn('[roistat] proxylead response is not JSON object', normalizedResponse)
      traceRoistat(isTraceEnabled, 'response received (non-object)', {
        response: normalizedResponse,
      })
    }
  } catch (error) {
    console.error('[roistat] proxylead submit failed', error)
    traceRoistat(isTraceEnabled, 'request failed', {
      error: String(error),
    })
  }
}
