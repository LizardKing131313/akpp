import type { CaseItem, CaseSettings } from '#shared/types/case'
import type { MaybeRefOrGetter } from 'vue'

import { getMoneyView } from '#shared/lib/money'
import { computed, toValue } from 'vue'

export const useCasePresentation = async (caseItemInput: MaybeRefOrGetter<CaseItem>) => {
  const { data: settingsData } = await useCaseSettings()

  const settings = computed<CaseSettings>(() => settingsData.value ?? ({} as CaseSettings))

  const partMoney = computed<string>(() => getMoneyView(toValue(caseItemInput).part_price).value)
  const workMoney = computed<string>(() => getMoneyView(toValue(caseItemInput).work_price).value)
  const totalMoney = computed<string>(() => {
    const caseItem = toValue(caseItemInput)
    return getMoneyView(caseItem.part_price + caseItem.work_price).value
  })

  return {
    settings,
    partMoney,
    workMoney,
    totalMoney,
  }
}
