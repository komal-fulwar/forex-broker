import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Dashboard from './pages/Dashboard'
import Accounts from './pages/Accounts'
import OpenAccount from './pages/OpenAccount'
import Deposit from './pages/Deposit'
import Support from './pages/Support'
import IBProgram from './pages/IBProgram'
import Auth from './pages/Auth'
import Withdraw from './pages/Withdraw'
import Transactions from './pages/Transactions'
import Settings from './pages/Settings'
import Verification from './pages/Verification'
import Security from './pages/Security'
import Performance from './pages/Performance'
import CryptoWallet from './pages/CryptoWallet'

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/ib-program" element={<IBProgram />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/open-account" element={<OpenAccount />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/support" element={<Support />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/security" element={<Security />} />
        <Route path="/crypto" element={<CryptoWallet />} />
      </Route>
    </Routes>
  )
}
