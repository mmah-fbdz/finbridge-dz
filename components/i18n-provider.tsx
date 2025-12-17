"use client"

import type React from "react"

import { useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { getDirection } from "@/lib/i18n"

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useAppStore((state) => state.locale)

  useEffect(() => {
    const direction = getDirection(locale)
    document.documentElement.dir = direction
    document.documentElement.lang = locale
  }, [locale])

  return <>{children}</>
}
