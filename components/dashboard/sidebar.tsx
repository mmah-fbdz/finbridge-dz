"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Scale,
  Users,
  ArrowRightLeft,
  ListChecks,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Bell,
  Upload,
  TrendingUp,
  CreditCard,
  Truck,
  UserCheck,
  Wallet,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

const mainMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  {
    icon: Briefcase,
    label: "Business Module",
    href: "/business",
    hasSubmenu: true,
    submenu: [
      { icon: TrendingUp, label: "Financial Pulse", href: "/business/financial-pulse" },
      { icon: CreditCard, label: "Credit Monitor", href: "/business/credit-monitor" },
      { icon: Truck, label: "Supplier & Pay", href: "/business/supplier-pay" },
      { icon: UserCheck, label: "Client & Smart Credit", href: "/business/client-credit" },
      { icon: Wallet, label: "Payment Manager", href: "/business/payment-manager" },
    ],
  },
  { icon: Upload, label: "Upload Centre", href: "/upload" },
  { icon: FileText, label: "Loan Readiness", href: "/loan-readiness" },
  { icon: Scale, label: "Tender Readiness", href: "/tender-readiness" },
  { icon: Users, label: "Investor Readiness", href: "/investor-readiness" },
  { icon: ArrowRightLeft, label: "Cession/Transmission", href: "/cession" },
  { icon: ListChecks, label: "Listing Readiness", href: "/listing-readiness" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
]

const otherMenuItems = [
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help & Center", href: "/help" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { companyProfile } = useAppStore()
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label)
  }

  return (
    <aside className="w-56 bg-sidebar text-sidebar-foreground flex flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-wider text-sidebar-foreground">FINBRIDGE DZ</span>
          <FileText className="w-4 h-4 text-sidebar-foreground/60" />
        </div>
      </div>

      {/* Workspace Selector */}
      <div className="p-3">
        <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
          <div className="w-8 h-8 rounded-lg bg-[#0ea5e9] flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium flex-1 text-left">Workspace</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider px-3 mb-2">Main Menu</p>
        {mainMenuItems.map((item) => (
          <div key={item.href}>
            {item.hasSubmenu ? (
              <>
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                    pathname.startsWith(item.href)
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {expandedMenu === item.label ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {expandedMenu === item.label && item.submenu && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                          pathname === subItem.href
                            ? "bg-sidebar-accent text-sidebar-primary"
                            : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                        )}
                      >
                        <subItem.icon className="w-4 h-4" />
                        <span>{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  pathname === item.href
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1">{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Other Menu */}
      <div className="p-3 space-y-1">
        <p className="text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider px-3 mb-2">Other Menu</p>
        {otherMenuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
              pathname === item.href
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={companyProfile?.logo || "/placeholder.svg"} />
            <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
              {companyProfile?.name?.slice(0, 2).toUpperCase() || "AB"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{companyProfile?.name || "Amine Belkacem"}</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              {companyProfile?.email || "yourname@mail.com"}
            </p>
          </div>
          <ChevronDown className="w-4 h-4 text-sidebar-foreground/60" />
        </div>
      </div>
    </aside>
  )
}
