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

// ADMIN
import AdminLogin from "./admin/pages/AdminLogin";
import AdminLayout from "./admin/AdminLayout";

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

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <ServicesSubnav show={!modalOpen} />}

      <AnimatePresence mode="wait">

        <motion.main
          key={(backgroundLocation || location).pathname}
          initial={{ opacity: 0, y: 20, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.985 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{
            minHeight: "100vh",
            willChange: "transform, opacity"
          }}
        >

          <Routes location={backgroundLocation || location}>

            {/* default route */}
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

            <Route
              path="/home/about"
              element={
                <RequireAuth>
                  <About />
                </RequireAuth>
              }
            />

            <Route
              path="/home/contact"
              element={
                <RequireAuth>
                  <Contact />
                </RequireAuth>
              }
            />

            <Route
              path="/home/gym"
              element={
                <RequireAuth>
                  <Gym />
                </RequireAuth>
              }
            />

            <Route
              path="/home/zumba"
              element={
                <RequireAuth>
                  <Zumba />
                </RequireAuth>
              }
            />

            <Route
              path="/home/yoga"
              element={
                <RequireAuth>
                  <Yoga />
                </RequireAuth>
              }
            />

            <Route
              path="/home/diet"
              element={
                <RequireAuth>
                  <Diet />
                </RequireAuth>
              }
            />

            <Route
              path="/home/workout"
              element={
                <RequireAuth>
                  <SmartWorkoutPlanner />
                </RequireAuth>
              }
            />

            <Route
              path="/home/progress"
              element={
                <RequireAuth>
                  <Progress />
                </RequireAuth>
              }
            />

            <Route
              path="/home/injury"
              element={
                <RequireAuth>
                  <InjurySafe />
                </RequireAuth>
              }
            />

            <Route
              path="/home/gamification"
              element={
                <RequireAuth>
                  <Gamification />
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

            <Route
              path="/home/change-password"
              element={
                <RequireAuth>
                  <ChangePassword />
                </RequireAuth>
              }
            />

            {/* ADMIN ROUTES (LOCAL ONLY) */}
            {import.meta.env.DEV && (
              <>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/*" element={<AdminLayout />} />
              </>
            )}

            {/* fallback */}
            <Route path="*" element={<Navigate to="/home" replace />} />

          </Routes>

        </motion.main>

      </AnimatePresence>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <Chatbot />}

      <AnimatePresence>
        {modalOpen && !isAdminRoute && (
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

    </>
  );
}