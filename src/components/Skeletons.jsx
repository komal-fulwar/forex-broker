/**
 * Reusable skeleton primitives + page-specific skeleton layouts.
 * Usage: <Skeleton w="w-32" h="h-4" /> or <DashboardSkeleton />
 */

/* ── Primitive ── */
export function Skeleton({ w = 'w-full', h = 'h-4', rounded = 'rounded-lg', className = '' }) {
  return <div className={`skeleton ${w} ${h} ${rounded} ${className}`} />
}

export function SkeletonCircle({ size = 'h-9 w-9' }) {
  return <div className={`skeleton ${size} rounded-full shrink-0`} />
}

/* ── Card shell ── */
function CardShell({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl p-4 sm:p-5 md:p-6 border border-outline-variant/10 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

/* ── Dashboard ── */
export function DashboardSkeleton() {
  return (
    <div className="w-full space-y-4 sm:space-y-6 md:space-y-8">
      {/* Hero */}
      <section className="flex flex-col sm:flex-row gap-4 sm:gap-8 sm:items-end">
        <div className="flex-1 space-y-3">
          <Skeleton w="w-36" h="h-3" />
          <Skeleton w="w-64" h="h-10" />
        </div>
        <div className="flex gap-8 sm:border-l border-outline-variant/30 sm:pl-10">
          <div className="space-y-2">
            <Skeleton w="w-20" h="h-3" />
            <Skeleton w="w-24" h="h-7" />
          </div>
          <div className="space-y-2">
            <Skeleton w="w-20" h="h-3" />
            <Skeleton w="w-24" h="h-7" />
          </div>
        </div>
      </section>
      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {[0, 1].map(i => (
          <CardShell key={i} className="min-h-[100px] flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton w="w-24" h="h-3" />
              <Skeleton w="w-32" h="h-6" />
            </div>
            <Skeleton w="w-16" h="h-8" rounded="rounded-xl" />
          </CardShell>
        ))}
      </div>
      {/* IB Program */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <CardShell className="lg:col-span-2 min-h-[280px] space-y-4">
          <Skeleton w="w-28" h="h-3" />
          <Skeleton w="w-64" h="h-8" />
          <Skeleton w="w-full max-w-md" h="h-4" />
          <Skeleton w="w-80" h="h-4" />
          <div className="flex gap-4 mt-6">
            <Skeleton w="w-32" h="h-10" rounded="rounded-xl" />
            <Skeleton w="w-36" h="h-10" rounded="rounded-xl" />
          </div>
        </CardShell>
        <CardShell className="space-y-3">
          <Skeleton w="w-24" h="h-3" />
          {[0, 1, 2].map(i => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-outline-variant/5">
              <SkeletonCircle size="h-9 w-9" />
              <div className="flex-1 space-y-1.5">
                <Skeleton w="w-28" h="h-4" />
                <Skeleton w="w-20" h="h-3" />
              </div>
            </div>
          ))}
        </CardShell>
      </div>
      {/* Pending */}
      <CardShell className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton w="w-32" h="h-4" />
          <Skeleton w="w-28" h="h-5" rounded="rounded-full" />
        </div>
        {[0, 1].map(i => (
          <div key={i} className="flex items-center gap-3 py-3">
            <SkeletonCircle />
            <div className="flex-1 space-y-1.5">
              <Skeleton w="w-40" h="h-4" />
              <Skeleton w="w-56" h="h-3" />
            </div>
            <Skeleton w="w-16" h="h-4" />
          </div>
        ))}
      </CardShell>
    </div>
  )
}

/* ── Accounts ── */
export function AccountsSkeleton() {
  return (
    <div className="w-full">
      {/* Header */}
      <header className="mb-4 sm:mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <Skeleton w="w-28" h="h-3" />
          <Skeleton w="w-40" h="h-9" />
        </div>
        <Skeleton w="w-44" h="h-11" rounded="rounded-lg" />
      </header>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-12">
        {[0, 1, 2].map(i => (
          <CardShell key={i} className="min-h-[240px] flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="space-y-2">
                <Skeleton w="w-20" h="h-3" />
                <Skeleton w="w-28" h="h-5" />
                <Skeleton w="w-24" h="h-3" />
              </div>
              <SkeletonCircle />
            </div>
            <div className="mt-auto pt-4 space-y-3">
              <Skeleton w="w-20" h="h-3" />
              <Skeleton w="w-36" h="h-8" />
              <div className="flex gap-2 pt-3 border-t border-outline-variant/5">
                <Skeleton w="flex-1" h="h-8" rounded="rounded-lg" />
                <Skeleton w="flex-1" h="h-8" rounded="rounded-lg" />
              </div>
            </div>
          </CardShell>
        ))}
      </div>
      {/* Rows */}
      <div className="space-y-2 border-t border-outline-variant/10 pt-6">
        <div className="flex justify-between items-center mb-4">
          <Skeleton w="w-28" h="h-5" />
          <Skeleton w="w-32" h="h-4" />
        </div>
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-4 py-3">
            <SkeletonCircle size="h-10 w-10" />
            <div className="flex-1 space-y-1.5">
              <Skeleton w="w-32" h="h-4" />
              <Skeleton w="w-48" h="h-3" />
            </div>
            <Skeleton w="w-24" h="h-5" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Verification ── */
export function VerificationSkeleton() {
  return (
    <div className="w-full">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <Skeleton w="w-28" h="h-4" />
        <Skeleton w="w-40" h="h-7" rounded="rounded-full" />
      </div>
      {/* Steps */}
      <nav className="mb-8 md:mb-12">
        <div className="flex gap-0">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="flex-1 pb-4 border-b-2 border-outline-variant/10 space-y-2 pr-4">
              <Skeleton w="w-12" h="h-3" />
              <Skeleton w="w-16" h="h-4" />
            </div>
          ))}
        </div>
      </nav>
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
        <CardShell className="md:col-span-8 space-y-6 min-h-[460px]">
          <div className="space-y-2">
            <Skeleton w="w-48" h="h-7" />
            <Skeleton w="w-80" h="h-4" />
          </div>
          <div className="space-y-3">
            <Skeleton w="w-32" h="h-3" />
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map(i => <Skeleton key={i} w="w-full" h="h-20" rounded="rounded-xl" />)}
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton w="w-28" h="h-3" />
            <Skeleton w="w-full" h="h-44" rounded="rounded-xl" />
          </div>
        </CardShell>
        <aside className="md:col-span-4 space-y-4 md:space-y-6">
          <CardShell className="space-y-3">
            <div className="flex items-center gap-3">
              <SkeletonCircle size="h-8 w-8" />
              <Skeleton w="w-32" h="h-4" />
            </div>
            <Skeleton w="w-full" h="h-3" />
            <Skeleton w="w-3/4" h="h-3" />
          </CardShell>
          <CardShell className="space-y-4">
            <Skeleton w="w-32" h="h-3" />
            {[0, 1, 2].map(i => (
              <div key={i} className="flex items-start gap-3">
                <SkeletonCircle size="h-6 w-6" />
                <Skeleton w="w-full" h="h-4" />
              </div>
            ))}
          </CardShell>
          <div className="skeleton-dark rounded-xl h-[150px]" />
        </aside>
      </div>
    </div>
  )
}

