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

const setupRoistat = (projectId: string, host: string): void => {
  appendInlineScript(
    'roistat-counter-loader',
    `
      (function(w, d, s, h, id) {
        w.roistatProjectId = id
        w.roistatHost = h
        var protocol = d.location.protocol === 'https:' ? 'https://' : 'http://'
        var source = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie)
          ? '/dist/module.js'
          : '/api/site/1.0/' + id + '/init?referrer=' + encodeURIComponent(d.location.href)
        var scriptElement = d.createElement(s)
        scriptElement.charset = 'UTF-8'
        scriptElement.async = 1
        scriptElement.src = protocol + h + source
        var firstScript = d.getElementsByTagName(s)[0]
        firstScript.parentNode.insertBefore(scriptElement, firstScript)
      })(window, document, 'script', '${host}', '${projectId}')
    `
  )
}

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const metrikaId = runtimeConfig.public.yandexMetrikaId
  const projectId = runtimeConfig.public.roistatProjectId
  const host = runtimeConfig.public.roistatHost

  if (metrikaId) {
    setupYandexMetrika(metrikaId)
  }

  if (projectId && host) {
    setupRoistat(projectId, host)
  }
})
