export default function Verification() {
  return (
    <div className="max-w-5xl mx-auto">
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
              <button className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 rounded-xl border-2 border-primary bg-primary/5 ring-1 ring-primary/10">
                <span className="material-symbols-outlined mb-1.5 sm:mb-2 md:mb-3 text-primary text-xl sm:text-2xl">travel</span>
                <span className="text-[10px] sm:text-xs font-semibold text-primary">Passport</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 rounded-xl border border-outline-variant/30 hover:bg-primary/5 hover:border-primary/30 transition-all">
                <span className="material-symbols-outlined mb-1.5 sm:mb-2 md:mb-3 text-secondary text-xl sm:text-2xl">badge</span>
                <span className="text-[10px] sm:text-xs font-semibold text-secondary">ID Card</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 rounded-xl border border-outline-variant/30 hover:bg-primary/5 hover:border-primary/30 transition-all">
                <span className="material-symbols-outlined mb-1.5 sm:mb-2 md:mb-3 text-secondary text-xl sm:text-2xl">airline_seat_recline_normal</span>
                <span className="text-[10px] sm:text-xs font-semibold text-secondary">License</span>
              </button>
            </div>
          </div>

          {/* Upload Zone */}
          <div className="space-y-3 sm:space-y-4">
            <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant">Upload Document</label>
            <div className="border-2 border-dashed border-primary/20 rounded-xl p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center text-center bg-primary/[0.02] hover:bg-primary/[0.04] transition-all cursor-pointer group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-xl sm:text-2xl md:text-3xl">cloud_upload</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-on-surface mb-1">Drag and drop document</h3>
              <p className="text-[11px] sm:text-[13px] text-secondary mb-3 sm:mb-4 md:mb-6">Or <span className="text-primary underline font-medium">browse files</span></p>
              <div className="flex gap-2 sm:gap-3 md:gap-4">
                {['JPG', 'PNG', 'PDF (10MB)'].map(f => (
                  <span key={f} className="text-[9px] sm:text-[10px] text-secondary/60 bg-background px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">{f}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 sm:mt-8 md:mt-12 flex flex-col-reverse sm:flex-row items-center justify-between border-t border-outline-variant/10 pt-4 sm:pt-6 md:pt-8 gap-3 sm:gap-4 relative z-10">
            <button className="text-secondary text-xs sm:text-sm font-semibold hover:text-primary transition-colors flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
              <span className="material-symbols-outlined text-base sm:text-lg">arrow_back</span>
              Back
            </button>
            <button className="bg-primary text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold shadow-xl shadow-primary/15 hover:bg-primary/90 transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
              Continue
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
          <div className="bg-primary/5 rounded-xl p-4 sm:p-5 md:p-6 border border-primary/10">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="material-symbols-outlined text-primary text-lg sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary">Bank-Grade Security</h4>
            </div>
            <p className="text-[11px] sm:text-[13px] text-secondary leading-relaxed">
              Your data is encrypted with AES-256 and stored on isolated servers. We only use this to verify your identity as required by regulations.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-outline-variant/10 relative overflow-hidden">
            <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-secondary mb-3 sm:mb-4">Document Guidelines</h4>
            <ul className="space-y-3 sm:space-y-4 relative z-10">
              {[
                'All four corners must be visible.',
                'No glare or blur on the text.',
                'Valid for at least 3 months.',
              ].map(text => (
                <li key={text} className="flex items-start gap-2 sm:gap-3">
                  <span className="material-symbols-outlined text-primary text-base sm:text-lg shrink-0">check_circle</span>
                  <span className="text-[11px] sm:text-[13px] text-on-surface-variant">{text}</span>
                </li>
              ))}
            </ul>
            <div className="absolute -bottom-4 -right-4 opacity-[0.03] pointer-events-none">
              <span className="material-symbols-outlined text-[80px]" style={{ fontVariationSettings: "'FILL' 1" }}>checklist</span>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden h-28 sm:h-36 md:h-40 cursor-pointer border border-outline-variant/10" style={{ background: 'linear-gradient(135deg, #4361ee 0%, #2b47b3 100%)' }}>
            <div className="absolute inset-0 p-4 sm:p-5 md:p-6 flex flex-col justify-end">
              <span className="text-white/70 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-1">Privacy First</span>
              <h5 className="text-white text-xs sm:text-sm font-bold leading-tight">Learn how BrokerPortal protects your digital assets.</h5>
            </div>
            <div className="absolute -bottom-2 -right-2 opacity-[0.1] pointer-events-none">
              <span className="material-symbols-outlined text-white text-[80px] sm:text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
