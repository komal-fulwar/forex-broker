import { useState, useEffect } from 'react'

const LEADS = [
  { id: 'L-8391', name: 'James T.', date: '2026-03-25', status: 'funded', volume: '$1.2M', tier: 'Tier 1' },
  { id: 'L-8390', name: 'Robert K.', date: '2026-03-24', status: 'registered', volume: '-', tier: 'Tier 1' },
  { id: 'L-8389', name: 'Alpha Quant Fund', date: '2026-03-21', status: 'funded', volume: '$8.5M', tier: 'Tier 1' },
  { id: 'L-8388', name: 'Michael C.', date: '2026-03-18', status: 'pending_kyc', volume: '-', tier: 'Tier 2' },
  { id: 'L-8385', name: 'Nexus Trading Group', date: '2026-03-15', status: 'funded', volume: '$420K', tier: 'Tier 1' },
]

export default function IBProgram() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  if (loading) {
    return (
      <div className="w-full p-6 animate-pulse space-y-8">
        <div className="h-12 w-64 skeleton rounded-lg"></div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-28 skeleton rounded-xl"></div>)}
        </div>
        <div className="h-64 skeleton rounded-xl"></div>
      </div>
    )
  }

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

      {/* Network Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10">
        {[
          ['Total Referrals', '142', 'group_add'],
          ['Active Traders', '89', 'monitoring'],
          ['Pending Commissions', '$4,250.00', 'pending'],
          ['Total Earned', '$82,400.50', 'payments', true],
        ].map(([label, value, icon, isPrimary], i) => (
          <div key={i} className={`rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border ${isPrimary ? 'bg-primary border-primary text-white relative overflow-hidden' : 'bg-white border-outline-variant/10 relative overflow-hidden'}`}>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <span className={`text-[9px] sm:text-[10px] uppercase tracking-widest font-bold ${isPrimary ? 'text-white/80' : 'text-primary/70'}`}>{label}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isPrimary ? 'bg-white/20' : 'bg-primary/8'}`}>
                <span className={`material-symbols-outlined text-base ${isPrimary ? 'text-white' : 'text-primary'}`}>{icon}</span>
              </div>
            </div>
            <p className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight relative z-10 ${isPrimary ? 'text-white' : 'text-on-surface'}`}>{value}</p>
            
            {/* Decorative background icon */}
            <div className="absolute -bottom-4 -right-2 z-0 pointer-events-none">
               <span className={`material-symbols-outlined text-[80px] sm:text-[100px] ${isPrimary ? 'text-white opacity-[0.1]' : 'text-primary opacity-[0.03]'}`} style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10">
        
        {/* Your Referral Link */}
        <section className="lg:col-span-8 bg-white rounded-xl p-5 sm:p-6 md:p-8 shadow-sm border border-outline-variant/10">
          <h3 className="text-sm sm:text-base font-bold text-on-surface mb-1">Your Institutional IB Link</h3>
          <p className="text-[10px] sm:text-[11px] text-secondary mb-5">Share this high-conversion landing page to onboard new clients to your network.</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input 
                type="text" 
                readOnly 
                value="https://brokerportal.com/register?ref=IB-AV-8829" 
                className="w-full bg-background border border-outline-variant/15 rounded-lg text-xs sm:text-sm font-medium text-on-surface p-3 outline-none"
              />
            </div>
            <button className="bg-primary text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm shrink-0">
              <span className="material-symbols-outlined text-sm sm:text-base">content_copy</span>
              Copy Link
            </button>
          </div>
        </section>

        {/* Commission Tiers */}
        <section className="lg:col-span-4 bg-white rounded-xl p-5 sm:p-6 md:p-8 shadow-sm border border-outline-variant/10 relative overflow-hidden">
          <h3 className="text-sm sm:text-base font-bold text-on-surface mb-4 relative z-10">Commission Structure</h3>
          <div className="space-y-3 relative z-10">
            {[
              ['Tier 1 (Direct)', '40% RevShare'],
              ['Tier 2 (Sub-IB)', '10% RevShare'],
              ['Tier 3 (Sub-IB)', '2% RevShare'],
            ].map(([tier, rev]) => (
              <div key={tier} className="flex items-center justify-between pb-3 border-b border-outline-variant/5 last:border-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span className="text-xs sm:text-sm font-medium text-on-surface">{tier}</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-primary">{rev}</span>
              </div>
            ))}
          </div>
          <div className="absolute -bottom-6 -right-6 z-0 pointer-events-none opacity-[0.03]">
             <span className="material-symbols-outlined text-[140px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_tree</span>
          </div>
        </section>
      </div>

      {/* Recent Leads Table */}
      <section className="bg-white rounded-xl border border-outline-variant/10 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 md:p-6 border-b border-outline-variant/10 flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-on-surface">Recent Conversions & Leads</h3>
            <p className="text-[10px] sm:text-[11px] text-secondary mt-1">Real-time tracking of your partnership network</p>
          </div>
          <button className="text-[10px] sm:text-xs font-bold text-primary hover:underline group flex items-center gap-1">
            View All
            <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/50 text-[9px] sm:text-[10px] uppercase tracking-widest text-secondary font-bold">
                <th className="p-4 font-bold border-b border-outline-variant/10">Lead ID</th>
                <th className="p-4 font-bold border-b border-outline-variant/10">Entity/Name</th>
                <th className="p-4 font-bold border-b border-outline-variant/10 hidden sm:table-cell">Date</th>
                <th className="p-4 font-bold border-b border-outline-variant/10">Level</th>
                <th className="p-4 font-bold border-b border-outline-variant/10 hidden md:table-cell">Est. Volume</th>
                <th className="p-4 font-bold border-b border-outline-variant/10">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-on-surface">
              {LEADS.map(lead => (
                <tr key={lead.id} className="hover:bg-background/50 transition-colors border-b border-outline-variant/5 last:border-0">
                  <td className="p-4 text-secondary font-mono text-[11px]">{lead.id}</td>
                  <td className="p-4 font-bold">{lead.name}</td>
                  <td className="p-4 text-secondary hidden sm:table-cell">{lead.date}</td>
                  <td className="p-4">
                    <span className="bg-surface-container px-2 py-1 rounded text-[10px] font-bold text-on-surface-variant">{lead.tier}</span>
                  </td>
                  <td className="p-4 hidden md:table-cell">{lead.volume}</td>
                  <td className="p-4">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                      lead.status === 'funded' ? 'bg-primary/10 text-primary' : 
                      lead.status === 'registered' ? 'bg-surface-container-high text-on-surface-variant' : 
                      'bg-error/10 text-error'
                    }`}>
                      {lead.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}
