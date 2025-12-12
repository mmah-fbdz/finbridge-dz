"use client"

import { use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  FileText,
  CheckCircle2,
  Calendar,
  Building2,
  Shield,
  MessageSquare,
  ExternalLink,
} from "lucide-react"

export default function SharedReportPage({ params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = use(params)
  const token = resolvedParams.token

  // In a real app, this would fetch the report data using the token
  const reportData = {
    companyName: "Acme Corporation",
    trustScore: 78,
    financialScore: 40,
    legalScore: 38,
    transparencyScore: 35,
    sector: "Technology",
    subSector: "SaaS",
    revenue: "$1M - $5M",
    employees: "10-50",
    generatedDate: new Date().toLocaleDateString("en-US", { dateStyle: "long" }),
    validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    reportId: `FBR-${token.slice(-8).toUpperCase()}`,
  }

  const handleDownload = () => {
    alert("Downloading report PDF...")
  }

  const handleRequestInfo = () => {
    alert("Opening request form...")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-wider text-[#1e3a5f]">FINBRIDGE DZ</span>
            <FileText className="w-4 h-4 text-[#1e3a5f]/60" />
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Secure Report View
          </Badge>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Info Banner */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-blue-700">
              This is a verified readiness report shared securely via FinBridge DZ
            </p>
          </div>
          <a
            href="https://finbridge.dz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            Learn more <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Report Card */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {/* Report Header */}
            <div className="bg-[#1e3a5f] text-white p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70 uppercase tracking-wider mb-2">Business Readiness Report</p>
                  <h1 className="text-3xl font-bold">{reportData.companyName}</h1>
                  <p className="text-white/70 mt-2">Generated on {reportData.generatedDate}</p>
                </div>
                <div className="text-right">
                  <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center">
                    <span className="text-4xl font-bold">{reportData.trustScore}%</span>
                  </div>
                  <p className="text-sm text-white/70 mt-2">Trust Score</p>
                </div>
              </div>
            </div>

            {/* Report Content */}
            <div className="p-8 space-y-8">
              {/* Company Info */}
              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                <Building2 className="w-6 h-6 text-[#1e3a5f] mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Company Information</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Sector</p>
                      <p className="font-medium">{reportData.sector}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sub-sector</p>
                      <p className="font-medium">{reportData.subSector}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Annual Revenue</p>
                      <p className="font-medium">{reportData.revenue}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Employees</p>
                      <p className="font-medium">{reportData.employees}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Breakdown */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Score Breakdown</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 border border-border rounded-xl text-center">
                    <p className="text-2xl font-bold text-emerald-600">{reportData.financialScore}/50</p>
                    <p className="text-sm text-muted-foreground">Financial Score</p>
                  </div>
                  <div className="p-4 border border-border rounded-xl text-center">
                    <p className="text-2xl font-bold text-blue-600">{reportData.legalScore}/50</p>
                    <p className="text-sm text-muted-foreground">Legal Score</p>
                  </div>
                  <div className="p-4 border border-border rounded-xl text-center">
                    <p className="text-2xl font-bold text-amber-600">{reportData.transparencyScore}/50</p>
                    <p className="text-sm text-muted-foreground">Transparency Score</p>
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Verification Status</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Legal Documents Verified",
                    "Financial Statements Verified",
                    "Tax Records Verified",
                    "Compliance Check Passed",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm p-3 bg-emerald-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="text-emerald-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Report Metadata */}
              <div className="flex items-center justify-between pt-6 border-t border-border text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Valid until {reportData.validUntil}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Report ID: {reportData.reportId}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button variant="outline" onClick={handleDownload} className="h-12 px-6 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button onClick={handleRequestInfo} className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white h-12 px-6">
            <MessageSquare className="w-4 h-4 mr-2" />
            Request More Info
          </Button>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            This report was generated by FinBridge DZ. For questions about this report, contact the issuing company.
          </p>
        </footer>
      </main>
    </div>
  )
}
