export const locales = ["en-GB", "en-US", "ar-DZ", "ar-AE"] as const
export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  "en-GB": "English (UK)",
  "en-US": "English (US)",
  "ar-DZ": "العربية (الجزائر)",
  "ar-AE": "العربية (الإمارات)",
}

export const localeFlagCodes: Record<Locale, string> = {
  "en-GB": "GB",
  "en-US": "US",
  "ar-DZ": "DZ",
  "ar-AE": "AE",
}

export const localeShortNames: Record<Locale, string> = {
  "en-GB": "GB",
  "en-US": "US",
  "ar-DZ": "DZ",
  "ar-AE": "AE",
}

export const defaultLocale: Locale = "en-GB"

// Direction for RTL languages
export const getDirection = (locale: Locale): "ltr" | "rtl" => {
  return locale.startsWith("ar") ? "rtl" : "ltr"
}
