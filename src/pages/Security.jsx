export default function Security() {
  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
      {/* Page Header & Security Health */}
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

      {/* Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-6">
        {/* Profile Information */}
        <section className="lg:col-span-8 bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-outline-variant/10">
          <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="material-symbols-outlined text-primary text-lg sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              <h3 className="font-bold text-sm sm:text-base md:text-lg tracking-tight">Profile Information</h3>
            </div>
            <button className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-widest hover:underline">Edit</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-8">
            {[
              ['Full Legal Name', 'Alexander Vance'],
              ['Email Address', 'a.vance@institutional.capital'],
              ['Institutional ID', 'BR-992-XC-04'],
              ['Entity Type', 'Family Office / Ultra-High Net Worth'],
            ].map(([label, value]) => (
              <div key={label} className="space-y-1 sm:space-y-1.5">
                <label className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-secondary">{label}</label>
                <div className="bg-background px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium text-on-background">{value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 2FA - with lock icon background */}
        <section className="lg:col-span-4 bg-primary text-on-primary rounded-xl p-4 sm:p-6 md:p-8 shadow-lg flex flex-col justify-between overflow-hidden relative min-h-[220px] sm:min-h-[260px]">
          <div className="relative z-10">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
              <span className="material-symbols-outlined text-lg sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>enhanced_encryption</span>
              <h3 className="font-bold text-sm sm:text-base md:text-lg tracking-tight">Two-Factor Auth</h3>
            </div>
            <p className="text-on-primary/70 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 md:mb-8 max-w-[240px]">Secure your account with an extra layer of protection during high-volume withdrawals.</p>
            <div className="flex items-center justify-between bg-on-primary/10 p-3 sm:p-4 rounded-xl backdrop-blur-sm">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">Authentication</span>
              <div className="w-11 sm:w-12 h-[22px] sm:h-6 bg-on-primary rounded-full relative cursor-pointer p-0.5 sm:p-1">
                <div className="w-[18px] sm:w-4 h-[18px] sm:h-4 bg-primary rounded-full absolute right-0.5 sm:right-1 top-0.5 sm:top-1"></div>
              </div>
            </div>
          </div>
          {/* Lock icon background decoration — matching the original design */}
          <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 opacity-[0.08] pointer-events-none">
            <span className="material-symbols-outlined text-[140px] sm:text-[180px] md:text-[200px] text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
          </div>
          {/* Circle decoration */}
          <div className="absolute top-1/2 right-8 -translate-y-1/3 w-32 sm:w-40 h-32 sm:h-40 border border-on-primary/10 rounded-full pointer-events-none"></div>
        </section>

        {/* Password */}
        <section className="lg:col-span-4 bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-outline-variant/10">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
            <span className="material-symbols-outlined text-primary text-lg sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>password</span>
            <h3 className="font-bold text-sm sm:text-base md:text-lg tracking-tight">Password</h3>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <p className="text-secondary text-[11px] sm:text-xs leading-relaxed">Last updated 14 days ago. We recommend changing your password every 90 days for institutional compliance.</p>
            <button className="w-full bg-surface-container-high py-2.5 sm:py-3 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-widest text-on-background hover:bg-surface-container transition-all">Update Password</button>
          </div>
        </section>

        {/* Trusted Devices */}
        <section className="lg:col-span-8 bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-outline-variant/10">
          <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="material-symbols-outlined text-primary text-lg sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>devices</span>
              <h3 className="font-bold text-sm sm:text-base md:text-lg tracking-tight">Trusted Devices</h3>
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded uppercase">3 Active</span>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {[
              ['laptop_mac', 'MacBook Pro 16"', 'Sonoma OS', 'London, UK • Current Session'],
              ['smartphone', 'iPhone 15 Pro', 'iOS 17', 'London, UK • 2 hours ago'],
            ].map(([icon, name, os, detail]) => (
              <div key={name} className="flex items-center justify-between p-2.5 sm:p-3 md:p-4 bg-background rounded-xl border border-transparent hover:border-outline-variant/20 transition-all">
                <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center bg-surface-container-highest rounded-lg shrink-0">
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
        </section>

        {/* Notification Preferences */}
        <section className="col-span-full bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-outline-variant/10">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
            <span className="material-symbols-outlined text-primary text-lg sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
            <h3 className="font-bold text-sm sm:text-base md:text-lg tracking-tight">Notification Preferences</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {[
              { title: 'Security Alerts', items: [['Critical Logins', true], ['Large Withdrawals', true]] },
              { title: 'Market Updates', items: [['Position Liquidity', true], ['Portfolio Daily Brief', false]] },
              { title: 'Channels', items: [['Push Notifications', true], ['Encrypted Email', true]] },
            ].map(col => (
              <div key={col.title} className="space-y-3 sm:space-y-4">
                <h4 className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-secondary">{col.title}</h4>
                {col.items.map(([label, on]) => (
                  <div key={label} className="flex items-center justify-between py-1.5 sm:py-2">
                    <span className="text-xs sm:text-sm font-medium text-on-background">{label}</span>
                    <div className={`w-9 sm:w-10 h-[18px] sm:h-5 ${on ? 'bg-primary' : 'bg-outline-variant'} rounded-full relative p-0.5`}>
                      <div className={`w-3.5 sm:w-4 h-3.5 sm:h-4 bg-on-primary rounded-full absolute top-0.5 ${on ? 'right-0.5' : 'left-0.5'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
