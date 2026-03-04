import { TransmissionRangeModelVariantsRepository } from '#server/services/repo/entity/transmission_range_model_variants.repo'

export default defineEventHandler(async () => {
  const repo = new TransmissionRangeModelVariantsRepository()
  return await repo.list()
})
