"use client"

import { useAppStore } from "@/lib/store"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { ScoreCard } from "@/components/dashboard/score-card"
import { DocumentCategoryCard } from "@/components/dashboard/document-category-card"
import { RecommendationsTable } from "@/components/dashboard/recommendations-table"
import { DocumentsTable } from "@/components/dashboard/documents-table"
import { EmptyState } from "@/components/dashboard/empty-state"
import { Button } from "@/components/ui/button"
import { Share2, Upload } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { companyProfile, documents, diagnosisResult } = useAppStore()

  const hasDocuments = documents.length > 0
  const hasDiagnosis = diagnosisResult !== null

  // For demo purposes, use mock data if no real diagnosis
  const scores = diagnosisResult || {
    globalTrustScore: 78,
    financialScore: 40,
    legalScore: 38,
    transparencyScore: 0,
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />

      <main className="ml-56">
        <DashboardHeader title="Dashboard" />

        <div className="p-6">
          {!hasDocuments ? (
            <EmptyState />
          ) : (
            <>
              {/* Welcome Section */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">Hi, {companyProfile?.name || "User"}</h1>
                  <p className="text-muted-foreground">
                    your company dossier is{" "}
                    <span className="text-emerald-600 font-medium">{scores.globalTrustScore}% verified</span> and ready
                    for submission.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="border-[#1e3a5f]/20 bg-transparent">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Dossier
                  </Button>
                  <Link href="/upload">
                    <Button className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white">
                      <Upload className="w-4 h-4 mr-2" />
                      New Document
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Score Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <ScoreCard
                  title="Global Trust Score"
                  score={scores.globalTrustScore}
                  unit="%"
                  status="Verified Readiness"
                  statusColor="green"
                  variant="primary"
                />
                <ScoreCard title="Document Score" score={scores.financialScore} maxScore={50} variant="primary" />
                <ScoreCard title="Activity Score" score={scores.legalScore} maxScore={50} variant="primary" />
              </div>

              {/* Document Categories */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <DocumentCategoryCard
                  title="Legal Documents"
                  percentage={80}
                  status="1 item missing"
                  statusType="missing"
                />
                <DocumentCategoryCard
                  title="Financial Statements"
                  percentage={65}
                  status="2 items missing"
                  statusType="missing"
                />
                <DocumentCategoryCard title="Tax Records" percentage={90} status="Verified" statusType="verified" />
                <DocumentCategoryCard title="HR Compliance" percentage={50} status="Under review" statusType="review" />
              </div>

              {/* Smart Recommendations */}
              <div className="mb-6">
                <RecommendationsTable />
              </div>

              {/* Documents Table */}
              <DocumentsTable />
            </>
          )}
        </div>
      </main>
    </div>
  )
}
