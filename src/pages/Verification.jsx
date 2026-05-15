import { useState, useEffect } from 'react'
import { VerificationSkeleton } from '../components/Skeletons'
import {
  useGetKycStep1StatusQuery,
  useSubmitKycContactMutation,
  useVerifyKycContactMutation,
} from '../features/user/userApi'

export default function Verification({ isEmbedded = false }) {
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)

  // Step 1 state
  const [otpSent, setOtpSent] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step1Error, setStep1Error] = useState('')
  const [step1Success, setStep1Success] = useState('')

  // RTK Query hooks
  const { data: step1Status, isLoading: step1Loading } = useGetKycStep1StatusQuery()
  const [submitContact, { isLoading: submitting }] = useSubmitKycContactMutation()
  const [verifyContact, { isLoading: verifying }] = useVerifyKycContactMutation()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  // If step1 is already verified, jump to step 2 automatically
  useEffect(() => {
    if (step1Status?.verified === true) {
      setCurrentStep(2)
    }
  }, [step1Status])

  if (loading || step1Loading) return <VerificationSkeleton />

  const step1AlreadyVerified = step1Status?.verified === true

  const steps = [
    { id: 1, label: 'Contact verification' },
    { id: 2, label: 'Identity verification' },
    { id: 3, label: 'Address verification' }
  ]

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSendOtp = async () => {
    setStep1Error('')
    try {
      await submitContact({ email, phoneNumber: phone }).unwrap()
      setOtpSent(true)
    } catch (err) {
      setStep1Error(err?.data?.message ?? 'Failed to send OTP. Please try again.')
    }
  }

  const handleVerifyOtp = async () => {
    setStep1Error('')
    try {
      await verifyContact({ otp }).unwrap()
      setStep1Success('Contact verified successfully!')
      setTimeout(() => setCurrentStep(2), 1000)
    } catch (err) {
      setStep1Error(err?.data?.message ?? 'Invalid or expired OTP. Please try again.')
    }
  }

  return (
    <div className="w-full animate-fade-in pb-16">
      {/* Header Bar */}
      {!isEmbedded && (
        <header className="mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Compliance &amp; Security</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-on-surface">Identity &amp; KYC</h1>
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
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id || (step.id === 1 && step1AlreadyVerified)

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
          
          {/* STEP 1: Contact Verification */}
          {currentStep === 1 && (
            <div className="animate-fade-in relative z-10">
              <div className="mb-6 md:mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-on-surface mb-2 tracking-tight">Contact verification</h2>
                <p className="text-secondary text-xs sm:text-sm leading-relaxed max-w-md">
                  Please verify your primary email and phone number. This ensures we can securely deliver critical account alerts.
                </p>
              </div>

              {/* Already verified banner — shown if step1 was done in a previous session */}
              {step1AlreadyVerified ? (
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
                  <span className="material-symbols-outlined text-emerald-600 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <div>
                    <p className="text-sm font-bold text-emerald-700 mb-0.5">Contact already verified</p>
                    <p className="text-[11px] text-emerald-600">Your email and phone number have been successfully verified.</p>
                  </div>
                </div>
              ) : !otpSent ? (
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

                  {/* Error */}
                  {step1Error && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6 text-sm text-red-700">
                      <span className="material-symbols-outlined text-lg">error</span>
                      {step1Error}
                    </div>
                  )}

                  <div className="flex flex-col-reverse sm:flex-row items-center justify-end border-t border-outline-variant/10 pt-6 gap-4">
                    <button
                      onClick={handleSendOtp}
                      disabled={!email || !phone || submitting}
                      className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg ${
                        email && phone && !submitting
                          ? 'bg-dark text-white hover:bg-dark/90 cursor-pointer'
                          : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed opacity-70'
                      }`}
                    >
                      {submitting ? 'Sending…' : 'Send OTP Code'}
                      <span className="material-symbols-outlined text-lg">send</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* OTP Verification Form */
                <div className="animate-fade-in">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8 flex gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">mark_email_read</span>
                    <div>
                      <p className="text-sm font-bold text-primary mb-0.5">Verification code dispatched</p>
                      <p className="text-[11px] text-secondary">
                        A 6-digit OTP was sent to <span className="font-bold text-on-surface">{email}</span>. Enter it below to verify your contact.
                      </p>
                    </div>
                  </div>

                  <div className="mb-10">
                    <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">Enter OTP</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-background/50 border border-outline-variant/30 rounded-lg text-lg text-center tracking-[0.5em] font-mono py-3 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-bold text-on-surface placeholder:tracking-normal placeholder:font-sans placeholder:text-sm placeholder:text-secondary/50"
                      placeholder="••••••"
                    />
                  </div>

                  {/* Error / Success */}
                  {step1Error && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6 text-sm text-red-700">
                      <span className="material-symbols-outlined text-lg">error</span>
                      {step1Error}
                    </div>
                  )}
                  {step1Success && (
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 mb-6 text-sm text-emerald-700">
                      <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      {step1Success}
                    </div>
                  )}

                  <div className="flex flex-col-reverse sm:flex-row items-center justify-between border-t border-outline-variant/10 pt-6 gap-4">
                    <button
                      onClick={() => { setOtpSent(false); setOtp(''); setStep1Error('') }}
                      className="text-secondary text-sm font-semibold hover:text-on-surface transition-colors flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
                    >
                      Edit Contact Details
                    </button>
                    <button
                      onClick={handleVerifyOtp}
                      disabled={otp.length !== 6 || verifying}
                      className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg ${
                        otp.length === 6 && !verifying
                          ? 'bg-primary text-white hover:bg-primary/90 cursor-pointer'
                          : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed opacity-70'
                      }`}
                    >
                      {verifying ? 'Verifying…' : 'Verify & Continue'}
                      <span className="material-symbols-outlined text-lg">verified</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Identity Verification */}
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
                {!step1AlreadyVerified && (
                  <button onClick={() => setCurrentStep(1)} className="text-secondary text-sm font-semibold hover:text-on-surface transition-colors flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back
                  </button>
                )}
                <button onClick={() => setCurrentStep(3)} className="bg-dark text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-dark/90 transition-all flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg ml-auto">
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

          {/* Decorative icon */}
          <div className="absolute -bottom-6 -right-6 opacity-[0.03] pointer-events-none">
            <span className="material-symbols-outlined text-[140px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {currentStep === 1 ? 'person' : currentStep === 2 ? 'verified_user' : 'home_pin'}
            </span>
          </div>
        </section>

        {/* Right Panel */}
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
