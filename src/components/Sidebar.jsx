import { NavLink } from 'react-router-dom'

const navItems = [
  {
    section: 'Main',
    items: [
      { label: 'Dashboard', icon: 'dashboard', path: '/' },
    ]
  },
  {
    section: 'Finance',
    items: [
      { label: 'Accounts', icon: 'account_balance_wallet', path: '/accounts' },
      { label: 'Deposit', icon: 'payments', path: '/deposit' },
      { label: 'Withdraw', icon: 'account_balance', path: '/withdraw' },
      { label: 'Transactions', icon: 'history', path: '/transactions' },
    ]
  },
  {
    section: 'Account',
    items: [
      { label: 'Verification', icon: 'verified_user', path: '/verification' },
      { label: 'Security', icon: 'security', path: '/security' },
      { label: 'Support', icon: 'support_agent', path: '/support' },
      { label: 'Settings', icon: 'settings', path: '/settings' },
    ]
  },
]

export default function Sidebar({ onClose }) {
  return (
    <aside className="w-64 bg-surface-container-low flex flex-col border-r border-outline-variant/10 h-full">
      <div className="p-6 flex flex-col gap-1">
        {/* Logo + Close */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
            </div>
            <div>
              <h1 className="text-on-background font-bold text-sm tracking-tight leading-none">BrokerPortal</h1>
              <p className="text-secondary text-[10px] uppercase tracking-widest mt-1">Institutional Division</p>
            </div>
          </div>
          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-secondary hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 mt-2">
          {navItems.map(group => (
            <div key={group.section} className="mb-4">
              <p className="text-[10px] uppercase tracking-widest font-bold text-secondary/60 px-3 mb-2">{group.section}</p>
              {group.items.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'text-secondary hover:bg-surface-container'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        {item.icon}
                      </span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </div>

      {/* User Profile */}
      <div className="mt-auto p-6">
        <div className="bg-surface-container rounded-xl p-4 border border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold text-sm">AV</div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-on-background truncate">Alexander Vance</p>
              <p className="text-[10px] text-secondary truncate">Tier 3 Investor</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
