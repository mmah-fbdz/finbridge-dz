"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useTranslations } from "@/lib/use-translations"

// Mock data
const kpiData = [
  { label: "Avg Response Time", value: "0.82", unit: "days", trend: "+12%", trendUp: true },
  { label: "Invoice Accuracy", value: "96%", unit: "", trend: "+3%", trendUp: true },
  { label: "Active Suppliers", value: "88", unit: "", trend: "-2", trendUp: false },
  { label: "Payment Success Rate", value: "82%", unit: "", trend: "+5%", trendUp: true },
]

const totalOriginData = [
  { month: "Jan", series1: 35000, series2: 28000, series3: 18000 },
  { month: "Feb", series1: 38000, series2: 25000, series3: 19000 },
  { month: "Mar", series1: 40412, series2: 24412, series3: 14412 },
  { month: "Apr", series1: 42000, series2: 26000, series3: 16000 },
  { month: "May", series1: 39000, series2: 23000, series3: 15000 },
]

const duePayments = [
  { id: 1, type: "Upcoming Payment", amount: "$12,540", dueDate: "Due in 3 days (12.10.2025)", status: "pending" },
  { id: 2, type: "Overdue Alert", amount: "$8,200", dueDate: "Overdue by 2 days", status: "overdue" },
  { id: 3, type: "Upcoming Payment", amount: "$5,890", dueDate: "Due in 5 days (15.10.2025)", status: "pending" },
  { id: 4, type: "Overdue Alert", amount: "$3,450", dueDate: "Overdue by 1 day", status: "overdue" },
]

const confirmedPayments = [
  { label: "Payroll", amount: "$23B", subtext: "In last 2 days" },
  { label: "Suppliers", amount: "$29G", subtext: "In last 7 days" },
  { label: "Utilities", amount: "$19B", subtext: "In last 30 days" },
  { label: "Taxes", amount: "$4B", subtext: "Pending" },
]

const defaultSubSummary = [
  { name: "Al-Burhan Supply", value: 54, color: "#ef4444" },
  { name: "Nasr Parts DZ", value: 21, color: "#3b82f6" },
  { name: "Amel Médical", value: 14, color: "#a855f7" },
]

const duePaymentAlerts = [
  { supplier: "Al-Burhan Supply", percentage: "68%", status: "High", trend: "+2" },
  { supplier: "Nasr Parts DZ", percentage: "45%", status: "Medium", trend: "-1" },
  { supplier: "Toufiki Agrifab", percentage: "92%", status: "Critical", trend: "+3" },
  { supplier: "Benzerga Cafe", percentage: "34%", status: "Low", trend: "0" },
]

const trendOriginTable = [
  { metric: "On-Time Payments", q1: "89%", q2: "76%", q3: "95%" },
  { metric: "Average Credit Note", q1: "74.2", q2: "65.8", q3: "81.0" },
  { metric: "Invoice Verification Rate", q1: "83%", q2: "64%", q3: "97%" },
  { metric: "Late Payments", q1: "4.7%", q2: "8.2%", q3: "2.1%" },
]

const monthlyOptimization = [
  { id: "AP-001", description: "Supplier payment term renegotiation for 3-month contracts", impact: "Active" },
  { id: "AP-002", description: "Invoice matching improvements for 30-day cycles", impact: "Scheduled" },
  { id: "AP-003", description: "Auto-payment EP for trusted DZ-based suppliers", impact: "Paused" },
]

const clientCreditData = [
  { client: "US Al-Amal", balance: "$50,000", change: "+10%", amount: "10,000", status: "Completed", score: 92 },
  {
    client: "Aissa Distribution",
    balance: "$11,000",
    change: "-15%",
    amount: "50,000",
    status: "In Progress",
    score: 88,
  },
  { client: "Mouna Prec DZ", balance: "$40,000", change: "+5%", amount: "15,000", status: "Completed", score: 82 },
  { client: "Toufiki Agrifab", balance: "$60,000", change: "-8%", amount: "70,000", status: "Completed", score: 75 },
  {
    client: "Ol Logistics-DMA",
    balance: "$20,000",
    change: "+15%",
    amount: "50,000",
    status: "In Progress",
    score: 91,
  },
  { client: "Alger Textiles", balance: "$30,000", change: "-18%", amount: "10,000", status: "Completed", score: 68 },
]

const completedDocuments = [
  { type: "Financial License", date: "19 Apr 2024", time: "10:45 AM", status: "Completed" },
  { type: "Tax Certificate 2023", date: "19 Apr 2024", time: "11:20 AM", status: "Completed" },
  { type: "Export License", date: "19 Apr 2024", time: "02:15 PM", status: "Completed" },
  { type: "Tax Certificate 2024", date: "19 Apr 2024", time: "03:30 PM", status: "Completed" },
]

