"use client"

import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Lightbulb, TrendingUp, AlertTriangle, Info, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SuggestionsPage() {
  const router = useRouter()
  const { suggestions, setCurrentFlowStep, setValidationComplete } = useAppStore()

  const handleContinue = () => {
    setValidationComplete(true)
    setCurrentFlowStep("validation-complete")
    router.push("/validation-complete")
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high":
        return <TrendingUp className="w-5 h-5 text-red-500" />
      case "medium":
        return <AlertTriangle className="w-5 h-5 text-amber-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">High Impact</Badge>
      case "medium":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Medium Impact</Badge>
      default:
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Low Impact</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />

      <main className="ml-56">
        <DashboardHeader title="Smart Suggestions" />

        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center">
                <Lightbulb className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Smart Suggestions</h1>
                <p className="text-muted-foreground">AI-powered recommendations to improve your readiness score</p>
              </div>
            </div>

            {/* Info Banner */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-8">
              <p className="text-sm text-blue-700">
                <strong>Pro tip:</strong> Addressing high-impact suggestions first will significantly improve your
                chances of approval. You can always come back to implement these recommendations later.
              </p>
            </div>

            {/* Suggestions Grid */}
            <div className="grid gap-4">
              {suggestions.map((suggestion) => (
                <Card
                  key={suggestion.id}
                  className={cn(
                    "transition-all hover:shadow-md",
                    suggestion.impact === "high" && "border-red-200",
                    suggestion.impact === "medium" && "border-amber-200",
                  )}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getImpactIcon(suggestion.impact)}
                        <div>
                          <CardTitle className="text-base">{suggestion.title}</CardTitle>
                          <CardDescription className="mt-1">{suggestion.category}</CardDescription>
                        </div>
                      </div>
                      {getImpactBadge(suggestion.impact)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{suggestion.description}</p>
                    {suggestion.action && (
                      <Button variant="outline" size="sm" className="text-[#1e3a5f] bg-transparent">
                        {suggestion.action}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 p-6 bg-card border border-border rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Ready to proceed?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You can implement these suggestions now or continue to validation completion
                  </p>
                </div>
                <Button onClick={handleContinue} className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white h-12 px-6">
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
