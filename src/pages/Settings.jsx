import { useState, useEffect } from 'react'
import { SupportSkeleton } from '../components/Skeletons'

export default function Settings() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  if (loading) return <SupportSkeleton />

  return (
    <div className="w-full animate-fade-in">
      <header className="mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Account Management</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-on-surface">Profile Details</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-5 md:gap-6 lg:gap-8">
        {/* Personal Information */}
        <section className="lg:col-span-6 bg-white rounded-xl border border-outline-variant/10 shadow-sm p-6 sm:p-8 relative overflow-hidden">
          <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-secondary mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">person</span> Personal Information
          </h2>
          
          <div className="space-y-6 sm:space-y-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-outline-variant/10">
              <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-2xl shrink-0 border border-outline-variant/5">AV</div>
              <div>
                <button className="bg-white hover:bg-surface-container-low text-on-surface px-4 py-2 rounded-lg text-sm font-bold transition-all border border-outline-variant/20 shadow-sm mb-2">Change Avatar</button>
                <p className="text-[10px] text-secondary">Max file size: 5MB (JPG, PNG)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-secondary uppercase tracking-widest mb-2">First Name</label>
                <input type="text" defaultValue="Alexander" className="w-full bg-background border border-outline-variant/20 rounded-lg text-sm font-medium py-3 px-4 focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-secondary uppercase tracking-widest mb-2">Last Name</label>
                <input type="text" defaultValue="Vance" className="w-full bg-background border border-outline-variant/20 rounded-lg text-sm font-medium py-3 px-4 focus:ring-1 focus:ring-primary outline-none" />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-[10px] sm:text-xs font-bold text-secondary uppercase tracking-widest mb-2">Email Address</label>
                <div className="relative">
                  <input type="email" defaultValue="a.vance@institutional.capital" disabled className="w-full bg-surface-container border border-outline-variant/10 rounded-lg text-sm font-medium py-3 px-4 text-secondary outline-none opacity-80 cursor-not-allowed pl-10" />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60 text-[18px]">lock</span>
                </div>
                <p className="text-[10px] text-secondary mt-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[12px] text-primary">info</span> 
                  To change your registered email, please contact dedicated support.
                </p>
              </div>

              <div className="md:col-span-2 border-t border-outline-variant/10 pt-6">
                <label className="block text-[10px] sm:text-xs font-bold text-secondary uppercase tracking-widest mb-2">Timezone</label>
                <select className="w-full bg-background border border-outline-variant/20 rounded-lg text-sm font-medium py-3 px-4 focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer">
                  <option value="GMT">GMT (Greenwich Mean Time)</option>
                  <option value="EST">EST (Eastern Standard Time)</option>
                  <option value="PST">PST (Pacific Standard Time)</option>
                  <option value="CET">CET (Central European Time)</option>
                </select>
              </div>
            </div>
            
            <div className="pt-2">
              <button className="bg-primary text-white font-bold py-3 px-8 rounded-lg text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-[0_4px_12px_rgba(67,97,238,0.3)] w-full sm:w-auto">Save Changes</button>
            </div>
          </div>
          <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none mt-4 mr-4">
            <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>person_4</span>
          </div>
        </section>

        {/* Institutional Details */}
        <section className="lg:col-span-4 space-y-5 md:space-y-6 lg:space-y-8">
          <div className="bg-white rounded-xl border border-outline-variant/10 shadow-sm p-6 sm:p-8 relative overflow-hidden h-full flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
               <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-secondary flex items-center gap-2">
                 <span className="material-symbols-outlined text-lg">domain</span> Institutional Details
               </h2>
               <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 self-start sm:self-auto">
                 <span className="material-symbols-outlined text-[14px]">verified</span> Fully Verified
               </span>
            </div>
            
            <div className="space-y-6 sm:space-y-8 relative z-10 flex-1">
              <div>
                <label className="block text-[10px] sm:text-[11px] font-bold text-primary/70 uppercase tracking-widest mb-2">Legal Entity Name</label>
                <div className="w-full bg-background border border-outline-variant/10 rounded-lg text-sm font-bold py-3 pt-3 px-4 text-on-surface">Vance Capital Partners Ltd.</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold text-primary/70 uppercase tracking-widest mb-2">Institutional ID</label>
                  <div className="w-full bg-background border border-outline-variant/10 rounded-lg text-[13px] font-mono font-medium py-3 pt-3 px-3 text-secondary truncate">
                    BR-992-XC-04
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold text-primary/70 uppercase tracking-widest mb-2">Classification</label>
                  <div className="w-full bg-background border border-outline-variant/10 rounded-lg text-[13px] font-medium py-3 px-3 text-secondary truncate">
                    Family Office
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-outline-variant/10 relative z-10 bg-surface-container-low p-4 rounded-lg">
               <p className="text-[10px] sm:text-[11px] text-secondary flex items-start gap-3 leading-relaxed">
                 <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">admin_panel_settings</span> 
                 Institutional details are permanently locked after Corporate KYC verification to comply with AML/CTF regulations. Please contact your dedicated account manager to request amendments.
               </p>
            </div>
            
            <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none">
              <span className="material-symbols-outlined text-[240px]" style={{ fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
