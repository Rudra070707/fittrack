import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const services = [
  { title: "Gym Access", desc: "Unlimited gym sessions", path: "/home/gym", icon: "💪" },
  { title: "Zumba", desc: "Daily dance workouts", path: "/home/zumba", icon: "💃" },
  { title: "Yoga", desc: "Mind & body balance", path: "/home/yoga", icon: "🧘" },
];

export default function Services() {

  const navigate = useNavigate();
  const location = useLocation();

  const handleServiceClick = (path) => {

    const isLoggedIn =
      !!localStorage.getItem("token") ||
      !!localStorage.getItem("adminToken");

    if (location.pathname === path) return;

    if (!isLoggedIn) {
      navigate("/home/login", {
        state: {
          backgroundLocation: location,
          redirectTo: path,
        },
      });
      return;
    }

    navigate(path);
  };

  return (
    <section
      id="services"
      className="relative py-32 px-6 text-white overflow-hidden scroll-mt-32"
    >

      {/* Top Fade */}
      <div className="pointer-events-none absolute -top-32 left-0 w-full h-32 bg-gradient-to-b from-[#05070c] to-transparent" />

      {/* 🔥 BACKGROUND GLOW */}
      <motion.div
        className="absolute -top-32 -left-32 w-[700px] h-[700px] bg-green-400/10 blur-[220px] rounded-full"
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 -right-32 w-[800px] h-[800px] bg-emerald-400/10 blur-[240px] rounded-full"
        animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      {/* 🧠 HEADER */}
      <div className="relative z-10 text-center mb-20">

        <p className="text-green-400 tracking-[0.3em] text-xs font-semibold">
          WHAT WE OFFER
        </p>

        <h2 className="text-4xl md:text-6xl font-extrabold mt-4 tracking-tight">
          Our{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
            Services
          </span>
        </h2>

        <p className="text-white/60 mt-6 max-w-2xl mx-auto text-lg">
          Everything you need to transform your fitness lifestyle.
        </p>

      </div>

      {/* 💎 CARDS */}
      <div className="relative z-10 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {services.map((s, i) => (

          <motion.div
            key={i}
            whileHover={{ y: -12, scale: 1.04 }}
            onClick={() => handleServiceClick(s.path)}
            className="group cursor-pointer relative rounded-3xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent"
          >

            {/* 🔥 Hover Glow */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-green-400/10 blur-xl" />

            <div className="
              relative rounded-3xl p-8
              bg-white/[0.05] backdrop-blur-xl
              border border-white/10
              transition-all duration-300
              group-hover:border-green-400/40
              group-hover:shadow-[0_0_40px_rgba(34,197,94,0.2)]
            ">

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)]" />

              {/* ICON */}
              <div className="
                w-16 h-16 flex items-center justify-center
                rounded-2xl
                bg-green-400/15 border border-green-400/25
                text-3xl
                transition group-hover:scale-110
              ">
                {s.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-2xl font-bold mt-6">
                {s.title}
              </h3>

              {/* DESC */}
              <p className="text-white/60 mt-3">
                {s.desc}
              </p>

              {/* CTA */}
              <div className="mt-8 text-green-300 text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                Explore →
              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}