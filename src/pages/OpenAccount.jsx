import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ACCOUNT_TYPES = {
  standard: [
    { id: 'standard', name: 'Standard', desc: 'Low minimum deposit with no commission. Made for all traders.', minDeposit: '10 USD', spread: '0.20 pips', leverage: '1:Unlimited', commission: 'No commission', icon: 'layers' },
    { id: 'standard_cent', name: 'Standard Cent', desc: 'Smaller lots, lower risk. Great for practicing.', minDeposit: '10 USD', spread: '0.30 pips', leverage: '1:Unlimited', commission: 'No commission', icon: 'monetization_on' },
  ],
  professional: [
    { id: 'pro', name: 'Pro', desc: 'Instant or market execution with tighter spreads and no commission.', minDeposit: '2000 USD', spread: '0.10 pips', leverage: '1:Unlimited', commission: 'No commission', icon: 'trending_up' },
    { id: 'raw_spread', name: 'Raw spread', desc: 'Direct market pricing with fixed commission. Designed for experienced traders.', minDeposit: '2000 USD', spread: '0.00 pips', leverage: '1:Unlimited', commission: 'Up to 3.50 USD per lot/side', icon: 'query_stats' },
    { id: 'zero', name: 'Zero', desc: 'Spreads from 0 pips on top instruments.', minDeposit: '2000 USD', spread: '0.00 pips', leverage: '1:Unlimited', commission: 'From 0.05 USD per lot/side', icon: 'data_usage' },
  ]
}

