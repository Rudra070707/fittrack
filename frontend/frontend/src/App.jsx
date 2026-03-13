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

import SelectRole from "./pages/SelectRole"; // ⭐ added

export default function App() {

  const location = useLocation();
  const navigate = useNavigate();

  const modalOpen = useMemo(() => {
    const p = location.pathname;
    return p.startsWith("/home/login") || p.startsWith("/home/signup");
  }, [location.pathname]);

  const state = location.state;
  const stateBg = state?.backgroundLocation;

  const backgroundLocation = useMemo(() => {
    if (stateBg) return stateBg;
    if (modalOpen) return { pathname: "/home" }; // ⭐ fixed
    return null;
  }, [stateBg, modalOpen]);

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

  const closeModalSuccess = () => {
    navigate("/home", { replace: true });
  };

  return (

    <div className="relative text-white min-h-screen overflow-hidden">

      {/* ================= GLOBAL BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 -z-10">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-950" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />

        <motion.div
          className="absolute inset-0 opacity-80"
          animate={{
            background: [
              "radial-gradient(circle at 15% 25%, rgba(16,185,129,0.28), transparent 60%), radial-gradient(circle at 85% 35%, rgba(59,130,246,0.20), transparent 55%)",
              "radial-gradient(circle at 70% 20%, rgba(59,130,246,0.26), transparent 60%), radial-gradient(circle at 35% 80%, rgba(99,102,241,0.18), transparent 55%)",
              "radial-gradient(circle at 30% 70%, rgba(16,185,129,0.24), transparent 62%), radial-gradient(circle at 85% 60%, rgba(99,102,241,0.20), transparent 55%)",
              "radial-gradient(circle at 15% 25%, rgba(16,185,129,0.28), transparent 60%), radial-gradient(circle at 85% 35%, rgba(59,130,246,0.20), transparent 55%)"
            ]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />

        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      </div>

      {/* ================= MAIN UI ================= */}

      <div className="relative z-10">

        <Navbar />

        <ServicesSubnav show={!modalOpen} />

        <AnimatePresence mode="wait">

          <motion.main
            key={(backgroundLocation || location).pathname}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="relative pt-10"
          >

            <Routes location={backgroundLocation || location}>

              {/* ⭐ ROLE SELECT PAGE */}
              <Route path="/" element={<SelectRole />} />

              {/* MAIN LANDING PAGE */}
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

              {/* PROTECTED ROUTES */}

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

              <Route path="*" element={<Navigate to="/home" replace />} />

            </Routes>

          </motion.main>

        </AnimatePresence>

        <Footer />

        <Chatbot />

      </div>

      {/* ================= AUTH MODALS ================= */}

      <AnimatePresence>
        {modalOpen && (
          <Routes location={location}>

            <Route
              path="login"
              element={
                <AuthModal onClose={closeModal} title="Login">
                  <Login mode="modal" onSuccess={closeModalSuccess} />
                </AuthModal>
              }
            />

            <Route
              path="signup"
              element={
                <AuthModal onClose={closeModal} title="Signup">
                  <Signup mode="modal" onSuccess={closeModalSuccess} />
                </AuthModal>
              }
            />

          </Routes>
        )}
      </AnimatePresence>

    </div>
  );
}