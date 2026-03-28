import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ServicesSubnav({ show }) {
  const location = useLocation();
  const navigate = useNavigate();

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
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        sticky top-16 z-[55]
        h-14
        backdrop-blur-2xl
        bg-[#070b10]/80
        border-b border-white/10
        shadow-[0_14px_45px_rgba(0,0,0,0.6)]
      "
    >

      {/* 🔥 BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <motion.div
          className="absolute -top-10 left-1/4 w-[450px] h-[120px] bg-green-400/10 blur-[100px] rounded-full"
          animate={{ x: [0, 60, 0] }}
          transition={{ duration: 16, repeat: Infinity }}
        />

        <motion.div
          className="absolute -top-10 right-1/4 w-[450px] h-[120px] bg-emerald-400/10 blur-[100px] rounded-full"
          animate={{ x: [0, -60, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
        />

      </div>

      {/* subtle gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      {/* NAV */}
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
              className={({ isActive }) =>
                `
                relative px-5 py-2 text-sm font-medium rounded-full
                transition-all duration-300
                hover:-translate-y-[2px]
                ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-400/20 to-green-400/20 text-emerald-300 border border-emerald-400/40 shadow-[0_0_25px_rgba(34,197,94,0.35)]"
                    : "text-gray-300 border border-white/10 bg-white/[0.04] hover:bg-white/10 hover:text-white"
                }
              `
              }
            >

              {/* 🔥 Hover Glow Layer */}
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-green-400/10 blur-md transition" />

              <motion.span
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
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