"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { UploadCentre } from "@/components/upload/upload-centre"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />

      <main className="ml-56">
        <DashboardHeader title="Upload Centre" />

        <div className="p-6">
          <UploadCentre />
        </div>
      </main>
    </div>
  )
}
