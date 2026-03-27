import { useState, useEffect } from 'react'
import { VerificationSkeleton } from '../components/Skeletons'

export default function Verification({ isEmbedded = false }) {
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1) // 1: Contact (OTP), 2: Identity, 3: Address
  
  // OTP Verification state for Step 1
  const [otpSent, setOtpSent] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [emailOtp, setEmailOtp] = useState('')
  const [phoneOtp, setPhoneOtp] = useState('')

  useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t) }, [])

  if (loading) return <VerificationSkeleton />

  const steps = [
    { id: 1, label: 'Contact verification' },
    { id: 2, label: 'Identity verification' },
    { id: 3, label: 'Address verification' }
  ]

  return (
    <div className="w-full animate-fade-in pb-16">
      {/* Header Bar */}
      {!isEmbedded && (
        <header className="mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Compliance & Security</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-on-surface">Identity & KYC</h1>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
              <span className="material-symbols-outlined text-primary text-sm sm:text-base" style={{ fontVariationSettings: "'FILL' 1" }}>pending_actions</span>
              <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider">Verification in progress</span>
            </div>
          </div>
        </header>
      )}

      {/* Step Navigation */}
      <nav className="mb-6 sm:mb-8 md:mb-12 overflow-x-auto no-scrollbar">
        <ul className="flex items-center justify-between text-secondary min-w-[320px]">
          {steps.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <li key={step.id} className={`flex flex-col gap-1 sm:gap-2 flex-1 items-start border-b-2 pb-3 sm:pb-4 transition-colors ${
                isActive ? 'border-primary' : isCompleted ? 'border-emerald-500' : 'border-outline-variant/20'
              }`}>
                <span className={`text-[9px] sm:text-[10px] uppercase tracking-[0.1em] font-bold ${
                   isActive ? 'text-primary' : isCompleted ? 'text-emerald-600' : 'opacity-50'
                }`}>
                  {isCompleted ? 'Completed' : `Step 0${step.id}`}
                </span>
                <span className={`text-xs sm:text-sm font-semibold ${
                   isActive ? 'text-primary' : isCompleted ? 'text-on-surface' : 'opacity-50'
                }`}>
                  {step.label}
                </span>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start">
        
        {/* Main Form Area */}
        <section className="md:col-span-8 bg-white rounded-xl p-6 sm:p-8 md:p-10 shadow-sm border border-outline-variant/10 relative overflow-hidden">
          
          {/* STEP 1: Contact Verification (Email & Phone OTP) */}
          {currentStep === 1 && (
            <div className="animate-fade-in relative z-10">
              <div className="mb-6 md:mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-on-surface mb-2 tracking-tight">Contact verification</h2>
                <p className="text-secondary text-xs sm:text-sm leading-relaxed max-w-md">
                  Please verify your primary email and phone number. This ensures we can securely deliver critical account alerts.
                </p>
              </div>

              {!otpSent ? (
                /* Pre-OTP Form */
                <div className="animate-fade-in">
                  <div className="space-y-5 mb-10">
                    <div>
                      <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">Email Address</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. name@institutional.com" 
                        className="w-full bg-background border border-outline-variant/20 rounded-lg text-sm font-medium py-3 px-4 focus:ring-1 focus:ring-primary outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000" 
                        className="w-full bg-background border border-outline-variant/20 rounded-lg text-sm font-medium py-3 px-4 focus:ring-1 focus:ring-primary outline-none" 
                      />
                    </div>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row items-center justify-end border-t border-outline-variant/10 pt-6 gap-4">
                    <button 
                      onClick={() => { if(email && phone) setOtpSent(true) }} 
                      className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg ${email && phone ? 'bg-dark text-white hover:bg-dark/90 cursor-pointer' : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed opacity-70'}`}
                      disabled={!email || !phone}
                    >
                      Send OTP Codes
                      <span className="material-symbols-outlined text-lg">send</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Active OTP Form */
                <div className="animate-fade-in">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8 flex gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">mark_email_read</span>
                    <div>
                      <p className="text-sm font-bold text-primary mb-0.5">Verification codes dispatched</p>
                      <p className="text-[11px] text-secondary">Unique 6-digit codes were sent to <span className="font-bold text-on-surface">{email}</span> and <span className="font-bold text-on-surface">{phone}</span>.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    <div>
                      <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2 flex justify-between">
                        Email OTP
                        <button className="text-primary hover:underline text-[10px]">Resend</button>
                      </label>
                      <input 
                        type="text"
                        maxLength={6} 
                        value={emailOtp}
                        onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-background/50 border border-outline-variant/30 rounded-lg text-lg text-center tracking-[0.5em] font-mono py-3 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-bold text-on-surface placeholder:tracking-normal placeholder:font-sans placeholder:text-sm placeholder:text-secondary/50"
                        placeholder="••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2 flex justify-between">
                        Phone OTP
                        <button className="text-primary hover:underline text-[10px]">Resend</button>
                      </label>
                      <input 
                        type="text"
                        maxLength={6} 
                        value={phoneOtp}
                        onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-background/50 border border-outline-variant/30 rounded-lg text-lg text-center tracking-[0.5em] font-mono py-3 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-bold text-on-surface placeholder:tracking-normal placeholder:font-sans placeholder:text-sm placeholder:text-secondary/50"
                        placeholder="••••••"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row items-center justify-between border-t border-outline-variant/10 pt-6 gap-4">
                    <button onClick={() => setOtpSent(false)} className="text-secondary text-sm font-semibold hover:text-on-surface transition-colors flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                      Edit Contact Details
                    </button>
                    <button 
                      onClick={() => { if(emailOtp.length === 6 && phoneOtp.length === 6) setCurrentStep(2) }} 
                      className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg ${emailOtp.length === 6 && phoneOtp.length === 6 ? 'bg-primary text-white hover:bg-primary/90 cursor-pointer' : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed opacity-70'}`}
                    >
                      Verify & Continue
                      <span className="material-symbols-outlined text-lg">verified</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Identity Verification (Original robust UI) */}
          {currentStep === 2 && (
            <div className="animate-fade-in relative z-10">
              <div className="mb-6 md:mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-on-surface mb-2 tracking-tight">Verify your identity</h2>
                <p className="text-secondary text-xs sm:text-sm leading-relaxed max-w-md">
                  To ensure the highest level of security and regulatory compliance, please provide a valid government-issued document.
                </p>
              </div>

              <div className="space-y-4 mb-6 md:mb-10">
                <label className="text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant">Select Document Type</label>
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex flex-col items-center justify-center p-4 md:p-6 rounded-xl border-2 border-dark bg-white">
                    <span className="material-symbols-outlined mb-2 md:mb-3 text-dark text-2xl">flight</span>
                    <span className="text-[10px] sm:text-xs font-semibold text-dark">Passport</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 md:p-6 rounded-xl border border-outline-variant/30 hover:border-dark/40 transition-all bg-background/50">
                    <span className="material-symbols-outlined mb-2 md:mb-3 text-secondary text-2xl">badge</span>
                    <span className="text-[10px] sm:text-xs font-semibold text-secondary">ID Card</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 md:p-6 rounded-xl border border-outline-variant/30 hover:border-dark/40 transition-all bg-background/50">
                    <span className="material-symbols-outlined mb-2 md:mb-3 text-secondary text-2xl">directions_car</span>
                    <span className="text-[10px] sm:text-xs font-semibold text-secondary">License</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <label className="text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant">Upload Document</label>
                <div className="border-2 border-dashed border-outline-variant/50 rounded-xl p-8 md:p-12 flex flex-col items-center justify-center text-center bg-background/30 hover:bg-background transition-all cursor-pointer group">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-dark flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-white text-2xl md:text-3xl">cloud_upload</span>
                  </div>
                  <h3 className="text-sm font-bold text-on-surface mb-1">Drag and drop document</h3>
                  <p className="text-[13px] text-secondary mb-4 md:mb-6">Or <span className="text-primary underline font-medium">browse files</span> from your computer</p>
                  <div className="flex gap-3 md:gap-4">
                    {['JPG', 'PNG', 'PDF (Max 10MB)'].map(f => (
                      <span key={f} className="text-[10px] text-secondary/60 bg-background px-2 py-1 rounded border border-outline-variant/20">{f}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-center justify-between border-t border-outline-variant/10 pt-6 gap-4">
                <button onClick={() => setCurrentStep(1)} className="text-secondary text-sm font-semibold hover:text-on-surface transition-colors flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                  <span className="material-symbols-outlined text-lg">arrow_back</span>
                  Back
                </button>
                <button onClick={() => setCurrentStep(3)} className="bg-dark text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-dark/90 transition-all flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg">
                  Continue
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Address Verification */}
          {currentStep === 3 && (
            <div className="animate-fade-in relative z-10">
              <div className="mb-6 md:mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-on-surface mb-2 tracking-tight">Residential address</h2>
                <p className="text-secondary text-xs sm:text-sm leading-relaxed max-w-md">
                  We need to verify your physical address. Please provide details matching a recent utility bill or bank statement.
                </p>
              </div>

              <div className="space-y-5 mb-10">
                <div>
                  <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">Street Address</label>
                  <input type="text" placeholder="Building, Street, Area" className="w-full bg-background border border-outline-variant/20 rounded-lg text-sm font-medium py-3 px-4 focus:ring-1 focus:ring-primary outline-none" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">City</label>
                    <input type="text" className="w-full bg-background border border-outline-variant/20 rounded-lg text-sm font-medium py-3 px-4 focus:ring-1 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">Postal Code</label>
                    <input type="text" className="w-full bg-background border border-outline-variant/20 rounded-lg text-sm font-medium py-3 px-4 focus:ring-1 focus:ring-primary outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">Country of Residence</label>
                  <select className="w-full bg-background border border-outline-variant/20 rounded-lg text-sm font-medium py-3 px-4 focus:ring-1 focus:ring-primary outline-none text-on-surface appearance-none">
                    <option>United Arab Emirates</option>
                    <option>United Kingdom</option>
                    <option>Singapore</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <label className="text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant">Upload Proof of Address</label>
                <div className="border-2 border-dashed border-outline-variant/50 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-center bg-background/30 hover:bg-background transition-all cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-dark flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-white text-xl">home_work</span>
                  </div>
                  <h3 className="text-sm font-bold text-on-surface mb-1">Utility Bill or Bank Statement</h3>
                  <p className="text-[13px] text-secondary mb-4">Must clearly show your name, address, and be dated within the last 3 months.</p>
                  <div className="flex gap-3 md:gap-4">
                    {['JPG', 'PNG', 'PDF (Max 10MB)'].map(f => (
                      <span key={f} className="text-[10px] text-secondary/60 bg-background px-2 py-1 rounded border border-outline-variant/20">{f}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-center justify-between border-t border-outline-variant/10 pt-6 gap-4">
                <button onClick={() => setCurrentStep(2)} className="text-secondary text-sm font-semibold hover:text-on-surface transition-colors flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                  <span className="material-symbols-outlined text-lg">arrow_back</span>
                  Back
                </button>
                <button onClick={() => alert('Verification workflow completed.')} className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg">
                  Submit Documents
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                </button>
              </div>
            </div>
          )}

          {/* Decorative icon mapped to steps */}
          <div className="absolute -bottom-6 -right-6 opacity-[0.03] pointer-events-none">
            <span className="material-symbols-outlined text-[140px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {currentStep === 1 ? 'person' : currentStep === 2 ? 'verified_user' : 'home_pin'}
            </span>
          </div>
        </section>

        {/* Right Panel Constraints & Info */}
        <aside className="md:col-span-4 space-y-4 md:space-y-6">
          <div className="bg-white rounded-xl p-5 md:p-6 border border-outline-variant/10 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-8 h-8 bg-dark rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">Compliance Protocol</h4>
            </div>
            <p className="text-[13px] text-secondary leading-relaxed relative z-10">
              To comply with global Anti-Money Laundering (AML) regulations, verifiable proof of identity and physical location is strictly required before margin accounts are deployed.
            </p>
          </div>
          
          {currentStep === 2 && (
            <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-outline-variant/10 relative overflow-hidden animate-fade-in">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-4">Document Guidelines</h4>
              <ul className="space-y-4">
                {[
                  'All four corners must be visibly clear.',
                  'Ensure no glare obscures text/photo.',
                  'Document valid for at least next 30 days.'
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-primary text-[14px]">check</span>
                    </div>
                    <span className="text-[13px] text-secondary leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

      </div>
    </div>
  )
}
