export type TemplateValues = Readonly<Record<string, string | undefined>>

export const applyTemplate = (template: string, values: TemplateValues): string => {
  return template.replace(/\{([a-zA-Z0-9_]+)}/g, (_, key: string) => {
    return values[key] ?? ''
  })
}
