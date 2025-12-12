import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart3, Shield, FileCheck, Share2 } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-[#1e3a5f]" />
            </div>
            <span className="text-white text-xl font-semibold">FinBridge DZ</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Digitizing Trust for
            <br />
            <span className="text-[#0ea5e9]">Algerian Businesses</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your financial documents into actionable insights. Get verified, validated, and ready for
            investment with our AI-powered platform.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" className="h-14 px-8 bg-[#0ea5e9] hover:bg-[#0284c7] text-white" asChild>
              <Link href="/register">Start Verification</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="/trust-chart">Learn How It Works</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-6 mt-24 max-w-6xl mx-auto">
          {[
            {
              icon: FileCheck,
              title: "Upload",
              description: "Submit your financial documents securely",
            },
            {
              icon: BarChart3,
              title: "Diagnose",
              description: "AI-powered analysis of your data",
            },
            {
              icon: Shield,
              title: "Validate",
              description: "Get verified and compliance-ready",
            },
            {
              icon: Share2,
              title: "Share",
              description: "Share reports with banks & investors",
            },
          ].map((feature, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <feature.icon className="w-10 h-10 text-[#0ea5e9] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
