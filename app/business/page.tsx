"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  Plus,
  Search,
  Share2,
  ArrowUp,
  ArrowDown,
  FileText,
  MoreVertical,
  X,
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
import { useAppStore } from "@/lib/store"
import { useState } from "react"

// Mock data
const trendData = [
  { month: "Jan", cashIn: 35000, cashOut: 22000, netFlow: 13000 },
  { month: "Feb", cashIn: 38000, cashOut: 24000, netFlow: 14000 },
  { month: "Mar", cashIn: 42000, cashOut: 26000, netFlow: 16000 },
  { month: "Apr", cashIn: 39000, cashOut: 25000, netFlow: 14000 },
  { month: "May", cashIn: 40412, cashOut: 25412, netFlow: 15412 },
]

const clientCreditData = [
  { name: "SARL El Amel", credit: 400000, paid: 100, outstanding: "—", payment: "Completed", score: 92 },
  { name: "Atlas Distribution", credit: 400000, paid: 60, outstanding: 150000, payment: "Pending", score: 92 },
  { name: "Nova Plast DZ", credit: 400000, paid: 0, outstanding: 150000, payment: "Overdue", score: 92 },
  { name: "TechPro Algeria", credit: 400000, paid: 100, outstanding: "—", payment: "Completed", score: 92 },
  { name: "DZ Logistics SARL", credit: 400000, paid: 0, outstanding: 150000, payment: "Overdue", score: 92 },
  { name: "Alger Textiles", credit: 400000, paid: 60, outstanding: 150000, payment: "Pending", score: 92 },
]

const documents = [
  { name: "Financial Statement FY2024", size: "0 KB of 120 KB", status: "Completed" },
  { name: "Export License", size: "0 KB of 120 KB", status: "Completed" },
  { name: "Export License", size: "0 KB of 120 KB", status: "Completed" },
  { name: "Financial Statement FY2024", size: "0 KB of 120 KB", status: "Completed" },
  { name: "Tax Certificate 2023", size: "0 KB of 120 KB", status: "Completed" },
  { name: "Tax Certificate 2023", size: "0 KB of 120 KB", status: "Completed" },
  { name: "Export License", size: "0 KB of 120 KB", status: "Completed" },
  { name: "Tax Certificate 2023", size: "0 KB of 120 KB", status: "Completed" },
  { name: "Tax Certificate 2023", size: "0 KB of 120 KB", status: "Completed" },
]

const riskData = [
  { name: "On-Time Payers", value: 64, color: "#10b981" },
  { name: "At-Risk (Near Due)", value: 21, color: "#f59e0b" },
  { name: "Overdue / Defaulted", value: 15, color: "#ef4444" },
]

const payableCalendarData = [
  { date: 4, name: "Atlas Agro Supply", amount: 120, day: "4 Aug 2025" },
  { date: 5, name: "MedSupply DZ", amount: 170, day: "5 Aug 2025" },
  { date: 6, name: "TechPro Algeria", amount: 85, day: "6 Aug 2025" },
  { date: 10, name: "GreenLogix SARL", amount: 220, day: "10 Aug 2025" },
]

const duePaymentSuppliers = [
  { name: "Atlas Agro Supply", score: "88%", trend: "+3" },
  { name: "MedSupply DZ", score: "80%", trend: "+2" },
  { name: "TechPro Algeria", score: "92%", trend: "+4" },
  { name: "GreenLogix SARL", score: "75%", trend: "-2" },
]

const optimizationTips = [
  { id: "OP-3021", title: "Pay Atlas Agro within 5 days to save 2% (DZD 2,400) on total invoice.", action: "Apply" },
  {
    id: "OP-3021",
    title: "Schedule TechPro Algeria payments for Q2 Nov to optimize monthly cash flow.",
    action: "Schedule",
  },
  { id: "OP-3021", title: "Flag HydroSolutions DZ for review due to 2 late payments this quarter.", action: "Flag" },
]

