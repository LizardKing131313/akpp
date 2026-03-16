export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const projectId = runtimeConfig.public.roistatProjectId?.trim()
  const host = runtimeConfig.public.roistatHost?.trim()

  if (!projectId || !host) {
    return
  }

  useHead({
    script: [
      {
        id: 'roistat-counter-static',
        innerHTML: `
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
        `,
        tagPosition: 'bodyClose',
      },
    ],
  })
})
