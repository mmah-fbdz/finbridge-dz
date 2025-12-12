"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CheckCircle2, Clock, AlertTriangle, TrendingUp } from "lucide-react"

interface Recommendation {
  id: string
  type: "success" | "warning" | "info" | "opportunity"
  insight: string
  message: string
  action: string
  actionLabel: string
}

const recommendations: Recommendation[] = [
  {
    id: "1",
    type: "success",
    insight: "Low Financial Score",
    message: "Your balance sheet was last updated 8 months ago. Upload a new version for a higher readiness score.",
    action: "/upload",
    actionLabel: "Upload Document",
  },
  {
    id: "2",
    type: "warning",
    insight: "Pending Validation",
    message: "3 documents are still awaiting expert review.",
    action: "/validation",
    actionLabel: "View Validation",
  },
  {
    id: "3",
    type: "info",
    insight: "Compliance Renewal Soon",
    message: "Adding audited financial statements may increase your score by 12%.",
    action: "/compliance",
    actionLabel: "Learn More",
  },
  {
    id: "4",
    type: "opportunity",
    insight: "Readiness Growth Opportunity",
    message: "Tax certificate will expire in 45 days. Renew before 01 Dec 2025.",
    action: "/renewal",
    actionLabel: "Renew Now",
  },
]

const typeIcons = {
  success: CheckCircle2,
  warning: Clock,
  info: AlertTriangle,
  opportunity: TrendingUp,
}

const typeColors = {
  success: "text-emerald-500",
  warning: "text-blue-500",
  info: "text-amber-500",
  opportunity: "text-[#1e3a5f]",
}

export function RecommendationsTable() {
  return (
    <div className="bg-background border border-border rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Smart Recommendations</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Insight</th>
              <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Message</th>
              <th className="text-right text-sm font-medium text-muted-foreground px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((rec) => {
              const Icon = typeIcons[rec.type]
              return (
                <tr key={rec.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Icon className={cn("w-5 h-5", typeColors[rec.type])} />
                      <span className="text-sm font-medium text-foreground">{rec.insight}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-muted-foreground">{rec.message}</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      {rec.actionLabel}
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
