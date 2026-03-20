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
    if (modalOpen) return { pathname: "/home" };
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

  return (

    <div className="relative text-white min-h-screen overflow-hidden">

      {/* GLOBAL BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />

        <motion.div
          className="absolute inset-0 opacity-80"
          animate={{
            background: [
              "radial-gradient(circle at 15% 25%, rgba(16,185,129,0.28), transparent 60%), radial-gradient(circle at 85% 35%, rgba(34,197,94,0.20), transparent 55%)",
              "radial-gradient(circle at 70% 20%, rgba(34,197,94,0.26), transparent 60%), radial-gradient(circle at 35% 80%, rgba(16,185,129,0.18), transparent 55%)",
              "radial-gradient(circle at 30% 70%, rgba(16,185,129,0.24), transparent 62%), radial-gradient(circle at 85% 60%, rgba(34,197,94,0.20), transparent 55%)",
            ]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
      </div>

      {/* MAIN UI */}
      <div className="relative z-10">

        <Navbar />

        <ServicesSubnav show={!modalOpen} />

        <AnimatePresence mode="wait">

          <motion.main
            key={(backgroundLocation || location).pathname}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative pt-10"
          >

            <Routes location={backgroundLocation || location}>

              {/* DEFAULT ROUTE */}
              <Route path="/" element={<Navigate to="/home" replace />} />

              {/* HOME */}
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

              <Route path="/home/select" element={<SelectRole />} />

              {/* PROTECTED */}
              <Route path="/home/about" element={<RequireAuth><About /></RequireAuth>} />
              <Route path="/home/contact" element={<RequireAuth><Contact /></RequireAuth>} />
              <Route path="/home/gym" element={<RequireAuth><Gym /></RequireAuth>} />
              <Route path="/home/zumba" element={<RequireAuth><Zumba /></RequireAuth>} />
              <Route path="/home/yoga" element={<RequireAuth><Yoga /></RequireAuth>} />
              <Route path="/home/diet" element={<RequireAuth><Diet /></RequireAuth>} />
              <Route path="/home/workout" element={<RequireAuth><SmartWorkoutPlanner /></RequireAuth>} />
              <Route path="/home/progress" element={<RequireAuth><Progress /></RequireAuth>} />
              <Route path="/home/injury" element={<RequireAuth><InjurySafe /></RequireAuth>} />
              <Route path="/home/gamification" element={<RequireAuth><Gamification /></RequireAuth>} />
              <Route path="/home/join" element={<RequireAuth><Join /></RequireAuth>} />
              <Route path="/home/change-password" element={<RequireAuth><ChangePassword /></RequireAuth>} />

              <Route path="*" element={<Navigate to="/home" replace />} />

            </Routes>

          </motion.main>

        </AnimatePresence>

        <Footer />
        <Chatbot />

      </div>

      {/* AUTH MODALS */}
      <AnimatePresence>

        {modalOpen && (

          <Routes location={location}>

            <Route
              path="/home/login"
              element={
                <AuthModal onClose={closeModal} title="Login">
                  <Login
                    mode="modal"
                    onSuccess={(redirectTo) => {
                      navigate(redirectTo || "/home", { replace: true });
                    }}
                  />
                </AuthModal>
              }
            />

            <Route
              path="/home/signup"
              element={
                <AuthModal onClose={closeModal} title="Signup">
                  <Signup mode="modal" onSuccess={closeModal} />
                </AuthModal>
              }
            />

          </Routes>

        )}

      </AnimatePresence>

    </div>
  );
}