export default function BusinessModulePage() {
  const { companyProfile } = useAppStore()
  const [showAlert, setShowAlert] = useState(true)
  const [currentMonth, setCurrentMonth] = useState("Aug, 2023")

  return (
    <DashboardLayout title="Business Module">
      <div className="p-6 space-y-6">
        {/* Alert Banner */}
        {showAlert && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-emerald-900">
                Financial Pulse module needs update in 12 days.Keep your records current to maintain your Trust Score
                advantage.
              </p>
            </div>
            <Button variant="link" className="text-emerald-700 text-sm font-medium px-2">
              Update Now
            </Button>
            <Button variant="ghost" size="icon" className="h-5 w-5 flex-shrink-0" onClick={() => setShowAlert(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-1">
              Hi, {companyProfile?.name || "Amine Belkacem"}
            </h1>
            <p className="text-sm text-muted-foreground">
              your company dossier is <span className="font-semibold text-foreground">78% verified</span> and ready for
              submission.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Share2 className="w-4 h-4" />
              Share Dossier
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <FileText className="w-4 h-4" />
              Auto Generate Documents
            </Button>
            <Button size="sm" className="gap-2 bg-[#0ea5e9] hover:bg-[#0284c7]">
              <Plus className="w-4 h-4" />
              New
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          {/* Financial Balance Index */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Financial Balance Index</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">0.82</span>
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Healthy
                    </Badge>
                  </div>
                </div>
                <div className="w-12 h-12">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeDasharray="82 100"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Balanced cash position maintained</p>
            </CardContent>
          </Card>

          {/* Global Trust Score */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Global Trust Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">96%</span>
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>
                <div className="w-12 h-12">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeDasharray="96 100"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">+3 pts Trust Score this week</p>
            </CardContent>
          </Card>

          {/* Portfolio Health Index */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Portfolio Health Index</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">88</span>
                    <span className="text-sm text-muted-foreground">/100</span>
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Stable
                    </Badge>
                  </div>
                </div>
                <div className="w-12 h-12">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeDasharray="88 100"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">+2 pts to Trust Score this week</p>
            </CardContent>
          </Card>

          {/* Supplier Index */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Supplier Index</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">82</span>
                    <span className="text-sm text-muted-foreground">/100</span>
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>
                <div className="w-12 h-12">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeDasharray="82 100"
                    />
                  </svg>
                </div>
              </div>
              <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                <AlertCircle className="w-3 h-3 mr-1" />2 Late Payment Alert
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Trend Graph and Due Payment Alerts */}
        <div className="grid grid-cols-3 gap-6">
          {/* Trend Graph */}
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Trend Graph</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    Monthly
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Weekly</DropdownMenuItem>
                  <DropdownMenuItem>Monthly</DropdownMenuItem>
                  <DropdownMenuItem>Quarterly</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Cash In</p>
                  <p className="text-2xl font-bold">$40,412</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Cash Out</p>
                  <p className="text-2xl font-bold">$25,412</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Net Flow</p>
                  <p className="text-2xl font-bold">$15,412</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <Tooltip />
                  <Line type="monotone" dataKey="cashIn" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="cashOut" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="netFlow" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Due Payment Alerts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Due Payment Alerts</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-amber-900">Upcoming Payment</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Atlas Distribution — DZD 150,000 due in 3 days (22 Oct 2025)
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-red-900">Overdue Alert</p>
                    <p className="text-xs text-red-700 mt-1">Nova Plast DZ — DZD 140,000 overdue by 2 days</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-amber-900">Upcoming Payment</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Atlas Distribution — DZD 150,000 due in 3 days (22 Oct 2025)
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-red-900">Overdue Alert</p>
                    <p className="text-xs text-red-700 mt-1">Nova Plast DZ — DZD 140,000 overdue by 2 days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payable Calendars and Default Risk Summary */}
        <div className="grid grid-cols-3 gap-6">
          {/* Payable Calendars */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Payable Calendars</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium">{currentMonth}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
                  <div key={day} className="text-center text-xs text-muted-foreground font-medium">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const hasPayment = payableCalendarData.some((p) => p.date === day)
                  const isToday = day === 11
                  return (
                    <div
                      key={day}
                      className={`aspect-square flex items-center justify-center text-sm rounded-lg ${
                        isToday
                          ? "bg-[#0ea5e9] text-white font-medium"
                          : hasPayment
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-foreground"
                      }`}
                    >
                      {day}
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 space-y-2">
                {payableCalendarData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center text-blue-700 font-medium">
                        {item.date}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">{item.day}</p>
                      </div>
                    </div>
                    <span className="font-semibold">${item.amount}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Default Risk Summary */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Default Risk Summary</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-48 h-48">
                  <PieChart width={192} height={192}>
                    <Pie
                      data={riskData}
                      cx={96}
                      cy={96}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {riskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">100%</span>
                    <span className="text-xs text-muted-foreground">Risk Summary</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {riskData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cashout Forecast & Due Payment Alerts Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Cashout Forecast</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Forecast (Oct)</p>
                  <p className="text-2xl font-bold">$398</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Verified Payments</p>
                  <p className="text-2xl font-bold">$290</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Unverified / Pending</p>
                  <p className="text-2xl font-bold">$108</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Early Payment Discounts Earned</p>
                  <p className="text-2xl font-bold">$48</p>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs font-medium text-blue-900 mb-1">AI Insight</p>
                <p className="text-xs text-blue-700">
                  "Your cash outflow trend indicates improved payment discipline. Maintain early payment ratio above 40%
                  for sustained liquidity."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trend Graph Table & Optimization Tip */}
        <div className="grid grid-cols-2 gap-6">
          {/* Trend Graph Performance Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Trend Graph</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    Monthly
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Weekly</DropdownMenuItem>
                  <DropdownMenuItem>Monthly</DropdownMenuItem>
                  <DropdownMenuItem>Quarterly</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Sector AVG</TableHead>
                    <TableHead>Perform</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">On-Time Payments</TableCell>
                    <TableCell>88%</TableCell>
                    <TableCell>79%</TableCell>
                    <TableCell>95%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Average SPR Score</TableCell>
                    <TableCell>80.4</TableCell>
                    <TableCell>74.2</TableCell>
                    <TableCell>91.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Invoice Verification Rate</TableCell>
                    <TableCell>93%</TableCell>
                    <TableCell>84%</TableCell>
                    <TableCell>97%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Late Payments</TableCell>
                    <TableCell>8%</TableCell>
                    <TableCell>15%</TableCell>
                    <TableCell>3%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Optimization Tip */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Optimization Tip</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {optimizationTips.map((tip, index) => (
                <div key={index} className="flex items-start justify-between p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground mb-1">{tip.id}</p>
                    <p className="text-sm">{tip.title}</p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-3 bg-transparent">
                    {tip.action}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Due Payment Alerts - Supplier Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Due Payment Alerts</CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>SPR Score</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {duePaymentSuppliers.map((supplier, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>{supplier.score}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {supplier.trend.startsWith("+") ? (
                          <ArrowUp className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className={supplier.trend.startsWith("+") ? "text-emerald-600" : "text-red-600"}>
                          {supplier.trend}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Client Credit Portfolio Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Client Credit Portfolio Overview</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                Sort
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Credit Amount($)</TableHead>
                  <TableHead>Paid (%)</TableHead>
                  <TableHead>Outstanding($)</TableHead>
                  <TableHead>Next Payment</TableHead>
                  <TableHead>Credit Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientCreditData.map((client, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.credit.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              client.paid === 100 ? "bg-emerald-500" : client.paid >= 50 ? "bg-amber-500" : "bg-red-500"
                            }`}
                            style={{ width: `${client.paid}%` }}
                          />
                        </div>
                        <span className="text-sm">{client.paid}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{client.outstanding}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          client.payment === "Completed"
                            ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                            : client.payment === "Pending"
                              ? "text-amber-600 border-amber-200 bg-amber-50"
                              : "text-red-600 border-red-200 bg-red-50"
                        }
                      >
                        {client.payment === "Completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                        {client.payment === "Pending" && <Clock className="w-3 h-3 mr-1" />}
                        {client.payment === "Overdue" && <AlertCircle className="w-3 h-3 mr-1" />}
                        {client.payment}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">Showing 1 to 6 of 50 entries</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-[#0ea5e9] text-white">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <span className="text-sm text-muted-foreground">...</span>
                <Button variant="outline" size="sm">
                  10
                </Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Centralized Documents */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Centralized Documents</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search folder or document..." className="pl-9 w-80" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {documents.map((doc, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-50 rounded flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">{doc.size}</p>
                        <span className="text-xs">•</span>
                        <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {doc.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
