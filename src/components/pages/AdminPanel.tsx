'use client'

import { useMemo, useState } from 'react'
import { BadgeEuro, Building2, Calendar, ChevronRight, Crown, Eye, LogIn, Shield, Sparkles, Star, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { adminBadges, adminBookings, adminCustomers, adminInvoices, adminReviews, bordells } from '@/data/mock-data'
import type { AdminTab } from '@/types'

const sidebarItems = [{ id: 'dashboard' as const, icon: <Sparkles className="w-5 h-5" />, label: 'Dashboard' }, { id: 'establishments' as const, icon: <Building2 className="w-5 h-5" />, label: 'Betriebe' }, { id: 'customers' as const, icon: <Users className="w-5 h-5" />, label: 'Kunden' }, { id: 'bookings' as const, icon: <Calendar className="w-5 h-5" />, label: 'Buchungen' }, { id: 'reviews' as const, icon: <Star className="w-5 h-5" />, label: 'Bewertungen' }, { id: 'badges' as const, icon: <Crown className="w-5 h-5" />, label: 'Badges' }, { id: 'invoices' as const, icon: <BadgeEuro className="w-5 h-5" />, label: 'Rechnungen' }, { id: 'settings' as const, icon: <Shield className="w-5 h-5" />, label: 'Einstellungen' }]

function AdminSidebar({ activeTab, sidebarOpen, onTabChange, onLogout, onToggle }: { activeTab: AdminTab; sidebarOpen: boolean; onTabChange: (tab: AdminTab) => void; onLogout: () => void; onToggle: () => void }) {
  return <aside className={cn('bg-[#0f0f14] border-r border-white/5 flex flex-col fixed left-0 top-0 bottom-0 z-40 transition-all', sidebarOpen ? 'w-[260px]' : 'w-20')}><div className="p-5 border-b border-white/5"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-linear-to-br from-red-600 to-orange-600 flex items-center justify-center"><Shield className="w-5 h-5 text-white" /></div>{sidebarOpen && <div><span className="text-sm font-bold text-white">ADMIN</span><span className="text-gray-500 text-xs block">DesireMap</span></div>}</div></div><nav className="flex-1 p-3 space-y-1">{sidebarItems.map((item) => <button key={item.id} onClick={() => onTabChange(item.id)} className={cn('w-full flex items-center gap-3 px-3 py-2.5 rounded-lg', activeTab === item.id ? 'bg-linear-to-r from-red-600/20 to-orange-600/20 text-white border border-red-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5')}><span>{item.icon}</span>{sidebarOpen && <span className="text-sm">{item.label}</span>}</button>)}</nav><div className="p-4 border-t border-white/5">{sidebarOpen && <Button onClick={onLogout} variant="outline" size="sm" className="w-full border-white/10 text-gray-300 hover:bg-white/5"><LogIn className="w-4 h-4 mr-2 rotate-180" /> Abmelden</Button>}</div><button onClick={onToggle} className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white"><ChevronRight className={cn('w-4 h-4 transition-transform', sidebarOpen && 'rotate-180')} /></button></aside>
}

function AdminDashboardContent({ activeTab, searchQuery, onSearchChange }: { activeTab: AdminTab; searchQuery: string; onSearchChange: (v: string) => void }) {
  const filteredBordells = useMemo(() => bordells.filter((item) => !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.city.toLowerCase().includes(searchQuery.toLowerCase())), [searchQuery])
  const filteredCustomers = useMemo(() => adminCustomers.filter((item) => !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.email.toLowerCase().includes(searchQuery.toLowerCase())), [searchQuery])
  return <div className="space-y-6"><h1 className="text-2xl font-bold text-white">Admin Dashboard</h1><div className="grid grid-cols-4 gap-4">{[{ label: 'Betriebe', value: bordells.length, icon: <Building2 /> }, { label: 'Kunden', value: adminCustomers.length, icon: <Users /> }, { label: 'Buchungen', value: adminBookings.length, icon: <Calendar /> }, { label: 'Umsatz', value: '€12.450', icon: <BadgeEuro /> }].map((stat) => <div key={stat.label} className="bg-white/5 rounded-xl p-4"><div className="flex items-center gap-3 text-gray-400 mb-2">{stat.icon}<span className="text-sm">{stat.label}</span></div><div className="text-2xl font-bold text-white">{stat.value}</div></div>)}</div>{activeTab === 'dashboard' && <div className="bg-white/5 rounded-xl p-6"><h2 className="text-lg font-semibold text-white mb-4">Letzte Aktivitaeten</h2><div className="space-y-3">{[{ text: 'Neue Buchung: Artemis FKK', time: 'vor 5 Min' }, { text: 'Bewertung: 5 Sterne fuer Pascha', time: 'vor 12 Min' }, { text: 'Neuer Kunde registriert', time: 'vor 1 Std' }].map((activity, i) => <div key={i} className="flex items-center justify-between py-2 border-b border-white/5"><span className="text-gray-300">{activity.text}</span><span className="text-gray-500 text-sm">{activity.time}</span></div>)}</div></div>}</div>
}

type AdminPanelProps = { onLogout: () => void }

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      <AdminSidebar activeTab={activeTab} sidebarOpen={sidebarOpen} onTabChange={setActiveTab} onLogout={onLogout} onToggle={() => setSidebarOpen((v) => !v)} />
      <main className={cn('flex-1 transition-all duration-300 p-6', sidebarOpen ? 'ml-[260px]' : 'ml-20')}><div className="mb-6"><Input placeholder="Suchen..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="max-w-xs bg-white/5 border-white/10 text-white" /></div><AdminDashboardContent activeTab={activeTab} searchQuery={searchQuery} onSearchChange={setSearchQuery} /></main>
    </div>
  )
}
