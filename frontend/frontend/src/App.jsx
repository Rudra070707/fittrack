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

export default function App() {
  const location = useLocation();
  const [showServicesNav, setShowServicesNav] = useState(false);

  // ✅ Detect auth pages
  const isAuthPage =
    location.pathname === "/home/login" ||
    location.pathname === "/home/signup";

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
      {/* ✅ Hide layout on login/signup */}
      {!isAuthPage && (
        <>
          <Navbar onOpenServices={() => setShowServicesNav(true)} />
          <ServicesSubnav show={showServicesNav} />
        </>
      )}

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.45 }}
        >
          <Routes>
            {/* HOME */}
            <Route
              index
              element={
                <>
                  <Hero />
                  <Services />
                  <Plans />
                </>
              }
            />

            {/* PUBLIC */}
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="gym" element={<Gym />} />
            <Route path="zumba" element={<Zumba />} />
            <Route path="yoga" element={<Yoga />} />

            {/* AUTH */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            {/* FEATURES */}
            <Route path="diet" element={<Diet />} />
            <Route path="workout" element={<SmartWorkoutPlanner />} />
            <Route path="progress" element={<Progress />} />
            <Route path="injury" element={<InjurySafe />} />

            {/* PROTECTED */}
            <Route
              path="join"
              element={
                <RequireAuth>
                  <Join />
                </RequireAuth>
              }
            />

            <Route
              path="change-password"
              element={
                <RequireAuth>
                  <ChangePassword />
                </RequireAuth>
              }
            />

            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      {/* ✅ Hide footer & chatbot on login */}
      {!isAuthPage && <Footer />}
      {!isAuthPage && <Chatbot />}
    </>
  );
}