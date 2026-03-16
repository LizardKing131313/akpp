const appendInlineScript = (id: string, scriptContent: string): void => {
  if (document.getElementById(id)) {
    return
  }

  const scriptElement = document.createElement('script')
  scriptElement.id = id
  scriptElement.text = scriptContent
  document.head.appendChild(scriptElement)
}

const setupYandexMetrika = (counterId: string): void => {
  appendInlineScript(
    'yandex-metrika-loader',
    `
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}
        m[i].l=1*new Date()
        for (var scriptIndex = 0; scriptIndex < document.scripts.length; scriptIndex += 1) {
          if (document.scripts[scriptIndex].src === r) {
            return
          }
        }
        k=e.createElement(t)
        a=e.getElementsByTagName(t)[0]
        k.async=1
        k.src=r
        a.parentNode.insertBefore(k,a)
      })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=${counterId}', 'ym')
    `
  )

  appendInlineScript(
    'yandex-metrika-init',
    `
      if (window.ym) {
        window.ym(${counterId}, 'init', {
          ssr: true,
          webvisor: true,
          trackHash: true,
          clickmap: true,
          ecommerce: 'dataLayer',
          referrer: document.referrer,
          url: location.href,
          accurateTrackBounce: true,
          trackLinks: true
        })
      }
    `
  )
}

// noinspection JSUnusedGlobalSymbols
export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const metrikaId = runtimeConfig.public.yandexMetrikaId

  if (metrikaId) {
    if (document.readyState === 'complete') {
      setupYandexMetrika(metrikaId)
      return
    }

    window.addEventListener('load', () => setupYandexMetrika(metrikaId), { once: true })
  }
})
