export default function Verification() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Step Navigation */}
      <nav className="mb-12">
        <ul className="flex items-center justify-between text-secondary">
          <li className="flex flex-col gap-2 flex-1 items-start border-b-2 border-primary pb-4">
            <span className="text-[10px] uppercase tracking-[0.1em] font-bold text-primary">Step 01</span>
            <span className="text-sm font-semibold text-primary">Identity</span>
          </li>
          <li className="flex flex-col gap-2 flex-1 items-start border-b-2 border-outline-variant/20 pb-4">
            <span className="text-[10px] uppercase tracking-[0.1em] font-bold opacity-50">Step 02</span>
            <span className="text-sm font-semibold opacity-50">Address</span>
          </li>
          <li className="flex flex-col gap-2 flex-1 items-start border-b-2 border-outline-variant/20 pb-4">
            <span className="text-[10px] uppercase tracking-[0.1em] font-bold opacity-50">Step 03</span>
            <span className="text-sm font-semibold opacity-50">Financial</span>
          </li>
          <li className="flex flex-col gap-2 flex-1 items-start border-b-2 border-outline-variant/20 pb-4">
            <span className="text-[10px] uppercase tracking-[0.1em] font-bold opacity-50">Step 04</span>
            <span className="text-sm font-semibold opacity-50">Review</span>
          </li>
        </ul>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Main Form */}
        <section className="md:col-span-8 bg-surface-container-lowest rounded-xl p-10 shadow-[0_32px_64px_-16px_rgba(20,27,44,0.04)] border border-outline-variant/10">
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-primary mb-2 tracking-tight">Verify your identity</h1>
            <p className="text-secondary text-sm leading-relaxed max-w-md">
              To ensure the highest level of security and regulatory compliance, please provide a valid government-issued document.
            </p>
          </div>

          {/* Document Type */}
          <div className="space-y-4 mb-10">
            <label className="text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant">Select Document Type</label>
            <div className="grid grid-cols-3 gap-3">
              <button className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-primary bg-surface-bright ring-1 ring-primary/5">
                <span className="material-symbols-outlined mb-3 text-primary">travel</span>
                <span className="text-xs font-semibold text-primary">Passport</span>
              </button>
              <button className="flex flex-col items-center justify-center p-6 rounded-xl border border-outline-variant/30 hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined mb-3 text-secondary">badge</span>
                <span className="text-xs font-semibold text-secondary">ID Card</span>
              </button>
              <button className="flex flex-col items-center justify-center p-6 rounded-xl border border-outline-variant/30 hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined mb-3 text-secondary">airline_seat_recline_normal</span>
                <span className="text-xs font-semibold text-secondary">License</span>
              </button>
            </div>
          </div>

          {/* Upload Zone */}
          <div className="space-y-4">
            <label className="text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant">Upload Document</label>
            <div className="border-2 border-dashed border-outline-variant/50 rounded-xl p-12 flex flex-col items-center justify-center text-center bg-surface-container-low/30 hover:bg-surface-container-low transition-all cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
              </div>
              <h3 className="text-sm font-bold text-primary mb-1">Drag and drop document</h3>
              <p className="text-[13px] text-secondary mb-6">Or <span className="text-primary underline font-medium">browse files</span> from your computer</p>
              <div className="flex gap-4">
                {['JPG', 'PNG', 'PDF (Max 10MB)'].map(f => (
                  <span key={f} className="text-[10px] text-secondary/60 bg-surface-container-low px-2 py-1 rounded">{f}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-12 flex items-center justify-between border-t border-outline-variant/10 pt-8">
            <button className="text-secondary text-sm font-semibold hover:text-primary transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back to Dashboard
            </button>
            <button className="bg-primary text-on-primary px-8 py-3 rounded-xl text-sm font-bold shadow-xl shadow-primary/10 hover:bg-primary/90 transition-all flex items-center gap-2">
              Continue to Address
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Right Panel */}
        <aside className="md:col-span-4 space-y-6">
          <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Bank-Grade Security</h4>
            </div>
            <p className="text-[13px] text-secondary leading-relaxed">
              Your data is encrypted with AES-256 and stored on isolated servers. We only use this information to verify your identity as required by global financial regulations.
            </p>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-secondary mb-4">Document Guidelines</h4>
            <ul className="space-y-4">
              {[
                'All four corners of the document must be visible.',
                'Ensure there is no glare or blur on the text.',
                'The document must be valid for at least 3 months.',
              ].map(text => (
                <li key={text} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-green-600 text-[18px]">check_circle</span>
                  <span className="text-[13px] text-on-surface-variant">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-xl overflow-hidden h-40 group cursor-pointer border border-outline-variant/10 bg-primary">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/40 p-6 flex flex-col justify-end">
              <span className="text-on-primary text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">Privacy First</span>
              <h5 className="text-on-primary text-sm font-bold leading-tight">Learn how BrokerPortal protects your digital assets.</h5>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
