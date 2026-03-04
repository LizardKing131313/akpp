import { WhyRepository } from '#server/services/repo/entity/why.repo'

export default defineEventHandler(async () => {
  const repo = new WhyRepository()
  return await repo.get()
})
