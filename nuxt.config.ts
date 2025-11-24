import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: false,
  vite: {
    plugins: [tailwindcss() as any],
  },
  css: ["~/assets/css/app.css"],
  imports: {
    dirs: [
      'stores/**',
      'utils/**'
    ]
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'zh-CN',
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: 'zh-CN',
      alwaysRedirect: false,
    },
    langDir: 'locales/',
    locales: [
      { code: 'zh-CN', name: '简体中文', file: 'zh-CN.json' },
      { code: 'zh-TW', name: '繁體中文', file: 'zh-TW.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ]
  },
  runtimeConfig: {
    public: {
      base_url: process.env.BASE_URL
    }
  },
  nitro: {
    devProxy: {
      '/bgapi': {
        target: `${process.env.BASE_URL}`,
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
  modules: [
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image'
  ]
})