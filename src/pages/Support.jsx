import { useState, useEffect } from 'react'
import { SupportSkeleton } from '../components/Skeletons'

const TICKETS = [
  {
    id: 'TKT-4821', subject: 'Withdrawal pending over 48 hours', category: 'Withdrawals', status: 'open', priority: 'high', date: '2026-03-25', lastReply: '2h ago', messages: [
      { from: 'client', name: 'Alexander Vance', time: 'Mar 25, 2026 · 09:14', text: 'I initiated a withdrawal of $12,500 via bank wire on March 23. The transaction is still showing as "Processing." Could you provide an update on the expected settlement timeline?' },
      { from: 'agent', name: 'Sarah K.', role: 'Senior Account Manager', time: 'Mar 25, 2026 · 09:42', text: 'Thank you for reaching out, Mr. Vance. I\'ve escalated your withdrawal request to our settlements team. Bank wire transfers typically process within 3-5 business days, but I\'ve flagged yours for priority review given your Tier 3 status.' },
      { from: 'client', name: 'Alexander Vance', time: 'Mar 25, 2026 · 14:08', text: 'Thank you, Sarah. Could you confirm the receiving bank details are correct on your end? I want to rule out any routing issues.' },
      { from: 'agent', name: 'Sarah K.', role: 'Senior Account Manager', time: 'Mar 25, 2026 · 14:31', text: 'I\'ve confirmed the bank details match your records. The delay appears to be on the intermediary bank side. I expect completion within 24 hours and will update you directly.' },
    ]
  },
  {
    id: 'TKT-4790', subject: 'MT5 ECN account leverage change request', category: 'Accounts', status: 'in-progress', priority: 'medium', date: '2026-03-24', lastReply: '6h ago', messages: [
      { from: 'client', name: 'Alexander Vance', time: 'Mar 24, 2026 · 11:00', text: 'I would like to adjust the leverage on my ECN account (#8829-4401-229) from 1:500 to 1:200 for risk management purposes.' },
      { from: 'agent', name: 'David M.', role: 'Account Operations', time: 'Mar 24, 2026 · 11:45', text: 'Understood, Mr. Vance. Leverage adjustment requests require all open positions on the account to be closed. Once confirmed, the change will take effect at the next server maintenance window (00:00 GMT).' },
      { from: 'client', name: 'Alexander Vance', time: 'Mar 24, 2026 · 15:30', text: 'All positions are now closed. Please proceed with the adjustment.' },
    ]
  },
  {
    id: 'TKT-4756', subject: 'Verification document re-upload', category: 'Verification', status: 'awaiting', priority: 'medium', date: '2026-03-23', lastReply: '1d ago', messages: [
      { from: 'agent', name: 'Compliance Team', role: 'KYC Division', time: 'Mar 23, 2026 · 08:00', text: 'Dear Mr. Vance, the proof of address document submitted on March 20 could not be verified as it exceeds the 3-month validity window. Please re-upload a current utility bill or bank statement.' },
      { from: 'client', name: 'Alexander Vance', time: 'Mar 23, 2026 · 10:15', text: 'I\'ve uploaded a recent bank statement dated March 1, 2026. Please confirm receipt.' },
    ]
  },
  {
    id: 'TKT-4701', subject: 'Request for swap-free account conversion', category: 'Accounts', status: 'resolved', priority: 'low', date: '2026-03-20', lastReply: '3d ago', messages: [
      { from: 'client', name: 'Alexander Vance', time: 'Mar 20, 2026 · 09:00', text: 'I would like to convert my Standard Real account to a swap-free arrangement.' },
      { from: 'agent', name: 'David M.', role: 'Account Operations', time: 'Mar 20, 2026 · 10:30', text: 'Your request has been processed. The swap-free status has been applied to account #8829-4401-229. Please note that an administration fee may apply for positions held beyond 3 days.' },
    ]
  },
  {
    id: 'TKT-4688', subject: 'Two-factor authentication reset', category: 'Security', status: 'resolved', priority: 'high', date: '2026-03-18', lastReply: '5d ago', messages: [
      { from: 'client', name: 'Alexander Vance', time: 'Mar 18, 2026 · 07:45', text: 'I\'ve changed my mobile device and need to reset my 2FA authentication. I can provide identity verification as needed.' },
      { from: 'agent', name: 'Security Team', role: 'Identity Verification', time: 'Mar 18, 2026 · 08:20', text: 'For security purposes, please confirm your registered email address and the last 4 digits of your phone number. We will then send a one-time reset link.' },
    ]
  },
]

