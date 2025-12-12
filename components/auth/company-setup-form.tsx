"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Building2, Upload, ImageIcon } from "lucide-react"
import Link from "next/link"
import { useAppStore } from "@/lib/store"
import Image from "next/image"

const sectors = [
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "agriculture", label: "Agriculture" },
  { value: "construction", label: "Construction" },
  { value: "services", label: "Services" },
]

const subSectors = {
  manufacturing: ["Industrial Goods", "Consumer Goods", "Electronics", "Automotive"],
  retail: ["E-commerce", "Brick & Mortar", "Wholesale", "Distribution"],
  technology: ["Software", "Hardware", "IT Services", "Telecommunications"],
  healthcare: ["Pharmaceuticals", "Medical Devices", "Healthcare Services", "Biotechnology"],
  finance: ["Banking", "Insurance", "Investment", "Fintech"],
  agriculture: ["Farming", "Livestock", "Agribusiness", "Food Processing"],
  construction: ["Residential", "Commercial", "Infrastructure", "Real Estate"],
  services: ["Consulting", "Professional Services", "Hospitality", "Transportation"],
}

const revenueRanges = [
  { value: "0-500k", label: "0 - 500K" },
  { value: "500k-1m", label: "500K - 1M" },
  { value: "1m-2.4m", label: "1M - 2.4M" },
  { value: "2.4m-5m", label: "2.4M - 5M" },
  { value: "5m-10m", label: "5M - 10M" },
  { value: "10m+", label: "10M+" },
]

const employeeRanges = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-100", label: "51-100" },
  { value: "101-250", label: "101-250" },
  { value: "251-500", label: "251-500" },
  { value: "500+", label: "500+" },
]

export function CompanySetupForm() {
  const router = useRouter()
  const { setCompanyProfile, setOnboardingStep, email } = useAppStore()
  const [isLoading, setIsLoading] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    companyName: "",
    sector: "",
    subSector: "",
    annualRevenue: "",
    employees: "",
  })

  const isFormValid =
    formData.companyName.length > 0 &&
    formData.sector.length > 0 &&
    formData.subSector.length > 0 &&
    formData.annualRevenue.length > 0 &&
    formData.employees.length > 0

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setCompanyProfile({
      id: crypto.randomUUID(),
      name: formData.companyName,
      logo: logoPreview || undefined,
      sector: formData.sector,
      subSector: formData.subSector,
      annualRevenue: formData.annualRevenue,
      employees: formData.employees,
      email: email,
    })

    setOnboardingStep(1)
    router.push("/dashboard")
  }

  const availableSubSectors = formData.sector ? subSectors[formData.sector as keyof typeof subSectors] || [] : []

  return (
    <div className="flex-1 flex flex-col p-8">
      <Link href="/otp" className="flex items-center text-muted-foreground hover:text-foreground w-fit">
        <ArrowLeft className="w-5 h-5 mr-2" />
      </Link>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          {/* Icon */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-[#1e3a5f] rounded-xl flex items-center justify-center mb-4">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Get to know your company</h1>
            <p className="text-muted-foreground mt-1">Digitizing trust for Algerian businesses.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Logo Upload */}
            <div className="space-y-2">
              <Label>Upload your logo</Label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#1e3a5f]/10 rounded-lg flex items-center justify-center overflow-hidden">
                  {logoPreview ? (
                    <Image
                      src={logoPreview || "/placeholder.svg"}
                      alt="Company logo"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-[#1e3a5f]/40" />
                  )}
                </div>
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="border-[#1e3a5f]/20"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">File size up to 5 mb with PNG or JPEG File</p>
                </div>
              </div>
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Your company name"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="h-12 border-[#1e3a5f]/20 focus:border-[#1e3a5f] focus:ring-[#1e3a5f]"
              />
            </div>

            {/* Revenue and Employees */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Annual Revenue</Label>
                <Select
                  value={formData.annualRevenue}
                  onValueChange={(value) => setFormData({ ...formData, annualRevenue: value })}
                >
                  <SelectTrigger className="h-12 border-[#1e3a5f]/20">
                    <SelectValue placeholder="select here" />
                  </SelectTrigger>
                  <SelectContent>
                    {revenueRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Employees</Label>
                <Select
                  value={formData.employees}
                  onValueChange={(value) => setFormData({ ...formData, employees: value })}
                >
                  <SelectTrigger className="h-12 border-[#1e3a5f]/20">
                    <SelectValue placeholder="select here" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Sector */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Sector</Label>
                <Select
                  value={formData.sector}
                  onValueChange={(value) => setFormData({ ...formData, sector: value, subSector: "" })}
                >
                  <SelectTrigger className="h-12 border-[#1e3a5f]/20">
                    <SelectValue placeholder="select here" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector.value} value={sector.value}>
                        {sector.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Sub-Sector</Label>
                <Select
                  value={formData.subSector}
                  onValueChange={(value) => setFormData({ ...formData, subSector: value })}
                  disabled={!formData.sector}
                >
                  <SelectTrigger className="h-12 border-[#1e3a5f]/20">
                    <SelectValue placeholder="select here" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubSectors.map((sub) => (
                      <SelectItem key={sub} value={sub.toLowerCase().replace(/ /g, "-")}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full h-12 bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white disabled:bg-gray-200 disabled:text-gray-400"
            >
              {isLoading ? "Setting up..." : "Continue to Dashboard"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
