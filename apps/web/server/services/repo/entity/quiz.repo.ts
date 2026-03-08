import type { QuizData } from '#shared/types/quiz'

import { createDirectusClient } from '#server/services/directus'

type QuizProblemDirectusItem = {
  readonly id: string
  readonly name?: string | null
  readonly symptoms?: Array<{
    readonly quiz_symptoms_id?: {
      readonly id: string
      readonly name?: string | null
    } | null
  }> | null
}

type QuizSymptomDirectusItem = {
  readonly id: string
  readonly name?: string | null
  readonly problem_id?:
    | {
        readonly id: string
      }
    | string
    | null
}

const PROBLEMS_COLLECTION = 'quiz_problems'
const SYMPTOMS_COLLECTION = 'quiz_symptoms'

const normalizeText = (rawValue: string | null | undefined): string => {
  return rawValue?.trim() ?? ''
}

const normalizeBrandId = (rawBrandId: string | null | undefined): string | undefined => {
  const normalizedBrandId = rawBrandId?.trim()
  if (!normalizedBrandId) {
    return undefined
  }

  return normalizedBrandId
}

const normalizeProblemId = (
  rawProblemId: QuizSymptomDirectusItem['problem_id']
): string | undefined => {
  if (!rawProblemId) {
    return undefined
  }

  if (typeof rawProblemId === 'string') {
    const normalizedId = rawProblemId.trim()
    return normalizedId.length > 0 ? normalizedId : undefined
  }

  const normalizedId = rawProblemId.id.trim()
  return normalizedId.length > 0 ? normalizedId : undefined
}

const appendUnique = (target: string[], value: string): void => {
  if (target.includes(value)) {
    return
  }

  target.push(value)
}

const applyProblemItems = (
  problemItems: readonly QuizProblemDirectusItem[],
  problemNameById: Map<string, string>,
  problems: string[],
  symptomsMap: Record<string, string[]>
): void => {
  for (const problemItem of problemItems) {
    const problemName = normalizeText(problemItem.name)
    if (problemName.length === 0) {
      continue
    }

    problemNameById.set(problemItem.id, problemName)
    problems.push(problemName)
    symptomsMap[problemName] = []

    const relatedSymptoms = problemItem.symptoms ?? []

    for (const relationItem of relatedSymptoms) {
      const symptomName = normalizeText(relationItem.quiz_symptoms_id?.name)
      if (symptomName.length === 0) {
        continue
      }

      appendUnique(symptomsMap[problemName], symptomName)
    }
  }
}

const applySymptomItems = (
  symptomItems: readonly QuizSymptomDirectusItem[],
  problemNameById: ReadonlyMap<string, string>,
  symptomsMap: Record<string, string[]>
): void => {
  for (const symptomItem of symptomItems) {
    const symptomName = normalizeText(symptomItem.name)
    if (symptomName.length === 0) {
      continue
    }

    const problemId = normalizeProblemId(symptomItem.problem_id)
    if (!problemId) {
      continue
    }

    const problemName = problemNameById.get(problemId)
    if (!problemName) {
      continue
    }

    if (!symptomsMap[problemName]) {
      symptomsMap[problemName] = []
    }

    appendUnique(symptomsMap[problemName], symptomName)
  }
}

export class QuizRepository {
  public async get(brandIdInput?: string): Promise<QuizData> {
    const directus = createDirectusClient()
    const brandId = normalizeBrandId(brandIdInput)

    const problemsQuery: Record<string, string | number | boolean | undefined> = {
      fields: 'id,name,symptoms.quiz_symptoms_id.id,symptoms.quiz_symptoms_id.name',
      sort: 'sort',
    }

    if (brandId) {
      problemsQuery['filter[_or][0][brand_id][_eq]'] = brandId
      problemsQuery['filter[_or][1][brand_id][_null]'] = true
    }

    const [problemItems, symptomItems] = await Promise.all([
      directus.getItems<QuizProblemDirectusItem>(PROBLEMS_COLLECTION, problemsQuery),
      directus.getItems<QuizSymptomDirectusItem>(SYMPTOMS_COLLECTION, {
        fields: 'id,name,problem_id.id',
        sort: 'sort',
      }),
    ])

    const problemNameById = new Map<string, string>()
    const problems: string[] = []
    const symptomsMap: Record<string, string[]> = {}

    applyProblemItems(problemItems, problemNameById, problems, symptomsMap)
    applySymptomItems(symptomItems, problemNameById, symptomsMap)

    return {
      problems,
      symptoms: symptomsMap,
    }
  }
}
