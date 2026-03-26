import { useState, useEffect } from 'react'
import { VerificationSkeleton } from '../components/Skeletons'

export default function Verification({ isEmbedded = false }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t) }, [])

  if (loading) return <VerificationSkeleton />

  return (
    <div className="w-full animate-fade-in">
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
              <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider">Awaiting Documents</span>
            </div>
          </div>
        </header>
      )}

      {/* Step Navigation */}
      <nav className="mb-6 sm:mb-8 md:mb-12 overflow-x-auto no-scrollbar">
        <ul className="flex items-center justify-between text-secondary min-w-[320px]">
          <li className="flex flex-col gap-1 sm:gap-2 flex-1 items-start border-b-2 border-primary pb-3 sm:pb-4">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.1em] font-bold text-primary">Step 01</span>
            <span className="text-xs sm:text-sm font-semibold text-primary">Identity</span>
          </li>
          {['Address', 'Financial', 'Review'].map((step, i) => (
            <li key={step} className="flex flex-col gap-1 sm:gap-2 flex-1 items-start border-b-2 border-outline-variant/20 pb-3 sm:pb-4">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.1em] font-bold opacity-50">Step 0{i + 2}</span>
              <span className="text-xs sm:text-sm font-semibold opacity-50">{step}</span>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start">
        {/* Main Form */}
        <section className="md:col-span-8 bg-white rounded-xl p-4 sm:p-6 md:p-10 shadow-sm border border-outline-variant/10 relative overflow-hidden">
          <div className="mb-4 sm:mb-6 md:mb-10">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-on-surface mb-1.5 sm:mb-2 tracking-tight">Verify your identity</h1>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed max-w-md">
              To ensure the highest level of security and regulatory compliance, please provide a valid government-issued document.
            </p>
          </div>

          {/* Document Type */}
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 md:mb-10">
            <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant">Select Document Type</label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <button className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 rounded-xl border-2 border-dark bg-white">
                <span className="material-symbols-outlined mb-1.5 sm:mb-2 md:mb-3 text-dark text-xl sm:text-2xl">flight</span>
                <span className="text-[10px] sm:text-xs font-semibold text-dark">Passport</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 rounded-xl border border-outline-variant/30 hover:border-dark/40 transition-all">
                <span className="material-symbols-outlined mb-1.5 sm:mb-2 md:mb-3 text-secondary text-xl sm:text-2xl">badge</span>
                <span className="text-[10px] sm:text-xs font-semibold text-secondary">ID Card</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 rounded-xl border border-outline-variant/30 hover:border-dark/40 transition-all">
                <span className="material-symbols-outlined mb-1.5 sm:mb-2 md:mb-3 text-secondary text-xl sm:text-2xl">directions_car</span>
                <span className="text-[10px] sm:text-xs font-semibold text-secondary">License</span>
              </button>
            </div>
          </div>

          {/* Upload Zone */}
          <div className="space-y-3 sm:space-y-4">
            <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant">Upload Document</label>
            <div className="border-2 border-dashed border-outline-variant/50 rounded-xl p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center text-center bg-background/30 hover:bg-background transition-all cursor-pointer group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-dark flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-white text-xl sm:text-2xl md:text-3xl">cloud_upload</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-on-surface mb-1">Drag and drop document</h3>
              <p className="text-[11px] sm:text-[13px] text-secondary mb-3 sm:mb-4 md:mb-6">Or <span className="text-primary underline font-medium">browse files</span> from your computer</p>
              <div className="flex gap-2 sm:gap-3 md:gap-4">
                {['JPG', 'PNG', 'PDF (Max 10MB)'].map(f => (
                  <span key={f} className="text-[9px] sm:text-[10px] text-secondary/60 bg-background px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-outline-variant/20">{f}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 sm:mt-8 md:mt-12 flex flex-col-reverse sm:flex-row items-center justify-between border-t border-outline-variant/10 pt-4 sm:pt-6 md:pt-8 gap-3 sm:gap-4 relative z-10">
            <button className="text-secondary text-xs sm:text-sm font-semibold hover:text-on-surface transition-colors flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
              <span className="material-symbols-outlined text-base sm:text-lg">arrow_back</span>
              Back to Dashboard
            </button>
            <button className="bg-dark text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold hover:bg-dark/90 transition-all flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg">
              Continue to Address
              <span className="material-symbols-outlined text-base sm:text-lg">arrow_forward</span>
            </button>
          </div>
          {/* Decorative icon */}
          <div className="absolute -bottom-6 -right-6 opacity-[0.03] pointer-events-none">
            <span className="material-symbols-outlined text-[140px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          </div>
        </section>

        {/* Right Panel */}
        <aside className="md:col-span-4 space-y-3 sm:space-y-4 md:space-y-6">
          {/* Bank-Grade Security Card */}
          <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 border border-outline-variant/10 shadow-sm">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-dark rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-sm sm:text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              </div>
              <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-on-surface">Bank-Grade Security</h4>
            </div>
            <p className="text-[11px] sm:text-[13px] text-secondary leading-relaxed">
              Your data is encrypted with AES-256 and stored on isolated servers. We only use this information to verify your identity as required by global financial regulations.
            </p>
          </div>

          {/* Document Guidelines Card */}
          <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-outline-variant/10 relative overflow-hidden">
            <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-3 sm:mb-4">Document Guidelines</h4>
            <ul className="space-y-3 sm:space-y-4 relative z-10">
              {[
                'All four corners of the document must be visible.',
                'Ensure there is no glare or blur on the text.',
                'The document must be valid for at least 3 months.',
              ].map(text => (
                <li key={text} className="flex items-start gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-primary text-xs sm:text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                  <span className="text-[11px] sm:text-[13px] text-on-surface-variant leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy First - Dark Card (like 2FA) */}
          <div className="relative rounded-xl overflow-hidden min-h-[120px] sm:min-h-[150px] md:min-h-[170px] cursor-pointer" style={{ background: 'linear-gradient(135deg, #0f1729 0%, #1a2236 100%)' }}>
            <div className="absolute inset-0 p-4 sm:p-5 md:p-6 flex flex-col justify-end relative z-10">
              <span className="text-white/60 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-1">Privacy First</span>
              <h5 className="text-white text-xs sm:text-sm font-bold leading-tight">Learn how BrokerPortal protects your digital assets.</h5>
            </div>
            {/* Background decoration — document/folder motif, NOT a padlock */}
            <div className="absolute -bottom-2 -right-2 opacity-[0.08] pointer-events-none">
              <svg width="120" height="130" viewBox="0 0 120 130" fill="none" className="w-[80px] h-[90px] sm:w-[100px] sm:h-[110px] md:w-[120px] md:h-[130px]">
                {/* Document stack */}
                <rect x="20" y="20" width="65" height="85" rx="6" fill="white" />
                <rect x="10" y="30" width="65" height="85" rx="6" stroke="white" strokeWidth="2" fill="none" opacity="0.4" />
                {/* Lines representing text */}
                <rect x="32" y="40" width="40" height="3" rx="1.5" fill="white" opacity="0.6" />
                <rect x="32" y="50" width="30" height="3" rx="1.5" fill="white" opacity="0.4" />
                <rect x="32" y="60" width="35" height="3" rx="1.5" fill="white" opacity="0.3" />
                {/* Checkmark circle */}
                <circle cx="90" cy="30" r="18" fill="white" opacity="0.3" />
                <path d="M82 30L88 36L98 24" stroke="#1a2236" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
