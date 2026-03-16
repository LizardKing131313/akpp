import { vMaska } from 'maska/vue'

// noinspection JSUnusedGlobalSymbols
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('maska', vMaska)
})
