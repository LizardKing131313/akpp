import { PolicyRepository } from '#server/services/repo/entity/policy.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async () => {
  const repo = new PolicyRepository()
  return await repo.get()
})
