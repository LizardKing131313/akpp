import { ServicePricesRepository } from '#server/services/repo/entity/service_prices.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async () => {
  const repo = new ServicePricesRepository()
  return await repo.list()
})
