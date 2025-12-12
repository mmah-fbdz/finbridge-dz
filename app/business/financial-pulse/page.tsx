"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  TrendingUp,
  TrendingDown,
  CalendarIcon,
  FileText,
  AlertTriangle,
  Lightbulb,
  DollarSign,
  Share2,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  X,
  CheckCircle2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const kpiCards = [
  {
    label: "Net Cash Flow",
    value: "425,000",
    trend: "+12%",
    trendUp: true,
    icon: DollarSign,
  },
  {
    label: "Liquidity Ratio (FRR)",
    value: "1.04",
    trend: "Healthy",
    trendUp: true,
    icon: TrendingUp,
  },
  {
    label: "Verified Bank Sync",
    value: "26",
    unit: "Oct",
    trend: "",
    trendUp: null,
    icon: CalendarIcon,
  },
  {
    label: "Expense Alerts",
    value: "3",
    trend: "+ 15% of forecast",
    trendUp: false,
    icon: AlertTriangle,
  },
]

const insightsData = [
  {
    id: 1,
    type: "Expense Category Surge",
    icon: AlertTriangle,
    color: "text-purple-600",
    message: "Operations costs rose +18% this month",
    action: "Review Details",
    actionLink: "#",
  },
  {
    id: 2,
    type: "High Vendor Payment",
    icon: DollarSign,
    color: "text-emerald-600",
    message: "Payment to Atlas Agro exceeded average by DZD 40,000",
    action: "Review Details",
    actionLink: "#",
  },
  {
    id: 3,
    type: "Optimization Tip",
    icon: Lightbulb,
    color: "text-amber-500",
    message: "Reduce delayed reconciliation to improve liquidity index",
    action: "View Report",
    actionLink: "#",
  },
  {
    id: 4,
    type: "Bank Sync Lag",
    icon: AlertTriangle,
    color: "text-slate-700",
    message: "One account has not synced since Oct 20.",
    action: "Sync Now",
    actionLink: "#",
  },
]

const documentsData = [
  {
    id: 1,
    name: "Cash Flow Statement – Q3 2025",
    creditScore: 92,
    date: "25 Oct 2025",
    type: "Report",
    status: "Verified",
  },
  {
    id: 2,
    name: "Bank Reconciliation Sheet – Oct",
    creditScore: 90,
    date: "25 Oct 2025",
    type: "Ledger",
    status: "Verified",
  },
  {
    id: 3,
    name: "Expense Summary – Operations",
    creditScore: 82,
    date: "25 Oct 2025",
    type: "Report",
    status: "Review",
  },
  {
    id: 4,
    name: "Transaction Audit Log – FinBridge AI",
    creditScore: 95,
    date: "25 Oct 2025",
    type: "Ledger",
    status: "Verified",
  },
  {
    id: 5,
    name: "Cash Flow Statement – Q3 2025",
    creditScore: 90,
    date: "25 Oct 2025",
    type: "Ledger",
    status: "Verified",
  },
]

export default function FinancialPulsePage() {
  const [showAlert, setShowAlert] = useState(true)

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />

      <main className="ml-56">
        <DashboardHeader title="Financial Pulse" />

        <div className="p-6 space-y-6">
          {/* Alert Banner */}
          {showAlert && (
            <Card className="bg-emerald-50 border-emerald-200">
              <CardContent className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-emerald-800">
                    Maintaining a positive cash balance for three consecutive months increased your Trust Score by +3
                    pts
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowAlert(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Header with Actions */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">Financial Overview</h1>
            <div className="flex gap-2">
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share Dossier
              </Button>
              <Link href="/business/financial-pulse/create">
                <Button className="bg-[#00335C] hover:bg-[#004B87] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New
                </Button>
              </Link>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-4">
            {kpiCards.map((kpi, idx) => (
              <Card key={idx}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-xs text-muted-foreground">{kpi.label}</p>
                    <kpi.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-3xl font-semibold text-foreground">{kpi.value}</h3>
                    {kpi.unit && <span className="text-sm text-muted-foreground">{kpi.unit}</span>}
                  </div>
                  {kpi.trend && (
                    <div className="flex items-center gap-1">
                      {kpi.trendUp === true && <TrendingUp className="w-3 h-3 text-emerald-500" />}
                      {kpi.trendUp === false && <TrendingDown className="w-3 h-3 text-red-500" />}
                      <p
                        className={`text-xs ${
                          kpi.trendUp === true
                            ? "text-emerald-600"
                            : kpi.trendUp === false
                              ? "text-red-600"
                              : "text-emerald-600"
                        }`}
                      >
                        {kpi.trend}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Insights & Smart Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Insights & Smart Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 pb-3 border-b text-xs font-medium text-muted-foreground">
                  <div className="col-span-3">Insight</div>
                  <div className="col-span-7">Message</div>
                  <div className="col-span-2 text-right">Action</div>
                </div>

                {/* Table Rows */}
                {insightsData.map((insight) => (
                  <div key={insight.id} className="grid grid-cols-12 gap-4 py-3 border-b last:border-0">
                    <div className="col-span-3 flex items-center gap-2">
                      <insight.icon className={`w-4 h-4 ${insight.color}`} />
                      <span className="text-sm font-medium text-foreground">{insight.type}</span>
                    </div>
                    <div className="col-span-7 flex items-center">
                      <p className="text-sm text-muted-foreground">{insight.message}</p>
                    </div>
                    <div className="col-span-2 flex items-center justify-end">
                      <Button variant="link" className="text-[#00335C] h-auto p-0">
                        {insight.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Financial Documents */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Financial Documents</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search folder or document" className="pl-9 w-64" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Sort
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 pb-3 border-b text-xs font-medium text-muted-foreground">
                  <div className="col-span-4">Document Name</div>
                  <div className="col-span-2">Credit Score</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Status</div>
                </div>

                {/* Table Rows */}
                {documentsData.map((doc) => (
                  <div key={doc.id} className="grid grid-cols-12 gap-4 py-3 border-b last:border-0 items-center">
                    <div className="col-span-4 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-foreground">{doc.name}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm font-medium text-foreground">{doc.creditScore}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-muted-foreground">{doc.date}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-muted-foreground">{doc.type}</span>
                    </div>
                    <div className="col-span-2 flex items-center justify-between">
                      <Badge
                        variant={doc.status === "Verified" ? "default" : "secondary"}
                        className={
                          doc.status === "Verified"
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                        }
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {doc.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">Showing 1 to 5 of 54 entries</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground mr-2">Show #</span>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <span className="px-2">...</span>
                    <Button variant="outline" size="sm">
                      10
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
