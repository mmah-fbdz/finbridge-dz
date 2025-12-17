"use client"

import type React from "react"

import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />
      <main className="ml-56">
        {title && <DashboardHeader title={title} />}
        {children}
      </main>
    </div>
  )
}
