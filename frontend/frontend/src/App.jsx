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

  const state = location.state;
  const backgroundLocation = state?.backgroundLocation;

  const [showServicesNav, setShowServicesNav] = useState(false);

  const modalOpen = useMemo(() => {
    const p = location.pathname;
    return p === "/home/login" || p === "/home/signup";
  }, [location.pathname]);

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
    if (backgroundLocation) navigate(-1);
    else navigate("/home");
  };

  return (
    <>
      <Navbar onOpenServices={() => setShowServicesNav(true)} />
      <ServicesSubnav show={!modalOpen && showServicesNav} />

      {/* ✅ background depth when modal is open */}
      <motion.div
        animate={
          modalOpen || backgroundLocation
            ? { filter: "blur(2px)", scale: 0.985, opacity: 0.92 }
            : { filter: "blur(0px)", scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "center top" }}
      >
        <AnimatePresence mode="wait">
          <motion.main
            key={(backgroundLocation || location).pathname}
            initial={{ opacity: 0, scale: 0.992 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.992 }}
            transition={{ duration: 0.30 }}
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

              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />

              <Route path="gym" element={<Gym />} />
              <Route path="zumba" element={<Zumba />} />
              <Route path="yoga" element={<Yoga />} />

              <Route path="diet" element={<Diet />} />
              <Route path="workout" element={<SmartWorkoutPlanner />} />
              <Route path="progress" element={<Progress />} />
              <Route path="injury" element={<InjurySafe />} />

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

        <Footer />
        <Chatbot />
      </motion.div>

      {/* ✅ MODAL ROUTES */}
      <AnimatePresence>
        {(modalOpen || backgroundLocation) && (
          <Routes location={location}>
            <Route
              path="login"
              element={
                <AuthModal onClose={closeModal} title="Login">
                  <Login mode="modal" onSuccess={closeModal} />
                </AuthModal>
              }
            />
            <Route
              path="signup"
              element={
                <AuthModal onClose={closeModal} title="Signup">
                  <Signup mode="modal" onSuccess={closeModal} />
                </AuthModal>
              }
            />
          </Routes>
        )}
      </AnimatePresence>
    </>
  );
}