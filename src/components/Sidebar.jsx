import { NavLink } from 'react-router-dom'

const navItems = [
  {
    section: 'Main',
    items: [
      { label: 'Dashboard', icon: 'dashboard', path: '/' },
      { label: 'IB Program', icon: 'handshake', path: '/ib-program' },
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
      { label: 'Profile Details', icon: 'person', path: '/settings' },
      { label: 'Security Center', icon: 'security', path: '/security' },
      { label: 'Identity & KYC', icon: 'verified_user', path: '/verification' },
      { label: 'Support Portal', icon: 'support_agent', path: '/support' },
    ]
  },
]

export default function Sidebar({ onClose, isCollapsed, onCollapseToggle }) {
  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-surface-container-low flex flex-col border-r border-outline-variant/10 h-full transition-[width] duration-300 ease-in-out`}>
      <div className={`p-6 flex flex-col gap-1 ${isCollapsed ? 'items-center px-2' : ''}`}>
        {/* Logo + Close */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-6 overflow-hidden`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
            </div>
            <div className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
              <h1 className="text-on-background font-bold text-sm tracking-tight leading-none whitespace-nowrap">BrokerPortal</h1>
              <p className="text-secondary text-[10px] uppercase tracking-widest mt-1 whitespace-nowrap">Institutional Division</p>
            </div>
          </div>
          {/* Desktop Collapse Toggle */}
          <button
            onClick={onCollapseToggle}
            className={`hidden lg:flex p-1 text-secondary hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors shrink-0 ${isCollapsed ? 'mx-auto' : ''}`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isCollapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
          {/* Close button on mobile */}
          {!isCollapsed && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-secondary hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className={`flex flex-col gap-1 mt-2 text-left ${isCollapsed ? 'items-center w-full' : ''}`}>
          {navItems.map(group => (
            <div key={group.section} className={`mb-4 ${isCollapsed ? 'w-full flex flex-col items-center' : ''}`}>
              {!isCollapsed && <p className="text-[10px] uppercase tracking-widest font-bold text-secondary/60 px-3 mb-2">{group.section}</p>}
              {group.items.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  title={isCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `flex items-center ${isCollapsed ? 'justify-center p-3 mx-auto w-12 h-12' : 'gap-3 px-3 py-2'} rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'text-secondary hover:bg-surface-container hover:text-on-surface'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className="material-symbols-outlined text-[20px] shrink-0"
                        style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        {item.icon}
                      </span>
                      {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </div>

      {/* User Profile */}
      <div className={`mt-auto ${isCollapsed ? 'p-4 flex flex-col items-center gap-2' : 'p-6 flex flex-col gap-3'}`}>
        <div className={`bg-surface-container rounded-xl border border-outline-variant/10 ${isCollapsed ? 'p-2' : 'p-4 w-full'}`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold text-sm shrink-0">AV</div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-on-background truncate">Alexander Vance</p>
                <p className="text-[10px] text-secondary truncate">Tier 3 Investor</p>
              </div>
            )}
          </div>
        </div>
        
        <NavLink 
          to="/auth" 
          className={`flex items-center text-error/80 hover:text-error hover:bg-error/10 transition-colors rounded-lg ${isCollapsed ? 'justify-center p-3 w-12 h-12 shrink-0' : 'gap-3 px-4 py-2.5 w-full'}`}
          title="Logout"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          {!isCollapsed && <span className="text-sm font-bold">Logout</span>}
        </NavLink>
      </div>
    </aside>
  )
}
