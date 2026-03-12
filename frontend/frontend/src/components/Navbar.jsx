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

  // scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // auth sync
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

  // fetch logo
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
    // If not on home page, navigate first then scroll
    if (!location.pathname.startsWith("/home") || location.pathname !== "/home") {
      navigate("/home", { state: { scrollTo: "services" } });
      return;
    }

    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (shouldHide) return null;

  return (
    <header className="sticky top-0 z-[60]">

      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className={`h-16 backdrop-blur-xl border-b border-white/10 relative overflow-hidden transition-all duration-300
        ${
          scrolled
            ? "bg-[#05070c]/95 shadow-[0_12px_40px_rgba(0,0,0,0.75)]"
            : "bg-[#05070c]/70"
        }`}
      >

        {/* background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-10 left-1/4 w-[420px] h-[120px] bg-green-400/10 blur-[90px] rounded-full" />
          <div className="absolute -top-10 right-1/4 w-[420px] h-[120px] bg-emerald-400/10 blur-[90px] rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto h-full px-6 md:px-8 flex items-center justify-between">

          {/* Logo */}
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
                  Fit<span className="text-green-400">Track</span>
                </span>

                <span className="text-[11px] text-gray-400 tracking-[0.22em] uppercase mt-1">
                  Smart Fitness
                </span>
              </div>
            )}

          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-300">

            <button
              type="button"
              onClick={() => goProtectedOrLogin("/home/about")}
              className="relative hover:text-white transition group"
            >
              About
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-400 transition-all group-hover:w-full" />
            </button>

            <button
              type="button"
              onClick={scrollToServices}
              className="relative hover:text-white transition group"
            >
              Services
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-400 transition-all group-hover:w-full" />
            </button>

            <button
              type="button"
              onClick={() => goProtectedOrLogin("/home/contact")}
              className="relative hover:text-white transition group"
            >
              Contact
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-400 transition-all group-hover:w-full" />
            </button>

          </div>

          {/* Login Button */}
          {!isUserLoggedIn && (
            <Link
              to="/home/login"
              state={{ backgroundLocation: location }}
              className="px-5 py-2 text-sm font-semibold rounded-xl text-black bg-green-400 hover:bg-green-500 transition shadow-[0_0_28px_rgba(34,197,94,0.55)] hover:scale-105"
            >
              Login
            </Link>
          )}

        </div>

      </motion.nav>

    </header>
  );
}