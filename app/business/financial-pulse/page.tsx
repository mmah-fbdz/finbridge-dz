"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { FileSpreadsheet, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const CSV_COLUMNS = ["Date", "Description", "Amount", "Category", "Account", "Reference"]
const SYSTEM_FIELDS = [
  "Transaction Date",
  "Transaction Description",
  "Amount",
  "Expense Category",
  "Bank Account",
  "Reference Number",
]

export default function FinancialPulsePage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [mappings, setMappings] = useState<Record<string, string>>({})

  const handleFileUpload = () => {
    // Simulate file upload
    setUploadedFile("financial_data_2024.csv")
  }

  const handleMapping = (csvColumn: string, systemField: string) => {
    setMappings((prev) => ({ ...prev, [csvColumn]: systemField }))
  }

  const allMapped = CSV_COLUMNS.every((col) => mappings[col])

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />

      <main className="ml-56">
        <DashboardHeader title="Financial Pulse" />

        <div className="p-6">
          <div className="max-w-3xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                      step >= s ? "bg-[#1e3a5f] text-white" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && <div className={cn("w-24 h-1 mx-2", step > s ? "bg-[#1e3a5f]" : "bg-muted")} />}
                </div>
              ))}
            </div>

            {/* Step Content */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Upload CSV File</CardTitle>
                  <CardDescription>Upload your financial data in CSV format</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    onClick={handleFileUpload}
                    className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-[#1e3a5f]/50 transition-colors"
                  >
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileSpreadsheet className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {uploadedFile || "Click to upload CSV"}
                    </h3>
                    <p className="text-sm text-muted-foreground">Supports CSV files up to 10MB</p>
                  </div>

                  {uploadedFile && (
                    <div className="mt-6 flex justify-end">
                      <Button onClick={() => setStep(2)} className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white">
                        Continue to Mapping
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Map CSV Columns</CardTitle>
                  <CardDescription>Match your CSV columns to system fields</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {CSV_COLUMNS.map((col) => (
                    <div key={col} className="flex items-center gap-4">
                      <div className="w-1/3">
                        <Label className="text-sm font-medium">{col}</Label>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <div className="flex-1">
                        <Select value={mappings[col] || ""} onValueChange={(val) => handleMapping(col, val)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            {SYSTEM_FIELDS.map((field) => (
                              <SelectItem key={field} value={field}>
                                {field}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!allMapped}
                      className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white"
                    >
                      Import Data
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardContent className="py-16 text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">Import Complete!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your financial data has been imported and is now being analyzed.
                  </p>
                  <Link href="/business/financial-pulse/dashboard">
                    <Button className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white">
                      View Financial Pulse Dashboard
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
