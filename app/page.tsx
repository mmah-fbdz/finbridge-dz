"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart3, Shield, FileCheck, Share2 } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslations } from "@/lib/use-translations"

export default function Home() {
  const { t } = useTranslations()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-[#1e3a5f]" />
            </div>
            <span className="text-white text-xl font-semibold">{t("common.finbridge")}</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
              <Link href="/login">{t("common.signIn")}</Link>
            </Button>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            {t("welcome.hero.title")}
            <br />
            <span className="text-[#0ea5e9]">{t("welcome.hero.subtitle")}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("welcome.hero.description")}</p>

          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" className="h-14 px-8 bg-[#0ea5e9] hover:bg-[#0284c7] text-white" asChild>
              <Link href="/register">{t("welcome.hero.startButton")}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="/trust-chart">{t("welcome.hero.learnButton")}</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-6 mt-24 max-w-6xl mx-auto">
          {[
            {
              icon: FileCheck,
              titleKey: "welcome.features.upload.title",
              descriptionKey: "welcome.features.upload.description",
            },
            {
              icon: BarChart3,
              titleKey: "welcome.features.diagnose.title",
              descriptionKey: "welcome.features.diagnose.description",
            },
            {
              icon: Shield,
              titleKey: "welcome.features.validate.title",
              descriptionKey: "welcome.features.validate.description",
            },
            {
              icon: Share2,
              titleKey: "welcome.features.share.title",
              descriptionKey: "welcome.features.share.description",
            },
          ].map((feature, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <feature.icon className="w-10 h-10 text-[#0ea5e9] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{t(feature.titleKey)}</h3>
              <p className="text-gray-400 text-sm">{t(feature.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
