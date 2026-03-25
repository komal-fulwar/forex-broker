import { useState } from 'react'

export default function Accounts() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Trading Overview</p>
          <h1 className="text-4xl font-bold tracking-tight text-on-surface">Accounts</h1>
        </div>
        <button className="bg-gradient-to-b from-black to-[#141b2c] text-on-primary px-6 py-3 rounded-lg flex items-center gap-2 text-sm font-semibold hover:opacity-90 transition-all shadow-[0_4px_20px_rgba(11,28,48,0.04)]">
          <span className="material-symbols-outlined text-base">add</span>
          Open New Account
        </button>
      </header>

      {/* Account Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Real Account */}
        <div className="bg-surface-container-lowest shadow-[0_4px_20px_rgba(11,28,48,0.04)] rounded-xl p-6 flex flex-col justify-between min-h-[260px] outline outline-1 outline-outline-variant/20 group hover:outline-primary/20 transition-all relative">
          <div className="absolute top-5 right-5">
            <button onClick={() => setShowModal(true)} className="text-on-surface-variant/30 hover:text-on-surface transition-colors p-1">
              <span className="material-symbols-outlined text-lg">more_horiz</span>
            </button>
          </div>
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-0.5">
                <span className="text-[9px] uppercase tracking-widest text-on-surface-variant/50 font-bold">Standard Real</span>
                <h3 className="text-xl font-bold text-on-surface">MT5 Pro</h3>
                <p className="text-[11px] text-on-surface-variant">#8829-4401-229</p>
              </div>
              <div className="h-9 w-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary/80">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
              </div>
            </div>
          </div>
          <div className="mt-auto space-y-4">
            <div className="space-y-0.5">
              <p className="text-[10px] text-on-surface-variant font-medium">Available Balance</p>
              <p className="text-3xl font-bold text-on-surface tabular-nums">$42,890<span className="text-base text-on-surface-variant font-normal">.00</span></p>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-outline-variant/5">
              <button onClick={() => setShowModal(true)} className="flex-1 py-2 text-[11px] font-bold text-on-surface hover:bg-surface-container-low rounded-lg transition-colors border border-outline-variant/10">Manage</button>
              <button className="flex-1 py-2 text-[11px] font-bold text-on-primary bg-gradient-to-b from-black to-[#141b2c] rounded-lg transition-opacity">Deposit</button>
            </div>
          </div>
        </div>

        {/* Demo Account */}
        <div className="bg-surface-container-low/50 rounded-xl p-6 flex flex-col justify-between min-h-[260px] outline outline-1 outline-outline-variant/20 group hover:outline-secondary/20 transition-all relative">
          <div className="absolute top-5 right-5">
            <button className="text-on-surface-variant/30 hover:text-on-surface transition-colors p-1">
              <span className="material-symbols-outlined text-lg">more_horiz</span>
            </button>
          </div>
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-0.5">
                <span className="text-[9px] uppercase tracking-widest text-secondary/70 font-bold">Practice Demo</span>
                <h3 className="text-xl font-bold text-on-surface">MT4 Learning</h3>
                <p className="text-[11px] text-on-surface-variant">#1109-7721-DMO</p>
              </div>
              <div className="h-9 w-9 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary/80">
                <span className="material-symbols-outlined text-xl">rocket_launch</span>
              </div>
            </div>
          </div>
          <div className="mt-auto space-y-4">
            <div className="space-y-0.5">
              <p className="text-[10px] text-on-surface-variant font-medium">Virtual Equity</p>
              <p className="text-3xl font-bold text-on-surface tabular-nums">$100,000<span className="text-base text-on-surface-variant font-normal">.00</span></p>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-outline-variant/5">
              <button className="w-full py-2 text-[11px] font-bold text-on-surface hover:bg-surface-container-high rounded-lg transition-colors border border-outline-variant/10">Start Trading</button>
            </div>
          </div>
        </div>

        {/* Add Account */}
        <div className="bg-surface-container-lowest shadow-[0_4px_20px_rgba(11,28,48,0.04)] rounded-xl p-6 flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/20 text-center space-y-4 min-h-[260px] hover:border-outline-variant/40 transition-colors cursor-pointer group">
          <div className="h-12 w-12 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant/30 group-hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-3xl">add_circle</span>
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-on-surface">Diversify Portfolio</h4>
            <p className="text-[11px] text-on-surface-variant max-w-[160px] mx-auto leading-relaxed">Open a specialized ECN or Islamic account today.</p>
          </div>
          <button className="text-secondary font-bold text-[11px] hover:underline underline-offset-4 tracking-tight">Explore Options</button>
        </div>
      </div>

      {/* Secondary Info */}
      <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-on-surface leading-tight">Institutional grade execution for every account type.</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-lg font-bold text-on-surface">0.0 Pips</p>
              <p className="text-[11px] text-on-surface-variant">Raw spreads available on pro accounts.</p>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-bold text-on-surface">500:1</p>
              <p className="text-[11px] text-on-surface-variant">Flexible leverage options to suit your risk.</p>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low/40 rounded-xl p-8 relative overflow-hidden outline outline-1 outline-outline-variant/20">
          <div className="relative z-10">
            <p className="text-[9px] uppercase tracking-widest text-secondary font-bold mb-3">Security &amp; Trust</p>
            <p className="text-on-surface text-sm leading-relaxed font-medium">
              "Your funds are kept in segregated accounts at Tier-1 banks, fully protected by encryption and regulatory compliance."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-0.5 w-8 bg-secondary/40 rounded-full"></div>
              <span className="text-[10px] text-on-surface font-bold italic opacity-70">Regulatory Guarantee</span>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 opacity-[0.03]">
            <span className="material-symbols-outlined text-[140px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          </div>
        </div>
      </section>

      {/* Account Settings Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/20 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-surface-container-lowest shadow-[0_4px_20px_rgba(11,28,48,0.04)] rounded-xl w-full max-w-sm p-6 space-y-6 outline outline-1 outline-outline-variant/20 relative" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
              <h2 className="text-lg font-bold text-on-surface">Account Settings</h2>
              <button onClick={() => setShowModal(false)} className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Account Nickname</label>
                <input className="w-full bg-surface-container-low border-none rounded-lg text-sm font-semibold text-on-surface focus:ring-1 focus:ring-primary/20 p-2.5 outline-none" type="text" defaultValue="MT5 Pro" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Account Number</label>
                  <p className="text-sm font-semibold text-on-surface bg-surface-container-low/50 p-2.5 rounded-lg border border-outline-variant/10">#8829-4401-229</p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Server</label>
                  <p className="text-sm font-semibold text-on-surface bg-surface-container-low/50 p-2.5 rounded-lg border border-outline-variant/10">Editorial-Live</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Leverage</label>
                <select className="w-full bg-surface-container-low border-none rounded-lg text-sm font-semibold text-on-surface focus:ring-1 focus:ring-primary/20 p-2.5 outline-none">
                  <option>1:100</option>
                  <option>1:200</option>
                  <option selected>1:500</option>
                </select>
              </div>
            </div>
            <div className="pt-4 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 text-xs font-bold text-on-surface hover:bg-surface-container-low rounded-lg transition-colors border border-outline-variant/20">Cancel</button>
              <button className="flex-1 py-2.5 text-xs font-bold text-on-primary bg-gradient-to-b from-black to-[#141b2c] rounded-lg transition-opacity">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
