"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { TrendingUp, CreditCard, Truck, UserCheck, Wallet, ChevronRight } from "lucide-react"
import Link from "next/link"

const modules = [
  {
    id: "financial-pulse",
    title: "Financial Pulse",
    description: "Upload CSV files and map your financial data for real-time insights",
    icon: TrendingUp,
    href: "/business/financial-pulse",
    color: "bg-emerald-100 text-emerald-600",
    status: "Available",
  },
  {
    id: "credit-monitor",
    title: "Credit Monitor",
    description: "Track and monitor your business credit score and history",
    icon: CreditCard,
    href: "/business/credit-monitor",
    color: "bg-blue-100 text-blue-600",
    status: "Available",
  },
  {
    id: "supplier-pay",
    title: "Supplier & Pay",
    description: "Multi-step wizard for managing supplier payments and relationships",
    icon: Truck,
    href: "/business/supplier-pay",
    color: "bg-amber-100 text-amber-600",
    status: "Available",
  },
  {
    id: "client-credit",
    title: "Client & Smart Credit",
    description: "Upload client data, map fields, and manage smart credit decisions",
    icon: UserCheck,
    href: "/business/client-credit",
    color: "bg-purple-100 text-purple-600",
    status: "Available",
  },
  {
    id: "payment-manager",
    title: "Payment Manager",
    description: "Approve and schedule payments with full audit trail",
    icon: Wallet,
    href: "/business/payment-manager",
    color: "bg-cyan-100 text-cyan-600",
    status: "Available",
  },
]

export default function BusinessModulesPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />

      <main className="ml-56">
        <DashboardHeader title="Business Modules" />

        <div className="p-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-foreground">Business Modules</h1>
              <p className="text-muted-foreground">
                Access specialized tools for managing different aspects of your business
              </p>
            </div>

            {/* Modules Grid */}
            <div className="grid gap-4">
              {modules.map((module) => (
                <Link key={module.id} href={module.href}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${module.color}`}>
                          <module.icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1">{module.title}</CardTitle>
                          <CardDescription>{module.description}</CardDescription>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
