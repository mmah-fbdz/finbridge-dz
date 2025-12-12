"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { useAppStore } from "@/lib/store"
import { Progress } from "@/components/ui/progress"
import { FileText, CheckCircle2 } from "lucide-react"

export default function ReportGenerationPage() {
  const router = useRouter()
  const { reportProgress, setReportProgress, setReportUrl, setCurrentFlowStep } = useAppStore()
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    "Compiling document analysis...",
    "Generating executive summary...",
    "Creating financial overview...",
    "Adding compliance details...",
    "Finalizing PDF document...",
  ]

  useEffect(() => {
    if (reportProgress < 100) {
      const interval = setInterval(() => {
        setReportProgress(Math.min(reportProgress + 3, 100))
        setCurrentStep(Math.floor((reportProgress / 100) * steps.length))
      }, 150)

      return () => clearInterval(interval)
    }
  }, [reportProgress, setReportProgress, steps.length])

  useEffect(() => {
    if (reportProgress >= 100) {
      // Simulate PDF URL generation
      setReportUrl("/reports/readiness-report-2024.pdf")
      setCurrentFlowStep("report-preview")

      // Navigate to preview after a short delay
      const timeout = setTimeout(() => {
        router.push("/report")
      }, 1500)

      return () => clearTimeout(timeout)
    }
  }, [reportProgress, setReportUrl, setCurrentFlowStep, router])

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />

      <main className="ml-56">
        <DashboardHeader title="Report Generation" />

        <div className="p-6">
          <div className="max-w-2xl mx-auto py-16 text-center">
            {reportProgress < 100 ? (
              <>
                <div className="w-20 h-20 bg-[#1e3a5f]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <FileText className="w-10 h-10 text-[#1e3a5f]" />
                </div>

                <h1 className="text-2xl font-semibold text-foreground mb-2">Generating Your Report</h1>
                <p className="text-muted-foreground mb-8">Please wait while we compile your readiness report...</p>

                <div className="mb-4">
                  <Progress value={reportProgress} className="h-3" />
                </div>

                <div className="flex items-center justify-between text-sm mb-8">
                  <span className="text-muted-foreground">{steps[currentStep] || steps[0]}</span>
                  <span className="font-medium text-foreground">{Math.round(reportProgress)}%</span>
                </div>

                {/* Step indicators */}
                <div className="flex justify-center gap-2">
                  {steps.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx <= currentStep ? "bg-[#1e3a5f]" : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>

                <h1 className="text-2xl font-semibold text-foreground mb-2">Report Ready!</h1>
                <p className="text-muted-foreground">Redirecting to preview...</p>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
