import type { LeadSubmitPayload } from '#shared/types/lead'

export const useLeadSubmit = () => {
  const submitLead = async (payload: LeadSubmitPayload): Promise<void> => {
    await $fetch('/api/leads', {
      method: 'POST',
      body: payload,
    })
  }

  return {
    submitLead,
  }
}
