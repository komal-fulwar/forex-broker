export default function Deposit() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <header className="mb-4 sm:mb-6 md:mb-10">
        <div className="flex items-center gap-2 text-secondary mb-1 sm:mb-2">
          <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">Funding</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-primary">Deposit Funds</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-on-surface tracking-tight">Add Liquidity</h1>
        <p className="text-secondary text-xs sm:text-sm mt-1">Select your preferred method to fund your institutional account.</p>
      </header>

      {/* Step Indicator */}
      <div className="flex items-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12 border-b border-outline-variant/10 overflow-x-auto no-scrollbar">
        <div className="pb-3 sm:pb-4 flex items-center gap-1.5 sm:gap-2 border-b-2 border-primary text-primary shrink-0">
          <span className="text-[10px] sm:text-xs font-bold bg-primary text-on-primary w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">1</span>
          <span className="text-[10px] sm:text-xs font-bold tracking-tight uppercase">Method</span>
        </div>
        <div className="pb-3 sm:pb-4 text-secondary/40 flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="text-[10px] sm:text-xs font-bold border border-outline-variant w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">2</span>
          <span className="text-[10px] sm:text-xs font-bold tracking-tight uppercase">Details</span>
        </div>
        <div className="pb-3 sm:pb-4 text-secondary/40 flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="text-[10px] sm:text-xs font-bold border border-outline-variant w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">3</span>
          <span className="text-[10px] sm:text-xs font-bold tracking-tight uppercase">Confirm</span>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-start">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          <h3 className="text-[10px] sm:text-xs font-bold text-secondary uppercase tracking-widest mb-3 sm:mb-4 md:mb-6">Payment Options</h3>

          {/* Visa - Active */}
          <div className="group relative overflow-hidden bg-white border-2 border-primary rounded-xl p-3.5 sm:p-4 md:p-5 cursor-pointer shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex gap-2.5 sm:gap-3 md:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-primary/5 rounded-lg flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-lg sm:text-xl md:text-2xl">credit_card</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-xs sm:text-sm md:text-base">Visa / Mastercard</h4>
                  <p className="text-[10px] sm:text-xs text-secondary mt-0.5">Instant processing for primary accounts</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary shrink-0 text-lg sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="mt-3 sm:mt-4 md:mt-6 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 border-t border-outline-variant/10 pt-3 sm:pt-4">
              {[['Processing', 'Instant'], ['Fee', '0.00%'], ['Limits', '$100 - $50k']].map(([l, v]) => (
                <div key={l}><p className="text-[8px] sm:text-[9px] font-bold text-secondary uppercase tracking-tighter">{l}</p><p className="text-[11px] sm:text-xs font-bold text-primary">{v}</p></div>
              ))}
            </div>
            <div className="absolute -bottom-3 -right-3 opacity-[0.03] pointer-events-none">
              <span className="material-symbols-outlined text-[80px]" style={{ fontVariationSettings: "'FILL' 1" }}>credit_card</span>
            </div>
          </div>

          <PaymentMethod icon="account_balance" name="Bank Wire Transfer" desc="SWIFT, SEPA & Local Transfers" processing="1-3 Days" fee="Varies" limits="No Max" bgIcon="account_balance" />
          <PaymentMethod icon="currency_bitcoin" name="Digital Assets" desc="BTC, ETH, USDT (ERC20/TRC20)" processing="15 Mins" fee="Network Only" limits="$1k - $250k" bgIcon="currency_bitcoin" />
          <PaymentMethod icon="account_balance_wallet" name="Neteller" desc="E-wallet secure payments" processing="Instant" fee="1.5%" limits="$50 - $10k" bgIcon="wallet" />
        </div>

        {/* Right Panel */}
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 border border-outline-variant/15 shadow-sm relative overflow-hidden">
            <h3 className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-widest mb-3 sm:mb-4 md:mb-6">Deposit Configuration</h3>
            <div className="space-y-3 sm:space-y-4 md:space-y-5 relative z-10">
              <div>
                <label className="block text-[9px] sm:text-[10px] font-bold text-secondary uppercase tracking-wider mb-1.5 sm:mb-2">Target Account</label>
                <select className="w-full bg-background border-none rounded-lg text-xs sm:text-sm font-medium py-2.5 sm:py-3 px-3 sm:px-4 focus:ring-1 focus:ring-primary transition-all outline-none">
                  <option>Standard ECN (....9421) - USD</option>
                  <option>Managed Portfolio (....0034) - EUR</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] sm:text-[10px] font-bold text-secondary uppercase tracking-wider mb-1.5 sm:mb-2">Amount</label>
                <div className="relative">
                  <input className="w-full bg-background border-none rounded-lg text-base sm:text-lg font-bold py-2.5 sm:py-3 px-3 sm:px-4 focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="0.00" type="number" />
                  <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-bold text-secondary">USD</span>
                </div>
              </div>
              <div className="pt-3 sm:pt-4 border-t border-outline-variant/10 space-y-2 sm:space-y-3">
                <div className="flex justify-between text-[11px] sm:text-xs"><span className="text-secondary">Fee (0%)</span><span className="font-bold text-on-surface">$0.00</span></div>
                <div className="flex justify-between text-[11px] sm:text-xs"><span className="text-secondary">Exchange Rate</span><span className="font-bold text-on-surface">1.00 USD</span></div>
                <div className="flex justify-between items-end pt-2">
                  <span className="text-[11px] sm:text-xs font-bold text-on-surface">Total to Receive</span>
                  <span className="text-lg sm:text-xl font-bold text-primary">$0.00</span>
                </div>
              </div>
              <button className="w-full bg-primary text-white font-bold py-2.5 sm:py-3 md:py-4 rounded-xl text-xs sm:text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-3 sm:mt-4 shadow-lg shadow-primary/20">
                Continue to Review
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-[0.03] pointer-events-none">
              <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
            </div>
          </div>

          {/* Security Badge */}
          <div className="bg-primary/5 rounded-xl p-3 sm:p-4 flex gap-3 sm:gap-4 items-center border border-primary/10">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-lg sm:text-xl">verified_user</span>
            </div>
            <div>
              <p className="text-[9px] sm:text-[10px] font-bold text-primary uppercase tracking-tighter">Encryption Secure</p>
              <p className="text-[9px] sm:text-[10px] text-secondary leading-tight">AES-256 bank-level security protocols.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Market Ribbon */}
      <div className="mt-8 sm:mt-12 md:mt-20 border-t border-outline-variant/15 pt-4 sm:pt-6 md:pt-8 overflow-hidden">
        <div className="flex items-center gap-3 sm:gap-4 md:gap-8">
          <span className="text-[9px] sm:text-[10px] font-bold text-secondary whitespace-nowrap uppercase tracking-widest flex items-center gap-1 shrink-0">
            <span className="w-1 h-1 bg-emerald-500 rounded-full"></span> Live
          </span>
          <div className="flex gap-4 sm:gap-6 md:gap-10 no-scrollbar overflow-x-auto pb-2">
            {[
              ['EUR/USD', '1.0924', '+0.12%', true],
              ['XAU/USD', '2,342.10', '-0.05%', false],
              ['BTC/USD', '67,420.50', '+1.45%', true],
              ['GBP/JPY', '192.42', '+0.33%', true],
            ].map(([pair, price, pct, up]) => (
              <div key={pair} className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className="text-[10px] sm:text-xs font-bold text-on-surface">{pair}</span>
                <span className={`text-[10px] sm:text-xs font-medium ${up ? 'text-emerald-600' : 'text-error'}`}>{price} ({pct})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PaymentMethod({ icon, name, desc, processing, fee, limits, bgIcon }) {
  return (
    <div className="group bg-background hover:bg-surface-container-high transition-all rounded-xl p-3.5 sm:p-4 md:p-5 cursor-pointer border border-transparent relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div className="flex gap-2.5 sm:gap-3 md:gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-secondary text-lg sm:text-xl md:text-2xl">{icon}</span>
          </div>
          <div>
            <h4 className="font-bold text-on-surface opacity-80 group-hover:opacity-100 text-xs sm:text-sm md:text-base">{name}</h4>
            <p className="text-[10px] sm:text-xs text-secondary mt-0.5">{desc}</p>
          </div>
        </div>
      </div>
      <div className="mt-3 sm:mt-4 md:mt-6 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 border-t border-outline-variant/10 pt-3 sm:pt-4 relative z-10">
        {[['Processing', processing], ['Fee', fee], ['Limits', limits]].map(([l, v]) => (
          <div key={l}><p className="text-[8px] sm:text-[9px] font-bold text-secondary uppercase tracking-tighter">{l}</p><p className="text-[11px] sm:text-xs font-bold text-on-surface">{v}</p></div>
        ))}
      </div>
      <div className="absolute -bottom-3 -right-3 opacity-[0.03] pointer-events-none">
        <span className="material-symbols-outlined text-[80px]" style={{ fontVariationSettings: "'FILL' 1" }}>{bgIcon}</span>
      </div>
    </div>
  )
}
