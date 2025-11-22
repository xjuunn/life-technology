export default defineNuxtPlugin((nuxtApp) => {
    const i18n = nuxtApp.$i18n as any
    nuxtApp.vueApp.config.globalProperties.$t = i18n.t
    nuxtApp.provide('t', i18n.t)
})
