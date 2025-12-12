"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, ArrowLeft, CheckCircle2, Building2, CreditCard, FileCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const TOTAL_STEPS = 4

export default function SupplierPayPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    supplierName: "",
    supplierType: "",
    bankName: "",
    accountNumber: "",
    paymentTerms: "",
    amount: "",
  })

  const stepTitles = [
    { title: "Supplier Details", icon: Building2 },
    { title: "Bank Information", icon: CreditCard },
    { title: "Payment Terms", icon: FileCheck },
    { title: "Confirmation", icon: CheckCircle2 },
  ]

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />

      <main className="ml-56">
        <DashboardHeader title="Supplier & Pay" />

        <div className="p-6">
          <div className="max-w-3xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {stepTitles.map((s, idx) => (
                <div key={idx} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors mb-2",
                        step > idx + 1
                          ? "bg-emerald-100 text-emerald-600"
                          : step === idx + 1
                            ? "bg-[#1e3a5f] text-white"
                            : "bg-muted text-muted-foreground",
                      )}
                    >
                      {step > idx + 1 ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-6 h-6" />}
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium",
                        step >= idx + 1 ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {s.title}
                    </span>
                  </div>
                  {idx < TOTAL_STEPS - 1 && (
                    <div className={cn("flex-1 h-1 mx-4", step > idx + 1 ? "bg-emerald-500" : "bg-muted")} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <Card>
              {step === 1 && (
                <>
                  <CardHeader>
                    <CardTitle>Supplier Details</CardTitle>
                    <CardDescription>Enter the supplier information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Supplier Name</Label>
                      <Input
                        placeholder="Enter supplier name"
                        value={formData.supplierName}
                        onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Supplier Type</Label>
                      <Select
                        value={formData.supplierType}
                        onValueChange={(val) => setFormData({ ...formData, supplierType: val })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="goods">Goods Supplier</SelectItem>
                          <SelectItem value="services">Service Provider</SelectItem>
                          <SelectItem value="contractor">Contractor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </>
              )}

              {step === 2 && (
                <>
                  <CardHeader>
                    <CardTitle>Bank Information</CardTitle>
                    <CardDescription>Enter payment details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Bank Name</Label>
                      <Input
                        placeholder="Enter bank name"
                        value={formData.bankName}
                        onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Account Number</Label>
                      <Input
                        placeholder="Enter account number"
                        value={formData.accountNumber}
                        onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </>
              )}

              {step === 3 && (
                <>
                  <CardHeader>
                    <CardTitle>Payment Terms</CardTitle>
                    <CardDescription>Set payment schedule</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Payment Terms</Label>
                      <Select
                        value={formData.paymentTerms}
                        onValueChange={(val) => setFormData({ ...formData, paymentTerms: val })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select terms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="net30">Net 30</SelectItem>
                          <SelectItem value="net60">Net 60</SelectItem>
                          <SelectItem value="immediate">Immediate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Default Amount</Label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </>
              )}

              {step === 4 && (
                <CardContent className="py-16 text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">Supplier Added!</h2>
                  <p className="text-muted-foreground mb-6">
                    {formData.supplierName} has been added to your supplier list.
                  </p>
                </CardContent>
              )}

              {/* Navigation */}
              <div className="px-6 pb-6 flex justify-between">
                <Button variant="outline" onClick={handleBack} disabled={step === 1}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                {step < TOTAL_STEPS ? (
                  <Button onClick={handleNext} className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white">
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white">View Suppliers</Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
