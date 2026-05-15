import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Layout and Pages
import AppLayout from "../components/AppLayout";
import Dashboard from "../pages/Dashboard";
import Accounts from "../pages/Accounts";
import OpenAccount from "../pages/OpenAccount";
import Deposit from "../pages/Deposit";
import Support from "../pages/Support";
import IBProgram from "../pages/IBProgram";
import Auth from "../pages/Auth";
import Withdraw from "../pages/Withdraw";
import Transactions from "../pages/Transactions";
import Settings from "../pages/Settings";
import Verification from "../pages/Verification";
import Security from "../pages/Security";
import Performance from "../pages/Performance";
import CryptoWallet from "../pages/CryptoWallet";
import Notifications from "../pages/Notifications";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route: authenticated users are bounced to homepage */}
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />

      {/* Protected Routes: unauthenticated users are bounced to /auth */}
      <Route element={<ProtectedRoute />}>
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
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Route>

      {/* Catch-all: redirect any unknown URL */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
