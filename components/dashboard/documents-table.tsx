"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Search, Filter, ArrowUpDown, FileText, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

interface Document {
  id: string
  category: string
  financialIntegrity: string
  completeness: string
  status: "completed" | "review"
}

const mockDocuments: Document[] = [
  { id: "1", category: "Balance Sheet FY2024", financialIntegrity: "A", completeness: "B", status: "completed" },
  { id: "2", category: "Tax Certificate", financialIntegrity: "D (Expired)", completeness: "C", status: "review" },
  { id: "3", category: "Company Statutes", financialIntegrity: "A", completeness: "A", status: "completed" },
  { id: "4", category: "NIF Registration", financialIntegrity: "A", completeness: "A", status: "completed" },
  { id: "5", category: "Audited Report", financialIntegrity: "B", completeness: "A", status: "review" },
]

const gradeColors: Record<string, string> = {
  A: "text-emerald-600",
  B: "text-[#1e3a5f]",
  C: "text-amber-600",
  D: "text-red-600",
  "D (Expired)": "text-red-600",
}

export function DocumentsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)

  return (
    <div className="bg-background border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="font-semibold text-foreground">Document Readiness Table</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search document..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-48 h-9"
            />
          </div>
          <Button variant="outline" size="sm" className="h-9 bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-9 bg-transparent">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Category</th>
              <th className="text-center text-sm font-medium text-muted-foreground px-4 py-3">Financial Integrity</th>
              <th className="text-center text-sm font-medium text-muted-foreground px-4 py-3">Completeness</th>
              <th className="text-center text-sm font-medium text-muted-foreground px-4 py-3">Status</th>
              <th className="text-center text-sm font-medium text-muted-foreground px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockDocuments.map((doc) => (
              <tr key={doc.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                      <FileText className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{doc.category}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={cn("text-sm font-medium", gradeColors[doc.financialIntegrity])}>
                    • {doc.financialIntegrity}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={cn("text-sm font-medium", gradeColors[doc.completeness])}>• {doc.completeness}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full",
                      doc.status === "completed" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700",
                    )}
                  >
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        doc.status === "completed" ? "bg-emerald-500" : "bg-red-500",
                      )}
                    />
                    {doc.status === "completed" ? "Completed" : "Review Required"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent" disabled>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {[1, 2, 3].map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="icon"
              className={cn("h-8 w-8", currentPage === page && "bg-[#1e3a5f]")}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <span className="text-sm text-muted-foreground">...</span>
          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
            10
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Showing 1 to 8 of 50 entries</span>
          <Select value={String(itemsPerPage)} onValueChange={(v) => setItemsPerPage(Number(v))}>
            <SelectTrigger className="w-24 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8">Show 8</SelectItem>
              <SelectItem value="16">Show 16</SelectItem>
              <SelectItem value="24">Show 24</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
