import type { PolicySettings } from '#shared/types/policy'

import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class PolicyRepository extends SingletonRepository<PolicySettings> {
  protected readonly collection = 'policy_settings'

  protected readonly fields = `
    title,
    article,
    lead_accept,
    lead_policy,
    lead_agreement
  `
}
