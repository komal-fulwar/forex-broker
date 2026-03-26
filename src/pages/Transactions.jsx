import { useState, useEffect } from 'react'
import { SupportSkeleton } from '../components/Skeletons'

const TX_DATA = [
  { id: 'TX-9982', type: 'Deposit', method: 'Bank Wire Transfer', account: 'MT5 Pro (..229)', amount: '+$50,000.00', date: 'Mar 25, 2026', time: '14:32:01', status: 'Completed' },
  { id: 'TX-9981', type: 'Withdrawal', method: 'Cold Wallet (BTC)', account: 'Main Wallet', amount: '-$12,450.00', date: 'Mar 24, 2026', time: '09:15:22', status: 'Processing' },
  { id: 'TX-9980', type: 'Internal Transfer', method: 'Wallet to Trading', account: 'MT5 Pro (..229)', amount: '+$5,000.00', date: 'Mar 23, 2026', time: '18:45:10', status: 'Completed' },
  { id: 'TX-9979', type: 'Deposit', method: 'Corporate Card **1102', account: 'Main Wallet', amount: '+$2,500.00', date: 'Mar 21, 2026', time: '11:20:45', status: 'Completed' },
  { id: 'TX-9978', type: 'Withdrawal', method: 'Bank Wire Transfer', account: 'Main Wallet', amount: '-$100,000.00', date: 'Mar 18, 2026', time: '10:00:12', status: 'Rejected' },
  { id: 'TX-9977', type: 'Deposit', method: 'USDT (ERC-20)', account: 'Main Wallet', amount: '+$25,000.00', date: 'Mar 15, 2026', time: '16:40:00', status: 'Completed' },
  { id: 'TX-9976', type: 'Fee', method: 'Inactivity Fee', account: 'MT4 Demo', amount: '-$15.00', date: 'Mar 01, 2026', time: '00:00:00', status: 'Completed' },
]

