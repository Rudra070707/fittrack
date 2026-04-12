// SAME IMPORTS (UNCHANGED)
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";

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

import AuthModal from "./components/AuthModal";
import Gamification from "./pages/Gamification";

import SelectRole from "./pages/SelectRole";
import UserDashboard from "./pages/UserDashboard";

export default function App() {

  const location = useLocation();
  const navigate = useNavigate();

  const modalOpen = useMemo(() => {
    const p = location.pathname;
    return p.includes("login") || p.includes("signup");
  }, [location.pathname]);

  const state = location.state;
  const stateBg = state?.backgroundLocation;

  const backgroundLocation = useMemo(() => {
    return stateBg || location;
  }, [stateBg, location]);

  useEffect(() => {
    const id = location.state?.scrollTo;

    if (id) {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 120);
    }
  }, [location.state]);

  const closeModal = () => {
    if (stateBg) navigate(-1);
    else navigate("/home", { replace: true });
  };

  const showServicesSubnav = useMemo(() => {

    const path = location.pathname;

    const isServiceRoute =
      path.includes("services") ||
      path.includes("diet") ||
      path.includes("workout") ||
      path.includes("progress") ||
      path.includes("injury") ||
      path.includes("gym") ||
      path.includes("zumba") ||
      path.includes("yoga") ||
      path.includes("gamification");

    return isServiceRoute && !modalOpen;

  }, [location.pathname, modalOpen]);

  return (

    <div className="relative text-white min-h-screen"> {/* ✅ overflow-hidden removed */}

      {/* 🔥 GLOBAL BACKGROUND (ENHANCED) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        {/* base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#030712] to-[#020617]" />

        {/* main glow layers */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-green-400/10 blur-[200px] rounded-full" />

        <div className="absolute bottom-0 right-1/3 w-[800px] h-[400px] bg-emerald-400/10 blur-[180px] rounded-full" />

        <div className="absolute top-1/3 left-1/4 w-[600px] h-[300px] bg-cyan-400/10 blur-[160px] rounded-full" />

        {/* center glow */}
        <div className="absolute left-1/2 top-1/2 w-[600px] h-[300px] -translate-x-1/2 -translate-y-1/2 bg-green-400/10 blur-[160px]" />

        {/* 🔥 animated floating glow (smoother) */}
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

        {/* 🔥 extra subtle floating glow */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-emerald-400/10 blur-[120px] rounded-full"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 26, repeat: Infinity }}
        />

        {/* grain */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
             style={{
               backgroundImage:
                 "url('https://grainy-gradients.vercel.app/noise.svg')"
             }}
        />

      </div>

      <div className="relative z-10">

        {/* NAVBAR */}
        <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-soft">
          <Navbar />
        </div>

        {/* SUBNAV */}
        <AnimatePresence mode="wait">
          {showServicesSubnav && (
            <motion.div
              key="subnav"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="px-4 md:px-8"
            >
              <ServicesSubnav show={true} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* PAGE TRANSITIONS */}
        <AnimatePresence mode="wait">

          <motion.main
            key={backgroundLocation.pathname}
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1]
              }
            }}
            exit={{
              opacity: 0,
              y: -40,
              scale: 0.96,
              transition: { duration: 0.35 }
            }}
            style={{ willChange: "transform, opacity" }}
            className="relative pt-20 pb-32 min-h-screen px-4 md:px-10"
          >

            {/* TOP FADE */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/40 to-transparent z-0" />

            {/* ROUTES */}
            <Routes location={backgroundLocation}>

              <Route
                path="/"
                element={
                  <div>

                    <section className="relative section">
                      <Hero />
                    </section>

                    <section className="relative section">
                      <Services />
                    </section>

                    <section className="relative section">
                      <Plans />
                    </section>

                  </div>
                }
              />

              <Route path="services" element={<Services />} />
              <Route path="select" element={<SelectRole />} />

              <Route path="about" element={<RequireAuth><About /></RequireAuth>} />
              <Route path="contact" element={<RequireAuth><Contact /></RequireAuth>} />

              <Route path="gym" element={<RequireAuth><Gym /></RequireAuth>} />
              <Route path="zumba" element={<RequireAuth><Zumba /></RequireAuth>} />
              <Route path="yoga" element={<RequireAuth><Yoga /></RequireAuth>} />

              <Route path="diet" element={<RequireAuth><Diet /></RequireAuth>} />
              <Route path="workout" element={<RequireAuth><SmartWorkoutPlanner /></RequireAuth>} />
              <Route path="progress" element={<RequireAuth><Progress /></RequireAuth>} />
              <Route path="injury" element={<RequireAuth><InjurySafe /></RequireAuth>} />

              <Route path="gamification" element={<RequireAuth><Gamification /></RequireAuth>} />
              <Route path="join" element={<RequireAuth><Join /></RequireAuth>} />
              <Route path="change-password" element={<RequireAuth><ChangePassword /></RequireAuth>} />
              <Route path="dashboard" element={<RequireAuth><UserDashboard /></RequireAuth>} />

              <Route path="*" element={<Navigate to="/home" replace />} />

            </Routes>

          </motion.main>

        </AnimatePresence>

        <div className="px-4 md:px-8">
          <Footer />
        </div>

      </div>

      {/* ✅ CHATBOT MOVED HERE */}
      <Chatbot />

      {/* MODALS */}
      <AnimatePresence>

        {modalOpen && stateBg && (

          <Routes location={location}>

            <Route
              path="login"
              element={
                <AuthModal onClose={closeModal} title="Login">
                  <Login mode="modal" />
                </AuthModal>
              }
            />

            <Route
              path="signup"
              element={
                <AuthModal onClose={closeModal} title="Signup">
                  <Signup mode="modal" />
                </AuthModal>
              }
            />

          </Routes>

        )}

      </AnimatePresence>

      {/* DIRECT ROUTES */}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>

    </div>
  );
}