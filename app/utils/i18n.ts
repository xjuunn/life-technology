import { useI18n, useSwitchLocalePath } from '#imports'

export function useAppI18n() {
  const { t, locale, setLocale, locales } = useI18n()
  const switchLocalePath = useSwitchLocalePath()

  function changeLocale(code: 'zh-CN' | 'zh-TW' | 'en') {
    setLocale(code)
  }

  function currentLocaleShort() {
    const map: Record<string, string> = {
      'zh-CN': 'CN',
      'zh-TW': 'TW',
      'en': 'EN'
    }
    return map[locale.value] ?? locale.value
  }

  return {
    t,
    locale,
    locales,
    changeLocale,
    currentLocaleShort,
    switchLocalePath
  }
}
