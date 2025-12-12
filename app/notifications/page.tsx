"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, AlertTriangle, CheckCircle2, Info, Clock, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

const notifications = [
  {
    id: "1",
    type: "success",
    title: "Report Generated Successfully",
    description: "Your readiness report has been generated and is ready for sharing.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Document Expiring Soon",
    description: "Your Tax Compliance Certificate will expire in 30 days. Please renew it.",
    time: "1 day ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "New Feature Available",
    description: "Credit Monitor is now available in your Business Module dashboard.",
    time: "3 days ago",
    read: true,
  },
  {
    id: "4",
    type: "success",
    title: "Document Verified",
    description: "Your Financial Statements have been verified successfully.",
    time: "1 week ago",
    read: true,
  },
]

export default function NotificationsPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-500" />
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />

      <main className="ml-56">
        <DashboardHeader title="Notifications" />

        <div className="p-6">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Notifications</h1>
                <p className="text-muted-foreground">Stay updated on your dossier status</p>
              </div>
              <Button variant="outline" size="sm">
                Mark all as read
              </Button>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-4 p-4 bg-card border border-border rounded-xl transition-colors",
                    !notification.read && "bg-blue-50/50 border-blue-100",
                  )}
                >
                  <div className="mt-0.5">{getIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{notification.title}</p>
                      {!notification.read && (
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{notification.time}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {notifications.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">No notifications</h3>
                <p className="text-muted-foreground">{"You're"} all caught up!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
