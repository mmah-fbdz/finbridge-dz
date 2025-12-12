"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { useAppStore, type SharedLink } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Link2, Mail, Building2, CheckCircle2, ExternalLink, ArrowLeft } from "lucide-react"

export default function ShareCentrePage() {
  const router = useRouter()
  const { sharedLinks, addSharedLink, setCurrentFlowStep } = useAppStore()
  const [recipientEmail, setRecipientEmail] = useState("")
  const [recipientOrg, setRecipientOrg] = useState("")
  const [generatedLink, setGeneratedLink] = useState("")
  const [copied, setCopied] = useState(false)

  const handleGenerateLink = () => {
    const token = crypto.randomUUID()
    const newLink: SharedLink = {
      id: crypto.randomUUID(),
      token,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      recipientEmail: recipientEmail || undefined,
      accessCount: 0,
    }
    addSharedLink(newLink)

    const shareUrl = `${window.location.origin}/shared/${token}`
    setGeneratedLink(shareUrl)
    setCurrentFlowStep("share")
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleBackToReport = () => {
    router.push("/report")
  }

  const handleBackToDashboard = () => {
    setCurrentFlowStep("complete")
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />

      <main className="ml-56">
        <DashboardHeader title="Share Centre" />

        <div className="p-6">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="icon" onClick={handleBackToReport}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Share Centre</h1>
                <p className="text-muted-foreground">Generate secure links to share your report</p>
              </div>
            </div>

            {/* Generate Link Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="w-5 h-5" />
                  Generate Secure Link
                </CardTitle>
                <CardDescription>
                  Create a tokenised, secure link that allows recipients to view your report
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Recipient Email (Optional)</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="recipient@bank.com"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org">Organization (Optional)</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="org"
                        placeholder="Bank / Investor name"
                        value={recipientOrg}
                        onChange={(e) => setRecipientOrg(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleGenerateLink} className="w-full bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white h-12">
                  <Link2 className="w-4 h-4 mr-2" />
                  Generate Secure Link
                </Button>

                {generatedLink && (
                  <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="font-medium text-emerald-800">Link Generated!</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input value={generatedLink} readOnly className="bg-white text-sm" />
                      <Button variant="outline" onClick={handleCopyLink}>
                        {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-emerald-700 mt-2">This link will expire in 30 days</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shared Links History */}
            {sharedLinks.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Shared Links</CardTitle>
                  <CardDescription>History of generated secure links</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sharedLinks.map((link) => (
                      <div key={link.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                        <div>
                          <p className="font-medium text-sm">{link.recipientEmail || "General Share Link"}</p>
                          <p className="text-xs text-muted-foreground">
                            Created {new Date(link.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{link.accessCount} views</Badge>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={`/shared/${link.token}`} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Back to Dashboard */}
            <div className="mt-8 text-center">
              <Button variant="outline" onClick={handleBackToDashboard} className="h-12 px-6 bg-transparent">
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
