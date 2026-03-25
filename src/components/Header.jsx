export default function Header({ searchPlaceholder = 'Search...', onMenuToggle }) {
  return (
    <header className="h-14 md:h-16 glass-header border-b border-outline-variant/10 flex items-center justify-between px-4 md:px-8 z-10 shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors -ml-1"
        >
          <span className="material-symbols-outlined text-xl">menu</span>
        </button>

        <div className="relative w-48 md:w-72 hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg">search</span>
          <input
            className="w-full bg-surface-container-low border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary transition-all outline-none"
            placeholder={searchPlaceholder}
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile search */}
        <button className="sm:hidden p-2 text-secondary hover:bg-surface-container-high rounded-full transition-colors">
          <span className="material-symbols-outlined text-xl">search</span>
        </button>
        <button className="relative p-2 text-secondary hover:bg-surface-container-high rounded-full transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface-bright"></span>
        </button>
        <button className="p-2 text-secondary hover:bg-surface-container-high rounded-full transition-colors hidden md:block">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
    </header>
  )
}
