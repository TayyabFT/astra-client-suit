import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Setting from "./pages/setting/Setting";
import Account from "./pages/account/Account";
import Analytics from "./pages/analytics/Analytics";
import RiskManagement from "./pages/risk-management/RiskManagement";
import GlobalKyc from "./pages/global-kyc/GlobalKyc";
import ListKyc from "./pages/list-kyc/ListKyc";
import PageNotFound from "./components/PageNotFound";
import Onboarding from "./pages/auth/Onboarding";
import Reports from "./pages/reports/Reports";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

function LayoutWrapper() {
  const location = useLocation();
  const [hide, setHide] = useState(false);

  const isAuthOrErrorPage =
    location.pathname === "/registration" ||
    ![
      "/",
      "/analytics",
      "/global-kyc",
      "/list-kyc",
      "/risk-management",
      "/reports",
      "/setting",
      "/account",
    ].includes(location.pathname);

  return (
    <>
      {isAuthOrErrorPage ? (
        <Routes>
          <Route path="/registration" element={<Onboarding/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/sign-up" element={<Signup/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      ) : (
        <div className="z-50 relative flex">
          <div className={`${hide ? "!block" : "hidden"} z-50 lg:block hidden`}>
            <Sidebar />
          </div>
          <div className={`flex-1 ${hide ? "" : "lg:pl-[260px]"}`}>
            <Topbar hide={hide} setHide={setHide} />
            <main className="p-6 flex-1 max-w-[1300px] w-full mx-auto z-10 py-4 px-3 sm:px-6 md:px-8 xl:px-12">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/global-kyc" element={<GlobalKyc />} />
                <Route path="/list-kyc" element={<ListKyc />} />
                <Route path="/risk-management" element={<RiskManagement />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/account" element={<Account />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default function AppRoutes() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}
