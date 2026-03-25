export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto w-full space-y-8">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row gap-8 items-end">
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-secondary mb-2 font-semibold">Consolidated Portfolio</p>
          <h2 className="text-5xl font-bold tracking-tight text-on-surface">
            $2,840,921<span className="text-xl text-outline-variant">.42</span>
          </h2>
        </div>
        <div className="flex gap-10 border-l border-outline-variant/30 pl-10 h-fit pb-1">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Total Gain</p>
            <p className="text-2xl font-medium text-on-surface">+12.4%</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Monthly Gain</p>
            <p className="text-2xl font-medium text-on-surface">+$32,104</p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Top Performer</p>
            <h4 className="text-2xl font-bold">Gold (Spot)</h4>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-on-surface">+4.2%</p>
            <p className="text-xs text-on-surface-variant">Past 24h</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Current Liquidity</p>
            <h4 className="text-2xl font-bold">USD Cash</h4>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-on-surface">$412,000</p>
            <p className="text-xs text-on-surface-variant">Ready to deploy</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Partner Program + Pending + Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* IB Partner Program */}
          <div className="bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-sm relative overflow-hidden group"
            style={{
              backgroundImage: 'radial-gradient(at 0% 0%, rgba(117, 90, 38, 0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(20, 27, 44, 0.05) 0px, transparent 50%)'
            }}>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest text-secondary mb-4 font-bold">IB Opportunities</p>
                <h3 className="text-3xl font-bold text-on-surface leading-tight mb-4">Elite Partner Program</h3>
                <p className="text-on-surface-variant text-sm mb-6 max-w-md leading-relaxed">
                  Expand your horizon with our professional Introducing Broker program. Scale your business with institutional-grade conditions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    ['payments', 'Up to 40% Revenue Share'],
                    ['insights', 'Advanced Tracking Tools'],
                    ['support_agent', 'Dedicated VIP Support'],
                    ['speed', 'Real-time Payouts'],
                  ].map(([icon, text]) => (
                    <div key={text} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary text-lg">{icon}</span>
                      <span className="text-xs font-semibold text-on-surface">{text}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all flex items-center gap-2">
                    Join Now
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                  <button className="bg-white/50 border border-outline-variant/20 backdrop-blur px-6 py-3 rounded-xl text-sm font-bold hover:bg-surface-container-low transition-all">
                    View Program Details
                  </button>
                </div>
              </div>
              {/* IB Visual */}
              <div className="w-48 h-48 md:w-56 md:h-56 relative flex-shrink-0 hidden md:block">
                <div className="absolute inset-0 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors"></div>
                <div className="relative w-full h-full border border-outline-variant/10 rounded-full flex items-center justify-center bg-white shadow-xl">
                  <div className="w-[85%] h-[85%] border-2 border-dashed border-secondary/20 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-surface-container-highest rounded-lg shadow-sm flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary text-sm">group</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[64px] text-primary opacity-20">handshake</span>
                    <div className="absolute font-headline text-3xl font-black text-primary">IB</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Actions */}
          <div className="bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">Pending Actions</p>
              <span className="px-2 py-0.5 bg-secondary-container/30 text-secondary text-[10px] font-bold rounded">2 REQUIRES ATTENTION</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-[#F7F8FA] rounded-2xl border border-outline-variant/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-error-container/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-error text-[20px]">id_card</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Verify Identity (Level 2)</p>
                    <p className="text-[11px] text-on-surface-variant">Required for withdrawals over $100k</p>
                  </div>
                </div>
                <button className="text-xs font-semibold text-secondary hover:underline px-4">Complete</button>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#F7F8FA] rounded-2xl border border-outline-variant/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[20px]">mail</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Confirm Email Address</p>
                    <p className="text-[11px] text-on-surface-variant">Last step to secure your account</p>
                  </div>
                </div>
                <button className="text-xs font-semibold text-on-surface-variant/50 cursor-not-allowed px-4">Sent</button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-sm">
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-6">Recent Activity</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-outline text-[16px]">arrow_downward</span>
                  <span className="text-xs font-medium">Deposit via Wire Transfer</span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold">+$50,000.00</p>
                  <p className="text-[9px] text-outline">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-outline text-[16px]">shopping_cart</span>
                  <span className="text-xs font-medium">Bought 1.5 BTC</span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold">-$94,120.00</p>
                  <p className="text-[9px] text-outline">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-sm flex flex-col h-fit sticky top-8">
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-6">Quick Actions</p>
          <div className="flex flex-col gap-3">
            {[
              ['add_card', 'Deposit Funds'],
              ['account_balance', 'Withdrawal'],
              ['person_add', 'Open New Account'],
            ].map(([icon, label]) => (
              <button key={label} className="w-full flex items-center justify-between px-5 py-4 bg-[#F7F8FA] hover:bg-surface-container-low transition-colors rounded-2xl border border-outline-variant/5 text-left group">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">{icon}</span>
                  <span className="text-sm font-semibold">{label}</span>
                </div>
                <span className="material-symbols-outlined text-xs text-outline opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward_ios</span>
              </button>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-outline-variant/10">
            <p className="text-[10px] text-on-surface-variant italic opacity-60 text-center">Average processing time: 2-4 hours</p>
          </div>
        </div>
      </div>
    </div>
  )
}
