export type QuizApiResponse = {
  readonly problems: readonly string[]
  readonly symptoms: Readonly<Record<string, readonly string[]>>
}
