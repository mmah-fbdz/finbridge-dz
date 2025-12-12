"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppStore, type UploadedDocument } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Upload, X, FileText, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Tag } from "lucide-react"

const MAX_FILES = 5
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"]

const DOCUMENT_CATEGORIES = [
  "Legal Documents",
  "Financial Statements",
  "Tax Records",
  "HR Compliance",
  "Business License",
  "Other",
]

export function UploadCentre() {
  const router = useRouter()
  const { documents, addDocument, removeDocument, updateDocument, setCurrentFlowStep } = useAppStore()
  const [isDragging, setIsDragging] = useState(false)
  const [uploadStep, setUploadStep] = useState<1 | 2>(1)
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files)
      processFiles(files)
    },
    [documents.length],
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    processFiles(files)
  }

  const processFiles = (files: File[]) => {
    const remainingSlots = MAX_FILES - documents.length
    const filesToProcess = files.slice(0, remainingSlots)

    filesToProcess.forEach((file) => {
      if (!ACCEPTED_TYPES.includes(file.type)) return

      const docId = crypto.randomUUID()
      const newDoc: UploadedDocument = {
        id: docId,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date(),
        status: "uploading",
        progress: 0,
        category: "",
        tags: [],
        description: "",
      }

      addDocument(newDoc)

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          updateDocument(docId, { status: "uploaded", progress: 100 })
        } else {
          updateDocument(docId, { progress })
        }
      }, 200)
    })
  }

  const hasUploadedFiles = documents.some((d) => d.status === "uploaded")
  const allFilesTagged = documents.every((d) => d.category && d.category !== "")

  const handleProceedToMetadata = () => {
    setUploadStep(2)
    setCurrentFlowStep("upload-metadata")
  }

  const handleBackToUpload = () => {
    setUploadStep(1)
    setCurrentFlowStep("upload")
  }

  const handleRunAnalysis = () => {
    setCurrentFlowStep("analysis")
    router.push("/analysis")
  }

  const handleUpdateDocumentCategory = (docId: string, category: string) => {
    updateDocument(docId, { category })
  }

  const handleUpdateDocumentDescription = (docId: string, description: string) => {
    updateDocument(docId, { description })
  }

  // Step 1: Upload Dropzone
  if (uploadStep === 1) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1e3a5f]/10 rounded-full text-sm text-[#1e3a5f] mb-4">
            Step 1 of 2
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Upload Documents</h1>
          <p className="text-muted-foreground">
            Upload your business documents for verification. We accept PDF, JPG, and PNG files.
          </p>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-xl p-12 text-center transition-colors",
            isDragging ? "border-[#1e3a5f] bg-[#1e3a5f]/5" : "border-border hover:border-[#1e3a5f]/50",
            documents.length >= MAX_FILES && "opacity-50 pointer-events-none",
          )}
        >
          <div className="w-16 h-16 bg-[#1e3a5f]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-[#1e3a5f]" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">Drag and drop files here</h3>
          <p className="text-sm text-muted-foreground mb-4">or click to browse from your computer</p>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            disabled={documents.length >= MAX_FILES}
          />
          <label htmlFor="file-upload">
            <Button variant="outline" className="border-[#1e3a5f]/20 cursor-pointer bg-transparent" asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                Browse Files
              </span>
            </Button>
          </label>
          <p className="text-xs text-muted-foreground mt-4">
            Maximum {MAX_FILES} files • PDF, JPG, PNG only • Max 10MB each
          </p>
        </div>

        {/* File List */}
        {documents.length > 0 && (
          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">
                Uploaded Files ({documents.length}/{MAX_FILES})
              </h3>
              <span className="text-sm text-muted-foreground">
                {documents.filter((d) => d.status === "uploaded").length} ready
              </span>
            </div>

            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{(doc.size / 1024 / 1024).toFixed(2)} MB</p>
                  {doc.status === "uploading" && <Progress value={doc.progress} className="h-1 mt-2" />}
                </div>

                <div className="flex items-center gap-2">
                  {doc.status === "uploaded" && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  {doc.status === "error" && <AlertCircle className="w-5 h-5 text-red-500" />}
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeDocument(doc.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Button */}
        {hasUploadedFiles && (
          <div className="mt-8 flex justify-end">
            <Button onClick={handleProceedToMetadata} className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white h-12 px-6">
              Continue to Tagging
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    )
  }

  // Step 2: Metadata / Tagging
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1e3a5f]/10 rounded-full text-sm text-[#1e3a5f] mb-4">
          Step 2 of 2
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Tag Your Documents</h1>
        <p className="text-muted-foreground">Categorize your documents to help our AI analyze them more accurately.</p>
      </div>

      {/* Document Tagging Cards */}
      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className={cn(
              "p-6 bg-card border rounded-xl transition-all",
              selectedDocId === doc.id ? "border-[#1e3a5f] ring-1 ring-[#1e3a5f]" : "border-border",
            )}
            onClick={() => setSelectedDocId(doc.id)}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-red-600" />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <p className="font-medium text-foreground">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(doc.size / 1024 / 1024).toFixed(2)} MB • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`category-${doc.id}`} className="text-sm">
                      Document Category
                    </Label>
                    <Select
                      value={doc.category || ""}
                      onValueChange={(value) => handleUpdateDocumentCategory(doc.id, value)}
                    >
                      <SelectTrigger id={`category-${doc.id}`}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {DOCUMENT_CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`desc-${doc.id}`} className="text-sm">
                      Description (Optional)
                    </Label>
                    <Input
                      id={`desc-${doc.id}`}
                      placeholder="Brief description..."
                      value={doc.description || ""}
                      onChange={(e) => handleUpdateDocumentDescription(doc.id, e.target.value)}
                    />
                  </div>
                </div>

                {doc.category && (
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#1e3a5f]" />
                    <span className="text-sm text-[#1e3a5f] font-medium">{doc.category}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={handleBackToUpload} className="h-12 px-6 bg-transparent">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Upload
        </Button>
        <Button
          onClick={handleRunAnalysis}
          disabled={!allFilesTagged}
          className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white h-12 px-6 disabled:opacity-50"
        >
          Run Analysis
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {!allFilesTagged && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Please categorize all documents before proceeding
        </p>
      )}
    </div>
  )
}
