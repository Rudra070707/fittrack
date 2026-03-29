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

  return (

    <div className="relative text-white min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-950" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />

        <motion.div
          className="absolute inset-0 opacity-80"
          animate={{
            background: [
              "radial-gradient(circle at 15% 25%, rgba(16,185,129,0.28), transparent 60%)",
              "radial-gradient(circle at 70% 20%, rgba(34,197,94,0.26), transparent 60%)",
              "radial-gradient(circle at 30% 70%, rgba(16,185,129,0.24), transparent 62%)",
            ]
          }}
          transition={{ duration: 16, repeat: Infinity }}
        />

      </div>

      <div className="relative z-10">

        <Navbar />
        <ServicesSubnav show={!modalOpen} />

        {/* 🔥 UPGRADED TRANSITIONS */}
        <AnimatePresence mode="wait">

          <motion.main
            key={backgroundLocation.pathname}

            // 🔥 ENTER
            initial={{ opacity: 0, y: 40, scale: 0.98 }}

            // 🔥 ACTIVE
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] // smooth ease
              }
            }}

            // 🔥 EXIT
            exit={{
              opacity: 0,
              y: -30,
              scale: 0.97,
              transition: { duration: 0.35 }
            }}

            className="relative pt-10 min-h-screen"
          >

            {/* ROUTES */}
            <Routes location={backgroundLocation}>

              <Route
                path="/"
                element={
                  <div>
                    <Hero />
                    <Services />
                    <Plans />
                  </div>
                }
              />

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

        <Footer />
        <Chatbot />

      </div>

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