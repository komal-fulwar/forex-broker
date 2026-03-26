import { useState, useEffect } from 'react'
import { DepositSkeleton as WithdrawSkeleton } from '../components/Skeletons'

export default function Withdraw() {
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t) }, [])

  if (loading) return <WithdrawSkeleton />

  return (
    <div className="w-full animate-fade-in">
      {/* Breadcrumb */}
      <header className="mb-4 sm:mb-6 md:mb-10">
        <div className="flex items-center gap-2 text-secondary mb-1 sm:mb-2">
          <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">Finance</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-on-surface">Withdraw Funds</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-on-surface tracking-tight">Request Withdrawal</h1>
        <p className="text-secondary text-xs sm:text-sm mt-1">Select destination for your outgoing funds.</p>
      </header>

      {/* Step Indicator */}
      <div className="flex items-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12 border-b border-outline-variant/10 overflow-x-auto no-scrollbar">
        <div className="pb-3 flex items-center gap-1.5 border-b-2 border-dark text-on-surface shrink-0">
          <span className="text-[10px] sm:text-xs font-bold bg-dark text-white w-4 h-4 rounded-full flex items-center justify-center">1</span>
          <span className="text-[10px] sm:text-xs font-bold tracking-tight uppercase">Destination</span>
        </div>
        <div className="pb-3 text-secondary/40 flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] sm:text-xs font-bold border border-outline-variant w-4 h-4 rounded-full flex items-center justify-center">2</span>
          <span className="text-[10px] sm:text-xs font-bold tracking-tight uppercase">Amount</span>
        </div>
        <div className="pb-3 text-secondary/40 flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] sm:text-xs font-bold border border-outline-variant w-4 h-4 rounded-full flex items-center justify-center">3</span>
          <span className="text-[10px] sm:text-xs font-bold tracking-tight uppercase">2FA Auth</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-start">
        {/* Withdrawal Methods */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          <h3 className="text-[10px] sm:text-xs font-bold text-secondary uppercase tracking-widest mb-3 mb-4">Saved Destinations</h3>

          <div className="group relative overflow-hidden bg-white border-2 border-dark rounded-xl p-4 sm:p-5 cursor-pointer shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 sm:gap-4">
                <div className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-xl">account_balance</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-sm">JP Morgan Chase Bank</h4>
                  <p className="text-[10px] sm:text-xs text-secondary mt-0.5">Wire Transfer ending in **3942</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-dark shrink-0 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
          </div>

          <Method icon="currency_bitcoin" name="Cold Storage Wallet" desc="BTC Network: 1A1z...9g7v" />
          <Method icon="credit_card" name="Visa Corporate Card" desc="Refund to card ending in **1102" />
        </div>

        {/* Right Panel */}
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 border border-outline-variant/10 shadow-sm relative overflow-hidden">
            <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">Transfer Details</h3>
            <div className="space-y-4 relative z-10">
              <div>
                <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-2">Source Account</label>
                <select className="w-full bg-background border border-outline-variant/20 rounded-lg text-sm font-medium py-3 px-4 focus:ring-1 focus:ring-primary outline-none">
                  <option>Standard ECN (....9421) - USD</option>
                  <option>Managed Portfolio (....0034) - EUR</option>
                </select>
                <p className="text-[10px] text-secondary mt-1.5">Available Margin: <strong className="text-on-surface">$142,850.24</strong></p>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-2">Withdraw Amount</label>
                <div className="relative">
                  <input className="w-full bg-background border border-outline-variant/20 rounded-lg text-lg font-bold py-3 px-4 focus:ring-1 focus:ring-primary outline-none" placeholder="0.00" type="number" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-secondary">USD</span>
                </div>
              </div>
              <button className="w-full bg-dark text-white font-bold py-3 md:py-4 rounded-xl text-sm hover:bg-dark/90 transition-all shadow-sm">
                Request Transfer
              </button>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-[0.03] pointer-events-none">
              <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Method({ icon, name, desc }) {
  return (
    <div className="group bg-white hover:bg-background transition-all rounded-xl p-4 sm:p-5 cursor-pointer border border-outline-variant/10 relative overflow-hidden shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex gap-3 sm:gap-4">
          <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center shrink-0 border border-outline-variant/10">
            <span className="material-symbols-outlined text-dark text-xl">{icon}</span>
          </div>
          <div>
            <h4 className="font-bold text-on-surface text-sm">{name}</h4>
            <p className="text-[10px] sm:text-xs text-secondary mt-0.5">{desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
