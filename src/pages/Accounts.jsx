import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { AccountsSkeleton } from '../components/Skeletons'

const ACCOUNTS = [
  { id: 1, type: 'real', name: 'XT Pro', nickname: 'Primary Trading', number: '#8829-4401-229', login: '249474882', balance: 42890.00, equity: 45000.50, margin: 1200.00, floatingPL: 2110.50, bonusFunds: 0.00, currency: 'USD', server: 'xPert-Real16', leverage: '1:500', executionType: 'Market' },
  { id: 3, type: 'real', name: 'XT ECN', nickname: 'ECN Account', number: '#4420-1192-ECN', login: '249474891', balance: 218450.75, equity: 218450.75, margin: 0.00, floatingPL: 0.00, bonusFunds: 120.00, currency: 'USD', server: 'xPert-ECNLive8', leverage: '1:200', executionType: 'Market' },
  { id: 4, type: 'real', name: 'XT Swap-Free', nickname: 'Islamic Account', number: '#5501-3381-ISL', login: '249474903', balance: 34120.00, equity: 33800.00, margin: 500.00, floatingPL: -320.00, bonusFunds: 0.00, currency: 'EUR', server: 'xPert-Real16', leverage: '1:100', executionType: 'Instant' },
  { id: 6, type: 'real', name: 'XT Scalp', nickname: 'Scalping Pro', number: '#7731-0021-SCP', login: '249474915', balance: 89200.50, equity: 91000.00, margin: 2500.00, floatingPL: 1799.50, bonusFunds: 50.00, currency: 'GBP', server: 'xPert-ScalpLive4', leverage: '1:500', executionType: 'Market' },
  { id: 2, type: 'demo', name: 'XT Learning', nickname: 'Practice', number: '#1109-7721-DMO', login: '300012345', balance: 100000.00, equity: 100000.00, margin: 0.00, floatingPL: 0.00, bonusFunds: 0.00, currency: 'USD', server: 'xPert-DemoServer', leverage: '1:500', executionType: 'Market' },
  { id: 5, type: 'demo', name: 'XT Strategy', nickname: 'Strategy Test', number: '#6602-9921-DMO', login: '300012346', balance: 50000.00, equity: 48500.00, margin: 1000.00, floatingPL: -1500.00, bonusFunds: 0.00, currency: 'USD', server: 'xPert-DemoServer', leverage: '1:500', executionType: 'Market' },
]

const QUICK_ACTIONS = [
  { icon: 'candlestick_chart', label: 'Trade', color: 'bg-primary text-white' },
  { icon: 'south_west', label: 'Deposit', color: 'bg-emerald-50 text-emerald-600' },
  { icon: 'north_east', label: 'Withdraw', color: 'bg-surface-container-high text-on-surface-variant' },
  { icon: 'sync_alt', label: 'Transfer', color: 'bg-surface-container-high text-on-surface-variant' },
]

const LIVE_MENU_ITEMS = [
  { label: 'Adjust leverage' },
  { label: 'Add or edit nickname' },
  { label: 'Account information' },
  { label: 'Change trading password' },
  { label: 'Archive', danger: true },
]

const DEMO_MENU_ITEMS = [
  { label: 'Reset balance' },
  { label: 'Edit balance' },
  { label: 'Change nickname' },
  { label: 'Account information' },
  { label: 'Archive', danger: true },
]

