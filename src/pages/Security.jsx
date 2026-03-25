export default function Security() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header & Security Health */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-on-background">Security &amp; Settings</h2>
          <p className="text-secondary mt-1 text-sm">Manage your institutional identity and asset protection protocols.</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/15 flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">Security Level</span>
            <span className="text-sm font-bold text-on-background mt-0.5">Highly Protected</span>
          </div>
          <div className="flex gap-1">
            <div className="w-8 h-1.5 rounded-full bg-primary"></div>
            <div className="w-8 h-1.5 rounded-full bg-primary"></div>
            <div className="w-8 h-1.5 rounded-full bg-primary"></div>
            <div className="w-8 h-1.5 rounded-full bg-outline-variant"></div>
          </div>
        </div>
      </div>

      {/* Bento Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Profile Information */}
        <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_20px_-4px_rgba(20,27,44,0.04)] border border-outline-variant/10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              <h3 className="font-bold text-lg tracking-tight">Profile Information</h3>
            </div>
            <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">Edit Profile</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              ['Full Legal Name', 'Alexander Vance'],
              ['Email Address', 'a.vance@institutional.capital'],
              ['Institutional ID', 'BR-992-XC-04'],
              ['Entity Type', 'Family Office / Ultra-High Net Worth'],
            ].map(([label, value]) => (
              <div key={label} className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-secondary">{label}</label>
                <div className="bg-surface-container-low px-4 py-3 rounded-lg text-sm font-medium text-on-background">{value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 2FA */}
        <section className="col-span-12 lg:col-span-4 bg-primary text-on-primary rounded-xl p-8 shadow-lg flex flex-col justify-between overflow-hidden relative group">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>enhanced_encryption</span>
              <h3 className="font-bold text-lg tracking-tight">Two-Factor Auth</h3>
            </div>
            <p className="text-on-primary/70 text-sm leading-relaxed mb-8">Secure your account with an extra layer of protection during high-volume withdrawals.</p>
            <div className="flex items-center justify-between bg-on-primary/10 p-4 rounded-xl backdrop-blur-sm">
              <span className="text-xs font-bold uppercase tracking-widest">Authentication</span>
              <div className="w-12 h-6 bg-on-primary rounded-full relative cursor-pointer p-1">
                <div className="w-4 h-4 bg-primary rounded-full absolute right-1"></div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 opacity-10">
            <span className="material-symbols-outlined text-[160px]">shield_lock</span>
          </div>
        </section>

        {/* Password */}
        <section className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_20px_-4px_rgba(20,27,44,0.04)] border border-outline-variant/10">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>password</span>
            <h3 className="font-bold text-lg tracking-tight">Password</h3>
          </div>
          <div className="space-y-4">
            <p className="text-secondary text-xs leading-relaxed">Last updated 14 days ago. We recommend changing your password every 90 days for institutional compliance.</p>
            <button className="w-full bg-surface-container-high py-3 rounded-lg text-xs font-bold uppercase tracking-widest text-on-background hover:bg-surface-container transition-all">Update Password</button>
          </div>
        </section>

        {/* Trusted Devices */}
        <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_20px_-4px_rgba(20,27,44,0.04)] border border-outline-variant/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>devices</span>
              <h3 className="font-bold text-lg tracking-tight">Trusted Devices</h3>
            </div>
            <span className="text-[10px] font-bold bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded uppercase">3 Active</span>
          </div>
          <div className="space-y-3">
            {[
              ['laptop_mac', 'MacBook Pro 16" — Sonoma OS', 'London, UK • Current Session'],
              ['smartphone', 'iPhone 15 Pro — iOS 17', 'London, UK • 2 hours ago'],
            ].map(([icon, name, detail]) => (
              <div key={name} className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-transparent hover:border-outline-variant/20 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-surface-container-highest rounded-lg">
                    <span className="material-symbols-outlined text-primary">{icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-background">{name}</p>
                    <p className="text-[10px] text-secondary">{detail}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary hover:text-error cursor-pointer transition-colors">logout</span>
              </div>
            ))}
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="col-span-12 bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_20px_-4px_rgba(20,27,44,0.04)] border border-outline-variant/10">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
            <h3 className="font-bold text-lg tracking-tight">Notification Preferences</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Security Alerts', items: [['Critical Logins', true], ['Large Withdrawals', true]] },
              { title: 'Market Updates', items: [['Position Liquidity', true], ['Portfolio Daily Brief', false]] },
              { title: 'Channels', items: [['Push Notifications', true], ['Encrypted Email', true]] },
            ].map(col => (
              <div key={col.title} className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-secondary">{col.title}</h4>
                {col.items.map(([label, on]) => (
                  <div key={label} className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-on-background">{label}</span>
                    <div className={`w-10 h-5 ${on ? 'bg-primary' : 'bg-outline-variant'} rounded-full relative p-0.5`}>
                      <div className={`w-4 h-4 bg-on-primary rounded-full absolute ${on ? 'right-0.5' : 'left-0.5'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between py-8 border-t border-outline-variant/10 text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">
        <span>Account Security Protocol: v4.12.0</span>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a className="hover:text-primary transition-colors" href="#">Audit Log</a>
          <a className="hover:text-primary transition-colors" href="#">Privacy Charter</a>
          <a className="hover:text-primary transition-colors" href="#">Export Data</a>
        </div>
      </div>
    </div>
  )
}
