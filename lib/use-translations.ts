"use client"

import { useAppStore } from "./store"
import type { Locale } from "./i18n"

// Import all translation files
import enGB from "@/locales/en-GB.json"
import enUS from "@/locales/en-US.json"
import arDZ from "@/locales/ar-DZ.json"
import arAE from "@/locales/ar-AE.json"

const translations: Record<Locale, typeof enGB> = {
  "en-GB": enGB,
  "en-US": enUS,
  "ar-DZ": arDZ,
  "ar-AE": arAE,
}

type TranslationPath = string

export function useTranslations() {
  const locale = useAppStore((state) => state.locale)

  const t = (key: TranslationPath): string => {
    const keys = key.split(".")
    let value: any = translations[locale]

    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) {
        console.warn(`Translation missing for key: ${key} in locale: ${locale}`)
        return key
      }
    }

    return typeof value === "string" ? value : key
  }

  return { t, locale }
}