function fmt(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function sym(c) { return c === 'EUR' ? '€' : c === 'GBP' ? '£' : '$' }

/* ── Account Options Dropdown ── */
function AccountOptionsMenu({ account, onClose, onInfoClick, onActionClick }) {
  const ref = useRef(null)
  const isDemo = account.type === 'demo'
  const menuItems = isDemo ? DEMO_MENU_ITEMS : LIVE_MENU_ITEMS

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div ref={ref} className="absolute right-0 top-full mt-1 z-50 bg-white rounded-2xl shadow-2xl border border-outline-variant/10 w-[260px] overflow-hidden animate-fade-in" onClick={e => e.stopPropagation()}>
      {/* Quick Actions Row — Live accounts only */}
      {!isDemo && (
        <div className="flex items-center justify-around p-4 border-b border-outline-variant/10">
          {QUICK_ACTIONS.map(a => (
            <button key={a.label} className="flex flex-col items-center gap-1.5 group" onClick={onClose}>
              <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${a.color} group-hover:scale-105 group-hover:shadow-md`}>
                <span className="material-symbols-outlined text-lg">{a.icon}</span>
              </div>
              <span className="text-[10px] font-semibold text-secondary group-hover:text-on-surface transition-colors">{a.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Menu Items */}
      <div className="py-1.5">
        {menuItems.map(item => (
          <button
            key={item.label}
            onClick={() => {
              if (item.label === 'Account information') {
                onInfoClick(account)
              } else {
                onActionClick(account, item.label)
              }
              onClose()
            }}
            className={`w-full text-left px-5 py-3 text-sm font-medium text-on-surface hover:bg-background transition-colors ${
              item.danger ? 'text-error/80 hover:text-error' : ''
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Account Information Modal ── */
function AccountInfoModal({ account, onClose }) {
  if (!account) return null

  const [copied, setCopied] = useState(null)

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(field)
    setTimeout(() => setCopied(null), 1500)
  }

  const infoRows = [
    { label: 'Nickname', value: account.nickname },
    { label: 'Type', value: account.name.replace('MT5 ', '').replace('MT4 ', '').replace('XT ', '') },
    { label: 'Actual leverage', value: account.leverage },
    { label: 'Adjust leverage', value: account.leverage },
    { label: 'Execution type', value: account.executionType, hasInfo: true },
    { label: 'Bonus funds', value: `${fmt(account.bonusFunds)} ${account.currency}` },
    { label: 'Balance', value: `${fmt(account.balance)} ${account.currency}` },
    { label: 'Floating P/L', value: `${fmt(account.floatingPL)} ${account.currency}`, highlight: account.floatingPL !== 0 },
    { label: 'Server', value: account.server, copyable: true },
    { label: 'Login', value: account.login, copyable: true },
  ]

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-dark/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in border border-outline-variant/10"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-on-surface tracking-tight">Account information</h2>
              <p className="text-sm text-secondary mt-1">Account: {account.number}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-background flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-xl text-secondary">close</span>
            </button>
          </div>
        </div>

        {/* Info Rows */}
        <div className="px-6">
          {infoRows.map((row, i) => (
            <div key={row.label} className={`flex items-center justify-between py-4 ${
              i !== infoRows.length - 1 ? 'border-b border-outline-variant/8' : ''
            }`}>
              <span className="text-sm text-secondary font-medium">{row.label}</span>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${
                  row.highlight && account.floatingPL > 0 ? 'text-emerald-600' :
                  row.highlight && account.floatingPL < 0 ? 'text-error' :
                  'text-on-surface'
                }`}>
                  {row.value}
                </span>
                {row.hasInfo && (
                  <span className="material-symbols-outlined text-sm text-secondary/50 cursor-help">info</span>
                )}
                {row.copyable && (
                  <button
                    onClick={() => copyToClipboard(row.value, row.label)}
                    className="w-7 h-7 rounded-md hover:bg-background flex items-center justify-center transition-all border border-outline-variant/10"
                    title={`Copy ${row.label}`}
                  >
                    <span className="material-symbols-outlined text-sm text-secondary">
                      {copied === row.label ? 'check' : 'content_copy'}
                    </span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 pt-4">
          <button onClick={onClose} className="w-full py-3 text-sm font-bold text-on-surface bg-background hover:bg-surface-container rounded-xl transition-all border border-outline-variant/10">
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

/* ── Main Accounts Page ── */
export default function Accounts() {
  const [loading, setLoading] = useState(true)
  const [openMenuId, setOpenMenuId] = useState(null)
  const [infoAccount, setInfoAccount] = useState(null)
  const [activeAction, setActiveAction] = useState(null)

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t) }, [])

  const liveAccounts = useMemo(() => ACCOUNTS.filter(a => a.type === 'real'), [])
  const demoAccounts = useMemo(() => ACCOUNTS.filter(a => a.type === 'demo'), [])

  const totalEquityUSD = useMemo(() => {
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

  if (loading) return <AccountsSkeleton />

  return (
    <div className="w-full animate-fade-in space-y-6 sm:space-y-8">
      {/* Page Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-on-surface">Accounts &amp; Portfolios</h1>
          <p className="text-secondary mt-1 text-xs sm:text-sm">Manage your trading accounts, monitor margins, and execute fund transfers.</p>
        </div>
        <Link to="/open-account" className="bg-primary text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-bold hover:bg-primary/90 transition-all shadow-sm w-full sm:w-auto">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Open Account
        </Link>
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
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
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
            <div key={account.id} className="bg-white rounded-xl border border-outline-variant/15 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6 group relative">
              {/* Account Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-on-surface">{account.name}</h3>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">Live</span>
                  </div>
                  <p className="text-xs font-mono text-secondary bg-background px-2 py-0.5 rounded border border-outline-variant/10 inline-block">{account.number}</p>
                </div>
                {/* Three-dot menu */}
                <div className="relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === account.id ? null : account.id)}
                    className="text-secondary hover:text-on-surface transition-colors p-1.5 rounded-lg hover:bg-background"
                  >
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                  {openMenuId === account.id && (
                    <AccountOptionsMenu
                      account={account}
                      onClose={() => setOpenMenuId(null)}
                      onInfoClick={(a) => setInfoAccount(a)}
                      onActionClick={(a, action) => setActiveAction({ account: a, action })}
                    />
                  )}
                </div>
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
              <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[120px] text-background opacity-50 select-none z-0" style={{fontVariationSettings: "'FILL' 1"}}>account_balance_wallet</span>
              </div>
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
                   <div className="relative">
                     <button
                       onClick={() => setOpenMenuId(openMenuId === account.id ? null : account.id)}
                       className="h-10 w-10 sm:h-11 sm:w-11 rounded-lg border border-outline-variant/20 flex items-center justify-center text-secondary hover:bg-background hover:text-on-surface transition-colors"
                       title="Options"
                     >
                       <span className="material-symbols-outlined text-[20px]">more_vert</span>
                     </button>
                     {openMenuId === account.id && (
                       <AccountOptionsMenu
                         account={account}
                         onClose={() => setOpenMenuId(null)}
                         onInfoClick={(a) => setInfoAccount(a)}
                         onActionClick={(a, action) => setActiveAction({ account: a, action })}
                       />
                     )}
                   </div>
                   <button className="h-10 px-4 sm:h-11 sm:px-5 bg-background border border-outline-variant/10 rounded-lg flex items-center justify-center text-on-surface text-xs font-bold hover:bg-surface-container transition-colors" title="Start WebTrader">
                     Launch
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Account Information Modal */}
      {infoAccount && <AccountInfoModal account={infoAccount} onClose={() => setInfoAccount(null)} />}
      
      {/* Action Modal for all other menu items */}
      {activeAction && (
        <ActionModal 
          account={activeAction.account} 
          action={activeAction.action} 
          onClose={() => setActiveAction(null)} 
          onConfirm={() => setActiveAction(null)} 
        />
      )}
    </div>
  )
}

function ActionModal({ account, action, onClose, onConfirm }) {
  const [val, setVal] = useState('')
  const [val2, setVal2] = useState('')

  useEffect(() => {
    if (action === 'Adjust leverage') setVal(account.leverage)
    if (action === 'Add or edit nickname' || action === 'Change nickname') setVal(account.nickname)
    if (action === 'Edit balance') setVal(account.balance)
  }, [action, account])

  const handleSubmit = (e) => {
    e.preventDefault()
    onConfirm()
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-dark/40 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-scale-in border border-outline-variant/10" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="p-6 pb-4 border-b border-outline-variant/10">
            <h2 className="text-xl font-bold text-on-surface tracking-tight">{action}</h2>
            <p className="text-sm text-secondary mt-1">For account {account.number}</p>
          </div>
          
          <div className="p-6 space-y-4">
            {action === 'Adjust leverage' && (
              <div>
                <label className="block text-xs font-bold text-on-surface mb-2">New Leverage</label>
                <select value={val} onChange={e => setVal(e.target.value)} className="w-full bg-white border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface outline-none">
                  <option>1:Unlimited</option>
                  <option>1:2000</option>
                  <option>1:1000</option>
                  <option>1:500</option>
                  <option>1:100</option>
                </select>
              </div>
            )}
            {(action === 'Add or edit nickname' || action === 'Change nickname') && (
              <div>
                <label className="block text-xs font-bold text-on-surface mb-2">Nickname</label>
                <input type="text" value={val} onChange={e => setVal(e.target.value)} className="w-full bg-white border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface outline-none autoFocus" />
              </div>
            )}
            {action === 'Change trading password' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-2">New Password</label>
                  <input type="password" value={val} onChange={e => setVal(e.target.value)} className="w-full bg-white border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-2">Confirm Password</label>
                  <input type="password" value={val2} onChange={e => setVal2(e.target.value)} className="w-full bg-white border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface outline-none" required />
                </div>
              </>
            )}
            {(action === 'Edit balance' || action === 'Reset balance') && (
              <div>
                <label className="block text-xs font-bold text-on-surface mb-2">Virtual Balance</label>
                <input type="number" value={action === 'Reset balance' ? 100000 : val} onChange={e => setVal(e.target.value)} className="w-full bg-white border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface outline-none" readOnly={action === 'Reset balance'} />
              </div>
            )}
            {action === 'Archive' && (
              <p className="text-sm text-on-surface">Are you sure you want to archive this account? It will be hidden from your main dashboard and trading will be suspended.</p>
            )}
          </div>

          <div className="p-6 pt-0 flex gap-3">
             <button type="button" onClick={onClose} className="flex-1 py-3 text-sm font-bold text-secondary bg-white rounded-xl border border-outline-variant/20 hover:bg-surface-container transition-all">Cancel</button>
             <button type="submit" className={`flex-1 py-3 text-sm font-bold text-white rounded-xl transition-all shadow-sm ${action === 'Archive' ? 'bg-error hover:bg-error/90' : 'bg-primary hover:bg-primary/90'}`}>
               {action === 'Archive' ? 'Archive' : 'Confirm'}
             </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  )
}
