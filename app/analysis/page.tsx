"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { useAppStore } from "@/lib/store"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle2, FileSearch, ArrowRight, Brain, Shield, TrendingUp } from "lucide-react"

export default function AnalysisPage() {
  const router = useRouter()
  const {
    diagnosisProgress,
    setDiagnosisProgress,
    setDiagnosisResult,
    setChecklistItems,
    setSuggestions,
    documents,
    diagnosisResult,
    setCurrentFlowStep,
  } = useAppStore()

  const [phase, setPhase] = useState<"progress" | "results">("progress")
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { label: "Analyzing document structure...", icon: FileSearch },
    { label: "Verifying financial data...", icon: TrendingUp },
    { label: "Checking legal compliance...", icon: Shield },
    { label: "Running AI analysis...", icon: Brain },
    { label: "Generating insights...", icon: CheckCircle2 },
  ]

  useEffect(() => {
    if (phase === "progress" && diagnosisProgress < 100) {
      const interval = setInterval(() => {
        setDiagnosisProgress(Math.min(diagnosisProgress + 2, 100))
        setCurrentStep(Math.floor((diagnosisProgress / 100) * steps.length))
      }, 100)

      return () => clearInterval(interval)
    }
  }, [diagnosisProgress, phase, setDiagnosisProgress, steps.length])

  useEffect(() => {
    if (diagnosisProgress >= 100 && phase === "progress") {
      // Generate mock diagnosis result
      const result = {
        financialScore: 40,
        legalScore: 38,
        transparencyScore: 35,
        globalTrustScore: 78,
      }
      setDiagnosisResult(result)

      // Generate checklist items
      setChecklistItems([
        {
          id: "1",
          title: "Business Registration Certificate",
          description: "Valid registration document required",
          status: "completed",
          mandatory: true,
          category: "Legal",
        },
        {
          id: "2",
          title: "Financial Statements (Last 3 Years)",
          description: "Audited financial statements",
          status: "missing",
          mandatory: true,
          category: "Financial",
        },
        {
          id: "3",
          title: "Tax Compliance Certificate",
          description: "Current tax clearance",
          status: "completed",
          mandatory: true,
          category: "Tax",
        },
        {
          id: "4",
          title: "Board Resolution",
          description: "Authorization for loan application",
          status: "pending",
          mandatory: true,
          category: "Legal",
        },
        {
          id: "5",
          title: "Bank Statements (6 Months)",
          description: "Recent bank transaction history",
          status: "in-progress",
          mandatory: true,
          category: "Financial",
        },
        {
          id: "6",
          title: "Insurance Certificates",
          description: "Business insurance documentation",
          status: "pending",
          mandatory: false,
          category: "Compliance",
        },
      ])

      // Generate suggestions
      setSuggestions([
        {
          id: "1",
          title: "Upload Missing Financial Statements",
          description: "Add your audited financial statements for the last 3 years to improve your score by 15%",
          impact: "high",
          category: "Financial",
          action: "Upload Now",
        },
        {
          id: "2",
          title: "Complete Board Resolution",
          description: "Submit the board resolution authorizing this loan application",
          impact: "high",
          category: "Legal",
          action: "Download Template",
        },
        {
          id: "3",
          title: "Update Bank Statements",
          description: "Your bank statements are more than 30 days old. Upload recent statements.",
          impact: "medium",
          category: "Financial",
          action: "Upload Now",
        },
        {
          id: "4",
          title: "Add Insurance Documentation",
          description: "While optional, insurance certificates can improve lender confidence",
          impact: "low",
          category: "Compliance",
          action: "Learn More",
        },
      ])

      setCurrentFlowStep("analysis-results")
      setPhase("results")
    }
  }, [diagnosisProgress, phase, setDiagnosisResult, setChecklistItems, setSuggestions, setCurrentFlowStep])

  const handleProceedToValidation = () => {
    setCurrentFlowStep("validation")
    router.push("/validation")
  }

  const CurrentStepIcon = steps[currentStep]?.icon || FileSearch

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />

      <main className="ml-56">
        <DashboardHeader title="AI Analysis" />

        <div className="p-6">
          <div className="max-w-3xl mx-auto py-8">
            {phase === "progress" ? (
              <div className="text-center">
                <div className="w-20 h-20 bg-[#1e3a5f]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <CurrentStepIcon className="w-10 h-10 text-[#1e3a5f]" />
                </div>

                <h1 className="text-2xl font-semibold text-foreground mb-2">Analyzing Your Documents</h1>
                <p className="text-muted-foreground mb-8">
                  Please wait while our AI analyzes {documents.length} document(s) for readiness assessment.
                </p>

                <div className="mb-4">
                  <Progress value={diagnosisProgress} className="h-3" />
                </div>

                <div className="flex items-center justify-between text-sm mb-8">
                  <span className="text-muted-foreground">{steps[currentStep]?.label || steps[0].label}</span>
                  <span className="font-medium text-foreground">{Math.round(diagnosisProgress)}%</span>
                </div>

                {/* Step indicators */}
                <div className="flex justify-center gap-2">
                  {steps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx <= currentStep ? "bg-[#1e3a5f]" : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>

                  <h1 className="text-2xl font-semibold text-foreground mb-2">Analysis Complete!</h1>
                  <p className="text-muted-foreground">
                    {"We've"} finished analyzing your documents. Here are your readiness scores.
                  </p>
                </div>

                {/* Score Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="p-6 bg-card border border-border rounded-xl text-center">
                    <p className="text-4xl font-bold text-[#1e3a5f]">{diagnosisResult?.globalTrustScore}%</p>
                    <p className="text-sm text-muted-foreground mt-1">Global Trust Score</p>
                  </div>
                  <div className="p-6 bg-card border border-border rounded-xl text-center">
                    <p className="text-4xl font-bold text-emerald-600">{diagnosisResult?.financialScore}</p>
                    <p className="text-sm text-muted-foreground mt-1">Financial Score</p>
                  </div>
                  <div className="p-6 bg-card border border-border rounded-xl text-center">
                    <p className="text-4xl font-bold text-blue-600">{diagnosisResult?.legalScore}</p>
                    <p className="text-sm text-muted-foreground mt-1">Legal Score</p>
                  </div>
                  <div className="p-6 bg-card border border-border rounded-xl text-center">
                    <p className="text-4xl font-bold text-amber-600">{diagnosisResult?.transparencyScore}</p>
                    <p className="text-sm text-muted-foreground mt-1">Transparency Score</p>
                  </div>
                </div>

                {/* Summary */}
                <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl mb-8">
                  <h3 className="font-semibold text-amber-800 mb-2">Action Required</h3>
                  <p className="text-sm text-amber-700">
                    Your dossier is {diagnosisResult?.globalTrustScore}% complete. Complete the validation checklist to
                    improve your readiness score and unlock report generation.
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleProceedToValidation}
                    className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white h-12 px-8"
                  >
                    Proceed to Validation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
