import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Dashboard from './pages/Dashboard'
import Accounts from './pages/Accounts'
import Deposit from './pages/Deposit'
import Verification from './pages/Verification'
import Security from './pages/Security'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/security" element={<Security />} />
        {/* Placeholder routes */}
        <Route path="/withdraw" element={<PlaceholderPage title="Withdraw" icon="account_balance" />} />
        <Route path="/transactions" element={<PlaceholderPage title="Transactions" icon="history" />} />
        <Route path="/support" element={<PlaceholderPage title="Support" icon="support_agent" />} />
        <Route path="/settings" element={<PlaceholderPage title="Settings" icon="settings" />} />
      </Route>
    </Routes>
  )
}

function PlaceholderPage({ title, icon }) {
  return (
    <div className="max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 rounded-2xl bg-surface-container-high flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-4xl text-secondary">{icon}</span>
      </div>
      <h2 className="text-2xl font-bold text-on-surface mb-2">{title}</h2>
      <p className="text-secondary text-sm">This page is under development.</p>
    </div>
  )
}
