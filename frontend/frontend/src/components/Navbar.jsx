import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef();
  const buttonRef = useRef();

  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

  const hideOnRoutes = useMemo(() => ["/home/login", "/home/signup"], []);
  const shouldHide = hideOnRoutes.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    const handleClick = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (dropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      setDropdownPos({
        top: rect.bottom + 12,
        left: rect.right - 230,
      });
    }
  }, [dropdownOpen]);

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

  const handleNavClick = (item) => {
    if (item.name === "Services") {

      if (location.pathname === "/home") {

        navigate("/home/services");

        setTimeout(() => {
          const el = document.getElementById("services");
          if (el) {
            el.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 400);

        return;
      }

      navigate("/home/services");
      return;
    }

    navigate(item.path);
  };

  if (shouldHide) return null;

  return (
    <header className="sticky top-0 z-[60] h-16">

      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`
          h-full border-b border-white/10
          backdrop-blur-2xl transition-all duration-500
          ${scrolled
            ? "bg-[#04060a]/95 shadow-deep"
            : "bg-[#04060a]/60"}
        `}
      >

        {/* 🔥 TOP GLOW LINE */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-400/40 to-transparent" />

        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

          {/* 🔥 LOGO (UPGRADED) */}
          <Link
            to="/home"
            className="text-xl font-bold tracking-wide flex items-center gap-1 group"
          >
            <span className="text-white">Fit</span>
            <span className="text-green-400 drop-shadow-[0_0_25px_rgba(34,197,94,1)] group-hover:scale-110 transition">
              Track
            </span>
          </Link>

          {/* NAV LINKS */}
          <div className="hidden md:flex gap-10 text-white/60 font-medium">

            {[
              { name: "About", path: "/home/about" },
              { name: "Services", path: "/home/services" },
              { name: "Contact", path: "/home/contact" },
            ].map((item) => {

              const isActive =
                location.pathname === item.path ||
                (item.name === "Services" &&
                  (
                    location.pathname.includes("services") ||
                    location.pathname.includes("diet") ||
                    location.pathname.includes("workout") ||
                    location.pathname.includes("progress") ||
                    location.pathname.includes("injury") ||
                    location.pathname.includes("gym") ||
                    location.pathname.includes("zumba") ||
                    location.pathname.includes("yoga") ||
                    location.pathname.includes("gamification")
                  ));

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="relative group transition-all duration-300"
                >
                  <span
                    className={`
                      transition-all duration-300
                      ${isActive ? "text-white" : "group-hover:text-white"}
                    `}
                  >
                    {item.name}
                  </span>

                  {/* 🔥 UNDERLINE */}
                  <span
                    className={`
                      absolute left-0 -bottom-1 h-[2px]
                      bg-gradient-to-r from-green-400 to-emerald-300
                      transition-all duration-300
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />

                  {/* 🔥 ACTIVE GLOW DOT */}
                  {isActive && (
                    <motion.span
                      layoutId="navDot"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-400 rounded-full shadow-glow"
                    />
                  )}
                </button>
              );
            })}

          </div>

          {/* RIGHT SIDE */}
          {!isUserLoggedIn ? (
            <button
              onClick={openLogin}
              className="
                px-6 py-2.5 rounded-xl font-semibold
                bg-gradient-primary
                text-black
                transition-all duration-300
                hover:scale-105
                hover:shadow-glowStrong
                active:scale-95
                relative overflow-hidden
              "
            >
              {/* SHINE */}
              <span className="absolute inset-0 overflow-hidden">
                <span className="absolute w-1/2 h-full bg-white/20 blur-lg -left-1/2 animate-[shine_2s_infinite]" />
              </span>

              <span className="relative z-10">Login</span>
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                ref={buttonRef}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="
                  relative w-11 h-11 rounded-2xl
                  bg-gradient-to-br from-green-400/30 to-emerald-400/10
                  border border-green-400/30
                  flex items-center justify-center
                  backdrop-blur-xl
                  transition-all duration-300
                  hover:scale-110
                  hover:shadow-glowStrong
                  text-white font-bold
                "
              >
                {userInitial}
                <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-green-400 rounded-full shadow-glow" />
              </button>
            </div>
          )}

        </div>
      </motion.nav>

      {/* DROPDOWN */}
      {dropdownOpen &&
        createPortal(
          <AnimatePresence>
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "fixed",
                top: dropdownPos.top,
                left: dropdownPos.left,
              }}
              className="
                w-56 rounded-2xl
                bg-gradient-to-b from-[#0b0f14]/95 to-[#020617]/95
                backdrop-blur-2xl
                border border-white/10
                shadow-deep
                z-[9999]
                overflow-hidden
              "
            >

              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-white font-semibold">{user?.name || "User"}</p>
                <p className="text-xs text-white/50">{user?.email || "user@email.com"}</p>
              </div>

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
          </AnimatePresence>,
          document.body
        )}

    </header>
  );
}