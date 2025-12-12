"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAppStore } from "@/lib/store"
import { locales, localeNames, localeFlagCodes, localeShortNames } from "@/lib/i18n"
import { FlagIcon } from "@/components/flag-icon"

export function LanguageSwitcher() {
  const { locale, setLocale } = useAppStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 h-9 px-3 bg-[#00335C] hover:bg-[#004B87] text-white rounded-lg border-0"
        >
          <FlagIcon code={localeFlagCodes[locale]} />
          <span className="font-medium text-sm">{localeShortNames[locale]}</span>
          <ChevronDown className="w-4 h-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] bg-white border border-gray-200 shadow-xl rounded-xl p-1.5">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => setLocale(loc)}
            className={`flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2 transition-colors ${
              locale === loc ? "bg-cyan-500 text-white" : "hover:bg-gray-100 text-gray-900"
            }`}
          >
            <FlagIcon code={localeFlagCodes[loc]} />
            <span className="font-medium text-sm">{localeNames[loc]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
