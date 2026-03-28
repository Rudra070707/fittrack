import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    const sync = () => {
      setIsUserLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", sync);
    window.addEventListener("focus", sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus", sync);
    };
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsUserLoggedIn(false);
    setDropdownOpen(false);

    navigate("/home", { replace: true });
  };

  if (shouldHide) return null;

  return (
    <header className="sticky top-0 z-[60] h-16">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`
          h-full backdrop-blur-2xl border-b border-white/10
          transition-all duration-300
          ${scrolled ? "bg-[#05070c]/95 shadow-lg shadow-black/30" : "bg-[#05070c]/70"}
        `}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

          {/* 🔥 LOGO (Glow Effect) */}
          <Link
            to="/home"
            className="text-xl font-bold text-white tracking-wide hover:scale-105 transition"
          >
            Fit<span className="text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">Track</span>
          </Link>

          {/* 🧭 NAV LINKS */}
          <div className="hidden md:flex gap-8 text-white/70 font-medium">
            {[
              { name: "About", path: "/home/about" },
              { name: "Services", path: "/home/services" },
              { name: "Contact", path: "/home/contact" },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="relative group transition"
              >
                <span className="group-hover:text-white transition">
                  {item.name}
                </span>

                {/* underline animation */}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* 👉 RIGHT SIDE */}
          {!isUserLoggedIn ? (
            <button
              onClick={openLogin}
              className="
                px-5 py-2 rounded-xl font-semibold
                bg-green-400 text-black
                transition-all duration-300
                hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]
                active:scale-95
              "
            >
              Login
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>

              {/* 👤 PROFILE BUTTON */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="
                  w-11 h-11 rounded-2xl
                  bg-green-400/20 border border-green-400/30
                  flex items-center justify-center
                  transition-all duration-300
                  hover:scale-105 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]
                "
              >
                👤
              </button>

              {/* 📦 DROPDOWN */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="
                      absolute right-0 mt-3 w-56
                      rounded-2xl overflow-hidden
                      bg-[#0b0f14]/90 backdrop-blur-xl
                      border border-white/10
                      shadow-xl shadow-black/40
                    "
                  >
                    <button
                      onClick={() => {
                        navigate("/home/dashboard");
                        setDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-white/10 transition"
                    >
                      📊 Dashboard
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-red-400 hover:bg-white/10 transition"
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