export default function OpenAccount() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: Select Type, 2: Setup
  const [selectedTypeId, setSelectedTypeId] = useState('standard')
  const [accountMode, setAccountMode] = useState('real') // 'demo' or 'real'
  
  // Setup form state
  const [currency, setCurrency] = useState('USD - United States Dollar')
  const [balance, setBalance] = useState('500') // Demo only
  const [nickname, setNickname] = useState('Standard')
  const [leverage, setLeverage] = useState('1:2000')
  const [platform, setPlatform] = useState('MT5')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [isSuccess, setIsSuccess] = useState(false)

  // Find selected account details
  const selectedDetails = [...ACCOUNT_TYPES.standard, ...ACCOUNT_TYPES.professional].find(a => a.id === selectedTypeId)

  const handleCreate = () => {
    setIsSuccess(true)
    setTimeout(() => {
      navigate('/accounts')
    }, 2500)
  }

  return (
    <div className="w-full max-w-[1000px] mx-auto animate-fade-in pb-12">
      {/* Header */}
      {!isSuccess && (
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => step === 2 ? setStep(1) : navigate('/accounts')} 
              className="w-10 h-10 rounded-full bg-white border border-outline-variant/20 flex items-center justify-center hover:bg-background transition-colors text-on-surface"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-on-surface">
              {step === 1 ? 'Open account' : 'Set up your account'}
            </h1>
          </div>
          {step === 1 && (
            <a href="#" className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary/80 transition-colors">
              Contract specifications
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          )}
        </div>
      )}

      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-20 lg:py-32 animate-scale-in">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 relative">
             <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping shadow-[0_0_20px_rgba(52,211,153,0.4)]"></div>
             <span className="material-symbols-outlined text-[48px] text-emerald-600 relative z-10">check_circle</span>
          </div>
          <h2 className="text-3xl font-black text-on-surface mb-3 tracking-tight">Account Created Successfully</h2>
          <p className="text-secondary text-base">Your new {accountMode.toUpperCase()} account is ready for trading. Redirecting you to Accounts...</p>
        </div>
      ) : (
        <>
          {step === 1 && (
            <div className="space-y-8 lg:space-y-12">
              {/* Table Headers (Desktop only) */}
              <div className="hidden lg:grid grid-cols-12 gap-4 px-6 text-xs font-bold uppercase tracking-widest text-secondary mt-4">
                <div className="col-span-6">Standard accounts</div>
                <div className="col-span-2 text-right">Min deposit</div>
                <div className="col-span-1 text-right">Min spread</div>
                <div className="col-span-1 text-right">Leverage</div>
                <div className="col-span-2 text-right">Commission</div>
              </div>

              <div className="space-y-3">
                <h2 className="lg:hidden text-sm font-bold uppercase tracking-widest text-secondary mb-4 px-2">Standard accounts</h2>
                {ACCOUNT_TYPES.standard.map(acc => (
                  <AccountRow 
                    key={acc.id} 
                    acc={acc} 
                    isSelected={selectedTypeId === acc.id} 
                    onSelect={() => setSelectedTypeId(acc.id)} 
                  />
                ))}
              </div>

              <div className="space-y-3">
                <h2 className="text-sm font-bold uppercase tracking-widest text-secondary mb-4 px-2 lg:px-6">Professional accounts</h2>
                 {ACCOUNT_TYPES.professional.map(acc => (
                  <AccountRow 
                    key={acc.id} 
                    acc={acc} 
                    isSelected={selectedTypeId === acc.id} 
                    onSelect={() => setSelectedTypeId(acc.id)} 
                  />
                ))}
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => setStep(2)}
                  className="w-full sm:w-[280px] bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-sm"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-start">
              
              {/* Main Form Area */}
              <div className="w-full lg:w-2/3 space-y-8">
                {/* Demo / Real Toggle */}
                <div className="bg-background p-1.5 rounded-xl border border-outline-variant/20 flex w-full">
                   <button 
                    onClick={() => setAccountMode('demo')}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${accountMode === 'demo' ? 'bg-white text-on-surface shadow-sm' : 'text-secondary hover:text-on-surface'}`}
                  >
                    Demo
                  </button>
                  <button 
                    onClick={() => setAccountMode('real')}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${accountMode === 'real' ? 'bg-white text-on-surface shadow-sm' : 'text-secondary hover:text-on-surface'}`}
                  >
                    Real
                  </button>
                </div>

                <div>
                  <p className="text-sm text-on-surface font-medium">
                    {accountMode === 'real' ? 'Trade with real money and withdraw any profit you may make.' : 'Risk-free account. Trade with virtual money.'}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Currency */}
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-2">Currency <span className="text-error">*</span></label>
                    <div className="relative">
                      <select 
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full bg-white border border-outline-variant/20 hover:border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm text-on-surface appearance-none outline-none transition-all cursor-pointer"
                      >
                        <option>USD - United States Dollar</option>
                        <option>EUR - Euro</option>
                        <option>GBP - British Pound</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[20px]">expand_more</span>
                    </div>
                  </div>

                  {/* Starting Balance (Demo only) */}
                  {accountMode === 'demo' && (
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-2">Starting balance <span className="text-error">*</span></label>
                      <input 
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        className="w-full bg-white border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm font-medium text-on-surface outline-none transition-all"
                      />
                    </div>
                  )}

                  {/* Nickname */}
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-2">Nickname <span className="text-error">*</span></label>
                    <input 
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      maxLength={36}
                      className="w-full bg-white border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm font-medium text-on-surface outline-none transition-all"
                    />
                    <div className="flex justify-between items-center mt-2 px-1">
                      <p className="text-xs text-secondary">Nicknames can't contain special characters: {'<>"\'&?^*#@'}</p>
                      <p className="text-xs text-secondary">{nickname.length}/36</p>
                    </div>
                  </div>

                  {/* Max Leverage */}
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-2">Max leverage <span className="text-error">*</span></label>
                    <div className="relative">
                      <select 
                        value={leverage}
                        onChange={(e) => setLeverage(e.target.value)}
                        className="w-full bg-white border border-outline-variant/20 hover:border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm text-on-surface appearance-none outline-none transition-all cursor-pointer"
                      >
                        <option>1:Unlimited</option>
                        <option>1:2000</option>
                        <option>1:1000</option>
                        <option>1:500</option>
                        <option>1:100</option>
                        <option>1:50</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[20px]">expand_more</span>
                    </div>
                  </div>

                  {/* Trading Password */}
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-2">Trading password <span className="text-error">*</span></label>
                    <div className="relative mb-3">
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm text-on-surface outline-none transition-all font-mono"
                      />
                      <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface transition-colors flex items-center justify-center p-1"
                      >
                        <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                    {/* Password Rules */}
                    <div className="space-y-1.5 px-1">
                      <RuleItem text="Between 8-15 characters" met={password.length >= 8 && password.length <= 15} />
                      <RuleItem text="At least one upper and one lower case letter" met={/[a-z]/.test(password) && /[A-Z]/.test(password)} />
                      <RuleItem text="At least one number" met={/\d/.test(password)} />
                      <RuleItem text="At least one special character" met={/[!@#$%^&*(),.?":{}|<>]/.test(password)} />
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-outline-variant/10">
                    <button 
                      onClick={handleCreate}
                      disabled={password.length < 8}
                      className={`w-full py-4 rounded-xl font-bold transition-all shadow-sm ${
                        password.length >= 8 
                          ? 'bg-primary text-white hover:bg-primary/90' 
                          : 'bg-outline-variant/10 text-secondary cursor-not-allowed'
                      }`}
                    >
                      Create account
                    </button>
                  </div>

                </div>
              </div>

              {/* Right Sidebar (Account Summary) */}
              <div className="hidden lg:block w-1/3 shrink-0">
                <div className="bg-white rounded-2xl border border-outline-variant/15 p-6 shadow-sm sticky top-6">
                  <h3 className="text-xl font-bold text-on-surface mb-6">{selectedDetails.name}</h3>
                  
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs text-secondary mb-1">Min deposit</p>
                      <p className="text-sm font-medium text-on-surface">{selectedDetails.minDeposit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-secondary mb-1">Min spread</p>
                      <p className="text-sm font-medium text-on-surface">{selectedDetails.spread}</p>
                    </div>
                    <div>
                      <p className="text-xs text-secondary mb-1">Max leverage</p>
                      <p className="text-sm font-medium text-on-surface">{selectedDetails.leverage}</p>
                    </div>
                    <div>
                      <p className="text-xs text-secondary mb-1">Commission</p>
                      <p className="text-sm font-medium text-on-surface">{selectedDetails.commission}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-outline-variant/10">
                    <a href="#" className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary/80 transition-colors inline-flex">
                      Contract specifications
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          )}
        </>
      )}
    </div>
  )
}

