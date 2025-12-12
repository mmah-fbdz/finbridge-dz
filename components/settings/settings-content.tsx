"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppStore } from "@/lib/store"
import { Building2, FileCheck, Bell, Shield, Key, Database, CreditCard, Upload, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FlagIcon } from "@/components/flag-icon"
import { locales } from "@/lib/i18n"

type SettingsTab = "workspace" | "documents" | "notifications" | "security" | "access" | "data" | "billing"

const settingsTabs = [
  { id: "workspace" as const, label: "Workspace Settings", icon: Building2 },
  { id: "documents" as const, label: "Document & Verification", icon: FileCheck },
  { id: "notifications" as const, label: "Notification", icon: Bell },
  { id: "security" as const, label: "Security Settings", icon: Shield },
  { id: "access" as const, label: "Institutional Access", icon: Key },
  { id: "data" as const, label: "Data Management", icon: Database },
  { id: "billing" as const, label: "Subscription & Billing", icon: CreditCard },
]

export function SettingsContent() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("workspace")
  const [hasChanges, setHasChanges] = useState(false)
  const { companyProfile, setCompanyProfile, locale, setLocale } = useAppStore()

  const [formData, setFormData] = useState({
    name: companyProfile?.name || "",
    email: companyProfile?.email || "",
    phoneNumber: "",
    contactPerson: "",
    sector: companyProfile?.sector || "",
    annualRevenue: companyProfile?.annualRevenue || "",
    employees: companyProfile?.employees || "",
    logo: companyProfile?.logo || "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleSave = () => {
    if (companyProfile) {
      setCompanyProfile({
        ...companyProfile,
        name: formData.name,
        email: formData.email,
        sector: formData.sector,
        annualRevenue: formData.annualRevenue,
        employees: formData.employees,
        logo: formData.logo,
      })
    }
    setHasChanges(false)
  }

  const handleDiscard = () => {
    setFormData({
      name: companyProfile?.name || "",
      email: companyProfile?.email || "",
      phoneNumber: "",
      contactPerson: "",
      sector: companyProfile?.sector || "",
      annualRevenue: companyProfile?.annualRevenue || "",
      employees: companyProfile?.employees || "",
      logo: companyProfile?.logo || "",
    })
    setHasChanges(false)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-background border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDiscard} disabled={!hasChanges}>
            Discard
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges}>
            Save Changes
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-64 border-r bg-muted/30 p-4 overflow-y-auto">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Sub Settings</h3>
          <div className="space-y-1">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  activeTab === tab.id
                    ? "bg-blue-500 text-white"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground",
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "workspace" && (
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold mb-6">Workspace Settings</h2>

              {/* Logo Upload */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-2 block">Your Workspace logo</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={formData.logo || "/placeholder.svg"} />
                    <AvatarFallback className="bg-muted text-2xl">
                      {formData.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2">
                    <Button size="sm" variant="default">
                      <Upload className="w-4 h-4 mr-2" />
                      Change logo
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Algeria Manufacturing Co."
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <div className="flex gap-2">
                    <Select defaultValue="us">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">
                          <div className="flex items-center gap-2">
                            <FlagIcon countryCode="us" />
                            <span>+1</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="dz">
                          <div className="flex items-center gap-2">
                            <FlagIcon countryCode="dz" />
                            <span>+213</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="ae">
                          <div className="flex items-center gap-2">
                            <FlagIcon countryCode="ae" />
                            <span>+971</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      placeholder="234 1213 212"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="contact@algeriaexport.dz"
                  />
                </div>

                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                    placeholder="Amire Belkacem"
                  />
                </div>

                <div>
                  <Label htmlFor="sector">Company Sector</Label>
                  <Select value={formData.sector} onValueChange={(value) => handleInputChange("sector", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="language">Language Preference</Label>
                  <Select value={locale} onValueChange={(value) => setLocale(value as any)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locales.map((loc) => (
                        <SelectItem key={loc.code} value={loc.code}>
                          <div className="flex items-center gap-2">
                            <FlagIcon countryCode={loc.flag} />
                            <span>{loc.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="revenue">Annual Revenue</Label>
                  <Select
                    value={formData.annualRevenue}
                    onValueChange={(value) => handleInputChange("annualRevenue", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select revenue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-500K">0 - 500K</SelectItem>
                      <SelectItem value="500K-1M">500K - 1M</SelectItem>
                      <SelectItem value="1M-2.4M">1M - 2.4M</SelectItem>
                      <SelectItem value="2.4M-5M">2.4M - 5M</SelectItem>
                      <SelectItem value="5M+">5M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="employees">Employees</Label>
                  <Select value={formData.employees} onValueChange={(value) => handleInputChange("employees", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employees" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10</SelectItem>
                      <SelectItem value="11-50">11-50</SelectItem>
                      <SelectItem value="51-100">51-100</SelectItem>
                      <SelectItem value="101-500">101-500</SelectItem>
                      <SelectItem value="500+">500+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold mb-4">Document & Verification</h2>
              <p className="text-muted-foreground">Configure document upload and verification settings.</p>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold mb-4">Notification</h2>
              <p className="text-muted-foreground">Manage your notification preferences.</p>
            </div>
          )}

          {activeTab === "security" && (
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
              <p className="text-muted-foreground">Configure security and privacy options.</p>
            </div>
          )}

          {activeTab === "access" && (
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold mb-4">Institutional Access</h2>
              <p className="text-muted-foreground">Manage institutional access permissions.</p>
            </div>
          )}

          {activeTab === "data" && (
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold mb-4">Data Management</h2>
              <p className="text-muted-foreground">Export, import, and manage your data.</p>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold mb-4">Subscription & Billing</h2>
              <p className="text-muted-foreground">Manage your subscription and billing information.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
