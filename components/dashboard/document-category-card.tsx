"use client"

import { FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface DocumentCategoryCardProps {
  title: string
  percentage: number
  status: string
  statusType: "verified" | "missing" | "review"
}

export function DocumentCategoryCard({ title, percentage, status, statusType }: DocumentCategoryCardProps) {
  return (
    <div className="p-4 bg-background border border-border rounded-xl">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{percentage}%</p>
          <div className="flex items-center gap-1.5 mt-1">
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                statusType === "verified" && "bg-emerald-500",
                statusType === "missing" && "bg-amber-500",
                statusType === "review" && "bg-blue-500",
              )}
            />
            <span
              className={cn(
                "text-xs",
                statusType === "verified" && "text-emerald-600",
                statusType === "missing" && "text-amber-600",
                statusType === "review" && "text-blue-600",
              )}
            >
              {status}
            </span>
          </div>
        </div>
        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  )
}
