import { useState, useEffect } from 'react'
import { SecuritySkeleton } from '../components/Skeletons'

export default function Security({ isEmbedded = false }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t) }, [])

  if (loading) return <SecuritySkeleton />

  return (
    <div className="w-full space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in">
      {/* Page Header & Security Health */}
      {!isEmbedded && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 md:gap-6">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-on-background">Security &amp; Settings</h2>
            <p className="text-secondary mt-1 text-xs sm:text-sm">Manage your institutional identity and asset protection protocols.</p>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-xl border border-outline-variant/15 flex items-center gap-3 sm:gap-4 md:gap-6 self-start">
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-secondary font-bold">Security Level</span>
              <span className="text-xs sm:text-sm font-bold text-on-background mt-0.5">Highly Protected</span>
            </div>
            <div className="flex gap-1">
              <div className="w-6 sm:w-8 h-1.5 rounded-full bg-primary"></div>
              <div className="w-6 sm:w-8 h-1.5 rounded-full bg-primary"></div>
              <div className="w-6 sm:w-8 h-1.5 rounded-full bg-primary"></div>
              <div className="w-6 sm:w-8 h-1.5 rounded-full bg-outline-variant"></div>
            </div>
          </div>
        </div>
      )}

      {/* Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-6">
        
        {/* 2FA Card — restored frosty glass effect */}
        <section className="lg:col-span-7 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/5 overflow-hidden relative min-h-[240px] sm:min-h-[280px]" style={{ background: 'linear-gradient(135deg, rgba(20,25,35,0.95), rgba(10,15,20,0.98))', backdropFilter: 'blur(20px)' }}>
          {/* Huge Padlock Watermark SVG */}
          <div className="absolute -bottom-10 -right-6 z-0 pointer-events-none">
            <svg width="240" height="240" viewBox="0 0 24 24" fill="none" className="text-white opacity-[0.03]">
              <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6ZM18 20H6V10H18V20ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z" fill="currentColor"/>
              <path d="M12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13Z" fill="currentColor"/>
            </svg>
          </div>
          
          <div className="relative z-10 p-5 sm:p-7 md:p-9 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                <span className="material-symbols-outlined text-white text-lg sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                <h3 className="font-bold text-base sm:text-lg md:text-xl tracking-tight text-white drop-shadow-sm">Two-Factor Auth</h3>
              </div>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 md:mb-8 max-w-[320px]">Secure your account with an extra layer of protection during high-volume withdrawals and critical settings changes.</p>
            </div>
            {/* Frosted glass authentication toggle */}
            <div className="glass-card bg-white/[0.04] border border-white/[0.08] backdrop-blur-md p-4 rounded-xl flex items-center justify-between shadow-inner">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white">Authentication Active</span>
              <div className="w-11 sm:w-12 h-[22px] sm:h-6 bg-primary rounded-full relative cursor-pointer p-0.5 sm:p-1 border border-primary/50 shadow-[0_0_15px_rgba(67,97,238,0.4)]">
                <div className="w-[18px] sm:w-4 h-[18px] sm:h-4 bg-white rounded-full absolute right-0.5 sm:right-1 top-0.5 sm:top-1 shadow-sm"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Password */}
        <section className="lg:col-span-5 bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-outline-variant/10 relative overflow-hidden flex flex-col justify-between min-h-[240px] sm:min-h-[280px]">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
              <span className="material-symbols-outlined text-primary text-lg sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>password</span>
              <h3 className="font-bold text-sm sm:text-base md:text-lg tracking-tight">Password Management</h3>
            </div>
            <p className="text-secondary text-[11px] sm:text-xs leading-relaxed max-w-[250px] relative z-10">Last updated 14 days ago. We strongly recommend changing your password every 90 days to maintain institutional compliance standards.</p>
          </div>
          
          <div className="relative z-10 mt-6 md:mt-0">
             <button className="w-full bg-dark text-white py-2.5 sm:py-3 rounded-lg text-xs font-bold hover:bg-dark/90 transition-all shadow-sm">Update Password</button>
             <button className="w-full bg-transparent text-secondary py-2.5 sm:py-3 rounded-lg text-xs font-bold hover:text-on-surface transition-all mt-2">View Login History</button>
          </div>
          {/* Decorative icon */}
          <div className="absolute -bottom-4 -right-4 opacity-[0.03] pointer-events-none">
            <span className="material-symbols-outlined text-[120px] sm:text-[140px]" style={{ fontVariationSettings: "'FILL' 1" }}>key</span>
          </div>
        </section>

        {/* Trusted Devices */}
        <section className="lg:col-span-8 bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-outline-variant/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="material-symbols-outlined text-primary text-lg sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>devices</span>
              <h3 className="font-bold text-sm sm:text-base md:text-lg tracking-tight">Trusted Devices</h3>
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded uppercase">3 Active</span>
          </div>
          <div className="space-y-2 sm:space-y-3 relative z-10">
            {[
              ['laptop_mac', 'MacBook Pro 16"', 'Sonoma OS', 'London, UK • Current Session'],
              ['smartphone', 'iPhone 15 Pro', 'iOS 17', 'London, UK • 2 hours ago'],
            ].map(([icon, name, os, detail]) => (
              <div key={name} className="flex items-center justify-between p-2.5 sm:p-3 md:p-4 bg-background rounded-xl border border-transparent hover:border-primary/10 transition-all">
                <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center bg-primary/5 rounded-lg shrink-0">
                    <span className="material-symbols-outlined text-primary text-base sm:text-lg">{icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-on-background truncate">{name} — {os}</p>
                    <p className="text-[9px] sm:text-[10px] text-secondary truncate">{detail}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary hover:text-error cursor-pointer transition-colors text-lg sm:text-xl shrink-0 ml-2">logout</span>
              </div>
            ))}
          </div>
          {/* Decorative icon */}
          <div className="absolute -bottom-6 -right-6 opacity-[0.03] pointer-events-none">
            <span className="material-symbols-outlined text-[140px] sm:text-[180px]" style={{ fontVariationSettings: "'FILL' 1" }}>devices</span>
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="col-span-full bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-outline-variant/10 relative overflow-hidden">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
            <span className="material-symbols-outlined text-primary text-lg sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
            <h3 className="font-bold text-sm sm:text-base md:text-lg tracking-tight">Notification Preferences</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 relative z-10">
            {[
              { title: 'Security Alerts', items: [['Critical Logins', true], ['Large Withdrawals', true]] },
              { title: 'Market Updates', items: [['Position Liquidity', true], ['Portfolio Daily Brief', false]] },
              { title: 'Channels', items: [['Push Notifications', true], ['Encrypted Email', true]] },
            ].map(col => (
              <div key={col.title} className="space-y-3 sm:space-y-4">
                <h4 className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-primary/60">{col.title}</h4>
                {col.items.map(([label, on]) => (
                  <div key={label} className="flex items-center justify-between py-1.5 sm:py-2">
                    <span className="text-xs sm:text-sm font-medium text-on-background">{label}</span>
                    <div className={`w-9 sm:w-10 h-[18px] sm:h-5 ${on ? 'bg-primary' : 'bg-outline-variant'} rounded-full relative p-0.5 cursor-pointer`}>
                      <div className={`w-3.5 sm:w-4 h-3.5 sm:h-4 bg-white rounded-full absolute top-0.5 ${on ? 'right-0.5' : 'left-0.5'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Decorative icon */}
          <div className="absolute -bottom-6 -right-6 opacity-[0.03] pointer-events-none">
            <span className="material-symbols-outlined text-[140px] sm:text-[180px]" style={{ fontVariationSettings: "'FILL' 1" }}>notifications</span>
          </div>
        </section>
      </div>
    </div>
  )
}