const FAQS = [
  { q: 'How do I reset my trading password?', a: 'Navigate to Security → Password Management and follow the guided reset flow. Your trading sessions will not be interrupted.' },
  { q: 'What documents are required for verification?', a: 'A government-issued photo ID (passport or national ID) and a proof of address dated within 3 months (utility bill or bank statement).' },
  { q: 'How long do withdrawals typically take?', a: 'Card withdrawals process within 1-3 business days. Bank wire transfers take 3-5 business days. Crypto withdrawals are processed within 2 hours.' },
  { q: 'Can I change my account leverage?', a: 'Yes — open a support ticket under "Accounts" category or use Manage on your Accounts page. Leverage changes take effect on the next trading session.' },
]

const STATUS_MAP = {
  'open': 'Open',
  'in-progress': 'In Progress',
  'awaiting': 'Awaiting Reply',
  'resolved': 'Resolved',
}

export default function Support() {
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('tickets')
  const [filter, setFilter] = useState('all')
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [selectedTicket, setSelectedTicket] = useState(null)

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t) }, [])

  if (loading) return <SupportSkeleton />

  const filtered = filter === 'all' ? TICKETS : TICKETS.filter(t => t.status === filter)
  const activeCount = TICKETS.filter(t => t.status !== 'resolved').length

  /* ─── Ticket Detail View ─── */
  if (selectedTicket) {
    const ticket = selectedTicket
    const sc = STATUS_MAP[ticket.status]
    return (
      <div className="w-full animate-fade-in">
        {/* Back navigation */}
        <button onClick={() => setSelectedTicket(null)} className="flex items-center gap-2 text-secondary hover:text-on-surface transition-colors mb-4 sm:mb-6 group">
          <span className="material-symbols-outlined text-base group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
          <span className="text-xs sm:text-sm font-medium">Back to tickets</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-6">
          {/* Thread */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-5">
            {/* Subject header */}
            <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 border border-outline-variant/10 shadow-sm">
              <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                <div>
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-on-surface tracking-tight">{ticket.subject}</h2>
                  <p className="text-[10px] sm:text-[11px] text-secondary mt-1 font-mono">{ticket.id} · {ticket.category} · Opened {ticket.date}</p>
                </div>
                <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shrink-0 ${
                  ticket.status === 'resolved' ? 'bg-background text-secondary' : 'bg-dark/5 text-on-surface'
                }`}>{sc}</span>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-3 sm:space-y-4">
              {ticket.messages.map((msg, i) => (
                <div key={i} className={`rounded-xl p-4 sm:p-5 border shadow-sm ${
                  msg.from === 'agent'
                    ? 'bg-white border-outline-variant/10'
                    : 'bg-background border-outline-variant/8'
                }`}>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold ${
                      msg.from === 'agent' ? 'bg-primary/10 text-primary' : 'bg-dark/8 text-dark'
                    }`}>
                      {msg.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-on-surface">{msg.name}</p>
                      <p className="text-[9px] sm:text-[10px] text-secondary">
                        {msg.role && <>{msg.role} · </>}{msg.time}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Reply box */}
            {ticket.status !== 'resolved' && (
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-outline-variant/10 shadow-sm">
                <textarea
                  className="w-full bg-background border border-outline-variant/15 rounded-lg text-xs sm:text-sm text-on-surface p-3 sm:p-4 outline-none focus:ring-1 focus:ring-primary/20 resize-none placeholder:text-secondary/40"
                  rows={3}
                  placeholder="Write your reply..."
                />
                <div className="flex items-center justify-between mt-3">
                  <button className="text-secondary hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-lg">attach_file</span>
                  </button>
                  <button className="bg-dark text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-[10px] sm:text-xs font-bold hover:bg-dark/90 transition-all">
                    Send Reply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <aside className="lg:col-span-4 space-y-4 sm:space-y-5">
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-outline-variant/10 shadow-sm space-y-3 sm:space-y-4">
              <h4 className="text-xs sm:text-sm font-bold text-on-surface">Ticket Details</h4>
              {[
                ['Status', sc],
                ['Priority', ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)],
                ['Category', ticket.category],
                ['Created', ticket.date],
                ['Last Updated', ticket.lastReply],
                ['Messages', ticket.messages.length.toString()],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-1.5 border-b border-outline-variant/5 last:border-0">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-secondary font-bold">{label}</span>
                  <span className="text-[10px] sm:text-xs font-medium text-on-surface">{value}</span>
                </div>
              ))}
            </div>

            {/* Assigned Agent */}
            {ticket.messages.find(m => m.from === 'agent') && (
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-outline-variant/10 shadow-sm">
                <h4 className="text-[9px] sm:text-[10px] uppercase tracking-widest text-secondary font-bold mb-3">Assigned Agent</h4>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {ticket.messages.find(m => m.from === 'agent').name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-on-surface">{ticket.messages.find(m => m.from === 'agent').name}</p>
                    <p className="text-[9px] sm:text-[10px] text-secondary">{ticket.messages.find(m => m.from === 'agent').role}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-background rounded-xl p-4 sm:p-5 border border-outline-variant/10 space-y-2">
              <h4 className="text-[9px] sm:text-[10px] uppercase tracking-widest text-secondary font-bold mb-2">Quick Actions</h4>
              {[
                ['priority', 'Escalate Priority'],
                ['close', 'Close Ticket'],
              ].map(([icon, label]) => (
                <button key={label} className="w-full text-left flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-white transition-colors text-xs font-medium text-on-surface">
                  <span className="material-symbols-outlined text-sm text-secondary">{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    )
  }

  /* ─── Main Ticket List View ─── */
  return (
    <div className="w-full animate-fade-in">
      {/* Header — matches Accounts page pattern exactly */}
      <header className="mb-4 sm:mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 md:gap-6">
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-secondary font-bold">Client Services</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-on-surface">Support</h1>
        </div>
        <button
          onClick={() => setShowNewTicket(true)}
          className="bg-dark text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold hover:bg-dark/90 transition-all shadow-sm w-full sm:w-auto"
        >
          <span className="material-symbols-outlined text-sm sm:text-base">add</span>
          New Ticket
        </button>
      </header>

      {/* Quick Stats — styled like Security's inline profile fields */}
      <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 border border-outline-variant/10 shadow-sm mb-6 sm:mb-8 md:mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {[
            [activeCount, 'Active Tickets'],
            ['< 2h', 'Avg. Response'],
            [TICKETS.filter(t => t.status === 'resolved').length, 'Resolved (30d)'],
            ['98%', 'Satisfaction Rate'],
          ].map(([value, label]) => (
            <div key={label} className="space-y-0.5">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-primary/70 font-bold">{label}</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-on-surface">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Toggle */}
      <div className="flex items-center gap-1 mb-4 sm:mb-6 border-b border-outline-variant/10">
        {[['tickets', 'My Tickets'], ['faq', 'Knowledge Base']].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setTab(val)}
            className={`text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2.5 sm:py-3 border-b-2 transition-all -mb-[1px] ${
              tab === val
                ? 'text-on-surface border-dark'
                : 'text-secondary border-transparent hover:text-on-surface'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ─── TICKETS TAB ─── */}
      {tab === 'tickets' && (
        <section>
          {/* Filters — styled like Accounts page filter pills */}
          <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-5 md:mb-6 pb-3 sm:pb-4 border-b border-outline-variant/10">
            <nav className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
              {[['all', 'All'], ['open', 'Open'], ['in-progress', 'In Progress'], ['awaiting', 'Awaiting'], ['resolved', 'Resolved']].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setFilter(val)}
                  className={`text-[10px] sm:text-[11px] font-semibold px-3 sm:px-4 py-1.5 rounded-md transition-all whitespace-nowrap ${
                    filter === val
                      ? 'text-on-surface bg-background'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Ticket Cards — matches Accounts expandable list style */}
          <div className="space-y-2 sm:space-y-3">
            {filtered.map(ticket => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className="group bg-white rounded-xl p-4 sm:p-5 border border-outline-variant/10 shadow-sm cursor-pointer hover:border-primary/20 transition-all relative overflow-hidden"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Icon */}
                  <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center shrink-0 ${
                    ticket.status === 'resolved' ? 'bg-dark/5' : 'bg-primary/8'
                  }`}>
                    <span className={`material-symbols-outlined text-base sm:text-lg ${
                      ticket.status === 'resolved' ? 'text-dark/40' : 'text-primary'
                    }`} style={ticket.status !== 'resolved' ? { fontVariationSettings: "'FILL' 1" } : {}}>
                      {ticket.category === 'Withdrawals' ? 'account_balance' :
                       ticket.category === 'Accounts' ? 'account_balance_wallet' :
                       ticket.category === 'Verification' ? 'verified_user' :
                       ticket.category === 'Security' ? 'security' : 'support_agent'}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">{ticket.subject}</p>
                    <p className="text-[9px] sm:text-[10px] text-secondary mt-0.5">
                      <span className="font-mono">{ticket.id}</span> · {ticket.category} · {ticket.date}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <div className="hidden sm:flex items-center gap-1.5 text-secondary">
                      <span className="material-symbols-outlined text-sm">forum</span>
                      <span className="text-[10px] font-medium tabular-nums">{ticket.messages.length}</span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-secondary hidden md:block">{ticket.lastReply}</span>
                    <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                      ticket.status === 'resolved' ? 'bg-background text-secondary' : 'bg-dark/5 text-on-surface'
                    }`}>{STATUS_MAP[ticket.status]}</span>
                    <span className="material-symbols-outlined text-base text-secondary/20 group-hover:text-primary/40 transition-colors">chevron_right</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="bg-white rounded-xl p-12 sm:p-16 border border-outline-variant/10 shadow-sm text-center">
              <p className="text-sm font-semibold text-on-surface-variant/50 mb-1">No tickets found</p>
              <p className="text-xs text-secondary/40">Try a different filter or create a new ticket.</p>
            </div>
          )}
        </section>
      )}

      {/* ─── FAQ TAB ─── */}
      {tab === 'faq' && (
        <section className="space-y-2 sm:space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-outline-variant/10 shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full text-left flex items-center justify-between p-4 sm:p-5 gap-3"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="h-8 w-8 rounded-full bg-dark/5 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-dark/50 text-sm">help</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-on-surface">{faq.q}</p>
                </div>
                <span className={`material-symbols-outlined text-base text-secondary shrink-0 transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              {expandedFaq === i && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                  <div className="pl-11">
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Bottom — Contact + SLA — matches Security page bento grid */}
      <section className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-6">
        {/* Contact card — matches Security's Profile Information card */}
        <div className="lg:col-span-8 bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-outline-variant/10 relative overflow-hidden">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="material-symbols-outlined text-primary text-lg sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
            <h3 className="font-bold text-sm sm:text-base md:text-lg tracking-tight">Direct Contact</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-8 relative z-10">
            {[
              ['call', 'Priority Phone', '+1 (800) 482-7100', '24/5 for Tier 3+'],
              ['mail', 'Email Support', 'support@brokerportal.com', 'Within 2 hours'],
              ['chat', 'Live Chat', 'Available Now', 'Instant connection'],
            ].map(([icon, label, value, sub]) => (
              <div key={label} className="space-y-1 sm:space-y-1.5">
                <label className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-primary/70">{label}</label>
                <div className="bg-background px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg">
                  <p className="text-xs sm:text-sm font-medium text-on-background">{value}</p>
                  <p className="text-[9px] sm:text-[10px] text-secondary mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute -bottom-6 -right-6 opacity-[0.03] pointer-events-none">
            <span className="material-symbols-outlined text-[140px] sm:text-[180px]" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
          </div>
        </div>

        {/* SLA card — matches Security's 2FA dark card */}
        <div className="lg:col-span-4 rounded-xl shadow-lg overflow-hidden relative min-h-[240px] sm:min-h-[280px]" style={{ background: 'linear-gradient(135deg, #0f1729 0%, #1a2236 50%, #0f1729 100%)' }}>
          <div className="relative z-10 p-4 sm:p-6 md:p-8 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                <span className="material-symbols-outlined text-white text-lg sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <h3 className="font-bold text-sm sm:text-base md:text-lg tracking-tight text-white">SLA Guarantee</h3>
              </div>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 md:mb-8 max-w-[220px]">Institutional-grade support with guaranteed response times and dedicated account management.</p>
            </div>
            <div className="glass-card bg-white/[0.08] border border-white/[0.1] p-3 sm:p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50 font-bold">Response Time</span>
                <p className="text-white font-bold text-sm sm:text-base mt-0.5">Under 2 Hours</p>
              </div>
              <div className="text-white/30">
                <span className="material-symbols-outlined text-2xl sm:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none">
              <circle cx="350" cy="50" r="120" stroke="white" strokeWidth="0.5" />
              <circle cx="350" cy="50" r="80" stroke="white" strokeWidth="0.3" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>
      </section>

      {/* ─── New Ticket Modal ─── */}
      {showNewTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/20 backdrop-blur-sm p-3 sm:p-4" onClick={() => setShowNewTicket(false)}>
          <div className="bg-white shadow-lg rounded-xl w-full max-w-sm p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 border border-outline-variant/10" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3 sm:pb-4">
              <h2 className="text-base sm:text-lg font-bold text-on-surface">New Support Ticket</h2>
              <button onClick={() => setShowNewTicket(false)} className="text-secondary hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {[
                ['Category', 'select', ['Accounts', 'Withdrawals', 'Deposits', 'Verification', 'Technical', 'Security', 'Other']],
                ['Priority', 'select', ['Low', 'Medium', 'High']],
              ].map(([label, type, options]) => (
                <div key={label} className="space-y-1 sm:space-y-1.5">
                  <label className="text-[9px] sm:text-[10px] uppercase tracking-widest text-primary/70 font-bold">{label}</label>
                  <select className="w-full bg-background border border-outline-variant/15 rounded-lg text-xs sm:text-sm font-medium text-on-surface focus:ring-1 focus:ring-primary/20 p-2.5 sm:p-3 outline-none">
                    {options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div className="space-y-1 sm:space-y-1.5">
                <label className="text-[9px] sm:text-[10px] uppercase tracking-widest text-primary/70 font-bold">Subject</label>
                <input className="w-full bg-background border border-outline-variant/15 rounded-lg text-xs sm:text-sm font-medium text-on-surface focus:ring-1 focus:ring-primary/20 p-2.5 sm:p-3 outline-none" type="text" placeholder="Brief description of your issue" />
              </div>
              <div className="space-y-1 sm:space-y-1.5">
                <label className="text-[9px] sm:text-[10px] uppercase tracking-widest text-primary/70 font-bold">Description</label>
                <textarea className="w-full bg-background border border-outline-variant/15 rounded-lg text-xs sm:text-sm font-medium text-on-surface focus:ring-1 focus:ring-primary/20 p-2.5 sm:p-3 outline-none resize-none" rows={4} placeholder="Provide details about your request..." />
              </div>
              <div className="space-y-1 sm:space-y-1.5">
                <label className="text-[9px] sm:text-[10px] uppercase tracking-widest text-primary/70 font-bold">Attachment</label>
                <div className="border border-dashed border-outline-variant/30 rounded-lg p-3 sm:p-4 text-center cursor-pointer hover:border-primary/30 transition-colors">
                  <span className="material-symbols-outlined text-lg text-secondary/30 mb-0.5 block">cloud_upload</span>
                  <p className="text-[10px] sm:text-xs text-secondary/50">Click to upload · PNG, JPG, PDF up to 10MB</p>
                </div>
              </div>
            </div>
            <div className="pt-3 sm:pt-4 flex gap-2 sm:gap-3">
              <button onClick={() => setShowNewTicket(false)} className="flex-1 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold text-on-surface hover:bg-background rounded-lg transition-colors border border-outline-variant/15">Cancel</button>
              <button className="flex-1 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold text-white bg-dark rounded-lg hover:bg-dark/90 transition-all">Submit Ticket</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
