import { NavLink } from "react-router-dom";

export default function ServicesSubnav({ show }) {
  if (!show) return null;

  const items = [
    { name: "Diet Planner", to: "/home/diet" },
    { name: "Workout Planner", to: "/home/workout" },
    { name: "Progress Tracker", to: "/home/progress" },
    { name: "Injury-Safe Training", to: "/home/injury" },

    // ✅ NEW: services from cards
    { name: "Gym Access", to: "/home/gym" },
    { name: "Zumba", to: "/home/zumba" },
    { name: "Yoga", to: "/home/yoga" },
  ];

  return (
    <div
      className="
        sticky top-16 z-40
        bg-white/5 backdrop-blur-xl
        border-b border-white/10
      "
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="h-12 flex items-center justify-center">
          <div className="flex items-center gap-10 text-sm font-medium overflow-x-auto">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `
                  whitespace-nowrap
                  pb-2 pt-3
                  transition-all duration-300
                  ${
                    isActive
                      ? "text-white border-b-2 border-green-400"
                      : "text-gray-300 hover:text-white border-b-2 border-transparent"
                  }
                `
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
