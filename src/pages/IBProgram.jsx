import { useState, useEffect } from 'react'
import { IBSkeleton } from '../components/Skeletons'

const LEADS = [
  { id: 'L-8391', name: 'James T.', date: '2026-03-25', status: 'funded', volume: '$1.2M', tier: 'Tier 1' },
  { id: 'L-8390', name: 'Robert K.', date: '2026-03-24', status: 'registered', volume: '-', tier: 'Tier 1' },
  { id: 'L-8389', name: 'Alpha Quant Fund', date: '2026-03-21', status: 'funded', volume: '$8.5M', tier: 'Tier 1' },
  { id: 'L-8388', name: 'Michael C.', date: '2026-03-18', status: 'pending_kyc', volume: '-', tier: 'Tier 2' },
  { id: 'L-8385', name: 'Nexus Trading Group', date: '2026-03-15', status: 'funded', volume: '$420K', tier: 'Tier 1' },
]

function CopyButton({ textToCopy }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button 
      onClick={handleCopy}
      className={`p-2.5 sm:p-3 rounded-xl transition-all shadow-sm shrink-0 flex items-center justify-center ${
        copied ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-primary text-white hover:bg-primary/90'
      }`}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
        {copied ? 'check' : 'content_copy'}
      </span>
    </button>
  )
}

export default function IBProgram() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  if (loading) return <IBSkeleton />

  return (
    <div className="w-full animate-fade-in">
      {/* Header */}
      <header className="mb-4 sm:mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 md:gap-6">
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-secondary font-bold">Partnerships</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-on-surface">IB Program</h1>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-outline-variant/20 text-on-surface px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold hover:bg-background transition-all shadow-sm">
            Marketing Resources
          </button>
          <button className="bg-dark text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold hover:bg-dark/90 transition-all shadow-sm">
            <span className="material-symbols-outlined text-sm sm:text-base">account_balance_wallet</span>
            Payout
          </button>
        </div>
      </header>

      {/* IB Master Overview (Accounts.jsx Structure but Distinct Emerald Aesthetic) */}
      <section className="bg-gradient-to-br from-emerald-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-emerald-800/50 mb-6 md:mb-8">
        <div className="relative z-10 flex flex-col md:flex-row gap-8 md:items-center justify-between">
          
          {/* Main Stat */}
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 font-bold mb-1">Total Partner Earnings</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight tabular-nums text-white">$82,400.50</h2>
            <div className="mt-4 flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs font-semibold bg-white/10 px-3 py-1.5 rounded-full border border-white/10 text-emerald-400">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                +12.4% vs last month
              </span>
              <span className="text-xs font-medium text-white/60">Tier 1 IB Verified</span>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-20 bg-white/10 mx-6"></div>
          
          {/* Secondary Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 md:mr-8 border-t md:border-0 border-white/10 pt-6 md:pt-0">
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-white/50 font-bold mb-1">Pending Payout</p>
              <p className="text-xl sm:text-2xl font-bold tabular-nums text-white">$4,250.00</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-white/50 font-bold mb-1">Total Referrals</p>
              <p className="text-xl sm:text-2xl font-bold tabular-nums text-white">142</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-white/50 font-bold mb-1">Active Traders</p>
              <p className="text-xl sm:text-2xl font-bold tabular-nums text-white">89</p>
            </div>
          </div>
          
        </div>
        
        {/* Background Visuals */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      </section>

      {/* Your Referral Credentials */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-outline-variant/15 flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6 md:mb-8">
        <div className="lg:w-1/3 shrink-0">
          <h3 className="text-base font-bold text-on-surface mb-1">Your Institutional Credentials</h3>
          <p className="text-xs text-secondary">Share your high-conversion link or unique code to onboard clients and track referrals.</p>
        </div>
        
        <div className="flex flex-col gap-3 w-full lg:w-2/3">
          {/* Link Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
            <span className="text-xs font-bold sm:w-10 text-secondary hidden sm:inline-block">Link:</span>
            <input 
              type="text" 
              readOnly 
              value="https://brokerportal.com/register?ref=IB-AV-8829"
              className="w-full bg-background border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-mono text-on-surface focus:outline-none"
            />
            <CopyButton textToCopy="https://brokerportal.com/register?ref=IB-AV-8829" />
          </div>
          {/* Code Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
            <span className="text-xs font-bold sm:w-10 text-secondary hidden sm:inline-block">Code:</span>
            <input 
              type="text" 
              readOnly 
              value="IB-AV-8829"
              className="w-full bg-background border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-mono text-on-surface focus:outline-none max-w-[200px]"
            />
            <CopyButton textToCopy="IB-AV-8829" />
          </div>
        </div>
      </section>

      <div className="mb-6 md:mb-8">

        {/* Lead Table */}
        <div className="bg-white rounded-2xl border border-outline-variant/15 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 sm:p-5 border-b border-outline-variant/10 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-on-surface">Recent Conversions & Leads</h3>
            <p className="text-xs text-secondary mt-0.5">Real-time tracking of your partnership network</p>
          </div>
          <button className="text-xs font-bold text-primary hover:underline group flex items-center gap-1">
            View All
            <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container/30 text-[10px] uppercase tracking-widest text-secondary font-bold border-b border-outline-variant/10">
                <th className="px-6 py-4 font-bold">Lead ID</th>
                <th className="px-6 py-4 font-bold">Entity/Name</th>
                <th className="px-6 py-4 font-bold hidden sm:table-cell">Date</th>
                <th className="px-6 py-4 font-bold">Level</th>
                <th className="px-6 py-4 font-bold hidden md:table-cell">Est. Volume</th>
                <th className="px-6 py-4 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-on-surface divide-y divide-outline-variant/5">
              {LEADS.map(lead => (
                <tr key={lead.id} className="hover:bg-surface-container/30 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono text-secondary bg-background px-2 py-1.5 rounded-md border border-outline-variant/10">{lead.id}</span>
                  </td>
                  <td className="px-6 py-4 font-bold flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary items-center justify-center text-xs font-bold hidden sm:flex shrink-0">
                      {lead.name.charAt(0)}
                    </div>
                    {lead.name}
                  </td>
                  <td className="px-6 py-4 text-xs text-secondary hidden sm:table-cell">{lead.date}</td>
                  <td className="px-6 py-4">
                    <span className="bg-background border border-outline-variant/10 px-2.5 py-1.5 rounded-md text-[10px] font-bold text-secondary uppercase tracking-wider">{lead.tier}</span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell font-mono text-xs">{lead.volume}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-md inline-flex items-center gap-1.5 ${
                      lead.status === 'funded' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 
                      lead.status === 'registered' ? 'bg-background text-secondary border border-outline-variant/20' : 
                      'bg-error/10 text-error border border-error/20'
                    }`}>
                      {lead.status === 'funded' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                      {lead.status === 'registered' && <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>}
                      {lead.status === 'pending_kyc' && <span className="w-1.5 h-1.5 rounded-full bg-error"></span>}
                      {lead.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    </div>
  )
}
