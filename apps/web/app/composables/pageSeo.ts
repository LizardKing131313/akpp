import type { MaybeRefOrGetter } from 'vue'

export type PageSeoType = 'website' | 'article'

export type PageSeoBaseOptions = {
  readonly title: MaybeRefOrGetter<string>
  readonly description?: MaybeRefOrGetter<string | undefined>
  readonly image?: MaybeRefOrGetter<string | undefined>
  readonly type?: MaybeRefOrGetter<PageSeoType | undefined>
  readonly robots?: MaybeRefOrGetter<string | undefined>
}

export const normalizePageSeoText = (value: unknown): string => {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
}

export const stripPageSeoHtml = (value: string): string => {
  return value.replace(/<[^>]*>/g, ' ')
}

export const normalizePageSeoDescription = (value: unknown): string => {
  const normalizedValue = normalizePageSeoText(stripPageSeoHtml(String(value ?? '')))
  return normalizedValue.slice(0, 320)
}
