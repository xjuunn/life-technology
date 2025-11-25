import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: true,
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
    defaultLocale: 'zh_CN',
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: 'zh_CN',
      alwaysRedirect: false,
    },
    langDir: 'locales/',
    locales: [
      { code: 'zh_CN', name: '简体中文', file: 'zh_CN.json' },
      { code: 'zh_TW', name: '繁體中文', file: 'zh_TW.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ]
  },
  runtimeConfig: {
    public: {
      base_url: process.env.BASE_URL
    }
  },
  nitro: {
    preset: process.env.CF_PAGES ? 'cloudflare_pages' : undefined
  },
  modules: [
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxt/content'
  ]
})