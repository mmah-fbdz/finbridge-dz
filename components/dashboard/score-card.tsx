"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface ScoreCardProps {
  title: string
  score: number
  maxScore?: number
  unit?: string
  status?: string
  statusColor?: "green" | "yellow" | "red"
  icon?: React.ReactNode
  variant?: "primary" | "secondary"
}

export function ScoreCard({
  title,
  score,
  maxScore,
  unit = "",
  status,
  statusColor = "green",
  icon,
  variant = "secondary",
}: ScoreCardProps) {
  const percentage = maxScore ? (score / maxScore) * 100 : score

  return (
    <div className={cn("p-4 rounded-xl", variant === "primary" ? "bg-background border border-border" : "bg-muted/50")}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-foreground">
              {score}
              {unit}
            </span>
            {maxScore && <span className="text-sm text-muted-foreground">/ {maxScore} pts</span>}
          </div>
          {status && (
            <div className="flex items-center gap-1.5 mt-1">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  statusColor === "green" && "bg-emerald-500",
                  statusColor === "yellow" && "bg-amber-500",
                  statusColor === "red" && "bg-red-500",
                )}
              />
              <span
                className={cn(
                  "text-xs",
                  statusColor === "green" && "text-emerald-600",
                  statusColor === "yellow" && "text-amber-600",
                  statusColor === "red" && "text-red-600",
                )}
              >
                {status}
              </span>
            </div>
          )}
        </div>
        {icon ? (
          icon
        ) : (
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="none" className="text-muted" />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${percentage * 1.256} 125.6`}
                className={cn(
                  statusColor === "green" && "text-emerald-500",
                  statusColor === "yellow" && "text-[#1e3a5f]",
                  statusColor === "red" && "text-red-500",
                  !statusColor && "text-[#1e3a5f]",
                )}
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
