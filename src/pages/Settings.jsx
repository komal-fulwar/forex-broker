import { useState, useEffect } from 'react'
import { SettingsSkeleton } from '../components/Skeletons'

export default function Settings() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  if (loading) return <SettingsSkeleton />

  return (
    <div className="w-full animate-fade-in pb-16">
      <header className="mb-8 md:mb-12 border-b border-outline-variant/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">Account Management</p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">Profile Details</h1>
        </div>
        <button className="bg-primary text-white font-bold py-2.5 px-6 rounded-lg text-sm hover:bg-primary/90 transition-all shadow-sm self-start sm:self-auto">
          Save Changes
        </button>
      </header>

      <div className="space-y-12">
        
        {/* Verification Steps */}
        <div className="pt-2">
          <h2 className="text-xl font-bold text-on-surface mb-4">Verification steps</h2>
          
          <div className="bg-white border border-outline-variant/15 rounded-xl shadow-sm text-[13px] divide-y divide-outline-variant/10">
            {/* Step 1 */}
            <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-500 text-white flex items-center justify-center font-bold text-xs shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-on-surface text-sm mb-0.5">Personal details</h3>
                  <p className="text-secondary text-xs">vj••••••••••••is@gmail.com, +971 ••• 5640</p>
                </div>
              </div>
              <div className="bg-[#E8F5E9] text-[#2E7D32] px-3 py-1 rounded-full text-xs font-bold leading-none shrink-0 border border-[#A5D6A7]/50">
                Verified
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-500 text-white flex items-center justify-center font-bold text-xs shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-on-surface text-sm mb-0.5">Identity verification</h3>
                  <p className="text-secondary text-xs uppercase">VINAY RAMESH SABOO</p>
                </div>
              </div>
              <div className="bg-[#E8F5E9] text-[#2E7D32] px-3 py-1 rounded-full text-xs font-bold leading-none shrink-0 border border-[#A5D6A7]/50">
                Verified
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-500 text-white flex items-center justify-center font-bold text-xs shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-on-surface text-sm mb-0.5">Residential address verification</h3>
                  <p className="text-secondary text-xs">809, The Burjuman Business Tower, Al Mankhool-Dubai-United Arab Emirates Dubai</p>
                </div>
              </div>
              <div className="bg-[#E8F5E9] text-[#2E7D32] px-3 py-1 rounded-full text-xs font-bold leading-none shrink-0 border border-[#A5D6A7]/50">
                Verified
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 pt-8 border-t border-outline-variant/10">
          <div className="md:col-span-4 lg:col-span-4">
            <h2 className="text-base font-bold text-on-surface mb-2">Personal Information</h2>
            <p className="text-xs text-secondary leading-relaxed">Update your photo and personal details here. This information is visible to your dedicated account manager.</p>
          </div>
          
          <div className="md:col-span-8 lg:col-span-8 bg-white rounded-xl border border-outline-variant/10 shadow-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-8 mb-8 border-b border-outline-variant/10">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-xl shrink-0 border border-outline-variant/5">AV</div>
              <div>
                <button className="bg-white hover:bg-surface-container-low text-on-surface px-4 py-2 rounded-lg text-xs font-bold transition-all border border-outline-variant/20 shadow-sm mb-2">Update Avatar</button>
                <p className="text-[10px] text-secondary">SVG, PNG, or JPG (max. 5MB)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">First Name</label>
                <input type="text" defaultValue="Alexander" className="w-full bg-background border border-outline-variant/20 rounded-lg text-sm font-medium py-2.5 px-4 focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">Last Name</label>
                <input type="text" defaultValue="Vance" className="w-full bg-background border border-outline-variant/20 rounded-lg text-sm font-medium py-2.5 px-4 focus:ring-1 focus:ring-primary outline-none" />
              </div>
              
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">Email Address</label>
                <div className="relative">
                  <input type="email" defaultValue="a.vance@institutional.capital" disabled className="w-full bg-surface-container border border-outline-variant/10 rounded-lg text-sm font-medium py-2.5 px-4 text-secondary outline-none opacity-80 cursor-not-allowed pl-10" />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60 text-[18px]">lock</span>
                </div>
                <p className="text-[10px] text-secondary mt-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[12px] text-primary">info</span> 
                  Contact support to change registered email.
                </p>
              </div>

              <div className="sm:col-span-2 pt-4">
                <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">Timezone</label>
                <select className="w-full bg-background border border-outline-variant/20 rounded-lg text-sm font-medium py-2.5 px-4 focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer">
                  <option value="GMT">GMT (Greenwich Mean Time)</option>
                  <option value="EST">EST (Eastern Standard Time)</option>
                  <option value="PST">PST (Pacific Standard Time)</option>
                </select>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>
  )
}
