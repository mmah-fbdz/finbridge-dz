"use client"

import type { ReactNode } from "react"
import Image from "next/image"

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1e3a5f] flex-col items-center justify-center p-12 relative">
        <div className="absolute top-8 left-8 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-white font-bold text-xl tracking-wide">
              <span className="text-2xl">A</span>LLIANCE
            </div>
            <span className="text-white/60 text-sm">ASSURANCES</span>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div className="text-white font-semibold flex items-center gap-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
              <rect x="4" y="4" width="6" height="16" fill="currentColor" />
              <rect x="12" y="8" width="6" height="12" fill="currentColor" />
            </svg>
            TRUST
          </div>
        </div>

        <div className="text-center max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Where Verified Data Builds Financial Confidence.
          </h1>
          <p className="text-white/80 text-lg">
            FinBridge DZ connects SMEs, banks, and investors in a secure ecosystem that transforms business data into
            trusted financial insights.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-12 w-full max-w-2xl">
          <div className="bg-white rounded-lg shadow-2xl p-4 transform rotate-[-2deg]">
            <div className="bg-gray-50 rounded p-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="flex gap-2">
                  <div className="h-20 bg-[#1e3a5f]/10 rounded flex-1" />
                  <div className="h-20 bg-[#1e3a5f]/10 rounded flex-1" />
                  <div className="h-20 bg-[#1e3a5f]/10 rounded flex-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {children}

        {/* Footer */}
        <div className="p-6 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Image src="/us-flag-waving.png" alt="English" width={24} height={16} className="rounded" />
              ENG
            </span>
          </div>
          <span>2025 FinBridgeDZ</span>
        </div>
      </div>
    </div>
  )
}
