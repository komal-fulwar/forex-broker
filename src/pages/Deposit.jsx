import { useState, useEffect } from 'react'
import QRCode from 'react-qr-code'
import { DepositSkeleton } from '../components/Skeletons'

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
  { id: 'card', name: 'Bank Card', iconNode: <BankCardIcon />, type: 'fiat', processing: 'Instant - 30 minutes', fee: '0%', limits: '10 - 10,000 USD', iconBg: 'bg-black' },
  { id: 'trx', name: 'TRON (TRX)', iconNode: <TronIcon />, type: 'crypto', processing: 'Instant - 15 minutes', fee: '0%', limits: '10 - 200,000 USD', iconBg: 'bg-error/10' },
  { id: 'bep20', name: 'Tether (USDT BEP20)', iconNode: <TetherIcon />, type: 'crypto', processing: 'Instant - 15 minutes', fee: '0%', limits: '10 - 200,000 USD', iconBg: 'bg-emerald-500/10' },
  { id: 'trc20', name: 'Tether (USDT TRC20)', iconNode: <TetherIcon />, type: 'crypto', processing: 'Instant - 15 minutes', fee: '0%', limits: '10 - 200,000 USD', iconBg: 'bg-emerald-500/10' },
  { id: 'internal', name: 'Between your accounts', iconNode: <InternalIcon />, type: 'internal', processing: 'Instant - 1 day', fee: '0%', limits: '1 - 1,000,000 USD', iconBg: 'bg-black' },
]

const ACCOUNTS = [
  { id: 'XT', number: '249474882', balance: '10,045.15 USD', tag: 'XT' },
  { id: 'CRYPTO', name: 'Crypto wallet (USDT TRC20)', balance: '0.00 USDT', tag: 'T' },
]

export default function Deposit() {
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1)
  const [method, setMethod] = useState(null)
  const [methodOpen, setMethodOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(ACCOUNTS[0])
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('TNTwf1Ro5Apj3uxQnrqAR7c6pQgeNHCngb')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => { const t = setTimeout(() => setLoading(false), 600); return () => clearTimeout(t) }, [])

  if (loading) return <DepositSkeleton />

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
            <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface">Deposit Liquidity</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-on-surface">
            {step === 1 ? 'Fund Account' : step === 2 ? 'Deposit Configuration' : 'Transfer Instructions'}
          </h1>
        </div>
        {step > 1 && (
          <button 
            onClick={() => { setStep(1); setMethod(null); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-background text-on-surface text-xs font-bold rounded-lg transition-colors border border-outline-variant/20 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Change Method
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

      {(step === 2 || step === 3) && method && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6 items-start">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Payment Method Selected Display & Dropdown */}
            <div className="relative">
              <label className="block text-[13px] text-secondary mb-2">Payment method</label>
              <div 
                className="bg-white border border-outline-variant/20 rounded-lg p-3 sm:p-4 flex items-center justify-between shadow-sm cursor-pointer" 
                onClick={() => { if (step === 2) { setMethodOpen(!methodOpen); setAccountOpen(false); } }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${method.iconBg}`}>
                    {method.iconNode}
                  </div>
                  <span className="font-medium text-on-surface">{method.name}</span>
                </div>
                {step === 2 && <span className="material-symbols-outlined text-secondary">{methodOpen ? 'expand_less' : 'expand_more'}</span>}
              </div>

              {step === 2 && methodOpen && (
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

            {step === 2 && (
              <>
                {/* To Account Dropdown */}
                <div className="relative">
                  <label className="block text-[13px] text-secondary mb-2">To account</label>
                  <div 
                    className="bg-white border border-outline-variant/20 rounded-lg p-3 cursor-pointer shadow-sm flex items-center justify-between"
                    onClick={() => { setAccountOpen(!accountOpen); setMethodOpen(false); }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="bg-background text-secondary text-xs px-1.5 py-0.5 rounded font-bold">{selectedAccount.tag}</span>
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

                <p className="text-[13px] text-on-surface mb-4">Funds will be credited to the selected account in account currency.</p>
                
                <button 
                  onClick={() => setStep(3)}
                  className="bg-primary hover:bg-primary/90 text-white shadow-sm font-bold py-3.5 px-8 rounded-xl transition-all inline-flex items-center gap-2"
                >
                  Confirm Configuration
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-error/5 border border-error/20 rounded-xl p-4 sm:p-5 flex gap-3 items-start">
                  <span className="material-symbols-outlined text-error mt-0.5">warning</span>
                  <p className="text-[13px] text-on-surface leading-snug">
                    We will only accept for this deposit {method.name} on the <span className="font-bold text-error">TRON Network</span>.<br/>
                    Only use crypto addresses you personally own or control to avoid network loss.
                  </p>
                </div>

                <p className="text-[14px] text-on-surface leading-snug">
                  To deposit funds, make a transfer to the blockchain address below. Copy the<br/>address or scan the QR code with the camera on your phone.
                </p>

                <div>
                  <p className="text-[13px] text-secondary mb-1">Your unique TRON account address</p>
                  <p className="text-base font-bold text-on-surface break-all">TNTwf1Ro5Apj3uxQnrqAR7c6pQgeNHCngb</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button onClick={handleCopy} className="bg-primary hover:bg-primary/90 text-white shadow-sm font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 text-sm w-44 justify-center">
                    <span className="material-symbols-outlined text-[18px]">{copied ? 'check' : 'content_copy'}</span>
                    {copied ? 'Copied!' : 'Copy address'}
                  </button>
                  <button className="bg-white hover:bg-background text-on-surface font-bold py-3 px-6 rounded-xl transition-all text-sm border border-outline-variant/20 shadow-sm">
                    Go to My Accounts
                  </button>
                </div>

                <div className="mt-8">
                  <div className="inline-block p-4 bg-white border border-outline-variant/20 shadow-sm rounded-xl">
                    <QRCode value="TNTwf1Ro5Apj3uxQnrqAR7c6pQgeNHCngb" size={160} level="M" />
                  </div>
                </div>

              </div>
            )}
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
                  <a href="#" className="text-secondary text-sm hover:text-primary transition-colors border-b border-transparent hover:border-primary">Learn more about crypto</a>
                  <a href="#" className="text-secondary text-sm hover:text-primary transition-colors border-b border-transparent hover:border-primary">How do I buy crypto from exchanges?</a>
                  <a href="#" className="text-secondary text-sm hover:text-primary transition-colors border-b border-transparent hover:border-primary">How do I verify my crypto address?</a>
                  <a href="#" className="text-secondary text-sm hover:text-primary transition-colors border-b border-transparent hover:border-primary">How do I deposit with Tether (TRON USDT TRC20)?</a>
                </div>
              </div>
            </div>
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
      className="bg-white border border-outline-variant/15 rounded-xl p-5 cursor-pointer hover:shadow-md hover:border-primary/30 transition-all group flex gap-4 items-start"
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${method.iconBg}`}>
        {method.iconNode}
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
