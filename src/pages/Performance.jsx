import { useState, useMemo, useEffect, useRef } from 'react'
import { PerformanceSkeleton } from '../components/Skeletons'

// --- Mock Data --- 
const ACCOUNTS = [
  { id: 'all', label: 'All Accounts' },
  { id: '8829', label: 'XT Pro (#8829)' },
  { id: '3391', label: 'XT Standard (#3391)' },
]

const DATE_PRESETS = [
  { id: '3d', label: 'Last 3 days', days: 3 },
  { id: '7d', label: 'Last 7 days', days: 7 },
  { id: '30d', label: 'Last 30 days', days: 30 },
  { id: '3m', label: 'Last 3 months', days: 90 },
  { id: 'custom', label: 'Custom date' },
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const WEEK_DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

// Generate 28 mock orders for pagination testing
const generateMockHistory = () => {
  const assets = [
    { asset: 'XAU', pair: 'XAUUSD', name: 'Gold' },
    { asset: 'USD', pair: 'USDJPY', name: 'US Dollar / Yen' },
    { asset: 'EUR', pair: 'EURUSD', name: 'Euro' },
    { asset: 'GBP', pair: 'GBPUSD', name: 'British Pound' },
    { asset: 'US30', pair: 'US30', name: 'Wall Street 30' },
  ]
  const types = ['Buy', 'Sell']
  const accs = ['8829', '3391']
  
  const history = []
  let currentDate = new Date('2026-03-24T16:30:00')
  
  for (let i = 0; i < 28; i++) {
    const a = assets[i % assets.length]
    const type = types[Math.floor(Math.random() * types.length)]
    const acc = accs[Math.floor(Math.random() * accs.length)]
    const vol = (Math.random() * 5 + 0.1).toFixed(2)
    const pnl = (Math.random() * 2000 - 800)
    
    currentDate = new Date(currentDate.getTime() - Math.random() * 10000000)
    const openDate = new Date(currentDate.getTime() - Math.random() * 5000000)

    const formatDate = (d) => {
      const p = (n) => n.toString().padStart(2, '0')
      return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
    }

    history.push({
      id: `1089${i.toString().padStart(4, '0')}`,
      account: acc,
      openTime: formatDate(openDate),
      closeTime: formatDate(currentDate),
      rawCloseTime: currentDate.getTime(),
      rawCloseDate: new Date(currentDate),
      type: type,
      asset: a.asset,
      pair: a.pair,
      name: a.name,
      volume: parseFloat(vol),
      open: (Math.random() * 1000 + 1).toFixed(3),
      close: (Math.random() * 1000 + 1).toFixed(3),
      profit: pnl,
    })
  }
  return history.sort((a,b) => b.rawCloseTime - a.rawCloseTime)
}

const ORDER_HISTORY = generateMockHistory()

/* ── Mini Calendar Component ── */
function MiniCalendar({ selectedDate, onSelect, onCancel }) {
  const today = new Date()
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [picked, setPicked] = useState(selectedDate || today)

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDayOfWeek = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7

  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate()
  const trailingDays = Array.from({ length: firstDayOfWeek }, (_, i) => prevMonthDays - firstDayOfWeek + 1 + i)
  const currentDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const totalCells = trailingDays.length + currentDays.length
  const leadingDays = totalCells % 7 === 0 ? [] : Array.from({ length: 7 - (totalCells % 7) }, (_, i) => i + 1)

  const isToday = (day) => day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()
  const isPicked = (day) => day === picked.getDate() && viewMonth === picked.getMonth() && viewYear === picked.getFullYear()
  const isFuture = (day) => new Date(viewYear, viewMonth, day) > today

  const handlePrev = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const handleNext = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  return (
    <div className="bg-white rounded-2xl border border-outline-variant/10 shadow-xl p-5 w-[320px]" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrev} className="w-8 h-8 rounded-lg hover:bg-background flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined text-sm text-secondary">chevron_left</span>
        </button>
        <h4 className="text-sm font-bold text-on-surface">{MONTHS[viewMonth]} {viewYear}</h4>
        <button onClick={handleNext} className="w-8 h-8 rounded-lg hover:bg-background flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined text-sm text-secondary">chevron_right</span>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0 mb-1">
        {WEEK_DAYS.map(d => <div key={d} className="text-center text-[9px] font-bold text-secondary tracking-wider py-1">{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-0">
        {trailingDays.map(d => (
          <div key={`prev-${d}`} className="text-center text-xs text-secondary/30 py-2">{d}</div>
        ))}
        {currentDays.map(d => (
          <button
            key={d}
            disabled={isFuture(d)}
            onClick={() => setPicked(new Date(viewYear, viewMonth, d))}
            className={`text-center text-xs font-semibold py-2 rounded-lg transition-all
              ${isFuture(d) ? 'text-secondary/25 cursor-not-allowed' : 'hover:bg-background cursor-pointer'}
              ${isPicked(d) ? 'bg-primary text-white hover:bg-primary/90' : ''}
              ${isToday(d) && !isPicked(d) ? 'bg-dark text-white' : ''}
            `}
          >
            {d}
          </button>
        ))}
        {leadingDays.map(d => (
          <div key={`next-${d}`} className="text-center text-xs text-secondary/30 py-2">{d}</div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-outline-variant/10">
        <button onClick={onCancel} className="text-xs font-bold text-secondary hover:text-on-surface transition-colors px-4 py-2">Cancel</button>
        <button
          onClick={() => onSelect(picked)}
          className="text-xs font-bold bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all shadow-sm"
        >
          Set Date
        </button>
      </div>
    </div>
  )
}

export default function Performance() {
  const [selectedAccount, setSelectedAccount] = useState('all')
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [datePreset, setDatePreset] = useState('30d')
  const [showDateMenu, setShowDateMenu] = useState(false)
  const [showCalendar, setShowCalendar] = useState(null) // 'start' | 'end' | null
  const [customStart, setCustomStart] = useState(null)
  const [customEnd, setCustomEnd] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 8

  const dateMenuRef = useRef(null)
  const accountMenuRef = useRef(null)

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t) }, [])

  // Close date menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dateMenuRef.current && !dateMenuRef.current.contains(e.target)) {
        setShowDateMenu(false)
        setShowCalendar(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close account menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target)) {
        setShowAccountMenu(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Derived filtered data
  const filteredData = useMemo(() => {
    let data = [...ORDER_HISTORY]

    if (selectedAccount !== 'all') {
      data = data.filter(d => d.account === selectedAccount)
    }

    // Date filter
    const now = new Date()
    if (datePreset === 'custom') {
      if (customStart && customEnd) {
        const start = new Date(customStart); start.setHours(0, 0, 0, 0)
        const end = new Date(customEnd); end.setHours(23, 59, 59, 999)
        data = data.filter(d => d.rawCloseDate >= start && d.rawCloseDate <= end)
      }
    } else {
      const preset = DATE_PRESETS.find(p => p.id === datePreset)
      if (preset?.days) {
        const cutoff = new Date(now.getTime() - preset.days * 86400000)
        data = data.filter(d => d.rawCloseDate >= cutoff)
      }
    }

    data.sort((a, b) => b.rawCloseTime - a.rawCloseTime)
    return data
  }, [selectedAccount, datePreset, customStart, customEnd])

  // Aggregate metrics
  const { totalProfit, winRate, bestTrade, totalTrades } = useMemo(() => {
    let profit = 0
    let wins = 0
    let best = 0
    filteredData.forEach(d => {
      profit += d.profit
      if (d.profit > 0) wins++
      if (d.profit > best) best = d.profit
    })
    return {
      totalProfit: profit,
      winRate: filteredData.length ? ((wins / filteredData.length) * 100).toFixed(1) : 0,
      bestTrade: best,
      totalTrades: filteredData.length
    }
  }, [filteredData])

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredData.slice(start, start + itemsPerPage)
  }, [filteredData, currentPage])

  // Reset page on filter changes
  useMemo(() => {
    setCurrentPage(1)
  }, [selectedAccount, datePreset])

  const handlePrevPage = () => setCurrentPage(p => Math.max(1, p - 1))
  const handleNextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1))

  const activePresetLabel = DATE_PRESETS.find(p => p.id === datePreset)?.label || 'Last 30 days'
  const activeAccountLabel = ACCOUNTS.find(a => a.id === selectedAccount)?.label || 'All Accounts'

  const formatCustomDate = (d) => {
    if (!d) return null
    return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
  }

  if (loading) return <PerformanceSkeleton />

  return (
    <div className="w-full space-y-6 sm:space-y-8 pb-12 animate-fade-in relative z-10">
      
      {/* ─── Header ─── */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-secondary mb-2">
            <span className="text-[10px] font-bold tracking-widest uppercase">Analytics</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface">Performance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">Performance Analytics</h1>
        </div>
      </section>

      {/* ─── Filter Bar (Exness-style) ─── */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Account Selector Dropdown */}
        <div className="relative" ref={accountMenuRef}>
          <button
            onClick={() => { setShowAccountMenu(!showAccountMenu); setShowDateMenu(false); setShowCalendar(null) }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm border ${
              showAccountMenu ? 'bg-dark text-white border-dark' : 'bg-white text-on-surface border-outline-variant/20 hover:bg-background'
            }`}
          >
            <span className="material-symbols-outlined text-sm">account_circle</span>
            {activeAccountLabel}
            <span className="material-symbols-outlined text-sm">{showAccountMenu ? 'expand_less' : 'expand_more'}</span>
          </button>

          {showAccountMenu && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl border border-outline-variant/10 shadow-xl py-2 w-[220px]">
              {ACCOUNTS.map(acc => (
                <button
                  key={acc.id}
                  onClick={() => {
                    setSelectedAccount(acc.id)
                    setShowAccountMenu(false)
                  }}
                  className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center justify-between ${
                    selectedAccount === acc.id ? 'text-primary font-bold bg-primary/5' : 'text-on-surface hover:bg-background'
                  }`}
                >
                  {acc.label}
                  {selectedAccount === acc.id && <span className="material-symbols-outlined text-sm text-primary">check</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Preset Dropdown */}
        <div className="relative" ref={dateMenuRef}>
          <button
            onClick={() => { setShowDateMenu(!showDateMenu); setShowCalendar(null); setShowAccountMenu(false) }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm border ${
              showDateMenu ? 'bg-primary text-white border-primary' : 'bg-primary text-white border-primary hover:bg-primary/90'
            }`}
          >
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            {activePresetLabel}
            <span className="material-symbols-outlined text-sm">{showDateMenu ? 'expand_less' : 'expand_more'}</span>
          </button>

          {showDateMenu && (
            <div className="absolute top-full left-0 mt-2 z-50 flex gap-0">
              {/* Presets List */}
              <div className="bg-white rounded-2xl border border-outline-variant/10 shadow-xl py-2 w-[180px]">
                {DATE_PRESETS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      if (p.id === 'custom') {
                        setDatePreset('custom')
                        setShowCalendar('start')
                      } else {
                        setDatePreset(p.id)
                        setShowDateMenu(false)
                        setShowCalendar(null)
                        setCustomStart(null)
                        setCustomEnd(null)
                      }
                    }}
                    className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center justify-between ${
                      datePreset === p.id ? 'text-primary font-bold bg-primary/5' : 'text-on-surface hover:bg-background'
                    }`}
                  >
                    {p.label}
                    {p.id === 'custom' && <span className="material-symbols-outlined text-sm text-secondary">chevron_right</span>}
                  </button>
                ))}
              </div>

              {/* Calendar Flyout */}
              {showCalendar && (
                <div className="ml-2">
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 ml-1">
                    {showCalendar === 'start' ? 'Select start date' : 'Select end date'}
                  </p>
                  <MiniCalendar
                    selectedDate={showCalendar === 'start' ? customStart : customEnd}
                    onSelect={(date) => {
                      if (showCalendar === 'start') {
                        setCustomStart(date)
                        setShowCalendar('end')
                      } else {
                        setCustomEnd(date)
                        setShowCalendar(null)
                        setShowDateMenu(false)
                      }
                    }}
                    onCancel={() => { setShowCalendar(null); setShowDateMenu(false) }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Active custom date chip */}
        {datePreset === 'custom' && customStart && customEnd && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/5 border border-primary/15 text-xs font-bold text-primary">
            <span>{formatCustomDate(customStart)}</span>
            <span className="text-secondary">→</span>
            <span>{formatCustomDate(customEnd)}</span>
            <button onClick={() => { setDatePreset('30d'); setCustomStart(null); setCustomEnd(null) }} className="ml-1 hover:text-error transition-colors">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        )}
      </div>

      {/* Performance Master Overview (Pristine Light Theme) */}
      <section className="bg-white text-on-surface rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-[0_2px_18px_rgba(0,0,0,0.03)] border border-outline-variant/20 mb-6 md:mb-8 mt-6">
        <div className="relative z-10 flex flex-col md:flex-row gap-8 md:items-center justify-between">
          
          {/* Main Stat */}
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-secondary font-bold mb-1">Total Net Profit</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight tabular-nums text-emerald-600">
              {totalProfit >= 0 ? '+' : ''}${Math.abs(totalProfit).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h2>
            <div className="mt-4 flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100/50 text-emerald-600">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                Top 15% Performer
              </span>
              <span className="text-xs font-medium text-secondary">Across all accounts</span>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-20 bg-outline-variant/20 mx-6"></div>
          
          {/* Secondary Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 md:mr-8 border-t md:border-0 border-outline-variant/15 pt-6 md:pt-0">
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-secondary font-bold mb-1">Win Rate</p>
              <p className="text-xl sm:text-2xl font-bold tabular-nums text-on-surface">{winRate}%</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-secondary font-bold mb-1">Total Trades</p>
              <p className="text-xl sm:text-2xl font-bold tabular-nums text-on-surface">{totalTrades}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-secondary font-bold mb-1">Best Trade</p>
              <p className="text-xl sm:text-2xl font-bold tabular-nums text-emerald-600">
                +${bestTrade.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
          
        </div>
        
        {/* Background Visuals */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      </section>

      {/* Main List View (Ledger Table) */}
      <section className="bg-white rounded-xl border border-outline-variant/10 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        
        {/* List Header */}
        <div className="flex items-center justify-between p-5 border-b border-outline-variant/10">
          <div>
            <h2 className="text-base font-bold text-on-surface">Order History</h2>
            <p className="text-[11px] text-secondary mt-0.5">Comprehensive ledger of closed positions</p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant/10 shadow-sm">{activePresetLabel}</span>
        </div>

        {/* Flat List - Minimalist Tabular */}
        <div className="divide-y divide-outline-variant/10 flex-1 overflow-x-auto">
          {paginatedData.length > 0 ? (
            <div className="min-w-[800px]">
              {/* Header Row */}
              <div className="flex items-center px-6 py-3 bg-surface-container/20 text-[10px] uppercase tracking-widest font-bold text-secondary border-b border-outline-variant/10">
                <div className="w-[20%]">Asset / Order</div>
                <div className="w-[15%]">Volume</div>
                <div className="w-[25%]">Open / Close Time</div>
                <div className="w-[20%]">Open / Close Price</div>
                <div className="w-[20%] text-right pr-2">Net Result</div>
              </div>
              
              {/* Rows */}
              {paginatedData.map(order => (
                <div key={order.id} className="flex items-center px-6 py-4 hover:bg-surface-container/30 transition-colors group">
                  
                  {/* Pair & Type */}
                  <div className="w-[20%] pr-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-on-surface">{order.pair}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded uppercase tracking-widest font-bold ${order.type === 'Buy' ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'}`}>
                        {order.type}
                      </span>
                    </div>
                    <p className="text-[10px] text-secondary font-mono mt-1">ID: {order.id}</p>
                  </div>

                  {/* Volume */}
                  <div className="w-[15%] pr-4">
                    <p className="text-sm font-bold text-on-surface tabular-nums">{order.volume.toFixed(2)}</p>
                    <p className="text-[10px] text-secondary font-mono mt-1">XT #{order.account}</p>
                  </div>

                  {/* Times */}
                  <div className="w-[25%] pr-4 flex items-center gap-2">
                    <div>
                      <p className="text-xs font-mono text-on-surface">{order.openTime.split(' ')[0]}</p>
                      <p className="text-[10px] text-secondary font-mono">{order.openTime.split(' ')[1]}</p>
                    </div>
                    <span className="material-symbols-outlined text-[14px] text-outline-variant/40">arrow_forward</span>
                    <div>
                      <p className="text-xs font-mono text-on-surface">{order.closeTime.split(' ')[0]}</p>
                      <p className="text-[10px] text-secondary font-mono">{order.closeTime.split(' ')[1]}</p>
                    </div>
                  </div>

                  {/* Prices */}
                  <div className="w-[20%] pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold text-secondary tracking-wider w-8">OP</span>
                      <span className="text-xs font-mono text-on-surface">{order.open}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] uppercase font-bold text-secondary tracking-wider w-8">CP</span>
                      <span className="text-xs font-mono text-on-surface">{order.close}</span>
                    </div>
                  </div>

                  {/* Profit */}
                  <div className="w-[20%] flex justify-end">
                    <span className={`font-mono text-base font-bold ${
                      order.profit >= 0 ? 'text-emerald-600' : 'text-error'
                    }`}>
                      {order.profit >= 0 ? '+' : ''}${Math.abs(order.profit).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-4xl text-secondary/40 mb-3">manage_search</span>
              <h3 className="text-base font-bold text-on-surface">No records found</h3>
              <p className="text-sm text-secondary mt-1 max-w-sm">No historical data matches the current filters.</p>
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="bg-surface-container/20 border-t border-outline-variant/10 p-3 sm:px-5 flex items-center justify-between">
            <p className="text-xs font-medium text-secondary">
              Showing <span className="font-bold text-on-surface">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-on-surface">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of <span className="font-bold text-on-surface">{filteredData.length}</span> entries
            </p>
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-outline-variant/20 bg-white text-secondary hover:text-on-surface hover:bg-surface-container disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              
              <div className="px-3 text-xs font-bold text-secondary tabular-nums">
                Page {currentPage} of {totalPages}
              </div>

              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-outline-variant/20 bg-white text-secondary hover:text-on-surface hover:bg-surface-container disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        )}

      </section>

    </div>
  )
}
