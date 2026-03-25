export default function Deposit() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-secondary mb-2">
          <span className="text-[10px] font-bold tracking-widest uppercase">Funding</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-[10px] font-bold tracking-widest uppercase text-primary">Deposit Funds</span>
        </div>
        <h1 className="text-3xl font-bold text-primary tracking-tight">Add Liquidity</h1>
        <p className="text-secondary text-sm mt-1">Select your preferred method to fund your institutional account.</p>
      </header>

      {/* Step Indicator */}
      <div className="flex items-center gap-8 mb-12 border-b border-outline-variant/10">
        <div className="pb-4 flex items-center gap-2 border-b-2 border-primary text-primary">
          <span className="text-xs font-bold bg-primary text-on-primary w-5 h-5 rounded-full flex items-center justify-center">1</span>
          <span className="text-xs font-bold tracking-tight uppercase">Method</span>
        </div>
        <div className="pb-4 text-secondary/40 flex items-center gap-2">
          <span className="text-xs font-bold border border-outline-variant w-5 h-5 rounded-full flex items-center justify-center">2</span>
          <span className="text-xs font-bold tracking-tight uppercase">Details</span>
        </div>
        <div className="pb-4 text-secondary/40 flex items-center gap-2">
          <span className="text-xs font-bold border border-outline-variant w-5 h-5 rounded-full flex items-center justify-center">3</span>
          <span className="text-xs font-bold tracking-tight uppercase">Confirm</span>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-bold text-secondary uppercase tracking-widest mb-6">Payment Options</h3>

          {/* Visa - Active */}
          <div className="group relative overflow-hidden bg-surface-container-lowest border-2 border-primary rounded-xl p-5 cursor-pointer shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-surface-container-low rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">credit_card</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary">Visa / Mastercard</h4>
                  <p className="text-xs text-secondary mt-0.5">Instant processing for primary accounts</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-outline-variant/10 pt-4">
              {[['Processing', 'Instant'], ['Fee', '0.00%'], ['Limits', '$100 - $50k']].map(([l, v]) => (
                <div key={l}><p className="text-[9px] font-bold text-secondary uppercase tracking-tighter">{l}</p><p className="text-xs font-bold text-primary">{v}</p></div>
              ))}
            </div>
          </div>

          {/* Wire Transfer */}
          <PaymentMethod icon="account_balance" name="Bank Wire Transfer" desc="SWIFT, SEPA & Local Transfers" processing="1-3 Days" fee="Varies" limits="No Max" />
          {/* Crypto */}
          <PaymentMethod icon="currency_bitcoin" name="Digital Assets" desc="BTC, ETH, USDT (ERC20/TRC20)" processing="15 Mins" fee="Network Only" limits="$1k - $250k" />
          {/* Neteller */}
          <PaymentMethod icon="account_balance_wallet" name="Neteller" desc="E-wallet secure payments" processing="Instant" fee="1.5%" limits="$50 - $10k" />
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/15 shadow-sm">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-6">Deposit Configuration</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-secondary uppercase tracking-wider mb-2">Target Account</label>
                <select className="w-full bg-surface-container-low border-none rounded-lg text-sm font-medium py-3 px-4 focus:ring-1 focus:ring-primary transition-all outline-none">
                  <option>Standard ECN (....9421) - USD</option>
                  <option>Managed Portfolio (....0034) - EUR</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-secondary uppercase tracking-wider mb-2">Amount</label>
                <div className="relative">
                  <input className="w-full bg-surface-container-low border-none rounded-lg text-lg font-bold py-3 px-4 focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="0.00" type="number" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-secondary">USD</span>
                </div>
              </div>
              <div className="pt-4 border-t border-outline-variant/10 space-y-3">
                <div className="flex justify-between text-xs"><span className="text-secondary">Fee (0%)</span><span className="font-bold text-primary">$0.00</span></div>
                <div className="flex justify-between text-xs"><span className="text-secondary">Exchange Rate</span><span className="font-bold text-primary">1.00 USD</span></div>
                <div className="flex justify-between items-end pt-2">
                  <span className="text-xs font-bold text-primary">Total to Receive</span>
                  <span className="text-xl font-bold text-primary">$0.00</span>
                </div>
              </div>
              <button className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-4">
                Continue to Review
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Security Badge */}
          <div className="bg-surface-container-low rounded-xl p-4 flex gap-4 items-center">
            <div className="w-10 h-10 bg-surface-container-lowest rounded-full flex items-center justify-center text-primary/40">
              <span className="material-symbols-outlined">verified_user</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">Encryption Secure</p>
              <p className="text-[10px] text-secondary leading-tight">Your data is encrypted with AES-256 bank-level security protocols.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Market Ribbon */}
      <div className="mt-20 border-t border-outline-variant/15 pt-8 overflow-hidden">
        <div className="flex items-center gap-8">
          <span className="text-[10px] font-bold text-secondary whitespace-nowrap uppercase tracking-widest flex items-center gap-1">
            <span className="w-1 h-1 bg-emerald-500 rounded-full"></span> Live Market
          </span>
          <div className="flex gap-10 no-scrollbar overflow-x-auto pb-2">
            {[
              ['EUR/USD', '1.0924 (+0.12%)', true],
              ['XAU/USD', '2,342.10 (-0.05%)', false],
              ['BTC/USD', '67,420.50 (+1.45%)', true],
              ['GBP/JPY', '192.42 (+0.33%)', true],
            ].map(([pair, price, up]) => (
              <div key={pair} className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary">{pair}</span>
                <span className={`text-xs font-medium ${up ? 'text-emerald-600' : 'text-error'}`}>{price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PaymentMethod({ icon, name, desc, processing, fee, limits }) {
  return (
    <div className="group bg-surface-container-low hover:bg-surface-container-highest transition-all rounded-xl p-5 cursor-pointer border border-transparent">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-surface-container-lowest rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary text-2xl">{icon}</span>
          </div>
          <div>
            <h4 className="font-bold text-primary opacity-80 group-hover:opacity-100">{name}</h4>
            <p className="text-xs text-secondary mt-0.5">{desc}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-outline-variant/10 pt-4">
        {[['Processing', processing], ['Fee', fee], ['Limits', limits]].map(([l, v]) => (
          <div key={l}><p className="text-[9px] font-bold text-secondary uppercase tracking-tighter">{l}</p><p className="text-xs font-bold text-primary">{v}</p></div>
        ))}
      </div>
    </div>
  )
}