/* ── Deposit ── */
export function DepositSkeleton() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6 md:mb-10">
        <div className="space-y-2">
          <Skeleton w="w-24" h="h-3" />
          <Skeleton w="w-36" h="h-8" />
        </div>
        <Skeleton w="w-28 sm:w-32" h="h-4" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8">
        <div className="lg:col-span-8 space-y-6">
          <CardShell className="space-y-5">
            <Skeleton w="w-32" h="h-3" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[0, 1, 2, 3].map(i => <Skeleton key={i} w="w-full" h="h-20" rounded="rounded-xl" />)}
            </div>
          </CardShell>
          <CardShell className="space-y-4">
            <Skeleton w="w-24" h="h-3" />
            <Skeleton w="w-full" h="h-11" rounded="rounded-lg" />
            <Skeleton w="w-full" h="h-11" rounded="rounded-lg" />
            <Skeleton w="w-40" h="h-11 mt-4" rounded="rounded-xl" />
          </CardShell>
        </div>
        <aside className="lg:col-span-4 space-y-4">
          <div className="skeleton-dark rounded-xl h-[170px]" />
          <CardShell className="space-y-4">
            <div className="flex items-center gap-2">
              <SkeletonCircle size="h-7 w-7" />
              <Skeleton w="w-24" h="h-4" />
            </div>
            {[0, 1, 2].map(i => (
              <div key={i} className="flex items-center gap-3">
                <SkeletonCircle size="h-5 w-5" />
                <Skeleton w="w-full" h="h-3" />
              </div>
            ))}
          </CardShell>
        </aside>
      </div>
    </div>
  )
}

