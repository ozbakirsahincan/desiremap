'use client'

import { useState } from 'react'
import { Calendar, ChevronRight, Clock, Crown, LogIn, MapPin, Sparkles, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { mockAddresses, mockBadges, mockInvoices, mockVisits } from '@/data/mock-data'
import type { DashboardTab, DashboardUser } from '@/types'

const sidebarItems = [{ id: 'dashboard' as const, icon: <Sparkles className="w-5 h-5" />, label: 'Dashboard' }, { id: 'visits' as const, icon: <Clock className="w-5 h-5" />, label: 'Besuche' }, { id: 'addresses' as const, icon: <MapPin className="w-5 h-5" />, label: 'Adressen' }, { id: 'badges' as const, icon: <Crown className="w-5 h-5" />, label: 'Badges' }]

function DashboardSidebar({ activeTab, sidebarOpen, user, onTabChange, onLogout, onToggle }: { activeTab: DashboardTab; sidebarOpen: boolean; user: DashboardUser; onTabChange: (tab: DashboardTab) => void; onLogout: () => void; onToggle: () => void }) {
  return <aside className={cn('bg-[#0f0f14] border-r border-white/5 flex flex-col fixed left-0 top-0 bottom-0 z-40 transition-all', sidebarOpen ? 'w-[280px]' : 'w-20')}><div className="p-6 border-b border-white/5"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b1a4a] to-[#6b3fa0] flex items-center justify-center"><Sparkles className="w-5 h-5 text-white" /></div>{sidebarOpen && <div><span className="text-lg font-bold text-white">DESIREMAP</span><span className="text-gray-500 text-xs">.de</span></div>}</div></div><nav className="flex-1 p-4 space-y-2">{sidebarItems.map((item) => <button key={item.id} onClick={() => onTabChange(item.id)} className={cn('w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200', activeTab === item.id ? 'bg-linear-to-r from-[#8b1a4a]/20 to-[#6b3fa0]/20 text-white border border-[#8b1a4a]/30' : 'text-gray-400 hover:text-white hover:bg-white/5')}><span>{item.icon}</span>{sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}</button>)}</nav><div className="p-4 border-t border-white/5"><div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b1a4a] to-[#6b3fa0] flex items-center justify-center"><User className="w-5 h-5 text-white" /></div>{sidebarOpen && <div><p className="text-white font-medium text-sm truncate">{user.name}</p><p className="text-gray-500 text-xs truncate">{user.email}</p></div>}</div>{sidebarOpen && <Button onClick={onLogout} variant="outline" className="w-full border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"><LogIn className="w-4 h-4 mr-2 rotate-180" />Abmelden</Button>}</div><button onClick={onToggle} className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#8b1a4a] flex items-center justify-center text-white"><ChevronRight className={cn('w-4 h-4 transition-transform', sidebarOpen && 'rotate-180')} /></button></aside>
}

function DashboardContent({ activeTab, sidebarOpen }: { activeTab: DashboardTab; sidebarOpen: boolean }) {
  const contentMap: Record<DashboardTab, React.ReactNode> = {
    dashboard: <div className="space-y-6"><h1 className="text-2xl font-bold text-white">Mein Dashboard</h1><div className="grid grid-cols-3 gap-4">{[{ label: 'Besuche', value: mockVisits.length }, { label: 'Adressen', value: mockAddresses.length }, { label: 'Badges', value: mockBadges.length }].map((stat) => <div key={stat.label} className="bg-white/5 rounded-xl p-4"><div className="text-gray-400 text-sm mb-1">{stat.label}</div><div className="text-2xl font-bold text-white">{stat.value}</div></div>)}</div></div>,
    visits: <div className="space-y-4"><h1 className="text-2xl font-bold text-white">Meine Besuche</h1>{mockVisits.map((visit) => <div key={visit.id} className="bg-white/5 rounded-xl p-4"><div className="flex justify-between"><div><p className="text-white font-medium">{visit.bordellName}</p><p className="text-gray-500 text-sm">{visit.date}</p></div><div className="text-right"><p className="text-[#b76e79] font-bold">€{visit.price}</p></div></div></div>)}</div>,
    addresses: <div className="space-y-4"><h1 className="text-2xl font-bold text-white">Meine Adressen</h1>{mockAddresses.map((addr) => <div key={addr.id} className="bg-white/5 rounded-xl p-4"><p className="text-white font-medium">{addr.title}</p><p className="text-gray-400 text-sm">{addr.address}, {addr.city}</p></div>)}</div>,
    badges: <div className="space-y-4"><h1 className="text-2xl font-bold text-white">Meine Badges</h1><div className="grid grid-cols-2 gap-4">{mockBadges.map((badge) => <div key={badge.id} className="bg-white/5 rounded-xl p-4 flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-[#8b1a4a]/20 flex items-center justify-center text-xl">{badge.icon}</div><div><p className="text-white font-medium">{badge.name}</p><p className="text-gray-500 text-sm">{badge.description}</p></div></div>)}</div></div>
  }
  return <main className={cn('flex-1 transition-all duration-300 p-6', sidebarOpen ? 'ml-[280px]' : 'ml-20')}>{contentMap[activeTab]}</main>
}

type DashboardPageProps = { user: DashboardUser; onLogout: () => void }

export function DashboardPage({ user, onLogout }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      <DashboardSidebar activeTab={activeTab} sidebarOpen={sidebarOpen} user={user} onTabChange={setActiveTab} onLogout={onLogout} onToggle={() => setSidebarOpen((v) => !v)} />
      <DashboardContent activeTab={activeTab} sidebarOpen={sidebarOpen} />
    </div>
  )
}
