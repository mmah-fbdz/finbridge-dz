"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Clock, XCircle, Calendar, DollarSign, Building2 } from "lucide-react"

const pendingPayments = [
  { id: "1", supplier: "ABC Supplies", amount: 5000, dueDate: "2024-02-15", status: "pending" },
  { id: "2", supplier: "XYZ Services", amount: 12500, dueDate: "2024-02-20", status: "pending" },
  { id: "3", supplier: "Tech Solutions", amount: 8750, dueDate: "2024-02-25", status: "pending" },
]

const scheduledPayments = [
  { id: "4", supplier: "Cloud Provider", amount: 3000, scheduledDate: "2024-02-18", status: "scheduled" },
  { id: "5", supplier: "Marketing Agency", amount: 7500, scheduledDate: "2024-02-22", status: "scheduled" },
]

export default function PaymentManagerPage() {
  const [payments, setPayments] = useState(pendingPayments)

  const handleApprove = (id: string) => {
    setPayments((prev) => prev.filter((p) => p.id !== id))
  }

  const handleReject = (id: string) => {
    setPayments((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />

      <main className="ml-56">
        <DashboardHeader title="Payment Manager" />

        <div className="p-6">
          <div className="max-w-5xl mx-auto">
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{payments.length}</p>
                      <p className="text-sm text-muted-foreground">Pending Approval</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{scheduledPayments.length}</p>
                      <p className="text-sm text-muted-foreground">Scheduled</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        ${(payments.reduce((acc, p) => acc + p.amount, 0) / 1000).toFixed(1)}K
                      </p>
                      <p className="text-sm text-muted-foreground">Total Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="approve" className="space-y-4">
              <TabsList>
                <TabsTrigger value="approve">Approve Payments</TabsTrigger>
                <TabsTrigger value="schedule">Scheduled Payments</TabsTrigger>
              </TabsList>

              <TabsContent value="approve">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Approvals</CardTitle>
                    <CardDescription>Review and approve supplier payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {payments.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#1e3a5f]/10 rounded-lg flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-[#1e3a5f]" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{payment.supplier}</p>
                              <p className="text-sm text-muted-foreground">Due: {payment.dueDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="text-lg font-semibold text-foreground">${payment.amount.toLocaleString()}</p>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReject(payment.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleApprove(payment.id)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                              >
                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {payments.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">No pending payments to approve</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle>Scheduled Payments</CardTitle>
                    <CardDescription>Upcoming payments that have been scheduled</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {scheduledPayments.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Calendar className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{payment.supplier}</p>
                              <p className="text-sm text-muted-foreground">Scheduled: {payment.scheduledDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="text-lg font-semibold text-foreground">${payment.amount.toLocaleString()}</p>
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Scheduled</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
