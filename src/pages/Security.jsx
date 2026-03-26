import { useState, useEffect } from 'react'
import { SecuritySkeleton } from '../components/Skeletons'

export default function Security({ isEmbedded = false }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t) }, [])

  if (loading) return <SecuritySkeleton />

  return (
    <div className="w-full animate-fade-in pb-16">
      {/* Page Header */}
      {!isEmbedded && (
        <header className="mb-8 md:mb-12 border-b border-outline-variant/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">Account Management</p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">Security Center</h1>
          </div>
          <div className="bg-white p-3 px-5 rounded-xl border border-outline-variant/15 flex items-center gap-6 self-start shadow-sm">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-secondary font-bold">Security Level</span>
              <span className="text-xs font-bold text-emerald-600 mt-0.5">Highly Protected</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-8 h-1.5 rounded-full bg-emerald-500"></div>
              <div className="w-8 h-1.5 rounded-full bg-emerald-500"></div>
              <div className="w-8 h-1.5 rounded-full bg-emerald-500"></div>
              <div className="w-8 h-1.5 rounded-full bg-outline-variant/40"></div>
            </div>
          </div>
        </header>
      )}

      <div className="space-y-12 divide-y divide-outline-variant/10">

        {/* Two-Factor Auth */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 pt-8 first:pt-0">
          <div className="md:col-span-4 lg:col-span-4">
            <h2 className="text-base font-bold text-on-surface mb-2">Two-Factor Auth</h2>
            <p className="text-xs text-secondary leading-relaxed">Secure your account with an extra layer of protection during high-volume withdrawals and critical settings changes.</p>
          </div>
          
          <div className="md:col-span-8 lg:col-span-8 rounded-xl shadow-md border border-white/10 relative overflow-hidden p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, rgba(20,25,35,0.95), rgba(10,15,20,0.98))' }}>
            <div className="absolute -bottom-10 -right-6 z-0 pointer-events-none">
              <svg width="240" height="240" viewBox="0 0 24 24" fill="none" className="text-white opacity-[0.03]">
                <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6ZM18 20H6V10H18V20ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z" fill="currentColor"/>
                <path d="M12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13Z" fill="currentColor"/>
              </svg>
            </div>
            
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                </div>
                <div>
                  <h3 className="font-bold tracking-tight text-white mb-1">Authenticator App</h3>
                  <p className="text-white/50 text-[11px]">Google Authenticator or Authy</p>
                </div>
              </div>

              <div className="glass-card bg-white/[0.04] border border-white/[0.08] p-3 px-4 rounded-xl flex items-center gap-4 shadow-inner self-start sm:self-auto shrink-0">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white">Active</span>
                <div className="w-11 sm:w-12 h-[22px] sm:h-6 bg-primary rounded-full relative cursor-pointer p-0.5 sm:p-1 border border-primary/50 shadow-[0_0_15px_rgba(67,97,238,0.4)]">
                  <div className="w-[18px] sm:w-4 h-[18px] sm:h-4 bg-white rounded-full absolute right-0.5 sm:right-1 top-0.5 sm:top-1 shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Password Management */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 pt-8">
          <div className="md:col-span-4 lg:col-span-4">
            <h2 className="text-base font-bold text-on-surface mb-2">Password Management</h2>
            <p className="text-xs text-secondary leading-relaxed">We strongly recommend changing your password every 90 days to maintain institutional compliance standards.</p>
          </div>
          
          <div className="md:col-span-8 lg:col-span-8 bg-white rounded-xl border border-outline-variant/10 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold text-on-surface mb-1">Last updated 14 days ago</p>
              <p className="text-[11px] text-secondary">Your password must be at least 12 characters and contain special characters.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
               <button className="bg-transparent border border-outline-variant/20 text-on-surface py-2.5 px-6 rounded-lg text-xs font-bold hover:bg-surface-container-low transition-all">View Login History</button>
               <button className="bg-dark text-white py-2.5 px-6 rounded-lg text-xs font-bold hover:bg-dark/90 transition-all shadow-sm">Update Password</button>
            </div>
          </div>
        </div>

        {/* Trusted Devices */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 pt-8">
          <div className="md:col-span-4 lg:col-span-4">
            <div className="flex items-center gap-3 mb-2">
               <h2 className="text-base font-bold text-on-surface">Trusted Devices</h2>
               <span className="text-[9px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded uppercase">3 Active</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">Manage devices that are currently logged in to your account. Revoke access to unrecognized sessions immediately.</p>
          </div>
          
          <div className="md:col-span-8 lg:col-span-8 bg-white rounded-xl border border-outline-variant/10 shadow-sm">
            <div className="divide-y divide-outline-variant/5">
              {[
                { icon: 'laptop_mac', name: 'MacBook Pro 16"', os: 'Sonoma OS', detail: 'London, UK • Current Session' },
                { icon: 'smartphone', name: 'iPhone 15 Pro', os: 'iOS 17', detail: 'London, UK • 2 hours ago' },
              ].map((device) => (
                <div key={device.name} className="flex items-center justify-between p-4 sm:p-6 hover:bg-surface-container-low/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary/5 rounded-lg shrink-0 border border-primary/10">
                      <span className="material-symbols-outlined text-primary">{device.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">{device.name} — {device.os}</p>
                      <p className="text-[11px] text-secondary mt-0.5">{device.detail}</p>
                    </div>
                  </div>
                  <button className="text-secondary hover:text-error transition-colors p-2 rounded-lg hover:bg-error/5 group">
                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform">logout</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 pt-8">
          <div className="md:col-span-4 lg:col-span-4">
            <h2 className="text-base font-bold text-on-surface mb-2">Notification Preferences</h2>
            <p className="text-xs text-secondary leading-relaxed">Customize how you receive alerts for security events, market updates, and account activity.</p>
          </div>
          
          <div className="md:col-span-8 lg:col-span-8 bg-white rounded-xl border border-outline-variant/10 shadow-sm p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: 'Security Alerts', items: [['Critical Logins', true], ['Large Withdrawals', true]] },
                { title: 'Market Updates', items: [['Position Liquidity', true], ['Portfolio Daily Brief', false]] },
              ].map((col) => (
                <div key={col.title} className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-primary/70 mb-2">{col.title}</h4>
                  <div className="space-y-3">
                    {col.items.map(([label, on]) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-secondary">{label}</span>
                        <div className={`w-10 h-5 ${on ? 'bg-primary' : 'bg-outline-variant/30'} rounded-full relative p-0.5 cursor-pointer shadow-inner transition-colors`}>
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${on ? 'right-0.5' : 'left-0.5'}`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
