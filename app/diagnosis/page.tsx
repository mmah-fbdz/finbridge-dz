"use client"

import { useState } from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { useAppStore } from "@/lib/store"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle2, FileSearch, ArrowRight } from "lucide-react"

export default function DiagnosisPage() {
  const router = useRouter()
  const { diagnosisProgress, setDiagnosisProgress, setDiagnosisResult, documents } = useAppStore()

  const [isComplete, setIsComplete] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    "Analyzing document structure...",
    "Verifying financial data...",
    "Checking legal compliance...",
    "Calculating transparency score...",
    "Generating insights...",
  ]

  useEffect(() => {
    if (diagnosisProgress >= 100) {
      setIsComplete(true)
      return
    }

    const interval = setInterval(() => {
      setDiagnosisProgress(Math.min(diagnosisProgress + 2, 100))
      setCurrentStep(Math.floor((diagnosisProgress / 100) * steps.length))
    }, 100)

    return () => clearInterval(interval)
  }, [diagnosisProgress, setDiagnosisProgress, steps.length])

  useEffect(() => {
    if (diagnosisProgress >= 100 && !isComplete) {
      // Generate mock diagnosis result
      setDiagnosisResult({
        financialScore: 40,
        legalScore: 38,
        transparencyScore: 35,
        globalTrustScore: 78,
      })
      setIsComplete(true)
    }
  }, [diagnosisProgress, isComplete, setDiagnosisResult])

  const handleProceed = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />

      <main className="ml-56">
        <DashboardHeader title="Diagnosis" />

        <div className="p-6">
          <div className="max-w-2xl mx-auto py-16 text-center">
            {!isComplete ? (
              <>
                <div className="w-20 h-20 bg-[#1e3a5f]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <FileSearch className="w-10 h-10 text-[#1e3a5f]" />
                </div>

                <h1 className="text-2xl font-semibold text-foreground mb-2">Analyzing Your Documents</h1>
                <p className="text-muted-foreground mb-8">
                  Please wait while we analyze {documents.length} document(s) for financial readiness.
                </p>

                <div className="mb-4">
                  <Progress value={diagnosisProgress} className="h-3" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{steps[currentStep] || steps[0]}</span>
                  <span className="font-medium text-foreground">{Math.round(diagnosisProgress)}%</span>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>

                <h1 className="text-2xl font-semibold text-foreground mb-2">Analysis Complete!</h1>
                <p className="text-muted-foreground mb-8">
                  {"We've"} finished analyzing your documents. View your results on the dashboard.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="p-4 bg-background border border-border rounded-xl">
                    <p className="text-3xl font-bold text-[#1e3a5f]">78%</p>
                    <p className="text-sm text-muted-foreground">Trust Score</p>
                  </div>
                  <div className="p-4 bg-background border border-border rounded-xl">
                    <p className="text-3xl font-bold text-emerald-600">40</p>
                    <p className="text-sm text-muted-foreground">Document Score</p>
                  </div>
                  <div className="p-4 bg-background border border-border rounded-xl">
                    <p className="text-3xl font-bold text-blue-600">38</p>
                    <p className="text-sm text-muted-foreground">Activity Score</p>
                  </div>
                </div>

                <Button onClick={handleProceed} className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white h-12 px-8">
                  View Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
