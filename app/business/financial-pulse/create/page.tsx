"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Plus, Trash2, FileText, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface ExpenseRow {
  id: string
  type: string
  amount: string
}

export default function CreateFinancialPulse() {
  const router = useRouter()
  const [cashIn, setCashIn] = useState("12,000,000")
  const [expenses, setExpenses] = useState<ExpenseRow[]>([
    { id: "1", type: "Rent", amount: "300,500" },
    { id: "2", type: "Salaries", amount: "150,000" },
  ])
  const [upcomingPayment, setUpcomingPayment] = useState("2024-03-12")
  const [reportingPeriod, setReportingPeriod] = useState("15 Days")
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; status: string } | null>({
    name: "Financial Statement FY2024",
    size: "9 KB of 120 KB",
    status: "Completed",
  })

  const addExpenseRow = () => {
    setExpenses([...expenses, { id: Date.now().toString(), type: "", amount: "" }])
  }

  const removeExpenseRow = (id: string) => {
    setExpenses(expenses.filter((exp) => exp.id !== id))
  }

  const handleSubmit = () => {
    // Submit logic here
    router.push("/business/financial-pulse")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />

      <main className="ml-56">
        <DashboardHeader title="Financial Pulse" />

        <div className="p-6">
          <Card className="max-w-6xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl">Financial Pulse & Health Tracker</CardTitle>
              <p className="text-sm text-muted-foreground">
                Fill in the required metadata for the document you're uploading.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column - Form */}
                <div className="space-y-6">
                  {/* Cash In */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-foreground">Cash In</Label>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-1.5 block">Money In</Label>
                      <div className="relative">
                        <Input
                          value={cashIn}
                          onChange={(e) => setCashIn(e.target.value)}
                          className="pr-8"
                          placeholder="Input here"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      </div>
                    </div>
                  </div>

                  {/* Cashout */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-foreground">Cashout</Label>
                    {expenses.map((expense, idx) => (
                      <div key={expense.id} className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs text-muted-foreground mb-1.5 block">Type of expenses</Label>
                          <Select
                            value={expense.type}
                            onValueChange={(val) => {
                              const newExpenses = [...expenses]
                              newExpenses[idx].type = val
                              setExpenses(newExpenses)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Rent">Rent</SelectItem>
                              <SelectItem value="Salaries">Salaries</SelectItem>
                              <SelectItem value="Utilities">Utilities</SelectItem>
                              <SelectItem value="Supplies">Supplies</SelectItem>
                              <SelectItem value="Marketing">Marketing</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <Label className="text-xs text-muted-foreground">Money Out</Label>
                            {expenses.length > 1 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5"
                                onClick={() => removeExpenseRow(expense.id)}
                              >
                                <Trash2 className="w-3 h-3 text-muted-foreground" />
                              </Button>
                            )}
                          </div>
                          <div className="relative">
                            <Input
                              value={expense.amount}
                              onChange={(e) => {
                                const newExpenses = [...expenses]
                                newExpenses[idx].amount = e.target.value
                                setExpenses(newExpenses)
                              }}
                              className="pr-8"
                              placeholder="Input here"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="link"
                      onClick={addExpenseRow}
                      className="text-[#00335C] h-auto p-0 text-sm font-normal"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add new
                    </Button>
                  </div>

                  {/* Periods */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-foreground">Periods</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-muted-foreground mb-1.5 block">Upcoming Payment</Label>
                        <Input
                          type="date"
                          value={upcomingPayment}
                          onChange={(e) => setUpcomingPayment(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground mb-1.5 block">Reporting Period</Label>
                        <Select value={reportingPeriod} onValueChange={setReportingPeriod}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7 Days">7 Days</SelectItem>
                            <SelectItem value="15 Days">15 Days</SelectItem>
                            <SelectItem value="30 Days">30 Days</SelectItem>
                            <SelectItem value="60 Days">60 Days</SelectItem>
                            <SelectItem value="90 Days">90 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Upload */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground">Upload Document</Label>

                  {uploadedFile ? (
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground mb-1">{uploadedFile.name}</p>
                          <p className="text-xs text-muted-foreground mb-2">{uploadedFile.size}</p>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs text-emerald-600">{uploadedFile.status}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 flex-shrink-0"
                          onClick={() => setUploadedFile(null)}
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        setUploadedFile({
                          name: "Financial Statement FY2024",
                          size: "9 KB of 120 KB",
                          status: "Completed",
                        })
                      }
                      className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:border-[#00335C]/50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-sm font-medium text-foreground mb-1">
                        Choose a file or drag & drop it here.
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3">PDF, DOCX, JPG, PNG formats, up to 10 MB.</p>
                      <Button variant="outline" size="sm">
                        Browse Files
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="bg-[#00335C] hover:bg-[#004B87] text-white">
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
