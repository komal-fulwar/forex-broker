import { useState } from 'react'

export default function Accounts() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Header */}
      <header className="mb-4 sm:mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 md:gap-6">
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-secondary font-bold">Trading Overview</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-on-surface">Accounts</h1>
        </div>
        <button className="bg-primary text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 w-full sm:w-auto">
          <span className="material-symbols-outlined text-sm sm:text-base">add</span>
          Open New Account
        </button>
      </header>

      {/* Account Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {/* Real Account */}
        <div className="bg-white shadow-sm rounded-xl p-4 sm:p-5 md:p-6 flex flex-col justify-between min-h-[200px] sm:min-h-[240px] md:min-h-[260px] border border-outline-variant/10 group hover:border-primary/20 transition-all relative overflow-hidden">
          <div className="absolute top-3 sm:top-4 md:top-5 right-3 sm:right-4 md:right-5 z-10">
            <button onClick={() => setShowModal(true)} className="text-on-surface-variant/30 hover:text-on-surface transition-colors p-1">
              <span className="material-symbols-outlined text-base sm:text-lg">more_horiz</span>
            </button>
          </div>
          <div>
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="space-y-0.5">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-primary/50 font-bold">Standard Real</span>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-on-surface">MT5 Pro</h3>
                <p className="text-[10px] sm:text-[11px] text-on-surface-variant">#8829-4401-229</p>
              </div>
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-lg sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
              </div>
            </div>
          </div>
          <div className="mt-auto space-y-3 sm:space-y-4 relative z-10">
            <div className="space-y-0.5">
              <p className="text-[9px] sm:text-[10px] text-on-surface-variant font-medium">Available Balance</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-on-surface tabular-nums">$42,890<span className="text-xs sm:text-sm md:text-base text-on-surface-variant font-normal">.00</span></p>
            </div>
            <div className="flex items-center gap-2 pt-3 sm:pt-4 border-t border-outline-variant/5">
              <button onClick={() => setShowModal(true)} className="flex-1 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-bold text-on-surface hover:bg-background rounded-lg transition-colors border border-outline-variant/10">Manage</button>
              <button className="flex-1 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-all">Deposit</button>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 opacity-[0.03] pointer-events-none">
            <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
          </div>
        </div>

        {/* Demo Account */}
        <div className="bg-background rounded-xl p-4 sm:p-5 md:p-6 flex flex-col justify-between min-h-[200px] sm:min-h-[240px] md:min-h-[260px] border border-outline-variant/10 group hover:border-primary/10 transition-all relative overflow-hidden">
          <div className="absolute top-3 sm:top-4 md:top-5 right-3 sm:right-4 md:right-5 z-10">
            <button className="text-on-surface-variant/30 hover:text-on-surface transition-colors p-1">
              <span className="material-symbols-outlined text-base sm:text-lg">more_horiz</span>
            </button>
          </div>
          <div>
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="space-y-0.5">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-secondary/70 font-bold">Practice Demo</span>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-on-surface">MT4 Learning</h3>
                <p className="text-[10px] sm:text-[11px] text-on-surface-variant">#1109-7721-DMO</p>
              </div>
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-white flex items-center justify-center text-secondary/80">
                <span className="material-symbols-outlined text-lg sm:text-xl">rocket_launch</span>
              </div>
            </div>
          </div>
          <div className="mt-auto space-y-3 sm:space-y-4 relative z-10">
            <div className="space-y-0.5">
              <p className="text-[9px] sm:text-[10px] text-on-surface-variant font-medium">Virtual Equity</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-on-surface tabular-nums">$100,000<span className="text-xs sm:text-sm md:text-base text-on-surface-variant font-normal">.00</span></p>
            </div>
            <div className="flex items-center gap-2 pt-3 sm:pt-4 border-t border-outline-variant/5">
              <button className="w-full py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-bold text-on-surface hover:bg-surface-container-high rounded-lg transition-colors border border-outline-variant/10">Start Trading</button>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 opacity-[0.03] pointer-events-none">
            <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
          </div>
        </div>

        {/* Add Account */}
        <div className="bg-white shadow-sm rounded-xl p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center border-2 border-dashed border-primary/15 text-center space-y-3 sm:space-y-4 min-h-[200px] sm:min-h-[240px] md:min-h-[260px] hover:border-primary/30 transition-colors cursor-pointer group">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/5 flex items-center justify-center text-primary/40 group-hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl sm:text-3xl">add_circle</span>
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-on-surface">Diversify Portfolio</h4>
            <p className="text-[10px] sm:text-[11px] text-on-surface-variant max-w-[160px] mx-auto leading-relaxed">Open a specialized ECN or Islamic account.</p>
          </div>
          <button className="text-primary font-bold text-[10px] sm:text-[11px] hover:underline underline-offset-4 tracking-tight">Explore Options</button>
        </div>
      </div>

      {/* Secondary Info */}
      <section className="mt-8 sm:mt-12 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-16 items-center">
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-on-surface leading-tight">Institutional grade execution for every account type.</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-base sm:text-lg font-bold text-primary">0.0 Pips</p>
              <p className="text-[10px] sm:text-[11px] text-on-surface-variant">Raw spreads on pro accounts.</p>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-base sm:text-lg font-bold text-primary">500:1</p>
              <p className="text-[10px] sm:text-[11px] text-on-surface-variant">Flexible leverage options.</p>
            </div>
          </div>
        </div>
        <div className="bg-background rounded-xl p-5 sm:p-6 md:p-8 relative overflow-hidden border border-outline-variant/10">
          <div className="relative z-10">
            <p className="text-[8px] sm:text-[9px] uppercase tracking-widest text-primary/60 font-bold mb-2 sm:mb-3">Security &amp; Trust</p>
            <p className="text-on-surface text-xs sm:text-sm leading-relaxed font-medium">
              "Your funds are kept in segregated accounts at Tier-1 banks, fully protected by encryption and regulatory compliance."
            </p>
            <div className="mt-4 sm:mt-6 flex items-center gap-2 sm:gap-3">
              <div className="h-0.5 w-6 sm:w-8 bg-primary/40 rounded-full"></div>
              <span className="text-[9px] sm:text-[10px] text-on-surface font-bold italic opacity-70">Regulatory Guarantee</span>
            </div>
          </div>
          <div className="absolute -right-4 sm:-right-6 -bottom-4 sm:-bottom-6 opacity-[0.03]">
            <span className="material-symbols-outlined text-[100px] sm:text-[120px] md:text-[140px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          </div>
        </div>
      </section>

      {/* Account Settings Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/20 backdrop-blur-sm p-3 sm:p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white shadow-lg rounded-xl w-full max-w-sm p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 md:space-y-6 border border-outline-variant/10 relative" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3 sm:pb-4">
              <h2 className="text-base sm:text-lg font-bold text-on-surface">Account Settings</h2>
              <button onClick={() => setShowModal(false)} className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg sm:text-xl">close</span>
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-1 sm:space-y-1.5">
                <label className="text-[9px] sm:text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Account Nickname</label>
                <input className="w-full bg-background border-none rounded-lg text-xs sm:text-sm font-semibold text-on-surface focus:ring-1 focus:ring-primary/20 p-2 sm:p-2.5 outline-none" type="text" defaultValue="MT5 Pro" />
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                <div className="space-y-1 sm:space-y-1.5">
                  <label className="text-[9px] sm:text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Account No.</label>
                  <p className="text-xs sm:text-sm font-semibold text-on-surface bg-background/50 p-2 sm:p-2.5 rounded-lg border border-outline-variant/10">#8829-4401</p>
                </div>
                <div className="space-y-1 sm:space-y-1.5">
                  <label className="text-[9px] sm:text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Server</label>
                  <p className="text-xs sm:text-sm font-semibold text-on-surface bg-background/50 p-2 sm:p-2.5 rounded-lg border border-outline-variant/10">Live</p>
                </div>
              </div>
              <div className="space-y-1 sm:space-y-1.5">
                <label className="text-[9px] sm:text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Leverage</label>
                <select className="w-full bg-background border-none rounded-lg text-xs sm:text-sm font-semibold text-on-surface focus:ring-1 focus:ring-primary/20 p-2 sm:p-2.5 outline-none">
                  <option>1:100</option>
                  <option>1:200</option>
                  <option selected>1:500</option>
                </select>
              </div>
            </div>
            <div className="pt-3 sm:pt-4 flex gap-2 sm:gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold text-on-surface hover:bg-background rounded-lg transition-colors border border-outline-variant/20">Cancel</button>
              <button className="flex-1 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-all">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
