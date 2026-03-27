import { useState, useEffect } from 'react'
import { DepositSkeleton as WithdrawSkeleton } from '../components/Skeletons'

const BankCardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFE000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/><path d="M7 14h3"/></svg>
)
const TronIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v10"/><path d="M9 10h6"/><path d="M9 14h6"/></svg>
)
const TetherIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 10h6"/><path d="M12 10v7"/></svg>
)
const InternalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFE000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 17H3"/><path d="M6 14l-3 3 3 3"/><path d="M3 7h18"/><path d="M18 10l3-3-3-3"/></svg>
)

const PAYMENT_METHODS = [
  { id: 'trc20', name: 'Tether (USDT TRC20)', iconNode: <TetherIcon />, type: 'crypto', processing: 'Instant - 15 minutes', fee: '0%', limits: '10 - 1,000,000 USD', iconBg: 'bg-emerald-500/10', badge: 'Recommended', badgeType: 'success' },
  { id: 'trx', name: 'TRON (TRX)', iconNode: <TronIcon />, type: 'crypto', processing: 'Instant - 15 minutes', fee: '0%', limits: '10 - 1,000,000 USD', iconBg: 'bg-error/10' },
  { id: 'bep20', name: 'Tether (USDT BEP20)', iconNode: <TetherIcon />, type: 'crypto', processing: 'Instant - 15 minutes', fee: '0%', limits: '10 - 1,000,000 USD', iconBg: 'bg-secondary/10', badge: 'Deposit first', badgeType: 'warning' },
  { id: 'erc20', name: 'Tether (USDT ERC20)', iconNode: <TetherIcon />, type: 'crypto', processing: 'Instant - 15 minutes', fee: '0%', limits: '50 - 1,000,000 USD', iconBg: 'bg-secondary/10', badge: 'Deposit first', badgeType: 'warning' },
  { id: 'usdc_bep20', name: 'USD Coin (USDC BEP20)', iconNode: <TetherIcon />, type: 'crypto', processing: 'Instant - 15 minutes', fee: '0%', limits: '10 - 1,000,000 USD', iconBg: 'bg-secondary/10', badge: 'Deposit first', badgeType: 'warning' },
  { id: 'usdc_erc20', name: 'USD Coin (USDC ERC20)', iconNode: <TetherIcon />, type: 'crypto', processing: 'Instant - 15 minutes', fee: '0%', limits: '50 - 1,000,000 USD', iconBg: 'bg-secondary/10', badge: 'Deposit first', badgeType: 'warning' },
  { id: 'internal', name: 'Between your accounts', iconNode: <InternalIcon />, type: 'internal', processing: 'Instant - 1 day', fee: '0%', limits: '1 - 1,000,000 USD', iconBg: 'bg-black' },
]

const ACCOUNTS = [
  { id: 'CRYPTO', name: 'Crypto wallet (USDT TRC20)', balance: '0.00 USDT', tag: 'T' },
  { id: 'XT', number: '249474882', balance: '10,045.15 USD', tag: 'XT' },
]

