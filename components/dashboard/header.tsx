"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  title: string
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-background">
      <h1 className="text-lg font-medium text-foreground">{title}</h1>
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-[#0ea5e9] rounded-full" />
      </Button>
    </header>
  )
}
