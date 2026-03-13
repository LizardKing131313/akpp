import type { Component } from 'vue'

import * as Vue from 'vue'

type Ymaps3Global = {
  ready: Promise<void>
  import: (moduleName: string) => Promise<unknown>
}

type VuefyImport = {
  vuefy: {
    bindTo: (vue: typeof Vue) => {
      module: <ModuleType>(ymaps3: ModuleType) => {
        YMap: Component
        YMapDefaultSchemeLayer: Component
        YMapDefaultFeaturesLayer: Component
        YMapMarker: Component
        YMapLayer: Component
        YMapFeatureDataSource: Component
      }
    }
  }
}

export type YandexMapComponents = {
  YMap: Component
  YMapDefaultSchemeLayer: Component
  YMapDefaultFeaturesLayer: Component
  YMapMarker: Component
  YMapLayer: Component
  YMapFeatureDataSource: Component
}

const SCRIPT_ID = 'ymaps3-script'

const getGlobalYmaps3 = (): Ymaps3Global | null => {
  const globalWindow = window as unknown as { ymaps3?: Ymaps3Global }
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

let cachedPromise: Promise<YandexMapComponents> | null = null

export const loadYandexMapComponents = (params: {
  apiKey: string
  lang?: string
}): Promise<YandexMapComponents> => {
  if (cachedPromise) return cachedPromise

  cachedPromise = (async () => {
    const lang = params.lang ?? 'ru_RU'

    await ensureYmapsScript(params.apiKey, lang)

    const ymaps3 = await waitForYmaps3Global()
    await ymaps3.ready

    const imported = (await ymaps3.import('@yandex/ymaps3-vuefy')) as VuefyImport
    const vuefy = imported.vuefy.bindTo(Vue)
    const moduleComponents = vuefy.module(ymaps3)

    return {
      YMap: moduleComponents.YMap,
      YMapDefaultSchemeLayer: moduleComponents.YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer: moduleComponents.YMapDefaultFeaturesLayer,
      YMapMarker: moduleComponents.YMapMarker,
      YMapLayer: moduleComponents.YMapLayer,
      YMapFeatureDataSource: moduleComponents.YMapFeatureDataSource,
    }
  })()

  return cachedPromise as Promise<YandexMapComponents>
}
