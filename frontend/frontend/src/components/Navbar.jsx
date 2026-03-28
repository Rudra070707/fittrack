import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "../api";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef();

  const hideOnRoutes = useMemo(() => ["/home/login", "/home/signup"], []);
  const shouldHide = hideOnRoutes.includes(location.pathname);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync login
  useEffect(() => {
    const sync = () => setIsUserLoggedIn(!!localStorage.getItem("token"));
    sync();
    window.addEventListener("focus", sync);
    return () => window.removeEventListener("focus", sync);
  }, []);

  // Close dropdown outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const openLogin = () => {
    navigate("/home/login", { state: { backgroundLocation: location } });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/home", { replace: true });
  };

  if (shouldHide) return null;

  return (
    <header className="sticky top-0 z-[60] h-16">

      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`
          h-full backdrop-blur-xl border-b border-white/10
          ${scrolled ? "bg-[#05070c]/95" : "bg-[#05070c]/70"}
        `}
      >

        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/home" className="text-xl font-bold text-white">
            Fit<span className="text-green-400">Track</span>
          </Link>

          {/* NAV LINKS */}
          <div className="hidden md:flex gap-8 text-white/70">
            <button onClick={() => navigate("/home/about")} className="hover:text-white">About</button>
            <button onClick={() => navigate("/home/services")} className="hover:text-white">Services</button>
            <button onClick={() => navigate("/home/contact")} className="hover:text-white">Contact</button>
          </div>

          {/* RIGHT */}
          {!isUserLoggedIn ? (
            <button
              onClick={openLogin}
              className="px-5 py-2 rounded-xl bg-green-400 text-black font-semibold hover:scale-105 transition"
            >
              Login
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>

              {/* PROFILE BUTTON */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-11 h-11 rounded-2xl bg-green-400/20 border border-green-400/30 flex items-center justify-center"
              >
                👤
              </button>

              {/* DROPDOWN */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-52 rounded-2xl bg-[#0b0f14]/90 border border-white/10 shadow-xl overflow-hidden"
                  >

                    <button
                      onClick={() => {
                        navigate("/home/dashboard");
                        setDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-white/10"
                    >
                      📊 Dashboard
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-red-400 hover:bg-white/10"
                    >
                      🚪 Logout
                    </button>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          )}

        </div>
      </motion.nav>
    </header>
  );
}