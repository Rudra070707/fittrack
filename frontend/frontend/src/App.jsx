import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

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

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ detect modal paths
  const modalOpen = useMemo(() => {
    const p = location.pathname;
    return p === "/home/login" || p === "/home/signup";
  }, [location.pathname]);

  // ✅ real backgroundLocation if coming from Link state
  const state = location.state;
  const stateBg = state?.backgroundLocation;

  // ✅ If user opens /home/login directly (no state), still render /home as background
  const backgroundLocation = useMemo(() => {
    if (stateBg) return stateBg;
    if (modalOpen) return { pathname: "/home" }; // force home behind modal
    return null;
  }, [stateBg, modalOpen]);

  // ✅ show/hide services nav
  const [showServicesNav, setShowServicesNav] = useState(false);

  // ✅ scroll-to support
  useEffect(() => {
    const id = location.state?.scrollTo;
    if (id) {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 120);
    }
  }, [location.state]);

  // ❌ Close modal via X/backdrop: go back if we have a background page
  const closeModal = () => {
    if (stateBg) navigate(-1);
    else navigate("/home");
  };

  // ✅ Close modal AFTER SUCCESS (login/signup): ALWAYS go to /home
  const closeModalSuccess = () => {
    navigate("/home", { replace: true });
  };

  return (
    <>
      <Navbar onOpenServices={() => setShowServicesNav(true)} />

      <ServicesSubnav show={!modalOpen && showServicesNav} />

      <AnimatePresence mode="wait">
        <motion.main
          key={(backgroundLocation || location).pathname}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.35 }}
        >
          <Routes location={backgroundLocation || location}>
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

            {/* DEFAULT */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <Footer />
      <Chatbot />

      {/* MODAL ROUTES */}
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
    </>
  );
}