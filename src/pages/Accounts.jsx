import { useState, useMemo, useEffect } from 'react'
import { AccountsSkeleton } from '../components/Skeletons'

const ACCOUNTS = [
  { id: 1, type: 'real', name: 'MT5 Pro', number: '#8829-4401-229', balance: 42890.00, equity: 45000.50, margin: 1200.00, currency: 'USD', server: 'Live-Server-1', leverage: '1:500' },
  { id: 3, type: 'real', name: 'MT5 ECN', number: '#4420-1192-ECN', balance: 218450.75, equity: 218450.75, margin: 0.00, currency: 'USD', server: 'ECN-Live', leverage: '1:200' },
  { id: 4, type: 'real', name: 'MT5 Swap-Free', number: '#5501-3381-ISL', balance: 34120.00, equity: 33800.00, margin: 500.00, currency: 'EUR', server: 'Live-Server-1', leverage: '1:100' },
  { id: 6, type: 'real', name: 'MT5 Scalp', number: '#7731-0021-SCP', balance: 89200.50, equity: 91000.00, margin: 2500.00, currency: 'GBP', server: 'Scalp-Live', leverage: '1:500' },
  { id: 2, type: 'demo', name: 'MT4 Learning', number: '#1109-7721-DMO', balance: 100000.00, equity: 100000.00, margin: 0.00, currency: 'USD', server: 'Demo-Server', leverage: '1:500' },
  { id: 5, type: 'demo', name: 'MT4 Strategy', number: '#6602-9921-DMO', balance: 50000.00, equity: 48500.00, margin: 1000.00, currency: 'USD', server: 'Demo-Server', leverage: '1:500' },
]

