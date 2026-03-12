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

export default function App() {

  const location = useLocation();
  const navigate = useNavigate();

  const modalOpen = useMemo(() => {
    const p = location.pathname;
    return p === "/home/login" || p === "/home/signup";
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

  const closeModalSuccess = () => {
    navigate("/home", { replace: true });
  };

  return (
    <div className="bg-[#05070c] text-white min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Services Subnav */}
      <ServicesSubnav show={!modalOpen} />

      {/* Page Content */}
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
          className="relative z-10"
        >

          <Routes location={backgroundLocation || location}>

            {/* HOME PAGE */}
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

            {/* DEFAULT INDEX */}
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

            {/* PROTECTED ROUTES */}

            <Route
              path="about"
              element={
                <RequireAuth>
                  <About />
                </RequireAuth>
              }
            />

            <Route
              path="contact"
              element={
                <RequireAuth>
                  <Contact />
                </RequireAuth>
              }
            />

            <Route
              path="gym"
              element={
                <RequireAuth>
                  <Gym />
                </RequireAuth>
              }
            />

            <Route
              path="zumba"
              element={
                <RequireAuth>
                  <Zumba />
                </RequireAuth>
              }
            />

            <Route
              path="yoga"
              element={
                <RequireAuth>
                  <Yoga />
                </RequireAuth>
              }
            />

            <Route
              path="diet"
              element={
                <RequireAuth>
                  <Diet />
                </RequireAuth>
              }
            />

            <Route
              path="workout"
              element={
                <RequireAuth>
                  <SmartWorkoutPlanner />
                </RequireAuth>
              }
            />

            <Route
              path="progress"
              element={
                <RequireAuth>
                  <Progress />
                </RequireAuth>
              }
            />

            <Route
              path="injury"
              element={
                <RequireAuth>
                  <InjurySafe />
                </RequireAuth>
              }
            />

            <Route
              path="gamification"
              element={
                <RequireAuth>
                  <Gamification />
                </RequireAuth>
              }
            />

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

            {/* fallback */}
            <Route path="*" element={<Navigate to="/home" replace />} />

          </Routes>

        </motion.main>

      </AnimatePresence>

      {/* Footer */}
      <Footer />

      {/* Chatbot */}
      <Chatbot />

      {/* Auth Modals */}

      <AnimatePresence>
        {modalOpen && (
          <Routes location={location}>

            <Route
              path="/home/login"
              element={
                <AuthModal onClose={closeModal} title="Login">
                  <Login mode="modal" onSuccess={closeModalSuccess} />
                </AuthModal>
              }
            />

            <Route
              path="/home/signup"
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