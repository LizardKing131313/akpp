// noinspection JSUnusedGlobalSymbols
export default defineNuxtPlugin(() => {
  if (!import.meta.client) {
    return
  }

  const runtimeConfig = useRuntimeConfig()
  const projectId = runtimeConfig.public.roistatProjectId?.trim()
  const host = runtimeConfig.public.roistatHost?.trim()

  if (!projectId || !host) {
    return
  }

  const injectRoistat = (): void => {
    if (document.getElementById('roistat-counter-static')) {
      return
    }

    const scriptElement = document.createElement('script')
    scriptElement.id = 'roistat-counter-static'
    scriptElement.text = `
      (function(w, d, s, h, id) {
          w.roistatProjectId = id; w.roistatHost = h;
          var p = d.location.protocol == "https:" ? "https://" : "http://";
          var u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie) ? "/dist/module.js" : "/api/site/1.0/"+id+"/init?referrer="+encodeURIComponent(d.location.href);
          var js = d.createElement(s); js.charset="UTF-8"; js.async = 1; js.src = p+h+u; var js2 = d.getElementsByTagName(s)[0]; js2.parentNode.insertBefore(js, js2);
      })(window, document, 'script', '${host}', '${projectId}');
    `
    document.body.appendChild(scriptElement)
  }

  if (document.readyState === 'complete') {
    injectRoistat()
    return
  }

  window.addEventListener('load', injectRoistat, { once: true })
})
