"use client"

import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, FileText, Shield, Award } from "lucide-react"

export default function ValidationCompletePage() {
  const router = useRouter()
  const { diagnosisResult, setCurrentFlowStep } = useAppStore()

  const handleGenerateReport = () => {
    setCurrentFlowStep("report-generation")
    router.push("/report-generation")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />

      <main className="ml-56">
        <DashboardHeader title="Validation Complete" />

        <div className="p-6">
          <div className="max-w-2xl mx-auto py-16 text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-4">Validation Complete!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your documents have been validated and your dossier is ready for report generation.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="p-6 bg-card border border-border rounded-xl">
                <div className="w-12 h-12 bg-[#1e3a5f]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-[#1e3a5f]" />
                </div>
                <p className="text-3xl font-bold text-[#1e3a5f]">{diagnosisResult?.globalTrustScore || 78}%</p>
                <p className="text-sm text-muted-foreground">Trust Score</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-3xl font-bold text-emerald-600">100%</p>
                <p className="text-sm text-muted-foreground">Documents Verified</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-blue-600">A+</p>
                <p className="text-sm text-muted-foreground">Compliance Grade</p>
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={handleGenerateReport}
              size="lg"
              className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white h-14 px-10 text-lg"
            >
              Generate Readiness Report
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>

            <p className="text-sm text-muted-foreground mt-4">
              Your report will be generated as a PDF document that you can share with lenders and investors.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
