"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useAppStore } from "@/lib/store"

export function LoginForm() {
  const router = useRouter()
  const { setEmail, setAuthenticated, setIsNewRegistration } = useAppStore()
  const [email, setEmailValue] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isFormValid = email.length > 0 && password.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsLoading(true)
    setEmail(email)
    setIsNewRegistration(false)

    // Simulate API authentication
    await new Promise((resolve) => setTimeout(resolve, 500))

    setAuthenticated(true)
    router.push("/dashboard")
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-[#1e3a5f] rounded-xl flex items-center justify-center mb-4">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Welcome to FinBridge DZ</h1>
          <p className="text-muted-foreground mt-1">Digitizing trust for Algerian businesses.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmailValue(e.target.value)}
              className="h-12 border-[#1e3a5f]/20 focus:border-[#1e3a5f] focus:ring-[#1e3a5f]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 pr-12 border-[#1e3a5f]/20 focus:border-[#1e3a5f] focus:ring-[#1e3a5f]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-foreground">
                Forgot password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full h-12 bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white disabled:bg-gray-200 disabled:text-gray-400"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            {"Don't have account? "}
            <Link href="/register" className="text-[#0ea5e9] hover:underline font-medium">
              Register
            </Link>
          </p>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-muted-foreground">Or</span>
            </div>
          </div>

          <p className="text-muted-foreground">
            How FinBridge calculates Score?{" "}
            <Link href="/trust-chart" className="text-[#0ea5e9] hover:underline font-medium">
              View FinBridge Trust Chart
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