/* ── Security ── */
export function SecuritySkeleton() {
  return (
    <div className="w-full space-y-4 sm:space-y-6 md:space-y-8">
      <div className="space-y-2">
        <Skeleton w="w-28" h="h-3" />
        <Skeleton w="w-32" h="h-8" />
      </div>
      {/* 2FA card dark */}
      <div className="skeleton-dark rounded-xl sm:rounded-2xl h-[180px] sm:h-[200px]" />
      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {[0, 1, 2, 3].map(i => (
          <CardShell key={i} className="min-h-[160px] space-y-4">
            <div className="flex items-center gap-3">
              <SkeletonCircle size="h-9 w-9" />
              <div className="space-y-1.5">
                <Skeleton w="w-28" h="h-4" />
                <Skeleton w="w-48" h="h-3" />
              </div>
            </div>
            <Skeleton w="w-full" h="h-10" rounded="rounded-lg" />
            <Skeleton w="w-2/3" h="h-3" />
          </CardShell>
        ))}
      </div>
    </div>
  )
}

/* ── Support ── */
export function SupportSkeleton() {
  return (
    <div className="w-full">
      {/* Header */}
      <header className="mb-4 sm:mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <Skeleton w="w-20" h="h-3" />
          <Skeleton w="w-36" h="h-9" />
        </div>
        <Skeleton w="w-36" h="h-11" rounded="rounded-lg" />
      </header>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-8">
        {[0, 1, 2, 3].map(i => (
          <CardShell key={i} className="space-y-3">
            <SkeletonCircle size="h-8 w-8" />
            <Skeleton w="w-16" h="h-7" />
            <Skeleton w="w-24" h="h-3" />
          </CardShell>
        ))}
      </div>
      {/* Tab bar */}
      <div className="flex gap-4 mb-5 border-b border-outline-variant/10 pb-3">
        <Skeleton w="w-24" h="h-4" />
        <Skeleton w="w-28" h="h-4" />
      </div>
      {/* Ticket rows */}
      {[0, 1, 2, 3, 4].map(i => (
        <div key={i} className="flex items-center gap-4 py-3.5 border-b border-outline-variant/5">
          <Skeleton w="w-1" h="h-10" rounded="rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton w="w-56" h="h-4" />
            <Skeleton w="w-40" h="h-3" />
          </div>
          <Skeleton w="w-20" h="h-6" rounded="rounded-md" />
        </div>
      ))}
    </div>
  )
}

