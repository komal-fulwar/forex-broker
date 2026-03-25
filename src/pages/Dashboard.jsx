export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto w-full space-y-4 sm:space-y-6 md:space-y-8">
      {/* Hero Section */}
      <section className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-8 sm:items-end">
        <div className="flex-1">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-secondary mb-1 sm:mb-2 font-semibold">Consolidated Portfolio</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-on-surface">
            $2,840,921<span className="text-sm sm:text-lg md:text-xl text-outline-variant">.42</span>
          </h2>
        </div>
        <div className="flex gap-4 sm:gap-6 md:gap-10 sm:border-l border-outline-variant/30 sm:pl-10 h-fit pb-1">
          <div>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-on-surface-variant mb-0.5 sm:mb-1">Total Gain</p>
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-on-surface">+12.4%</p>
          </div>
          <div>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-on-surface-variant mb-0.5 sm:mb-1">Monthly Gain</p>
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-on-surface">+$32,104</p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border border-outline-variant/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-on-surface-variant mb-0.5 sm:mb-1">Top Performer</p>
            <h4 className="text-base sm:text-xl md:text-2xl font-bold">Gold (Spot)</h4>
          </div>
          <div className="text-right">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-on-surface">+4.2%</p>
            <p className="text-[10px] sm:text-xs text-on-surface-variant">Past 24h</p>
          </div>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border border-outline-variant/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-on-surface-variant mb-0.5 sm:mb-1">Current Liquidity</p>
            <h4 className="text-base sm:text-xl md:text-2xl font-bold">USD Cash</h4>
          </div>
          <div className="text-right">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-on-surface">$412,000</p>
            <p className="text-[10px] sm:text-xs text-on-surface-variant">Ready to deploy</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {/* Partner Program + Pending + Activity */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6">
          {/* IB Partner Program */}
          <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border border-outline-variant/10 shadow-sm relative overflow-hidden"
            style={{
              backgroundImage: 'radial-gradient(at 0% 0%, rgba(20, 27, 44, 0.04) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(86, 94, 113, 0.03) 0px, transparent 50%)'
            }}>
            <div className="relative z-10">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-secondary mb-2 sm:mb-3 md:mb-4 font-bold">IB Opportunities</p>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-on-surface leading-tight mb-2 sm:mb-3 md:mb-4">Elite Partner Program</h3>
              <p className="text-on-surface-variant text-xs sm:text-sm mb-3 sm:mb-4 md:mb-6 max-w-md leading-relaxed">
                Expand your horizon with our professional Introducing Broker program. Scale your business with institutional-grade conditions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                {[
                  ['payments', 'Up to 40% Revenue Share'],
                  ['insights', 'Advanced Tracking Tools'],
                  ['support_agent', 'Dedicated VIP Support'],
                  ['speed', 'Real-time Payouts'],
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-2 sm:gap-3">
                    <span className="material-symbols-outlined text-secondary text-base sm:text-lg">{icon}</span>
                    <span className="text-[11px] sm:text-xs font-semibold text-on-surface">{text}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <button className="bg-primary text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl text-xs sm:text-sm font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                  Join Now
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
                <button className="bg-white/50 border border-outline-variant/20 backdrop-blur px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl text-xs sm:text-sm font-bold hover:bg-surface-container-low transition-all">
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Pending Actions */}
          <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border border-outline-variant/10 shadow-sm">
            <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-on-surface-variant">Pending Actions</p>
              <span className="px-1.5 sm:px-2 py-0.5 bg-error-container/30 text-error text-[9px] sm:text-[10px] font-bold rounded">2 ATTENTION</span>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between p-2.5 sm:p-3 md:p-4 bg-background rounded-lg sm:rounded-xl md:rounded-2xl border border-outline-variant/5">
                <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-error-container/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-error text-base sm:text-lg md:text-xl">id_card</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold truncate">Verify Identity (Level 2)</p>
                    <p className="text-[10px] sm:text-[11px] text-on-surface-variant hidden sm:block">Required for withdrawals over $100k</p>
                  </div>
                </div>
                <button className="text-[10px] sm:text-xs font-semibold text-secondary hover:underline px-2 shrink-0">Complete</button>
              </div>
              <div className="flex items-center justify-between p-2.5 sm:p-3 md:p-4 bg-background rounded-lg sm:rounded-xl md:rounded-2xl border border-outline-variant/5">
                <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-base sm:text-lg md:text-xl">mail</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold truncate">Confirm Email Address</p>
                    <p className="text-[10px] sm:text-[11px] text-on-surface-variant hidden sm:block">Last step to secure your account</p>
                  </div>
                </div>
                <button className="text-[10px] sm:text-xs font-semibold text-on-surface-variant/50 cursor-not-allowed px-2 shrink-0">Sent</button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border border-outline-variant/10 shadow-sm">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-on-surface-variant mb-3 sm:mb-4 md:mb-6">Recent Activity</p>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="material-symbols-outlined text-outline text-sm sm:text-base">arrow_downward</span>
                  <span className="text-[11px] sm:text-xs font-medium">Deposit via Wire Transfer</span>
                </div>
                <div className="text-right">
                  <p className="text-[11px] sm:text-xs font-bold">+$50,000.00</p>
                  <p className="text-[8px] sm:text-[9px] text-outline">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-outline-variant/10 pt-3 sm:pt-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="material-symbols-outlined text-outline text-sm sm:text-base">shopping_cart</span>
                  <span className="text-[11px] sm:text-xs font-medium">Bought 1.5 BTC</span>
                </div>
                <div className="text-right">
                  <p className="text-[11px] sm:text-xs font-bold">-$94,120.00</p>
                  <p className="text-[8px] sm:text-[9px] text-outline">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border border-outline-variant/10 shadow-sm flex flex-col h-fit lg:sticky lg:top-8">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-on-surface-variant mb-3 sm:mb-4 md:mb-6">Quick Actions</p>
          <div className="flex flex-col gap-2 sm:gap-3">
            {[
              ['add_card', 'Deposit Funds'],
              ['account_balance', 'Withdrawal'],
              ['person_add', 'Open New Account'],
            ].map(([icon, label]) => (
              <button key={label} className="w-full flex items-center justify-between px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 bg-background hover:bg-surface-container-low transition-colors rounded-lg sm:rounded-xl md:rounded-2xl border border-outline-variant/5 text-left group">
                <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4">
                  <span className="material-symbols-outlined text-base sm:text-lg md:text-xl text-on-surface-variant group-hover:text-primary transition-colors">{icon}</span>
                  <span className="text-xs sm:text-sm font-semibold">{label}</span>
                </div>
                <span className="material-symbols-outlined text-xs text-outline opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward_ios</span>
              </button>
            ))}
          </div>
          <div className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-outline-variant/10">
            <p className="text-[9px] sm:text-[10px] text-on-surface-variant italic opacity-60 text-center">Average processing time: 2-4 hours</p>
          </div>
        </div>
      </div>
    </div>
  )
}
