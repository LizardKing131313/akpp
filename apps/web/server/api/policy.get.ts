import { PolicyRepository } from '../services/repo/entity/policy.repo'

export default defineEventHandler(async () => {
  const repo = new PolicyRepository()
  return await repo.get()
})