/* ── Transactions ── */
export function TransactionsSkeleton() {
  return (
    <div className="w-full space-y-4">
      <header className="mb-4 sm:mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <Skeleton w="w-20" h="h-3" />
          <Skeleton w="w-36" h="h-9" />
        </div>
      </header>
      <div className="flex gap-4 border-b border-outline-variant/10 pb-3 mb-6">
        {[0, 1, 2, 3].map(i => <Skeleton key={i} w="w-16" h="h-4" />)}
      </div>
      <div className="space-y-4 border border-outline-variant/10 rounded-xl overflow-hidden bg-white shadow-sm">
        <div className="bg-surface-container-low p-4 border-b border-outline-variant/10 hidden md:flex gap-6">
           <Skeleton w="w-32" h="h-4" />
           <Skeleton w="w-32" h="h-4" />
           <Skeleton w="w-32" h="h-4" />
        </div>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div key={i} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b last:border-0 border-outline-variant/5">
            <div className="flex items-center gap-3">
              <SkeletonCircle size="h-9 w-9" />
              <div className="space-y-1.5"><Skeleton w="w-32" h="h-4" /><Skeleton w="w-24" h="h-3" /></div>
            </div>
            <Skeleton w="w-24" h="h-5" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Settings ── */
export function SettingsSkeleton() {
  return (
    <div className="w-full pb-16">
      <header className="mb-8 md:mb-12 border-b border-outline-variant/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <Skeleton w="w-32" h="h-3" />
          <Skeleton w="w-48" h="h-9" />
        </div>
        <Skeleton w="w-32" h="h-10" rounded="rounded-lg" />
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4 space-y-4">
          <CardShell className="flex w-full items-center justify-center p-8 space-y-4 flex-col">
            <SkeletonCircle size="w-32 h-32" />
            <Skeleton w="w-24" h="h-4" />
            <Skeleton w="w-40" h="h-3" />
          </CardShell>
        </div>
        <div className="lg:col-span-8 space-y-6">
          <CardShell className="space-y-5">
            <Skeleton w="w-40" h="h-6 mb-2" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Skeleton w="w-20" h="h-3" /><Skeleton w="w-full" h="h-11" rounded="rounded-lg" /></div>
              <div className="space-y-2"><Skeleton w="w-20" h="h-3" /><Skeleton w="w-full" h="h-11" rounded="rounded-lg" /></div>
            </div>
            <div className="space-y-2"><Skeleton w="w-20" h="h-3" /><Skeleton w="w-full" h="h-11" rounded="rounded-lg" /></div>
          </CardShell>
        </div>
      </div>
    </div>
  )
}

/* ── IB Program ── */
export function IBSkeleton() {
  return (
    <div className="w-full">
      <header className="mb-4 sm:mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <Skeleton w="w-24" h="h-3" />
          <Skeleton w="w-40" h="h-9" />
        </div>
        <div className="flex gap-3">
          <Skeleton w="w-32" h="h-10" rounded="rounded-lg" />
          <Skeleton w="w-24" h="h-10" rounded="rounded-lg" />
        </div>
      </header>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-6">
        {[0, 1, 2, 3].map(i => (
          <CardShell key={i} className="min-h-[120px] space-y-4 flex flex-col justify-center">
            <Skeleton w="w-24" h="h-3" />
            <Skeleton w="w-36" h="h-7" />
          </CardShell>
        ))}
      </div>
      <CardShell className="space-y-4 min-h-[400px]">
        <div className="flex gap-4 border-b border-outline-variant/10 pb-4">
          <Skeleton w="w-20" h="h-4" />
          <Skeleton w="w-20" h="h-4" />
        </div>
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="py-4 border-b border-outline-variant/5 flex justify-between">
            <div className="space-y-2"><Skeleton w="w-32" h="h-4" /><Skeleton w="w-24" h="h-3" /></div>
            <Skeleton w="w-16" h="h-6" />
          </div>
        ))}
      </CardShell>
    </div>
  )
}

/* ── Performance ── */
export function PerformanceSkeleton() {
  return (
    <div className="w-full space-y-6 sm:space-y-8 pb-12">
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton w="w-24" h="h-3" />
          <Skeleton w="w-48" h="h-8" />
        </div>
        <div className="flex gap-3">
          <Skeleton w="w-32" h="h-10" rounded="rounded-xl" />
          <Skeleton w="w-32" h="h-10" rounded="rounded-xl" />
        </div>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
        {[0, 1, 2].map(i => (
          <CardShell key={i} className="min-h-[140px] flex flex-col justify-between">
            <div className="space-y-2"><Skeleton w="w-24" h="h-3" /><Skeleton w="w-32" h="h-8" /></div>
          </CardShell>
        ))}
      </div>
      <div>
        <div className="flex justify-between mb-4">
          <Skeleton w="w-32" h="h-5" />
          <div className="flex gap-2"><Skeleton w="w-16" h="h-8" rounded="rounded-md" /><Skeleton w="w-16" h="h-8" rounded="rounded-md" /></div>
        </div>
        <div className="space-y-0.5 mt-4">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-white px-5 py-4 border border-outline-variant/10 shadow-sm flex items-center justify-between">
              <div className="space-y-2"><Skeleton w="w-20" h="h-3" /><Skeleton w="w-32" h="h-4" /></div>
              <Skeleton w="w-24" h="h-5" />
              <div className="space-y-2 text-right flex flex-col items-end"><Skeleton w="w-16" h="h-3" /><Skeleton w="w-20" h="h-4" /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
