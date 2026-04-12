import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ServicesSubnav({ show }) {
  const location = useLocation();
  const navigate = useNavigate();

  const containerRef = useRef();

  // 🔥 FIXED: DELAYED SCROLL (ONLY IMPROVED)
  useEffect(() => {
    if (show && containerRef.current) {
      setTimeout(() => {
        containerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 350);
    }
  }, [show]);

  useEffect(() => {
    // ensures active state updates
  }, [location.pathname]);

  if (!show) return null;

  const items = [
    { name: "Diet Planner", to: "/home/diet" },
    { name: "Workout Planner", to: "/home/workout" },
    { name: "Progress Tracker", to: "/home/progress" },
    { name: "Injury-Safe Training", to: "/home/injury" },
    { name: "Gym Access", to: "/home/gym" },
    { name: "Zumba", to: "/home/zumba" },
    { name: "Yoga", to: "/home/yoga" },
    { name: "Rewards", to: "/home/gamification" },
  ];

  const handleProtectedClick = (e, target) => {
    const isUserLoggedIn = !!localStorage.getItem("token");

    if (location.pathname === target) return;

    if (!isUserLoggedIn) {
      e.preventDefault();

      navigate("/home/login", {
        state: {
          backgroundLocation: location,
          redirectTo: target,
        },
      });

      return;
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: -40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.98 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="
        sticky top-16 z-[55]
        h-14
        backdrop-blur-2xl
        bg-[#070b10]/85
        border-b border-white/10
        shadow-[0_16px_50px_rgba(0,0,0,0.7)]
      "
    >

      {/* 🔥 TOP LIGHT LINE (NEW PREMIUM TOUCH) */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-400/30 to-transparent" />

      {/* 🔥 BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <motion.div
          className="absolute -top-10 left-1/4 w-[500px] h-[140px] bg-green-400/10 blur-[120px] rounded-full"
          animate={{ x: [0, 100, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
        />

        <motion.div
          className="absolute -top-10 right-1/4 w-[500px] h-[140px] bg-emerald-400/10 blur-[120px] rounded-full"
          animate={{ x: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />

      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 h-full flex items-center">

        <div className="
          flex items-center justify-center gap-3
          overflow-x-auto whitespace-nowrap
          no-scrollbar w-full
        ">

          {items.map((item) => (

            <NavLink
              key={item.to}
              to={item.to}
              onClick={(e) => handleProtectedClick(e, item.to)}
              className={({ isActive }) => {

                const active =
                  isActive ||
                  location.pathname === item.to ||
                  location.pathname.startsWith(item.to);

                return `
                relative group px-5 py-2 text-sm font-medium rounded-full
                transition-all duration-300
                hover:-translate-y-[3px]
                ${
                  active
                    ? "bg-gradient-to-r from-emerald-400/30 to-green-400/30 text-emerald-300 border border-emerald-400/60 shadow-[0_0_40px_rgba(34,197,94,0.6)]"
                    : "text-gray-300 border border-white/10 bg-white/[0.04] hover:bg-white/10 hover:text-white"
                }
              `;
              }}
            >

              {/* 🔥 ACTIVE PULSE */}
              <span className="
                absolute inset-0 rounded-full
                opacity-0 group-hover:opacity-100
                bg-green-400/10 blur-md
                transition
              " />

              {/* 🔥 INNER LIGHT */}
              <span className="
                absolute inset-0 rounded-full
                opacity-0 group-hover:opacity-100
                bg-gradient-to-r from-green-400/10 to-emerald-400/10
                blur-xl
              " />

              {/* 🔥 ACTIVE DOT */}
              {location.pathname.startsWith(item.to) && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_12px_rgba(34,197,94,1)]" />
              )}

              <motion.span
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 tracking-wide"
              >
                {item.name}
              </motion.span>

            </NavLink>

          ))}

        </div>

      </div>

    </motion.div>
  );
}