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

  const handleProtectedClick = (e) => {
    const isUserLoggedIn = !!localStorage.getItem("token");

    if (!isUserLoggedIn) {
      e.preventDefault();

      navigate("/home/login", {
        state: { backgroundLocation: location },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        sticky top-16 z-[55]
        backdrop-blur-xl
        bg-[#070b10]/85
        border-b border-white/10
        shadow-[0_14px_45px_rgba(0,0,0,0.55)]
      "
    >
      {/* animated background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <motion.div
          className="absolute -top-12 left-1/3 w-[420px] h-[120px] bg-green-400/10 blur-[90px] rounded-full"
          animate={{ x: [0, 40, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute -top-12 right-1/3 w-[420px] h-[120px] bg-emerald-400/10 blur-[90px] rounded-full"
          animate={{ x: [0, -40, 0] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

      </div>

      {/* nav container */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-3">

        <div className="
          flex items-center
          justify-center
          gap-3
          overflow-x-auto
          whitespace-nowrap
          no-scrollbar
        ">

          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={handleProtectedClick}
              className={({ isActive }) =>
                `
                px-4 py-2
                text-sm font-medium
                rounded-full
                transition-all duration-300
                hover:-translate-y-[2px]
                ${
                  isActive
                    ? "bg-green-400/15 text-green-300 border border-green-400/30 shadow-[0_0_18px_rgba(34,197,94,0.35)]"
                    : "text-gray-300 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white"
                }
              `
              }
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
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