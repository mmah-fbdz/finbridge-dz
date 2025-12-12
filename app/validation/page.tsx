"use client"

import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, AlertCircle, Clock, ArrowRight, Upload, FileText, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ValidationPage() {
  const router = useRouter()
  const { checklistItems, updateChecklistItem, setCurrentFlowStep } = useAppStore()

  const completedCount = checklistItems.filter((item) => item.status === "completed").length
  const mandatoryItems = checklistItems.filter((item) => item.mandatory)
  const mandatoryCompleted = mandatoryItems.filter((item) => item.status === "completed").length
  const allMandatoryComplete = mandatoryCompleted === mandatoryItems.length

  const handleResolveItem = (id: string) => {
    // Simulate resolving an item
    updateChecklistItem(id, "completed")
  }

  const handleProceedToSuggestions = () => {
    setCurrentFlowStep("suggestions")
    router.push("/suggestions")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      case "missing":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-amber-500" />
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Verified</Badge>
      case "missing":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Missing</Badge>
      case "in-progress":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">In Progress</Badge>
      default:
        return <Badge variant="secondary">Pending</Badge>
    }
  }

  // Group items by category
  const groupedItems = checklistItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, typeof checklistItems>,
  )

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />

      <main className="ml-56">
        <DashboardHeader title="Validation Checklist" />

        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Validation Checklist</h1>
                <p className="text-muted-foreground">Complete all mandatory items to proceed with report generation</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#1e3a5f]">
                  {completedCount}/{checklistItems.length}
                </p>
                <p className="text-sm text-muted-foreground">Items Completed</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Mandatory items progress</span>
                <span className="font-medium">
                  {mandatoryCompleted}/{mandatoryItems.length} complete
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1e3a5f] transition-all duration-500"
                  style={{ width: `${(mandatoryCompleted / mandatoryItems.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Checklist Items by Category */}
            <div className="space-y-6">
              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category} className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="px-6 py-4 bg-muted/50 border-b border-border">
                    <h3 className="font-semibold text-foreground">{category}</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          "px-6 py-4 flex items-center gap-4 transition-colors",
                          item.status === "completed" && "bg-emerald-50/50",
                          item.status === "missing" && "bg-red-50/50",
                        )}
                      >
                        {getStatusIcon(item.status)}

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">{item.title}</p>
                            {item.mandatory && (
                              <Badge variant="outline" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                          )}
                        </div>

                        {getStatusBadge(item.status)}

                        {item.status !== "completed" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleResolveItem(item.id)}
                            className="text-[#1e3a5f]"
                          >
                            {item.status === "missing" ? (
                              <>
                                <Upload className="w-4 h-4 mr-1" />
                                Upload
                              </>
                            ) : (
                              <>
                                <FileText className="w-4 h-4 mr-1" />
                                Resolve
                              </>
                            )}
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="mt-8 flex justify-end">
              <Button
                onClick={handleProceedToSuggestions}
                disabled={!allMandatoryComplete}
                className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white h-12 px-6 disabled:opacity-50"
              >
                Continue to Smart Suggestions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {!allMandatoryComplete && (
              <p className="text-center text-sm text-muted-foreground mt-4">Complete all mandatory items to proceed</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