function AccountRow({ acc, isSelected, onSelect }) {
  return (
    <div 
      onClick={onSelect}
      className={`border rounded-xl md:rounded-2xl transition-all cursor-pointer bg-white group hover:shadow-md
        ${isSelected ? 'border-primary ring-1 ring-primary shadow-sm' : 'border-outline-variant/20 hover:border-primary/50'}
      `}
    >
      <div className="p-4 md:p-6 flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:items-center">
        
        {/* Title & Desc */}
        <div className="col-span-6 flex gap-4">
          {/* Radio / Icon */}
          <div className="flex items-start gap-4 shrink-0">
            <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
              ${isSelected ? 'border-primary' : 'border-outline-variant/30 group-hover:border-primary/50'}
            `}>
              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary animate-scale-in"></div>}
            </div>
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors
              ${isSelected ? 'bg-primary/10 text-primary' : 'bg-background text-secondary'}
            `}>
              <span className="material-symbols-outlined">{acc.icon}</span>
            </div>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-on-surface mb-1">{acc.name}</h3>
            <p className="text-xs md:text-sm text-secondary leading-relaxed max-w-sm">{acc.desc}</p>
          </div>
        </div>

        {/* Mobile metrics layout */}
        <div className="lg:hidden grid grid-cols-2 gap-4 mt-2 ml-14 border-t border-outline-variant/10 pt-4">
          <div>
            <p className="text-[10px] uppercase text-secondary font-bold mb-1">Min Deposit</p>
            <p className="text-sm font-medium text-on-surface">{acc.minDeposit}</p>
          </div>
           <div>
            <p className="text-[10px] uppercase text-secondary font-bold mb-1">Min Spread</p>
            <p className="text-sm font-medium text-on-surface">{acc.spread}</p>
          </div>
           <div>
            <p className="text-[10px] uppercase text-secondary font-bold mb-1">Leverage</p>
            <p className="text-sm font-medium text-on-surface">{acc.leverage}</p>
          </div>
           <div>
            <p className="text-[10px] uppercase text-secondary font-bold mb-1">Commission</p>
            <p className="text-sm font-medium text-on-surface">{acc.commission}</p>
          </div>
        </div>

        {/* Desktop metrics layout */}
        <div className="hidden lg:block col-span-2 text-right">
          <p className="text-sm font-medium text-on-surface">{acc.minDeposit}</p>
        </div>
        <div className="hidden lg:block col-span-1 text-right">
          <p className="text-sm font-medium text-on-surface whitespace-nowrap">{acc.spread}</p>
        </div>
        <div className="hidden lg:block col-span-1 text-right">
          <p className="text-sm font-medium text-on-surface">{acc.leverage}</p>
        </div>
        <div className="hidden lg:block col-span-2 text-right">
          <p className="text-sm font-medium text-on-surface">{acc.commission}</p>
        </div>

      </div>
    </div>
  )
}

function RuleItem({ text, met }) {
  return (
    <div className={`flex items-start gap-2 text-xs transition-colors ${met ? 'text-emerald-600' : 'text-secondary'}`}>
      <span className="material-symbols-outlined text-[14px] mt-0.5">
        {met ? 'check_circle' : 'radio_button_unchecked'}
      </span>
      <span>{text}</span>
    </div>
  )
}
