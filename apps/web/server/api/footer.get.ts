import { FooterRepository } from '#server/services/repo/entity/footer.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async () => {
  const repo = new FooterRepository()
  return await repo.get()
})
