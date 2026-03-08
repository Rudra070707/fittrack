import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ServicesSubnav({ show }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isUserLoggedIn = !!localStorage.getItem("token");

  if (!show || !isUserLoggedIn) return null;

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

  const handleProtectedClick = (e, to) => {
    if (!isUserLoggedIn) {
      e.preventDefault();
      navigate("/home/login", {
        state: { backgroundLocation: location },
      });
      return;
    }

    navigate(to);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        sticky top-16 z-40
        backdrop-blur-xl
        bg-[#070b10]/75
        border-b border-white/10
        shadow-[0_10px_35px_rgba(0,0,0,0.45)]
        relative
      "
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 left-1/3 w-[350px] h-[100px] bg-green-400/10 blur-[70px] rounded-full" />
        <div className="absolute -top-10 right-1/3 w-[350px] h-[100px] bg-emerald-400/10 blur-[70px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-3">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar justify-center">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={(e) => handleProtectedClick(e, item.to)}
              className={({ isActive }) =>
                `
                whitespace-nowrap
                px-4 py-2
                text-sm font-medium
                rounded-full
                transition-all duration-300
                ${
                  isActive
                    ? "bg-green-400/15 text-green-300 border border-green-400/30 shadow-[0_0_18px_rgba(34,197,94,0.35)]"
                    : "text-gray-300 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white"
                }
              `
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </motion.div>
  );
}