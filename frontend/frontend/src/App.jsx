import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ServicesSubnav from "./components/ServicesSubnav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Plans from "./components/Plans";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Diet from "./pages/Diet";
import Progress from "./pages/Progress";
import InjurySafe from "./pages/InjurySafe";
import SmartWorkoutPlanner from "./components/SmartWorkoutPlanner";
import Join from "./pages/Join";

import Chatbot from "./components/Chatbot";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Gym from "./pages/Gym";
import Zumba from "./pages/Zumba";
import Yoga from "./pages/Yoga";

import RequireAuth from "./components/RequireAuth";
import ChangePassword from "./pages/ChangePassword";

import AdminLayout from "./admin/AdminLayout";

export default function App() {
  const location = useLocation();
  const [showServicesNav, setShowServicesNav] = useState(false);

  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const id = location.state?.scrollTo;
    if (id) {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 120);
    }
  }, [location.state]);

  return (
    <>
      {!isAdminRoute && (
        <Navbar onOpenServices={() => setShowServicesNav(true)} />
      )}
      {!isAdminRoute && <ServicesSubnav show={showServicesNav} />}

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.45 }}
        >
          <Routes location={location}>
            {/* ✅ ADMIN */}
            <Route path="/admin/*" element={<AdminLayout />} />

            {/* ✅ Make /home the ONLY landing (fix blank screen) */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            <Route
              path="/home"
              element={
                <>
                  <Hero />
                  <Services />
                  <Plans />
                </>
              }
            />

            {/* ✅ PUBLIC */}
            <Route path="/home/about" element={<About />} />
            <Route path="/home/contact" element={<Contact />} />

            <Route path="/home/gym" element={<Gym />} />
            <Route path="/home/zumba" element={<Zumba />} />
            <Route path="/home/yoga" element={<Yoga />} />

            {/* ✅ AUTH (official) */}
            <Route path="/home/login" element={<Login />} />
            <Route path="/home/signup" element={<Signup />} />

            {/* ✅ Redirect old routes to /home/* */}
            <Route path="/login" element={<Navigate to="/home/login" replace />} />
            <Route path="/signup" element={<Navigate to="/home/signup" replace />} />

            <Route path="/about" element={<Navigate to="/home/about" replace />} />
            <Route path="/contact" element={<Navigate to="/home/contact" replace />} />
            <Route path="/gym" element={<Navigate to="/home/gym" replace />} />
            <Route path="/zumba" element={<Navigate to="/home/zumba" replace />} />
            <Route path="/yoga" element={<Navigate to="/home/yoga" replace />} />

            {/* ✅ FEATURES (official /home/*) */}
            <Route path="/home/diet" element={<Diet />} />
            <Route path="/home/workout" element={<SmartWorkoutPlanner />} />
            <Route path="/home/progress" element={<Progress />} />
            <Route path="/home/injury" element={<InjurySafe />} />

            {/* ✅ Redirect old feature routes */}
            <Route path="/diet" element={<Navigate to="/home/diet" replace />} />
            <Route path="/workout" element={<Navigate to="/home/workout" replace />} />
            <Route path="/progress" element={<Navigate to="/home/progress" replace />} />
            <Route path="/injury" element={<Navigate to="/home/injury" replace />} />

            {/* ✅ PROTECTED (official) */}
            <Route
              path="/home/join"
              element={
                <RequireAuth>
                  <Join />
                </RequireAuth>
              }
            />
            <Route path="/join" element={<Navigate to="/home/join" replace />} />

            {/* ✅ CHANGE PASSWORD (official) */}
            <Route
              path="/home/change-password"
              element={
                <RequireAuth>
                  <ChangePassword />
                </RequireAuth>
              }
            />
            <Route
              path="/change-password"
              element={<Navigate to="/home/change-password" replace />}
            />

            {/* ✅ DEFAULT */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <Chatbot />}
    </>
  );
}