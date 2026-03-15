import type { LeadSubmitPayload } from '#shared/types/lead'

export const useLeadSubmit = () => {
  const roistatVisitCookie = useCookie<string | null>('roistat_visit')

  const submitLead = async (payload: LeadSubmitPayload): Promise<void> => {
    const roistatVisit = roistatVisitCookie.value?.trim()

    await $fetch('/api/leads', {
      method: 'POST',
      body: {
        ...payload,
        ...(roistatVisit ? { roistatVisit } : {}),
      },
    })
  }

  return {
    submitLead,
  }
}
