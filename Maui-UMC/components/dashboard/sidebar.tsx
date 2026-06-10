'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Users,
  PiggyBank,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react'

interface SidebarProps {
  open: boolean
  onToggle: () => void
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Wallet, label: 'Transactions', href: '/dashboard/transactions' },
  { icon: TrendingUp, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Users, label: 'Members', href: '/dashboard/members' },
  { icon: Wallet, label: 'Collections', href: '/dashboard/collections' },
  { icon: PiggyBank, label: 'Funds', href: '/dashboard/funds' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardSidebar({ open, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={`${
        open ? 'w-64' : 'w-20'
      } flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out`}
    >
      {/* Logo / Brand */}
      <div className="flex items-center justify-between gap-3 border-b border-border px-6 py-4">
        <div className={`flex items-center gap-2 ${!open && 'justify-center w-full'}`}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">CF</span>
          </div>
          {open && <span className="font-semibold text-foreground">CFMMS</span>}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2 px-3 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 transition-colors ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
              title={!open ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {open && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-3 py-4 space-y-2">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {open && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  )
}