export default function Transactions() {
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('all')

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  if (loading) return <SupportSkeleton />

  const filtered = tab === 'all' ? TX_DATA : TX_DATA.filter(t => {
    if (tab === 'in' && (t.type === 'Deposit' || t.amount.startsWith('+'))) return true;
    if (tab === 'out' && (t.type === 'Withdrawal' || t.type === 'Fee' || t.amount.startsWith('-'))) return true;
    return false;
  })

  return (
    <div className="w-full animate-fade-in">
      {/* Header */}
      <header className="mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-secondary mb-2">
            <span className="text-[10px] font-bold tracking-widest uppercase">Finance</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface">Transactions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-on-surface">Ledger History</h1>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-outline-variant/20 text-on-surface px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-background transition-all shadow-sm flex items-center gap-2 w-full sm:w-auto justify-center">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filter
          </button>
          <button className="bg-dark text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-bold hover:bg-dark/90 transition-all shadow-sm w-full sm:w-auto">
            <span className="material-symbols-outlined text-sm">download</span>
            Export CSV
          </button>
        </div>
      </header>

      {/* Metrics Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-8">
        {[
          { label: '30-Day Volume', value: '$1,284,500', icon: 'monitoring', color: 'text-primary' },
          { label: 'Total Inflow', value: '$840,000', icon: 'south_west', color: 'text-emerald-500' },
          { label: 'Total Outflow', value: '$444,500', icon: 'north_east', color: 'text-on-surface' }
        ].map((m, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-outline-variant/10 shadow-sm flex items-center gap-4 relative overflow-hidden">
             <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center shrink-0 z-10">
               <span className={`material-symbols-outlined ${m.color}`}>{m.icon}</span>
             </div>
             <div className="z-10 relative">
               <p className="text-[9px] uppercase tracking-widest font-bold text-secondary">{m.label}</p>
               <p className="text-xl font-bold tracking-tight text-on-surface">{m.value}</p>
             </div>
             {/* Subtle bg icon */}
             <div className="absolute -right-4 -bottom-4 opacity-[0.03] pointer-events-none">
               <span className="material-symbols-outlined text-[80px]" style={{fontVariationSettings: "'FILL' 1"}}>{m.icon}</span>
             </div>
          </div>
        ))}
      </div>

      {/* Main List View */}
      <section className="bg-white rounded-xl border border-outline-variant/10 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-outline-variant/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <nav className="flex items-center gap-1 bg-background p-1 rounded-lg w-fit">
            {[
              { id: 'all', label: 'All Transactions' },
              { id: 'in', label: 'Inflows Only' },
              { id: 'out', label: 'Outflows Only' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-md transition-all ${
                  tab === t.id ? 'bg-white text-on-surface shadow-sm border border-outline-variant/5' : 'text-secondary hover:text-on-surface'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined text-secondary text-sm absolute left-3 top-1/2 -translate-y-1/2">search</span>
            <input type="text" placeholder="Search TXID or amount..." className="w-full pl-9 pr-3 py-2 bg-background border border-outline-variant/15 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary/20" />
          </div>
        </div>

        {/* Ledger Rows */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map((tx, i) => (
            <div key={tx.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 hover:bg-background/40 transition-colors group cursor-pointer ${
              i !== filtered.length - 1 ? 'border-b border-outline-variant/5' : ''
            }`}>
              
              <div className="flex items-start sm:items-center gap-4 min-w-0">
                {/* Arrow Icon */}
                <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center shrink-0 ${
                  tx.amount.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-surface-container-high text-on-surface-variant'
                }`}>
                  <span className="material-symbols-outlined text-lg sm:text-xl">
                    {tx.amount.startsWith('+') ? 'south_east' : tx.type === 'Internal Transfer' ? 'sync_alt' : 'north_west'}
                  </span>
                </div>
                
                {/* Core Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm sm:text-base font-bold text-on-surface truncate">{tx.type} — {tx.method}</p>
                    {tx.status === 'Processing' && (
                       <span className="flex h-2 w-2 relative">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                       </span>
                    )}
                  </div>
                  <p className="text-[10px] sm:text-xs font-medium text-secondary truncate">
                    <span className="font-mono bg-background px-1.5 py-0.5 rounded border border-outline-variant/10 text-on-surface-variant">{tx.id}</span>
                    <span className="mx-2">•</span>
                    {tx.account}
                  </p>
                </div>
              </div>

              {/* Amount & Time */}
              <div className="mt-3 sm:mt-0 flex items-center justify-between sm:justify-end gap-6 sm:gap-8 ml-14 sm:ml-0">
                <div className="text-left sm:text-right">
                  <p className="text-[10px] sm:text-xs font-semibold text-secondary mb-0.5">{tx.date}</p>
                  <p className="text-[10px] font-mono text-secondary/60">{tx.time}</p>
                </div>
                
                <div className="text-right w-28 sm:w-32 flex flex-col items-end">
                  <p className={`text-sm sm:text-base font-bold tabular-nums mb-1 ${
                    tx.amount.startsWith('+') ? 'text-emerald-600' : 'text-on-surface'
                  }`}>{tx.amount}</p>
                  
                  <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow-sm border ${
                    tx.status === 'Completed' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 
                    tx.status === 'Processing' ? 'bg-primary border-primary text-white' : 
                    'bg-error/10 border-error/20 text-error'
                  }`}>
                    {tx.status}
                  </span>
                </div>
              </div>

            </div>
          ))}
          {filtered.length === 0 && (
             <div className="p-12 text-center flex flex-col items-center justify-center">
               <span className="material-symbols-outlined text-4xl text-secondary opacity-50 mb-3">manage_search</span>
               <p className="text-sm font-bold text-on-surface">No transactions found</p>
               <p className="text-xs text-secondary mt-1">Try adjusting your filters.</p>
             </div>
          )}
        </div>
      </section>
    </div>
  )
}
