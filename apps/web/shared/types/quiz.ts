import type { BrandItem } from '#shared/types/brand'
import type { EntityItem } from '#shared/types/entity'

// noinspection JSUnusedGlobalSymbols
export type QuizProblemItem = EntityItem & {
  readonly name: string
}

// noinspection JSUnusedGlobalSymbols
export type QuizSymptomItem = EntityItem & {
  readonly name: string
  readonly problemId?: string
}

export type QuizSymptomsMap = Readonly<Record<string, readonly string[]>>

export type QuizData = {
  readonly problems: readonly string[]
  readonly symptoms: QuizSymptomsMap
}

export type QuizModalPayload = QuizData & {
  readonly brands: readonly BrandItem[]
}

export type QuizSubmitPayload = {
  readonly brandTitle: string
  readonly problemTitle: string
  readonly symptomTitle: string
  readonly customerName: string
  readonly customerPhone: string
}
