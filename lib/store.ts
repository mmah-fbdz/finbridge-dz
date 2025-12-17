"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Locale } from "./i18n"

export interface CompanyProfile {
  id: string
  name: string
  logo?: string
  sector: string
  subSector: string
  annualRevenue: string
  employees: string
  email: string
}

export interface UploadedDocument {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: Date
  status: "uploading" | "uploaded" | "analyzing" | "completed" | "error"
  progress?: number
  financialIntegrity?: string
  completeness?: string
  category?: string
  tags?: string[]
  description?: string
}

export interface DiagnosisResult {
  financialScore: number
  legalScore: number
  transparencyScore: number
  globalTrustScore: number
}

export interface ChecklistItem {
  id: string
  title: string
  description?: string
  status: "pending" | "completed" | "missing" | "in-progress"
  mandatory: boolean
  category: string
}

export interface Suggestion {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  category: string
  action?: string
}

export interface SharedLink {
  id: string
  token: string
  createdAt: Date
  expiresAt?: Date
  recipientEmail?: string
  accessCount: number
}

interface AppState {
  // Auth state
  isAuthenticated: boolean
  email: string
  isNewRegistration: boolean

  locale: Locale

  // Onboarding step
  onboardingStep: number

  // Company profile
  companyProfile: CompanyProfile | null

  // Documents
  documents: UploadedDocument[]

  // Diagnosis
  diagnosisResult: DiagnosisResult | null
  diagnosisProgress: number

  // Validation
  checklistItems: ChecklistItem[]
  validationComplete: boolean

  suggestions: Suggestion[]

  // Report
  reportUrl: string | null
  reportGenerating: boolean
  reportProgress: number

  sharedLinks: SharedLink[]

  currentFlowStep:
    | "upload"
    | "upload-metadata"
    | "analysis"
    | "analysis-progress"
    | "analysis-results"
    | "validation"
    | "suggestions"
    | "validation-complete"
    | "report-generation"
    | "report-preview"
    | "share"
    | "complete"

  // Actions
  setEmail: (email: string) => void
  setAuthenticated: (value: boolean) => void
  setIsNewRegistration: (value: boolean) => void
  setLocale: (locale: Locale) => void
  setOnboardingStep: (step: number) => void
  setCompanyProfile: (profile: CompanyProfile) => void
  addDocument: (doc: UploadedDocument) => void
  updateDocument: (id: string, updates: Partial<UploadedDocument>) => void
  removeDocument: (id: string) => void
  setDiagnosisResult: (result: DiagnosisResult) => void
  setDiagnosisProgress: (progress: number) => void
  setChecklistItems: (items: ChecklistItem[]) => void
  updateChecklistItem: (id: string, status: ChecklistItem["status"]) => void
  setValidationComplete: (value: boolean) => void
  setSuggestions: (suggestions: Suggestion[]) => void
  setReportUrl: (url: string) => void
  setReportGenerating: (value: boolean) => void
  setReportProgress: (progress: number) => void
  addSharedLink: (link: SharedLink) => void
  setCurrentFlowStep: (step: AppState["currentFlowStep"]) => void
  reset: () => void
}

const initialState = {
  isAuthenticated: false,
  email: "",
  isNewRegistration: false,
  locale: "en-GB" as Locale,
  onboardingStep: 0,
  companyProfile: null,
  documents: [],
  diagnosisResult: null,
  diagnosisProgress: 0,
  checklistItems: [],
  validationComplete: false,
  suggestions: [],
  reportUrl: null,
  reportGenerating: false,
  reportProgress: 0,
  sharedLinks: [],
  currentFlowStep: "upload" as const,
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,

      setEmail: (email) => set({ email }),
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      setIsNewRegistration: (value) => set({ isNewRegistration: value }),
      setLocale: (locale) => set({ locale }),
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      setCompanyProfile: (profile) => set({ companyProfile: profile }),

      addDocument: (doc) =>
        set((state) => ({
          documents: [...state.documents, doc],
        })),
      updateDocument: (id, updates) =>
        set((state) => ({
          documents: state.documents.map((d) => (d.id === id ? { ...d, ...updates } : d)),
        })),
      removeDocument: (id) =>
        set((state) => ({
          documents: state.documents.filter((d) => d.id !== id),
        })),

      setDiagnosisResult: (result) => set({ diagnosisResult: result }),
      setDiagnosisProgress: (progress) => set({ diagnosisProgress: progress }),

      setChecklistItems: (items) => set({ checklistItems: items }),
      updateChecklistItem: (id, status) =>
        set((state) => ({
          checklistItems: state.checklistItems.map((item) => (item.id === id ? { ...item, status } : item)),
        })),
      setValidationComplete: (value) => set({ validationComplete: value }),

      setSuggestions: (suggestions) => set({ suggestions }),

      setReportUrl: (url) => set({ reportUrl: url }),
      setReportGenerating: (value) => set({ reportGenerating: value }),
      setReportProgress: (progress) => set({ reportProgress: progress }),

      addSharedLink: (link) =>
        set((state) => ({
          sharedLinks: [...state.sharedLinks, link],
        })),

      setCurrentFlowStep: (step) => set({ currentFlowStep: step }),

      reset: () => set(initialState),
    }),
    {
      name: "finbridge-storage",
    },
  ),
)
