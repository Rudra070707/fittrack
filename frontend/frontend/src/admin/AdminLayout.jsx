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

import RequireAuth from "../components/RequireAuth";

export default function AdminLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/admin/login";

  const pageVariants = {
    initial: { opacity: 0, filter: "blur(6px)" },
    in: { opacity: 1, filter: "blur(0px)" },
    out: { opacity: 0, filter: "blur(6px)" },
  };

  const pageTransition = {
    duration: 0.22,
    ease: [0.22, 1, 0.36, 1],
  };

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
            <Route path="*" element={<Navigate to="/admin/login" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    );
  }

  // ✅ AUTHENTICATED ADMIN AREA
  return (
    <RequireAuth adminOnly>
      <div className="relative min-h-screen text-white overflow-hidden">

        {/* 🔥 GLOBAL BACKGROUND (MATCH USER UI) */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

          {/* base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#030712] to-[#020617]" />

          {/* glow layers */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-green-400/10 blur-[200px] rounded-full" />

          <div className="absolute bottom-0 right-1/3 w-[800px] h-[400px] bg-emerald-400/10 blur-[180px] rounded-full" />

          <div className="absolute top-1/3 left-1/4 w-[600px] h-[300px] bg-cyan-400/10 blur-[160px] rounded-full" />

          {/* animated glow */}
          <motion.div
            className="absolute top-0 left-0 w-[600px] h-[600px] bg-green-400/10 blur-[160px] rounded-full"
            animate={{ x: [0, 120, 0], y: [0, 80, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/10 blur-[140px] rounded-full"
            animate={{ x: [0, -100, 0], y: [0, -60, 0] }}
            transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* grain */}
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage:
                "url('https://grainy-gradients.vercel.app/noise.svg')"
            }}
          />

        </div>

        <div className="flex min-h-screen relative z-10">

          {/* SIDEBAR */}
          <Sidebar />

          <div className="flex-1 flex flex-col min-w-0">

            {/* NAVBAR */}
            <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/[0.03] border-b border-white/10">
              <Navbar />
            </div>

            <main className="flex-1 p-6 sm:p-8">

              {/* 🔥 MAIN GLASS CONTAINER (UPGRADED) */}
              <div className="
                max-w-7xl mx-auto
                rounded-3xl
                border border-white/10
                bg-white/[0.04]
                backdrop-blur-2xl
                shadow-[0_30px_120px_rgba(0,0,0,0.8)]
                overflow-hidden
                relative
              ">

                {/* glow border effect */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/5" />

                {/* top gradient line */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-green-400/40 to-transparent" />

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
    </RequireAuth>
  );
}