import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { API_BASE } from "../api";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [logo, setLogo] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [scrolled, setScrolled] = useState(false);

  const hideOnRoutes = useMemo(() => ["/home/login", "/home/signup"], []);
  const shouldHide = hideOnRoutes.includes(location.pathname);

  const BASE_URL = useMemo(() => API_BASE.replace(/\/api\/?$/, ""), []);

  // ✅ Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Sync login state
  useEffect(() => {
    const syncAuth = () => {
      setIsUserLoggedIn(!!localStorage.getItem("token"));
    };

    syncAuth();

    window.addEventListener("storage", syncAuth);
    window.addEventListener("focus", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("focus", syncAuth);
    };
  }, []);

  // ✅ Load logo
  useEffect(() => {
    let mounted = true;

    if (shouldHide) return;

    axios
      .get(`${API_BASE}/settings`)
      .then((res) => {
        if (!mounted) return;
        setLogo(res?.data?.logo || null);
      })
      .catch(() => {
        if (!mounted) return;
        setLogo(null);
      });

    return () => {
      mounted = false;
    };
  }, [shouldHide]);

  const openLogin = () => {
    navigate("/home/login", { state: { backgroundLocation: location } });
  };

  const goProtectedOrLogin = (path) => {
    if (!localStorage.getItem("token")) {
      openLogin();
      return;
    }
    navigate(path);
  };

  const scrollToServices = () => {
    if (!location.pathname.startsWith("/home") || location.pathname !== "/home") {
      navigate("/home", { state: { scrollTo: "services" } });
      return;
    }

    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ LOGOUT FIXED
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("user");

    setIsUserLoggedIn(false);

    // ✅ redirect to homepage
    navigate("/home", { replace: true });
  };

  if (shouldHide) return null;

  return (
    <header className="sticky top-0 z-[60] h-16">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className={`
        h-full
        relative overflow-hidden
        backdrop-blur-xl border-b border-white/10
        transition-all duration-300
        ${
          scrolled
            ? "bg-[#05070c]/95 shadow-[0_15px_50px_rgba(0,0,0,0.85)]"
            : "bg-[#05070c]/70"
        }
        `}
      >
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-10 left-1/4 w-[420px] h-[120px] bg-emerald-400/10 blur-[90px] rounded-full" />
          <div className="absolute -top-10 right-1/4 w-[420px] h-[120px] bg-green-400/10 blur-[90px] rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto h-full px-6 md:px-8 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/home" className="flex items-center gap-3 group">
            {logo ? (
              <img
                src={`${BASE_URL}${logo}`}
                alt="FitTrack Logo"
                className="h-9 w-auto drop-shadow-[0_0_20px_rgba(34,197,94,0.45)] group-hover:scale-105 transition duration-300"
                onError={() => setLogo(null)}
              />
            ) : (
              <div className="flex flex-col leading-none select-none">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Fit<span className="text-emerald-400">Track</span>
                </span>
                <span className="text-[11px] text-white/40 tracking-[0.25em] uppercase mt-1">
                  Smart Fitness
                </span>
              </div>
            )}
          </Link>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-white/70">

            <button onClick={() => goProtectedOrLogin("/home/about")} className="hover:text-white transition">
              About
            </button>

            <button onClick={scrollToServices} className="hover:text-white transition">
              Services
            </button>

            <button onClick={() => goProtectedOrLogin("/home/contact")} className="hover:text-white transition">
              Contact
            </button>

            {/* ✅ NEW DASHBOARD BUTTON */}
            {isUserLoggedIn && (
              <button
                onClick={() => navigate("/home/dashboard")}
                className="hover:text-green-400 transition font-semibold"
              >
                Dashboard
              </button>
            )}

          </div>

          {/* RIGHT SIDE BUTTONS */}
          {!isUserLoggedIn ? (
            <button
              onClick={openLogin}
              className="
              px-5 py-2 text-sm font-semibold
              rounded-xl
              bg-gradient-to-r from-emerald-500 to-emerald-400
              text-slate-950
              shadow-[0_12px_34px_rgba(34,197,94,0.25)]
              hover:scale-105 transition
              "
            >
              Login
            </button>
          ) : (
            <div className="flex items-center gap-3">

              {/* Dashboard Button (Mobile Visible) */}
              <button
                onClick={() => navigate("/home/dashboard")}
                className="px-4 py-2 rounded-xl bg-green-400/20 border border-green-400/40 text-green-300 hover:bg-green-400/30 transition"
              >
                Dashboard
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="
                px-5 py-2 text-sm font-semibold
                rounded-xl
                bg-red-500/90
                text-white
                shadow-[0_12px_34px_rgba(239,68,68,0.35)]
                hover:bg-red-600 transition
                "
              >
                Logout
              </button>

            </div>
          )}

        </div>
      </motion.nav>
    </header>
  );
}