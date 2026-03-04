import { FaqsRepository } from '#server/services/repo/entity/faqs.repo'

export default defineEventHandler(async () => {
  const repo = new FaqsRepository()
  return await repo.list()
})
