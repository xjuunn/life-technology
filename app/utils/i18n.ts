import { useI18n, useLocalePath, useSwitchLocalePath } from '#imports'

export function useAppI18n() {
  const { t, locale, locales, setLocale } = useI18n()
  const localePath = useLocalePath()
  const switchLocalePath = useSwitchLocalePath()

  const changeLocale = (code: "zh-CN" | "zh-TW" | "en") => {
    setLocale(code)
  }

  const currentLocaleName = () => {
    return locales.value.find(l => l.code === locale.value)?.name || locale.value
  }

  return {
    t,
    locale,
    locales,
    changeLocale,
    currentLocaleName,
    localePath,
    switchLocalePath
  }
}
