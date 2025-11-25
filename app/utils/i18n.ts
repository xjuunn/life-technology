
export function useAppI18n() {
  const { t, locale, locales, setLocale } = useI18n()
  const STORAGE_KEY = 'app-locale'
  type LocaleType = 'zh_CN' | 'zh_TW' | 'en'
  const isValidLocale = (v: string | null): v is LocaleType => {
    return v === 'zh_CN' || v === 'zh_TW' || v === 'en'
  }
  if (import.meta.client) {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (isValidLocale(saved)) {
      setLocale(saved)
    } else {
      let system: LocaleType =
        navigator.language === 'zh_TW'
          ? 'zh_TW'
          : navigator.language.startsWith('en')
            ? 'en'
            : 'zh_CN'

      setLocale(system)
      localStorage.setItem(STORAGE_KEY, system)
    }
  }
  function changeLocale(code: LocaleType) {
    setLocale(code)
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, code)
    }
  }

  function currentLocaleShort() {
    return (
      {
        'zh_CN': 'CN',
        'zh_TW': 'TW',
        en: 'EN'
      }[locale.value] || locale.value
    )
  }

  return {
    t,
    locale,
    locales,
    changeLocale,
    currentLocaleShort
  }
}