export default function FinancialPulseDashboard() {
  const t = useTranslations()
  const [currentMonth, setCurrentMonth] = useState(7) // August = 7

  const daysInMonth = 31
  const firstDayOfWeek = 2 // Tuesday
  const today = 14

  const generateCalendarDays = () => {
    const days = []
    // Empty cells before first day
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null)
    }
    // Days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />

      <main className="ml-56">
        <DashboardHeader title="Business Module Dashboard" />

        <div className="p-6 space-y-6">
          {/* Alert Banner */}
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-emerald-800">
                  <span className="font-medium">Financial Pulse Module status update:</span> 5-days since you last
                  synced the data
                </p>
              </div>
              <Button variant="link" className="text-emerald-700">
                Update Now →
              </Button>
            </CardContent>
          </Card>

          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Hi, Amine Belkacem</h1>
              <p className="text-sm text-muted-foreground">
                You are on track with your Financial Pulse dashboard for execution
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Share Screen
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Auto-Generate Documents
              </Button>
              <Button className="bg-[#00335C] hover:bg-[#004B87] text-white">Export</Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-4">
            {kpiData.map((kpi, idx) => (
              <Card key={idx}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-xs text-muted-foreground">{kpi.label}</p>
                    {kpi.trendUp ? (
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-semibold text-foreground">{kpi.value}</h3>
                    <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                  </div>
                  <p className={`text-xs mt-2 ${kpi.trendUp ? "text-emerald-600" : "text-red-600"}`}>{kpi.trend}</p>
                  <p className="text-xs text-muted-foreground">vs last 7 days</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Total Origin Chart & Due Payments */}
          <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Total Origin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-8 mb-6">
                  <div>
                    <p className="text-2xl font-semibold text-foreground">$40,412</p>
                    <p className="text-xs text-muted-foreground">Series 1</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-foreground">$24,412</p>
                    <p className="text-xs text-muted-foreground">Series 2</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-foreground">$14,412</p>
                    <p className="text-xs text-muted-foreground">Series 3</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={totalOriginData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="series1" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="series2" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="series3" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Due Payment Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {duePayments.map((payment) => (
                  <div key={payment.id} className="pb-3 border-b last:border-0">
                    <div className="flex items-start gap-2 mb-1">
                      {payment.status === "overdue" ? (
                        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      ) : (
                        <Clock className="w-4 h-4 text-amber-500 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{payment.type}</p>
                        <p className="text-xs text-muted-foreground truncate">{payment.dueDate}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-foreground ml-6">{payment.amount}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Calendar & Sub Summary */}
          <div className="grid grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Taylor Carothers</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm font-medium">Aug, 2023</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                    <div key={idx} className="text-center text-xs font-medium text-muted-foreground py-1">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {generateCalendarDays().map((day, idx) => (
                    <div
                      key={idx}
                      className={`
                        aspect-square flex items-center justify-center text-sm rounded-lg
                        ${!day ? "" : day === today ? "bg-[#00335C] text-white font-medium" : "hover:bg-muted cursor-pointer"}
                      `}
                    >
                      {day || ""}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Default Sub-Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <PieChart width={160} height={160}>
                      <Pie
                        data={defaultSubSummary}
                        cx={80}
                        cy={80}
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {defaultSubSummary.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-semibold">100%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {defaultSubSummary.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Confirmed Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {confirmedPayments.map((payment, idx) => (
                  <div key={idx}>
                    <p className="text-xs text-muted-foreground mb-1">{payment.label}</p>
                    <p className="text-2xl font-semibold text-foreground">{payment.amount}</p>
                    <p className="text-xs text-muted-foreground">{payment.subtext}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Due Payment Alerts Table & Trend Origin */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Due Payment Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {duePaymentAlerts.map((alert, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{alert.supplier}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold">{alert.percentage}</span>
                        <Badge
                          variant={
                            alert.status === "Critical"
                              ? "destructive"
                              : alert.status === "High"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {alert.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground w-8 text-right">{alert.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Trend Origin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-4 pb-2 border-b text-xs font-medium text-muted-foreground">
                    <span>Metric</span>
                    <span className="text-center">Q1</span>
                    <span className="text-center">Q2</span>
                    <span className="text-center">Q3</span>
                  </div>
                  {trendOriginTable.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-4 gap-4 text-sm">
                      <span className="text-muted-foreground">{row.metric}</span>
                      <span className="text-center font-medium">{row.q1}</span>
                      <span className="text-center font-medium">{row.q2}</span>
                      <span className="text-center font-medium">{row.q3}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Optimization */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Monthly Optimization - Up</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monthlyOptimization.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-sm font-medium text-foreground">{item.id}</span>
                      <span className="text-sm text-muted-foreground">{item.description}</span>
                    </div>
                    <Badge
                      variant={
                        item.impact === "Active" ? "default" : item.impact === "Scheduled" ? "secondary" : "outline"
                      }
                    >
                      {item.impact}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Client Credit Portfolio Overview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Client Credit Portfolio Overview</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  CSV
                </Button>
                <Button variant="outline" size="sm">
                  Sort
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Client Name</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">
                        Credit Account#
                      </th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">% YoY</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">Balance</th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground">Status</th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientCreditData.map((client, idx) => (
                      <tr key={idx} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-4 text-sm font-medium">{client.client}</td>
                        <td className="py-3 px-4 text-sm text-right">{client.balance}</td>
                        <td className="py-3 px-4 text-sm text-right">
                          <span className={client.change.startsWith("+") ? "text-emerald-600" : "text-red-600"}>
                            {client.change}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-right">{client.amount}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant={client.status === "Completed" ? "default" : "secondary"}>
                            {client.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Progress value={client.score} className="w-12 h-2" />
                            <span className="text-sm font-medium">{client.score}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Completed Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Completed Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {completedDocuments.map((doc, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                        <FileText className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{doc.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.date} at {doc.time}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {doc.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