export default function Withdraw() {
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1)
  const [method, setMethod] = useState(null)
  const [methodOpen, setMethodOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(ACCOUNTS[0])
  const [amount, setAmount] = useState('')
  const [destination, setDestination] = useState('')
  const [otp, setOtp] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => { const t = setTimeout(() => setLoading(false), 600); return () => clearTimeout(t) }, [])

  if (loading) return <WithdrawSkeleton />

  const handleMethodSelect = (m) => {
    setMethod(m)
    setStep(2)
  }

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in pb-20">
      
      {/* Header */}
      <header className={`mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 ${step > 1 ? 'pb-6 border-b border-outline-variant/10' : ''}`}>
        <div>
          <div className="flex items-center gap-2 text-secondary mb-2">
            <span className="text-[10px] font-bold tracking-widest uppercase">Finance</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface">Withdraw Liquidity</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-on-surface">
            {step === 1 ? 'Withdrawal' : step === 2 ? 'Withdrawal Configuration' : step === 3 ? 'Security Verification' : 'Processing Complete'}
          </h1>
        </div>
        {step > 1 && step < 4 && (
          <button 
            onClick={() => { 
                if (step === 3) setStep(2);
                else { setStep(1); setMethod(null); }
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-background text-on-surface text-xs font-bold rounded-lg transition-colors border border-outline-variant/20 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            {step === 3 ? 'Back to Form' : 'Change Method'}
          </button>
        )}
      </header>

      {step === 1 && (
        <div className="mt-8">
          <h2 className="text-xl font-medium text-on-surface mb-6">All payment methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PAYMENT_METHODS.filter(m => m.type !== 'internal').map(m => (
              <MethodCard key={m.id} method={m} onClick={() => handleMethodSelect(m)} />
            ))}
          </div>

          <h2 className="text-xl font-medium text-on-surface mt-12 mb-6">Transfer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PAYMENT_METHODS.filter(m => m.type === 'internal').map(m => (
              <MethodCard key={m.id} method={m} onClick={() => handleMethodSelect(m)} />
            ))}
          </div>
        </div>
      )}

      {step === 2 && method && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6 items-start">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Payment Method Selected Display & Dropdown */}
            <div className="relative">
              <label className="block text-[13px] text-secondary mb-2">Payment method</label>
              <div 
                className="bg-white border border-outline-variant/20 rounded-lg p-3 sm:p-4 flex items-center justify-between shadow-sm cursor-pointer" 
                onClick={() => { setMethodOpen(!methodOpen); setAccountOpen(false); }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${method.iconBg}`}>
                    {method.iconNode}
                  </div>
                  <span className="font-medium text-on-surface">{method.name}</span>
                </div>
                <span className="material-symbols-outlined text-secondary">{methodOpen ? 'expand_less' : 'expand_more'}</span>
              </div>

              {methodOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-outline-variant/20 rounded-lg shadow-xl z-30 py-2">
                  {PAYMENT_METHODS.filter(m => m.type !== 'internal').map(m => (
                    <div 
                      key={m.id}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-background cursor-pointer transition-colors"
                      onClick={() => { setMethod(m); setMethodOpen(false); }}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${m.iconBg}`}>
                        {m.iconNode}
                      </div>
                      <span className="font-medium text-on-surface">{m.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* External Wallet */}
            <div>
              <label className="block text-[13px] text-secondary mb-2">To External Wallet</label>
              <input 
                type="text" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination address..."
                className="w-full bg-white border border-outline-variant/20 rounded-lg p-3 sm:p-4 shadow-sm focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-secondary/50 font-medium"
              />
            </div>

            {/* From Account Dropdown */}
            <div className="relative">
              <label className="block text-[13px] text-secondary mb-2">From account</label>
              <div 
                className="bg-white border border-outline-variant/20 rounded-lg p-3 cursor-pointer shadow-sm flex items-center justify-between"
                onClick={() => { setAccountOpen(!accountOpen); setMethodOpen(false); }}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${selectedAccount.tag === 'T' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-background text-secondary'}`}>
                    {selectedAccount.tag}
                  </span>
                  <span className="text-on-surface font-medium">{selectedAccount.number || selectedAccount.name}</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-on-surface font-medium">{selectedAccount.balance}</span>
                   <span className="material-symbols-outlined text-secondary">{accountOpen ? 'expand_less' : 'expand_more'}</span>
                </div>
              </div>

              {accountOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-outline-variant/20 rounded-lg shadow-xl z-20 py-2">
                  {ACCOUNTS.map(acc => (
                    <div 
                      key={acc.id}
                      className="flex items-center justify-between px-4 py-3 hover:bg-background cursor-pointer transition-colors"
                      onClick={() => { setSelectedAccount(acc); setAccountOpen(false); }}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${acc.tag === 'T' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-background text-secondary'}`}>
                          {acc.tag}
                        </span>
                        <span className="text-on-surface font-medium">{acc.number || acc.name}</span>
                      </div>
                      <span className="text-on-surface font-medium">{acc.balance}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-[13px] text-secondary mb-2">Amount</label>
              <div className="relative">
                <input 
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-white border border-outline-variant/20 rounded-lg p-3 sm:p-4 shadow-sm focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-secondary/50 font-bold text-lg"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-medium text-secondary">USDT</span>
              </div>
              <p className="text-xs text-primary mt-2">10.00 - 1,000,000.00 USDT</p>
            </div>

            {/* Info Box */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
              <p className="text-[13px] text-on-surface leading-loose">
                To withdraw, first transfer funds from your trading account to your broker crypto wallet account. Then, you can withdraw the funds to your external crypto address.
              </p>
            </div>

            {/* Summary Box */}
            <div className="bg-surface-container rounded-xl p-5 flex items-center justify-between border border-outline-variant/10">
              <span className="text-on-surface font-medium">To be withdrawn</span>
              <span className="text-xl font-bold text-on-surface">{amount ? parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'} USDT</span>
            </div>
            
            <button 
              onClick={() => { if (amount && parseFloat(amount) >= 10 && destination.length > 5) setStep(3) }}
              className={`w-full sm:w-auto font-bold py-3.5 px-8 rounded-xl transition-all inline-flex items-center justify-center gap-2 ${
                amount && parseFloat(amount) >= 10 && destination.length > 5
                  ? 'bg-primary hover:bg-primary/90 text-white shadow-sm' 
                  : 'bg-surface-variant text-secondary cursor-not-allowed'
              }`}
            >
              Continue Verify
            </button>
            
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 self-start mt-8 lg:mt-0">
            <div className="space-y-10 pl-0 lg:pl-6 lg:border-l border-outline-variant/10">
              {/* Terms */}
              <div>
                <h3 className="text-lg font-bold text-on-surface mb-4">Terms</h3>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-secondary">Average payment time</span>
                    <span className="font-medium text-on-surface">Instant</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-secondary">Fee</span>
                    <span className="font-medium text-on-surface">0%</span>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="text-lg font-bold text-on-surface mb-4">FAQ</h3>
                <div className="space-y-3 flex flex-col items-start">
                  <a href="#" className="text-secondary text-sm hover:text-primary transition-colors border-b border-transparent hover:border-primary">Learn more about crypto withdrawals</a>
                  <a href="#" className="text-secondary text-sm hover:text-primary transition-colors border-b border-transparent hover:border-primary">Why is my withdrawal delayed?</a>
                  <a href="#" className="text-secondary text-sm hover:text-primary transition-colors border-b border-transparent hover:border-primary">How do I verify my crypto address?</a>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      )}

      {step === 3 && (
        <div className="max-w-md mx-auto mt-10 space-y-8 animate-fade-in relative z-10 pb-[250px]">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">lock</span>
            </div>
            <h2 className="text-2xl font-bold text-on-surface">Security Verification</h2>
            <p className="text-secondary text-sm">To protect your account, please enter the 6-digit code sent to your email.</p>
          </div>

          <div className="space-y-6">
            <div>
              <input 
                type="text" 
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full bg-white border border-outline-variant/20 rounded-xl p-4 text-center text-3xl font-bold tracking-[1em] focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-secondary/30"
              />
            </div>
            <button 
              disabled={otp.length !== 6 || isVerifying}
              onClick={() => {
                setIsVerifying(true)
                setTimeout(() => { setIsVerifying(false); setStep(4); }, 1200)
              }}
              className={`w-full font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                otp.length === 6 && !isVerifying ? 'bg-primary hover:bg-primary/90 text-white shadow-md' : 'bg-surface-variant text-secondary cursor-not-allowed'
              }`}
            >
              {isVerifying ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : 'Authorize Withdrawal'}
            </button>
            <div className="text-center">
              <button className="text-primary text-sm font-medium hover:underline">Resend Code</button>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="max-w-md mx-auto mt-16 text-center space-y-8 animate-fade-in relative z-10 pb-[200px]">
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-[bounce_1s_ease-in-out]">
            <span className="material-symbols-outlined text-emerald-500 text-5xl">check_circle</span>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-on-surface">Withdrawal Submitted</h2>
            <p className="text-secondary text-sm leading-relaxed">
              Your request for <span className="font-bold text-on-surface">{amount} USDT</span> is currently being processed by the blockchain network.
            </p>
          </div>

          <div className="bg-white border border-outline-variant/10 rounded-xl p-5 text-left space-y-3 shadow-sm mx-auto">
            <div className="flex justify-between items-center text-sm">
               <span className="text-secondary">Destination</span>
               <span className="font-medium text-on-surface">{destination.length > 10 ? `${destination.slice(0,5)}...${destination.slice(-4)}` : destination}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-outline-variant/10 pt-3">
               <span className="text-secondary">Network Fee</span>
               <span className="font-medium text-on-surface">0.00 USDT</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-outline-variant/10 pt-3">
               <span className="text-secondary">Estimated Arrival</span>
               <span className="font-medium text-on-surface">~15 Minutes</span>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
             <button onClick={() => window.location.href='/transactions'} className="flex-1 bg-white hover:bg-background border border-outline-variant/20 text-on-surface font-bold py-3.5 rounded-xl transition-all text-sm shadow-sm">View Ledger</button>
             <button onClick={() => { setStep(1); setAmount(''); setOtp(''); setDestination(''); }} className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-sm">Done</button>
          </div>
        </div>
      )}

      {/* Footer Disclaimer */}
      <div className="mt-16 pt-8 border-t border-outline-variant/10">
        <p className="text-[11px] sm:text-xs text-secondary/60 text-center lg:text-left max-w-4xl">
          All crypto wallet services are provided by Thecorio Ltd, a company incorporated in Seychelles, with registration number 8437417-1.
        </p>
      </div>

    </div>
  )
}

function MethodCard({ method, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white border text-left rounded-xl p-5 cursor-pointer transition-all group flex flex-col items-start h-full
        ${method.badgeType === 'warning' ? 'border-outline-variant/10 opacity-70 hover:opacity-100 hover:border-primary/30' : 'border-outline-variant/15 hover:shadow-md hover:border-primary/30'}
      `}
    >
      <div className="flex justify-between w-full mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${method.iconBg}`}>
          {method.iconNode}
        </div>
        {method.badge && (
          <div className={`px-2.5 py-1 rounded-[4px] text-[10px] font-bold flex items-center gap-1 h-fit
            ${method.badgeType === 'success' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-yellow-500/10 text-yellow-600'}
          `}>
             {method.badgeType === 'warning' && <span className="material-symbols-outlined text-[10px]">lock</span>}
             {method.badge}
          </div>
        )}
      </div>
      <div>
        <h4 className="font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">{method.name}</h4>
        <div className="space-y-1">
          <p className="text-xs"><span className="text-secondary">Processing time</span> <span className="font-medium text-on-surface">{method.processing}</span></p>
          <p className="text-xs"><span className="text-secondary">Fee</span> <span className="font-medium text-on-surface">{method.fee}</span></p>
          <p className="text-xs"><span className="text-secondary">Limits</span> <span className="font-medium text-on-surface">{method.limits}</span></p>
        </div>
      </div>
    </div>
  )
}
