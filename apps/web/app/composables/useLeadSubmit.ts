import type { LeadSubmitPayload } from '#shared/types/lead'

export const useLeadSubmit = () => {
  const roistatVisitCookie = useCookie<string | null>('roistat_visit')
  const { getTrackingPayload } = useLeadTracking()

  const submitLead = async (payload: LeadSubmitPayload): Promise<void> => {
    const roistatVisitValue = roistatVisitCookie.value
    const roistatVisit =
      typeof roistatVisitValue === 'string' ? roistatVisitValue.trim() : undefined

    await $fetch('/api/leads', {
      method: 'POST',
      body: {
        ...getTrackingPayload(),
        ...payload,
        ...(roistatVisit ? { roistatVisit } : {}),
      },
    })
  }

  return {
    submitLead,
  }
}
