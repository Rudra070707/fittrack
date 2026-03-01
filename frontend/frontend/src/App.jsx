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

  // ✅ Detect admin route and hide main-site layout
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
      {/* ✅ Navbar only on non-admin pages (Navbar itself hides on login/signup) */}
      {!isAdminRoute && (
        <Navbar onOpenServices={() => setShowServicesNav(true)} />
      )}

      {/* ✅ Services subnav only on non-admin pages */}
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

            {/* ✅ LANDING: support both / and /home */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Services />
                  <Plans />
                </>
              }
            />
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

            {/* ✅ AUTH (support BOTH) */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home/login" element={<Login />} />
            <Route path="/home/signup" element={<Signup />} />

            {/* ✅ PUBLIC FEATURES */}
            <Route path="/diet" element={<Diet />} />
            <Route path="/workout" element={<SmartWorkoutPlanner />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/injury" element={<InjurySafe />} />

            <Route path="/home/diet" element={<Diet />} />
            <Route path="/home/workout" element={<SmartWorkoutPlanner />} />
            <Route path="/home/progress" element={<Progress />} />
            <Route path="/home/injury" element={<InjurySafe />} />

            {/* ✅ PROTECTED */}
            <Route
              path="/join"
              element={
                <RequireAuth>
                  <Join />
                </RequireAuth>
              }
            />
            <Route
              path="/home/join"
              element={
                <RequireAuth>
                  <Join />
                </RequireAuth>
              }
            />

            {/* ✅ CHANGE PASSWORD */}
            <Route
              path="/change-password"
              element={
                <RequireAuth>
                  <ChangePassword />
                </RequireAuth>
              }
            />
            <Route
              path="/home/change-password"
              element={
                <RequireAuth>
                  <ChangePassword />
                </RequireAuth>
              }
            />

            {/* ✅ DEFAULT */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      {/* ✅ Footer + Chatbot only on non-admin pages */}
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <Chatbot />}
    </>
  );
}