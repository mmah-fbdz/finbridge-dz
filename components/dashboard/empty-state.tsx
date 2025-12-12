"use client"

import { Button } from "@/components/ui/button"
import { Upload, FileText, CheckCircle2, BarChart3 } from "lucide-react"
import Link from "next/link"

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-[#1e3a5f]/10 rounded-2xl flex items-center justify-center mb-6">
        <FileText className="w-10 h-10 text-[#1e3a5f]" />
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-2">Welcome to FinBridge DZ</h2>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        Start your verification journey by uploading your business documents.
        {"We'll"} analyze them and generate your Financial Trust Score.
      </p>

      <Link href="/upload">
        <Button className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white h-12 px-6">
          <Upload className="w-5 h-5 mr-2" />
          Start by Uploading Documents
        </Button>
      </Link>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Upload className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-medium text-foreground mb-1">Upload</h3>
          <p className="text-sm text-muted-foreground">Upload your financial documents securely</p>
        </div>

        <div className="text-center p-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-foreground mb-1">Validate</h3>
          <p className="text-sm text-muted-foreground">{"We'll"} verify and validate your data</p>
        </div>

        <div className="text-center p-4">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="font-medium text-foreground mb-1">Report</h3>
          <p className="text-sm text-muted-foreground">Get your Trust Score and readiness report</p>
        </div>
      </div>
    </div>
  )
}
