import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Plans from "./pages/Plans";
import Settings from "./pages/Settings";
import AdminLogin from "./pages/AdminLogin";
import AdminPayments from "./pages/AdminPayments";
import ContactMessages from "./pages/ContactMessages";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import { getAdminToken } from "./auth";

export default function AdminLayout() {
  const location = useLocation();
  const token = getAdminToken();
  const isLoginPage = location.pathname === "/admin/login";

  // ✅ Debug (safe to remove later)
  console.log("✅ AdminLayout", {
    path: location.pathname,
    adminToken: token,
  });

  const pageVariants = {
    initial: { opacity: 0, filter: "blur(6px)" },
    in: { opacity: 1, filter: "blur(0px)" },
    out: { opacity: 0, filter: "blur(6px)" },
  };

  const pageTransition = {
    duration: 0.22,
    ease: [0.22, 1, 0.36, 1],
  };

  // ❌ NOT LOGGED IN → only allow login page
  if (!token && !isLoginPage) {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ LOGIN PAGE (no sidebar/navbar)
  if (isLoginPage) {
    return (
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          transition={pageTransition}
        >
          <Routes>
            <Route path="login" element={<AdminLogin />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    );
  }

  // ✅ AUTHENTICATED ADMIN AREA
  return (
    <div className="min-h-screen bg-[#070a0f] text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />

          <main className="flex-1 p-6 sm:p-8">
            <div className="max-w-7xl mx-auto rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.55)] overflow-hidden">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={location.pathname}
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                    transition={pageTransition}
                    className="min-h-[55vh]"
                  >
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="users" element={<Users />} />
                      <Route path="plans" element={<Plans />} />
                      <Route path="payments" element={<AdminPayments />} />
                      <Route
                        path="contact-messages"
                        element={<ContactMessages />}
                      />
                      <Route path="settings" element={<Settings />} />
                      <Route
                        path="*"
                        element={<Navigate to="/admin/dashboard" replace />}
                      />
                    </Routes>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
