"use client"

import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Share2, FileText, CheckCircle2, Calendar, Building2 } from "lucide-react"

export default function ReportPreviewPage() {
  const router = useRouter()
  const { companyProfile, diagnosisResult, reportUrl, setCurrentFlowStep } = useAppStore()

  const handleDownload = () => {
    // Simulate PDF download
    alert("Downloading report PDF...")
  }

  const handleShare = () => {
    setCurrentFlowStep("share")
    router.push("/share")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />

      <main className="ml-56">
        <DashboardHeader title="Readiness Report" />

        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header Actions */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Readiness Report Preview</h1>
                <p className="text-muted-foreground">Review your report before sharing</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button onClick={handleShare} className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Secure Link
                </Button>
              </div>
            </div>

            {/* Report Preview */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {/* Report Header */}
                <div className="bg-[#1e3a5f] text-white p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/70 uppercase tracking-wider mb-2">Business Readiness Report</p>
                      <h2 className="text-3xl font-bold">{companyProfile?.name || "Your Company"}</h2>
                      <p className="text-white/70 mt-2">
                        Generated on {new Date().toLocaleDateString("en-US", { dateStyle: "long" })}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center">
                        <span className="text-4xl font-bold">{diagnosisResult?.globalTrustScore || 78}%</span>
                      </div>
                      <p className="text-sm text-white/70 mt-2">Trust Score</p>
                    </div>
                  </div>
                </div>

                {/* Report Content Preview */}
                <div className="p-8 space-y-8">
                  {/* Company Info */}
                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                    <Building2 className="w-6 h-6 text-[#1e3a5f] mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">Company Information</h3>
                      <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Sector</p>
                          <p className="font-medium">{companyProfile?.sector || "Technology"}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Annual Revenue</p>
                          <p className="font-medium">{companyProfile?.annualRevenue || "$1M - $5M"}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Employees</p>
                          <p className="font-medium">{companyProfile?.employees || "10-50"}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Sub-sector</p>
                          <p className="font-medium">{companyProfile?.subSector || "SaaS"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Score Breakdown</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 border border-border rounded-xl text-center">
                        <p className="text-2xl font-bold text-emerald-600">
                          {diagnosisResult?.financialScore || 40}/50
                        </p>
                        <p className="text-sm text-muted-foreground">Financial Score</p>
                      </div>
                      <div className="p-4 border border-border rounded-xl text-center">
                        <p className="text-2xl font-bold text-blue-600">{diagnosisResult?.legalScore || 38}/50</p>
                        <p className="text-sm text-muted-foreground">Legal Score</p>
                      </div>
                      <div className="p-4 border border-border rounded-xl text-center">
                        <p className="text-2xl font-bold text-amber-600">
                          {diagnosisResult?.transparencyScore || 35}/50
                        </p>
                        <p className="text-sm text-muted-foreground">Transparency Score</p>
                      </div>
                    </div>
                  </div>

                  {/* Verification Status */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Verification Status</h3>
                    <div className="space-y-3">
                      {[
                        "Legal Documents Verified",
                        "Financial Statements Verified",
                        "Tax Records Verified",
                        "Compliance Check Passed",
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Report Metadata */}
                  <div className="flex items-center justify-between pt-6 border-t border-border text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Valid until {new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Report ID: FBR-{Date.now().toString().slice(-8)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
