import { useState, useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { TransactionsSkeleton } from '../components/Skeletons'

/* ── Extended Mock Data ── */
const TX_DATA = [
  { id: 'TX-9982', invoiceId: '319701331973', type: 'Deposit', method: 'Bank Wire Transfer', from: 'JP Morgan Chase **3942', to: 'XT Pro (..229)', account: 'XT Pro (..229)', amount: '+$50,000.00', rawAmount: 50000, currency: 'USD', commission: '0.00', grossAmount: '50,000.00', date: 'Mar 25, 2026', time: '14:32:01', created: '25 March 2026, 14:32', executed: '25 March 2026, 14:32', status: 'Completed', rawDate: new Date('2026-03-25T14:32:01') },
  { id: 'TX-9981', invoiceId: '319701331972', type: 'Withdrawal', method: 'Cold Wallet (BTC)', from: 'Main Wallet', to: 'bc1q...7g9v', account: 'Main Wallet', amount: '-$12,450.00', rawAmount: -12450, currency: 'BTC', commission: '15.00', grossAmount: '12,465.00', date: 'Mar 24, 2026', time: '09:15:22', created: '24 March 2026, 09:15', executed: '24 March 2026, 09:18', status: 'Processing', rawDate: new Date('2026-03-24T09:15:22') },
  { id: 'TX-9980', invoiceId: '319701331971', type: 'Internal Transfer', method: 'Wallet to Trading', from: 'Main Wallet', to: 'XT Pro (..229)', account: 'XT Pro (..229)', amount: '+$5,000.00', rawAmount: 5000, currency: 'USD', commission: '0.00', grossAmount: '5,000.00', date: 'Mar 23, 2026', time: '18:45:10', created: '23 March 2026, 18:45', executed: '23 March 2026, 18:45', status: 'Completed', rawDate: new Date('2026-03-23T18:45:10') },
  { id: 'TX-9979', invoiceId: '319701331970', type: 'Deposit', method: 'Corporate Card **1102', from: 'Visa **1102', to: 'Main Wallet', account: 'Main Wallet', amount: '+$2,500.00', rawAmount: 2500, currency: 'USD', commission: '0.00', grossAmount: '2,500.00', date: 'Mar 21, 2026', time: '11:20:45', created: '21 March 2026, 11:20', executed: '21 March 2026, 11:21', status: 'Completed', rawDate: new Date('2026-03-21T11:20:45') },
  { id: 'TX-9978', invoiceId: '319701331969', type: 'Withdrawal', method: 'Bank Wire Transfer', from: 'Main Wallet', to: 'JP Morgan Chase **3942', account: 'Main Wallet', amount: '-$100,000.00', rawAmount: -100000, currency: 'USD', commission: '25.00', grossAmount: '100,025.00', date: 'Mar 18, 2026', time: '10:00:12', created: '18 March 2026, 10:00', executed: '—', status: 'Rejected', rawDate: new Date('2026-03-18T10:00:12'), rejectionReason: 'Insufficient free margin to process this withdrawal. Please review open positions.' },
  { id: 'TX-9977', invoiceId: '319701331968', type: 'Deposit', method: 'USDT (TRC-20)', from: 'Crypto Wallet (USDT TRC20)', to: 'Main Wallet', account: 'Main Wallet', amount: '+$25,000.00', rawAmount: 25000, currency: 'USDT', commission: '0.00', grossAmount: '25,000.00', date: 'Mar 15, 2026', time: '16:40:00', created: '15 March 2026, 16:40', executed: '15 March 2026, 16:42', status: 'Completed', rawDate: new Date('2026-03-15T16:40:00') },
  { id: 'TX-9976', invoiceId: '319701331967', type: 'Fee', method: 'Inactivity Fee', from: 'XT Demo', to: 'Platform', account: 'XT Demo', amount: '-$15.00', rawAmount: -15, currency: 'USD', commission: '0.00', grossAmount: '15.00', date: 'Mar 01, 2026', time: '00:00:00', created: '01 March 2026, 00:00', executed: '01 March 2026, 00:00', status: 'Completed', rawDate: new Date('2026-03-01T00:00:00') },
]

const DATE_PRESETS = [
  { id: '3d', label: 'Last 3 days', days: 3 },
  { id: '7d', label: 'Last 7 days', days: 7 },
  { id: '30d', label: 'Last 30 days', days: 30 },
  { id: '3m', label: 'Last 3 months', days: 90 },
  { id: 'custom', label: 'Custom date' },
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

/* ── Mini Calendar Component ── */
function MiniCalendar({ selectedDate, onSelect, onCancel }) {
  const today = new Date()
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [picked, setPicked] = useState(selectedDate || today)

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDayOfWeek = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7 // Mon=0

  // Previous month trailing days
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate()
  const trailingDays = Array.from({ length: firstDayOfWeek }, (_, i) => prevMonthDays - firstDayOfWeek + 1 + i)

  // Current month days
  const currentDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Next month leading days
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
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrev} className="w-8 h-8 rounded-lg hover:bg-background flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined text-sm text-secondary">chevron_left</span>
        </button>
        <h4 className="text-sm font-bold text-on-surface">{MONTHS[viewMonth]} {viewYear}</h4>
        <button onClick={handleNext} className="w-8 h-8 rounded-lg hover:bg-background flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined text-sm text-secondary">chevron_right</span>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-0 mb-1">
        {DAYS.map(d => <div key={d} className="text-center text-[9px] font-bold text-secondary tracking-wider py-1">{d}</div>)}
      </div>

      {/* Calendar grid */}
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

      {/* Actions */}
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

/* ── Transaction Detail Modal ── */
function TransactionDetail({ tx, onClose }) {
  if (!tx) return null

  const statusColor = tx.status === 'Completed' ? 'text-emerald-600 bg-emerald-50' :
                       tx.status === 'Processing' ? 'text-primary bg-primary/10' :
                       'text-error bg-error/10'

  const typeIcon = tx.type === 'Deposit' ? 'south_east' :
                   tx.type === 'Internal Transfer' ? 'sync_alt' :
                   tx.type === 'Fee' ? 'receipt_long' : 'north_west'

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-dark/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in border border-outline-variant/10"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-on-surface">{typeIcon}</span>
              <div>
                <h2 className="text-xl font-bold text-on-surface tracking-tight">{tx.type}</h2>
                <p className="text-xs text-secondary font-mono mt-0.5">Invoice ID {tx.invoiceId}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-background flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-xl text-secondary">close</span>
            </button>
          </div>
        </div>

        {/* Amount + Status */}
        <div className="px-6 pt-5 pb-5 flex items-center justify-between border-b border-outline-variant/10">
          <h3 className={`text-3xl font-bold tracking-tight ${tx.rawAmount >= 0 ? 'text-on-surface' : 'text-on-surface'}`}>
            {Math.abs(tx.rawAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            <span className="text-base font-semibold text-secondary ml-1.5">{tx.currency}</span>
          </h3>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${statusColor}`}>
            <span className={`w-2 h-2 rounded-full ${tx.status === 'Completed' ? 'bg-emerald-500' : tx.status === 'Processing' ? 'bg-primary' : 'bg-error'}`}></span>
            {tx.status === 'Completed' ? 'Done' : tx.status}
          </span>
        </div>

        {/* Rejection Reason (If applicable) */}
        {tx.status === 'Rejected' && tx.rejectionReason && (
          <div className="px-6 py-4 border-b border-outline-variant/10 bg-error/5 flex gap-3 items-start">
            <span className="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">info</span>
            <div>
              <p className="text-xs font-bold text-error mb-0.5">Transaction Rejected</p>
              <p className="text-xs text-error/80">{tx.rejectionReason}</p>
            </div>
          </div>
        )}

        {/* Transfer Flow */}
        <div className="px-6 py-5 border-b border-outline-variant/10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <span className="text-xs font-semibold text-secondary shrink-0">From</span>
              <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-[9px] font-black text-primary">BP</span>
              </div>
              <p className="text-sm font-bold text-on-surface truncate">{tx.from}</p>
            </div>
            <span className="material-symbols-outlined text-secondary/40 text-base shrink-0 mx-2">arrow_forward</span>
            <div className="flex items-center gap-2.5 min-w-0 flex-1 justify-end">
              <span className="text-xs font-semibold text-secondary shrink-0">To</span>
              <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-[9px] font-black text-primary">BP</span>
              </div>
              <p className="text-sm font-bold text-on-surface truncate">{tx.to}</p>
            </div>
          </div>
        </div>

        {/* Financial Details */}
        <div className="px-6 py-5 space-y-3 border-b border-outline-variant/10">
          <div className="flex justify-between">
            <span className="text-xs text-secondary font-medium">Commission</span>
            <span className="text-sm font-bold text-on-surface">{tx.commission} {tx.currency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-secondary font-medium">Gross Amount</span>
            <span className="text-sm font-bold text-on-surface">{tx.grossAmount} {tx.currency}</span>
          </div>
        </div>

        {/* Timestamps */}
        <div className="px-6 py-5 space-y-2.5 border-b border-outline-variant/10">
          <div className="flex justify-between">
            <span className="text-xs text-secondary font-medium">Created</span>
            <span className="text-sm font-bold text-on-surface">{tx.created}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-secondary font-medium">Executed</span>
            <span className="text-sm font-bold text-on-surface">{tx.executed}</span>
          </div>
        </div>

        {/* Support CTA */}
        <div className="px-6 py-5 flex justify-end">
          <button className="flex items-center gap-2 text-xs font-bold text-secondary hover:text-on-surface bg-background hover:bg-surface-container px-4 py-2.5 rounded-xl border border-outline-variant/15 transition-all">
            <span className="material-symbols-outlined text-sm">support_agent</span>
            Get support
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

/* ── Main Transactions Page ── */
export default function Transactions() {
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('all')
  const [selectedTx, setSelectedTx] = useState(null)

  // Date filter state
  const [datePreset, setDatePreset] = useState('30d')
  const [showDateMenu, setShowDateMenu] = useState(false)
  const [showCalendar, setShowCalendar] = useState(null) // 'start' | 'end' | null
  const [customStart, setCustomStart] = useState(null)
  const [customEnd, setCustomEnd] = useState(null)
  const dateMenuRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

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

  // Filter by type tab
  const tabFiltered = useMemo(() => {
    if (tab === 'all') return TX_DATA
    return TX_DATA.filter(t => {
      if (tab === 'in' && (t.type === 'Deposit' || t.rawAmount > 0)) return true
      if (tab === 'out' && (t.type === 'Withdrawal' || t.type === 'Fee' || t.rawAmount < 0)) return true
      return false
    })
  }, [tab])

  // Filter by date preset
  const filtered = useMemo(() => {
    const now = new Date()
    if (datePreset === 'custom') {
      if (customStart && customEnd) {
        const start = new Date(customStart); start.setHours(0, 0, 0, 0)
        const end = new Date(customEnd); end.setHours(23, 59, 59, 999)
        return tabFiltered.filter(t => t.rawDate >= start && t.rawDate <= end)
      }
      return tabFiltered
    }
    const preset = DATE_PRESETS.find(p => p.id === datePreset)
    if (!preset?.days) return tabFiltered
    const cutoff = new Date(now.getTime() - preset.days * 86400000)
    return tabFiltered.filter(t => t.rawDate >= cutoff)
  }, [tabFiltered, datePreset, customStart, customEnd])

  const activePresetLabel = DATE_PRESETS.find(p => p.id === datePreset)?.label || 'Last 30 days'

  const handleExportCSV = () => {
    if (!filtered || filtered.length === 0) return;
    const headers = ['ID', 'Type', 'Method', 'Account', 'From', 'To', 'Amount', 'Currency', 'Commission', 'Gross Amount', 'Date', 'Time', 'Status'];
    const csvRows = filtered.map(tx => {
      return [
        tx.id,
        tx.type,
        tx.method,
        `"${tx.account}"`,
        `"${tx.from || ''}"`,
        `"${tx.to || ''}"`,
        tx.rawAmount,
        tx.currency,
        tx.commission,
        `"${tx.grossAmount}"`,
        `"${tx.date}"`,
        `"${tx.time}"`,
        tx.status
      ].join(',');
    });
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `transactions_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <TransactionsSkeleton />

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
          <button onClick={handleExportCSV} className="bg-dark text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-bold hover:bg-dark/90 transition-all shadow-sm w-full sm:w-auto">
            <span className="material-symbols-outlined text-sm">download</span>
            Export CSV
          </button>
        </div>
      </header>

      {/* ── Filter Bar (Exness-style) ── */}
      <div className="flex flex-wrap items-center gap-3 mb-6 md:mb-8" ref={dateMenuRef}>
        {/* Date Preset Dropdown */}
        <div className="relative">
          <button
            onClick={() => { setShowDateMenu(!showDateMenu); setShowCalendar(null) }}
            className={`flex items-center gap-2 h-10 px-4 rounded-xl text-xs font-bold transition-all shadow-sm border ${
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
                  <MiniCalendar
                    selectedDate={showCalendar === 'start' ? customStart : customEnd}
                    onSelect={(date) => {
                      if (showCalendar === 'start') {
                        setCustomStart(date)
                        setShowCalendar('end')
                      } else {
                        setCustomEnd(date)
                        setShowDateMenu(false)
                        setShowCalendar(null)
                      }
                    }}
                    onCancel={() => { setShowCalendar(null) }}
                  />
                  <p className="text-center text-[10px] font-bold text-secondary mt-2 uppercase tracking-wider">
                    {showCalendar === 'start' ? 'Select start date' : 'Select end date'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Type Filter Chips */}
        <div className="flex items-center gap-1 h-10 bg-white border border-outline-variant/10 p-1 rounded-xl shadow-sm">
          {[
            { id: 'all', label: 'All types' },
            { id: 'in', label: 'Deposits' },
            { id: 'out', label: 'Withdrawals' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`h-full flex items-center justify-center text-[10px] sm:text-xs font-bold px-4 rounded-lg transition-all ${
                tab === t.id ? 'bg-dark text-white shadow-sm' : 'text-secondary hover:text-on-surface hover:bg-background'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Custom date indicator */}
        {datePreset === 'custom' && customStart && customEnd && (
          <div className="flex items-center gap-2 bg-white border border-outline-variant/10 px-3 py-2 rounded-xl shadow-sm text-xs font-semibold text-on-surface">
            <span className="material-symbols-outlined text-sm text-primary">date_range</span>
            {customStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {customEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            <button onClick={() => { setDatePreset('30d'); setCustomStart(null); setCustomEnd(null) }} className="ml-1 hover:text-error transition-colors">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        )}
      </div>

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
          <h2 className="text-base font-bold text-on-surface">
            {filtered.length} Transaction{filtered.length !== 1 ? 's' : ''}
          </h2>
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined text-secondary text-sm absolute left-3 top-1/2 -translate-y-1/2">search</span>
            <input type="text" placeholder="Search TXID or amount..." className="w-full pl-9 pr-3 py-2 bg-background border border-outline-variant/15 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary/20" />
          </div>
        </div>

        {/* Ledger Rows */}
        <div className="divide-y divide-outline-variant/10 flex-1 overflow-x-auto">
          {filtered.length > 0 ? (
            <div className="min-w-[900px]">
              {/* Header Row */}
              <div className="flex items-center px-6 py-3 bg-surface-container/20 text-[10px] uppercase tracking-widest font-bold text-secondary border-b border-outline-variant/10">
                <div className="w-[30%]">Transaction Details</div>
                <div className="w-[20%]">Account</div>
                <div className="w-[20%]">Date & Time</div>
                <div className="w-[15%] text-right pr-4">Status</div>
                <div className="w-[15%] text-right">Amount</div>
              </div>

              {/* Data Rows */}
              {filtered.map((tx) => (
                <div
                  key={tx.id}
                  onClick={() => setSelectedTx(tx)}
                  className="flex items-center px-6 py-4 hover:bg-surface-container/30 transition-colors group cursor-pointer"
                >
                  {/* Transaction Details */}
                  <div className="w-[30%] pr-4 flex items-center">
                    <div>
                      <p className="text-sm font-bold text-on-surface mb-0.5">{tx.type}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono text-secondary bg-background px-1.5 py-0.5 rounded border border-outline-variant/10">
                          {tx.id}
                        </span>
                        <span className="text-[11px] font-semibold text-secondary">{tx.method}</span>
                      </div>
                    </div>
                  </div>

                  {/* Account Context */}
                  <div className="w-[20%] pr-4">
                    <p className="text-sm font-bold text-on-surface truncate mb-0.5">{tx.account}</p>
                    <p className="text-[11px] font-semibold text-secondary truncate">
                      {tx.rawAmount > 0 ? `From: ${tx.from}` : `To: ${tx.to}`}
                    </p>
                  </div>

                  {/* Date & Time */}
                  <div className="w-[20%] pr-4">
                    <p className="text-sm font-bold text-on-surface mb-0.5">{tx.date}</p>
                    <div className="flex items-center gap-1.5 text-secondary">
                      <span className="material-symbols-outlined text-[12px]">schedule</span>
                      <p className="text-[11px] font-mono">{tx.time}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="w-[15%] pr-4 flex justify-end">
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                      tx.status === 'Completed' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                      tx.status === 'Processing' ? 'bg-primary/[0.05] border-primary/20 text-primary' :
                      'bg-error/10 border-error/20 text-error'
                    }`}>
                      {tx.status === 'Processing' && (
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                        </span>
                      )}
                      {tx.status}
                    </span>
                  </div>

                  {/* Amount  */}
                  <div className="w-[15%] text-right flex flex-col justify-center">
                    <p className={`text-base font-bold tabular-nums tracking-tight ${
                      tx.rawAmount > 0 ? 'text-emerald-600' : 'text-on-surface'
                    }`}>{tx.amount}</p>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="p-16 text-center flex flex-col items-center justify-center h-full">
               <span className="material-symbols-outlined text-4xl text-secondary opacity-50 mb-3">manage_search</span>
               <p className="text-base font-bold text-on-surface">No transactions found</p>
               <p className="text-sm text-secondary mt-1 max-w-sm">Try adjusting your filters or date range to find what you're looking for.</p>
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <TransactionDetail tx={selectedTx} onClose={() => setSelectedTx(null)} />
    </div>
  )
}