function fmt(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function sym(c) { return c === 'EUR' ? '€' : c === 'GBP' ? '£' : '$' }

export default function Accounts() {
  const [showModal, setShowModal] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t) }, [])

  const liveAccounts = useMemo(() => ACCOUNTS.filter(a => a.type === 'real'), [])
  const demoAccounts = useMemo(() => ACCOUNTS.filter(a => a.type === 'demo'), [])

  const totalEquityUSD = useMemo(() => {
    // Simplified conversion for demo purposes (1 EUR = 1.08 USD, 1 GBP = 1.25 USD)
    return liveAccounts.reduce((acc, a) => {
      let eq = a.equity;
      if (a.currency === 'EUR') eq *= 1.08;
      if (a.currency === 'GBP') eq *= 1.25;
      return acc + eq;
    }, 0)
  }, [liveAccounts])

  const totalMarginUSD = useMemo(() => {
    return liveAccounts.reduce((acc, a) => {
      let m = a.margin;
      if (a.currency === 'EUR') m *= 1.08;
      if (a.currency === 'GBP') m *= 1.25;
      return acc + m;
    }, 0)
  }, [liveAccounts])

  const openSettings = (account) => {
    setSelectedAccount(account)
    setShowModal(true)
  }

  if (loading) return <AccountsSkeleton />

  return (
    <div className="w-full animate-fade-in space-y-8 sm:space-y-10">
      {/* Page Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-on-surface">Accounts &amp; Portfolios</h1>
          <p className="text-secondary mt-1 text-xs sm:text-sm">Manage your trading accounts, monitor margins, and execute fund transfers.</p>
        </div>
        <button className="bg-primary text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-bold hover:bg-primary/90 transition-all shadow-sm w-full sm:w-auto">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Open Account
        </button>
      </header>

      {/* Portfolio Master Overview */}
      <section className="bg-dark text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-dark/50">
        <div className="relative z-10 flex flex-col md:flex-row gap-8 md:items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 font-bold mb-1">Total Live Equity (USD)</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight tabular-nums">${fmt(totalEquityUSD)}</h2>
            <div className="mt-4 flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs font-semibold bg-white/10 px-3 py-1.5 rounded-full border border-white/10 text-emerald-400">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                +$2,450.00 Today
              </span>
              <span className="text-xs font-medium text-white/60">{liveAccounts.length} Active Accounts</span>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-20 bg-white/10 mx-6"></div>
          
          <div className="grid grid-cols-2 gap-6 sm:gap-12 md:mr-8">
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-white/50 font-bold mb-1">Total Margin</p>
              <p className="text-xl sm:text-2xl font-bold tabular-nums">${fmt(totalMarginUSD)}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-white/50 font-bold mb-1">Free Margin</p>
              <p className="text-xl sm:text-2xl font-bold tabular-nums">${fmt(totalEquityUSD - totalMarginUSD)}</p>
            </div>
          </div>
        </div>
        {/* Decorative Grid BG */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      </section>

      {/* Live Accounts Section */}
      <section>
        <div className="mb-4 sm:mb-5 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">account_balance_wallet</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-on-surface">Live Accounts</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {liveAccounts.map(account => (
            <div key={account.id} className="bg-white rounded-xl border border-outline-variant/15 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6 group relative overflow-hidden">
              {/* Account Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-on-surface">{account.name}</h3>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">Live</span>
                  </div>
                  <p className="text-xs font-mono text-secondary bg-background px-2 py-0.5 rounded border border-outline-variant/10 inline-block">{account.number}</p>
                </div>
                <button onClick={() => openSettings(account)} className="text-secondary hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-background">
                  <span className="material-symbols-outlined text-[20px]">settings</span>
                </button>
              </div>

              {/* Financials Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-secondary font-semibold mb-0.5">Balance</p>
                  <p className="text-sm font-bold tabular-nums text-on-surface">{sym(account.currency)}{fmt(account.balance)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-secondary font-semibold mb-0.5">Equity</p>
                  <p className="text-sm font-bold tabular-nums text-on-surface">{sym(account.currency)}{fmt(account.equity)}</p>
                </div>
                <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-outline-variant/10 pt-3 sm:pt-0 sm:pl-4">
                   <p className="text-[10px] uppercase tracking-widest text-secondary font-semibold mb-0.5">Leverage</p>
                   <p className="text-sm font-bold text-on-surface">{account.leverage}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 sm:gap-3">
                <button className="flex-1 py-2 sm:py-2.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all shadow-sm">Deposit</button>
                <button className="flex-1 py-2 sm:py-2.5 bg-white border border-outline-variant/20 text-on-surface text-xs font-bold rounded-lg hover:bg-background transition-all shadow-sm">Withdraw</button>
                <button className="flex-1 py-2 sm:py-2.5 bg-white border border-outline-variant/20 text-on-surface text-xs font-bold rounded-lg hover:bg-background transition-all shadow-sm hidden sm:block">Transfer</button>
              </div>
              
              {/* Subtle watermark */}
              <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[120px] text-background opacity-50 pointer-events-none select-none z-0" style={{fontVariationSettings: "'FILL' 1"}}>account_balance_wallet</span>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Accounts Section */}
      <section className="pt-4">
        <div className="mb-4 sm:mb-5 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[18px]">science</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-on-surface">Demo &amp; Practice</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {demoAccounts.map(account => (
            <div key={account.id} className="bg-white rounded-xl border border-outline-variant/15 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base sm:text-lg font-bold text-on-surface truncate">{account.name}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant border border-outline-variant/10">Demo</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-secondary">
                  <span className="font-mono bg-background px-1.5 py-0.5 rounded border border-outline-variant/5 text-[10px]">{account.number}</span>
                  <span>•</span>
                  <span>{account.server}</span>
                  <span>•</span>
                  <span>{account.leverage}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-outline-variant/10">
                <div className="text-left sm:text-right">
                  <p className="text-[9px] uppercase tracking-widest text-secondary font-semibold mb-0.5">Virtual Equity</p>
                  <p className="text-lg font-bold tabular-nums text-on-surface">{sym(account.currency)}{fmt(account.equity)}</p>
                </div>
                
                <div className="flex gap-2">
                   <button onClick={() => openSettings(account)} className="h-10 w-10 sm:h-11 sm:w-11 rounded-lg border border-outline-variant/20 flex items-center justify-center text-secondary hover:bg-background hover:text-on-surface transition-colors" title="Settings">
                     <span className="material-symbols-outlined text-[20px]">settings</span>
                   </button>
                   <button className="h-10 px-4 sm:h-11 sm:px-5 bg-background border border-outline-variant/10 rounded-lg flex items-center justify-center text-on-surface text-xs font-bold hover:bg-surface-container transition-colors" title="Start WebTrader">
                     Launch
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Account Settings Modal */}
      {showModal && selectedAccount && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/40 backdrop-blur-sm p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white shadow-2xl rounded-2xl w-full max-w-sm p-6 sm:p-8 space-y-6 border border-outline-variant/10 relative transform transition-all" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-on-surface">Account Settings</h2>
                <p className="text-secondary text-xs mt-1">Manage configuration for {selectedAccount.name}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-secondary hover:text-error transition-colors bg-background rounded-full p-1.5 border border-outline-variant/10">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Account Nickname</label>
                <input className="w-full bg-background border border-outline-variant/20 rounded-lg text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 p-3 outline-none transition-all shadow-sm" type="text" defaultValue={selectedAccount.name} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Account Number</label>
                  <p className="text-sm font-semibold text-secondary bg-surface-container p-3 rounded-lg border border-outline-variant/10 truncate">{selectedAccount.number}</p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Server</label>
                  <p className="text-sm font-semibold text-secondary bg-surface-container p-3 rounded-lg border border-outline-variant/10 truncate">{selectedAccount.server}</p>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Leverage</label>
                <select className="w-full bg-background border border-outline-variant/20 rounded-lg text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 p-3 outline-none transition-all shadow-sm appearance-none cursor-pointer" defaultValue={selectedAccount.leverage}>
                  <option>1:100</option>
                  <option>1:200</option>
                  <option>1:500</option>
                </select>
                <p className="text-[10px] text-primary bg-primary/5 p-2 rounded border border-primary/10 flex items-center gap-1.5 mt-2">
                   <span className="material-symbols-outlined text-[12px]">info</span>
                   Leverage changes apply instantly for non-open positions.
                </p>
              </div>
            </div>
            
            <div className="pt-6 flex gap-3 border-t border-outline-variant/10">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 text-xs font-bold text-on-surface hover:bg-background rounded-lg transition-colors border border-outline-variant/20">Cancel</button>
              <button className="flex-1 py-3 text-xs font-bold text-white bg-dark rounded-lg hover:bg-dark/90 transition-all shadow-sm">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
