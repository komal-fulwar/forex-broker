import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NOTIFICATIONS = [
  { id: 1, title: 'Withdrawal Processed', message: 'Your bank wire for $12,500 has settled.', time: '2h ago', type: 'success', icon: 'check_circle' },
  { id: 2, title: 'Margin Alert', message: 'XT Pro account margin level is at 145%.', time: '5h ago', type: 'warning', icon: 'warning' },
  { id: 3, title: 'New IB Client', message: 'A new client registered under your referral link.', time: '1d ago', type: 'info', icon: 'person_add' },
]

const SEARCH_RESULTS = [
  { group: 'Quick Actions', items: [{ icon: 'account_balance', text: 'Deposit Funds', link: '/deposit' }, { icon: 'currency_exchange', text: 'Transfer Internal', link: '/accounts' }] },
  { group: 'Navigation', items: [{ icon: 'security', text: 'Security Settings', link: '/security' }, { icon: 'manage_accounts', text: 'Profile Details', link: '/settings' }, { icon: 'receipt_long', text: 'Transactions Ledger', link: '/transactions' }] },
]

export default function Header({ searchPlaceholder = 'Search...', onMenuToggle }) {
  const [showNotifs, setShowNotifs] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showBalanceDropdown, setShowBalanceDropdown] = useState(false)
  const [hideBalance, setHideBalance] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  
  const notifRef = useRef(null)
  const searchRef = useRef(null)
  const balanceRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false)
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearch(false)
      if (balanceRef.current && !balanceRef.current.contains(e.target)) setShowBalanceDropdown(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="h-14 md:h-16 glass-header border-b border-outline-variant/10 flex items-center justify-between px-4 md:px-8 z-10 shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile Menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors -ml-1"
        >
          <span className="material-symbols-outlined text-xl">menu</span>
        </button>

        <div className="relative w-48 md:w-72 hidden sm:block" ref={searchRef}>
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg">search</span>
          <input
            className={`w-full bg-surface-container-low border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary transition-all outline-none ${showSearch ? 'ring-1 ring-primary/50 shadow-sm' : ''}`}
            placeholder={searchPlaceholder}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSearch(true)}
          />
          
          {/* Search Dropdown / Command Palette */}
          {showSearch && (
            <div className="absolute top-full left-0 mt-2 w-[calc(100vw-32px)] sm:w-full max-w-[400px] bg-white rounded-xl shadow-2xl border border-outline-variant/15 overflow-hidden z-[100] animate-fade-in">
              <div className="p-3 border-b border-outline-variant/10 bg-background/50">
                <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Try searching for "Deposit", "Security", or "Accounts"</p>
              </div>
              <div className="max-h-[60vh] overflow-y-auto no-scrollbar py-2">
                {SEARCH_RESULTS.map((group, idx) => (
                  <div key={idx} className="mb-2 last:mb-0">
                    <p className="px-4 py-1.5 text-[10px] uppercase tracking-widest text-secondary font-bold bg-background/50">{group.group}</p>
                    {group.items.filter(item => item.text.toLowerCase().includes(searchQuery.toLowerCase())).map((item, i) => (
                      <button 
                        key={i} 
                        className="w-full text-left px-4 py-2.5 hover:bg-surface-container-low flex items-center gap-3 transition-colors group/item"
                        onClick={() => { navigate(item.link); setShowSearch(false); setSearchQuery(''); }}
                      >
                        <span className="material-symbols-outlined text-[18px] text-secondary group-hover/item:text-primary transition-colors">{item.icon}</span>
                        <span className="text-sm font-medium text-on-surface">{item.text}</span>
                        <span className="material-symbols-outlined text-[16px] text-secondary/30 ml-auto group-hover/item:text-primary transition-colors">arrow_forward</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 md:gap-3">
        {/* Mobile search */}
        <button className="sm:hidden p-2 text-secondary hover:bg-surface-container-high rounded-full transition-colors flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>

        {/* Global Balance Dropdown */}
        <div className="relative" ref={balanceRef}>
          <button 
            onClick={() => setShowBalanceDropdown(!showBalanceDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 md:py-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors border border-outline-variant/10 shadow-sm"
          >
            <span className="material-symbols-outlined text-secondary text-[18px]">account_balance_wallet</span>
            <span className="font-bold text-on-surface text-sm">{hideBalance ? '******' : '10,045.15'} <span className="text-secondary text-xs">USD</span></span>
          </button>

          {showBalanceDropdown && (
            <div className="absolute top-full right-0 mt-3 w-[280px] sm:w-[320px] bg-white rounded-xl shadow-2xl border border-outline-variant/15 overflow-hidden z-[100] animate-fade-in origin-top-right">
              {/* Hide Balance Toggle */}
              <div className="p-4 flex items-center justify-between border-b border-outline-variant/10 bg-dark/5">
                <span className="text-sm font-medium text-on-surface">Hide balance</span>
                <button 
                  onClick={() => setHideBalance(!hideBalance)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${hideBalance ? 'bg-primary' : 'bg-secondary/30'}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${hideBalance ? 'translate-x-4' : 'translate-x-1'}`} />
                </button>
              </div>

              {/* Trading Account */}
              <div className="p-4 border-b border-outline-variant/5 hover:bg-surface-container/30 transition-colors group">
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-on-surface">{hideBalance ? '******' : '10,045.15'} <span className="text-sm text-secondary">USD</span></p>
                  </div>
                  <p className="text-sm text-secondary">Trading account</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <p className="text-xs text-secondary/60 font-mono">#249474882</p>
                    <button className="text-secondary/40 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[14px]">content_copy</span></button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setShowBalanceDropdown(false); navigate('/accounts'); }} className="flex-1 bg-surface-container hover:bg-surface-container-high text-on-surface font-medium py-2 rounded-lg text-sm transition-colors border border-outline-variant/10">Transfer</button>
                  <button onClick={() => { setShowBalanceDropdown(false); navigate('/withdraw'); }} className="flex-1 bg-surface-container hover:bg-surface-container-high text-on-surface font-medium py-2 rounded-lg text-sm transition-colors border border-outline-variant/10">Withdraw</button>
                </div>
              </div>

              {/* Crypto Wallet */}
              <div className="p-4 border-b border-outline-variant/5 hover:bg-surface-container/30 transition-colors group">
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-on-surface">{hideBalance ? '******' : '0.00'} <span className="text-sm text-secondary">USD</span></p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-secondary">Crypto wallet</p>
                    <span className="bg-surface-container text-secondary text-[10px] font-bold px-1.5 py-0.5 rounded-full">8</span>
                  </div>
                  <p className="text-xs text-secondary/60 font-mono mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity absolute">View balances</p>
                </div>
                <button onClick={() => { setShowBalanceDropdown(false); navigate('/crypto'); }} className="w-full bg-surface-container hover:bg-surface-container-high text-on-surface font-medium py-2 rounded-lg text-sm transition-colors border border-outline-variant/10">Go to Wallet</button>
              </div>
            </div>
          )}
        </div>
        
        {/* Notifications */}
        <div className="relative flex items-center justify-center" ref={notifRef}>
          <button 
            className={`p-2 rounded-full transition-colors flex items-center justify-center ${showNotifs ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-surface-container-high'}`}
            onClick={() => setShowNotifs(!showNotifs)}
          >
            <span className="material-symbols-outlined text-[22px]" style={showNotifs ? { fontVariationSettings: "'FILL' 1" } : {}}>notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface-bright"></span>
          </button>
          
          {/* Notifications Dropdown Card */}
          {showNotifs && (
            <div className="absolute top-full right-0 mt-3 w-[320px] sm:w-[360px] bg-white rounded-xl shadow-2xl border border-outline-variant/15 overflow-hidden z-[100] animate-fade-in origin-top-right">
              <div className="p-4 border-b border-outline-variant/10 flex items-center justify-between bg-dark/5">
                <h3 className="font-bold text-on-surface">Notifications</h3>
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">3 New</span>
              </div>
              <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                {NOTIFICATIONS.map((notif) => (
                  <div key={notif.id} className="p-4 border-b border-outline-variant/5 hover:bg-surface-container/50 transition-colors cursor-pointer group flex gap-3 items-start">
                    <div className={`mt-0.5 shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${notif.type === 'success' ? 'bg-emerald-50 text-emerald-600' : notif.type === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-primary/10 text-primary'}`}>
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>{notif.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-on-surface">{notif.title}</p>
                      <p className="text-xs text-on-surface-variant line-clamp-2 mt-0.5 leading-relaxed">{notif.message}</p>
                      <p className="text-[10px] text-secondary mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 bg-background border-t border-outline-variant/10">
                <button className="w-full py-2 text-xs font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors" onClick={() => setShowNotifs(false)}>
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Global Settings Link */}
        <Link 
          to="/settings" 
          className="p-2 text-secondary hover:bg-surface-container-high hover:text-on-surface rounded-full transition-colors hidden md:flex items-center justify-center"
          title="Profile Settings"
        >
          <span className="material-symbols-outlined text-[22px]">settings</span>
        </Link>
      </div>
    </header>
  )
}
