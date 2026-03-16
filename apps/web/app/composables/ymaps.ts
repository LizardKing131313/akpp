type Ymaps3Global = typeof ymaps3

const SCRIPT_ID = 'ymaps3-script'

const getGlobalYmaps3 = (): Ymaps3Global | null => {
  const globalWindow = window as typeof window & { ymaps3?: Ymaps3Global }
  return globalWindow.ymaps3 ?? null
}

const ensureYmapsScript = async (apiKey: string, lang: string): Promise<void> => {
  if (document.getElementById(SCRIPT_ID)) return

  await new Promise<void>((resolve, reject) => {
    const scriptElement = document.createElement('script')
    scriptElement.id = SCRIPT_ID
    scriptElement.async = true
    scriptElement.defer = true
    scriptElement.src = `https://api-maps.yandex.ru/v3/?apikey=${encodeURIComponent(apiKey)}&lang=${encodeURIComponent(lang)}`
    scriptElement.addEventListener('load', () => resolve())
    scriptElement.addEventListener('error', () =>
      reject(new Error('Failed to load Yandex Maps script'))
    )
    document.head.appendChild(scriptElement)
  })
}

const waitForYmaps3Global = async (): Promise<Ymaps3Global> => {
  const timeoutMs = 20_000
  const stepMs = 50
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    const ymaps3 = getGlobalYmaps3()
    if (ymaps3) return ymaps3
    await new Promise<void>((resolve) => window.setTimeout(resolve, stepMs))
  }

  throw new Error('ymaps3 is not defined after script load')
}

let cachedPromise: Promise<Ymaps3Global> | null = null

export const loadYandexMapsApi = (params: {
  apiKey: string
  lang?: string
}): Promise<Ymaps3Global> => {
  if (cachedPromise) return cachedPromise

  cachedPromise = (async () => {
    const lang = params.lang ?? 'ru_RU'

    await ensureYmapsScript(params.apiKey, lang)

    const ymaps3 = await waitForYmaps3Global()
    await ymaps3.ready

    return ymaps3
  })()

  return cachedPromise
}
