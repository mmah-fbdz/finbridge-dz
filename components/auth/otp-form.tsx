"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, KeyRound } from "lucide-react"
import Link from "next/link"
import { useAppStore } from "@/lib/store"

export function OTPForm() {
  const router = useRouter()
  const { setAuthenticated, companyProfile, isNewRegistration } = useAppStore()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(45)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const isFormValid = otp.every((digit) => digit !== "")

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split("").forEach((digit, i) => {
      if (i < 6) newOtp[i] = digit
    })
    setOtp(newOtp)
  }

  const handleResend = () => {
    if (resendTimer === 0) {
      setResendTimer(45)
      // Trigger resend API
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsLoading(true)

    // Simulate API verification
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setAuthenticated(true)

    // New registrations always go to company setup
    // Existing users would have gone directly to dashboard from login
    if (isNewRegistration) {
      // New user must complete company profile
      router.push("/company-setup")
    } else if (companyProfile) {
      // Existing user with profile (shouldn't normally need OTP)
      router.push("/dashboard")
    } else {
      // Fallback: no profile means setup needed
      router.push("/company-setup")
    }
  }

  return (
    <div className="flex-1 flex flex-col p-8">
      <Link
        href={isNewRegistration ? "/register" : "/login"}
        className="flex items-center text-muted-foreground hover:text-foreground w-fit"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
      </Link>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          {/* Icon */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-[#1e3a5f] rounded-xl flex items-center justify-center mb-4">
              <KeyRound className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">OTP Confirmation</h1>
            <p className="text-muted-foreground mt-1 text-center">
              {"We've sent a 6-digit verification code to your registered email address"}
            </p>
          </div>

          {/* OTP Input */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-3" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-semibold border border-[#1e3a5f]/20 rounded-lg focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all"
                />
              ))}
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full h-12 bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white disabled:bg-gray-200 disabled:text-gray-400"
            >
              {isLoading ? "Verifying..." : "Submit"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-muted-foreground">
              {"Didn't receive the code? "}
              {resendTimer > 0 ? (
                <span className="text-[#0ea5e9] font-medium">
                  Resend in <span className="font-mono">{String(resendTimer).padStart(2, "0")}s</span>
                </span>
              ) : (
                <button onClick={handleResend} className="text-[#0ea5e9] hover:underline font-medium">
                  Resend Now
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
