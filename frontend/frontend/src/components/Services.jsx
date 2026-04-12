import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const services = [
  { title: "Gym Access", desc: "Unlimited gym sessions", path: "/gym", icon: "💪" },
  { title: "Zumba", desc: "Daily dance workouts", path: "/zumba", icon: "💃" },
  { title: "Yoga", desc: "Mind & body balance", path: "/yoga", icon: "🧘" },
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
      className="relative py-36 px-6 text-white overflow-hidden scroll-mt-32 bg-transparent"
    >

      {/* 🌌 GLOBAL BACKGROUND CONSISTENCY */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[700px] h-[700px] bg-indigo-500/10 blur-[160px] top-[-150px] left-[-150px]" />
        <div className="absolute w-[700px] h-[700px] bg-green-500/10 blur-[160px] bottom-[-150px] right-[-150px]" />

        {/* 🔥 EXTRA DEPTH */}
        <div className="absolute w-[600px] h-[600px] bg-cyan-400/10 blur-[180px] top-[30%] left-[40%]" />
      </div>

      {/* Top Fade */}
      <div className="pointer-events-none absolute -top-32 left-0 w-full h-32 bg-gradient-to-b from-[#05070c] to-transparent opacity-60" />

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05070c] to-transparent opacity-60" />

      {/* 🔥 BACKGROUND GLOW */}
      <motion.div
        className="absolute -top-32 -left-32 w-[700px] h-[700px] bg-green-400/10 blur-[220px] rounded-full pointer-events-none"
        animate={{ x: [0, 120, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 -right-32 w-[800px] h-[800px] bg-emerald-400/10 blur-[240px] rounded-full pointer-events-none"
        animate={{ x: [0, -120, 0], y: [0, -60, 0] }}
        transition={{ duration: 24, repeat: Infinity }}
      />

      {/* 🧠 HEADER */}
      <div className="relative z-10 text-center mb-28">

        <motion.p
          className="text-green-400 tracking-[0.4em] text-xs font-semibold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          WHAT WE OFFER
        </motion.p>

        <motion.h2
          className="text-4xl md:text-6xl font-extrabold mt-4 tracking-tight leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Our{" "}
          <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(34,197,94,1)]">
            Services
          </span>
        </motion.h2>

        <motion.p
          className="text-white/60 mt-6 max-w-2xl mx-auto text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Everything you need to transform your fitness lifestyle.
        </motion.p>

      </div>

      {/* 💎 CARDS */}
      <div className="relative z-10 grid md:grid-cols-3 gap-12 max-w-6xl mx-auto items-stretch">

        {services.map((s, i) => (

          <motion.div
            key={i}

            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.2, duration: 0.7 }}

            whileHover={{ y: -20, scale: 1.07, rotateX: 4 }}
            viewport={{ once: true }}

            onClick={() => handleServiceClick(s.path)}

            className="group cursor-pointer relative rounded-3xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent h-full"
          >

            {/* 🔥 OUTER GLOW */}
            <div className="absolute -inset-3 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-green-400/25 blur-3xl pointer-events-none" />

            {/* 🔥 DEPTH SHADOW */}
            <div className="absolute -inset-1 translate-y-5 bg-black/30 blur-2xl rounded-3xl opacity-60 group-hover:translate-y-10 transition-all duration-500 pointer-events-none" />

            <div className="
              relative rounded-3xl p-9 h-full flex flex-col justify-between
              bg-white/[0.05] backdrop-blur-2xl
              border border-white/10
              transition-all duration-300
              group-hover:border-green-400/60
              group-hover:shadow-[0_0_100px_rgba(34,197,94,0.35)]
            ">

              {/* ✨ SHINE EFFECT */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.2),transparent)] pointer-events-none" />

              {/* 🔥 TOP LIGHT LINE */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-400/40 to-transparent opacity-0 group-hover:opacity-100 transition" />

              {/* ICON */}
              <div className="
                w-16 h-16 flex items-center justify-center
                rounded-2xl
                bg-gradient-to-br from-green-400/20 to-emerald-400/10
                border border-green-400/30
                text-3xl
                transition-all duration-300
                group-hover:scale-115 group-hover:shadow-[0_0_45px_rgba(34,197,94,0.8)]
              ">
                {s.icon}
              </div>

              {/* TEXT */}
              <div>
                <h3 className="text-2xl font-bold mt-6 tracking-wide group-hover:text-green-300 transition">
                  {s.title}
                </h3>

                <p className="text-white/60 mt-3 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              {/* CTA */}
              <div className="mt-10 text-green-300 text-sm flex items-center gap-2 group-hover:gap-6 transition-all duration-300">
                <span className="tracking-wide">Explore</span>
                <span className="group-hover:translate-x-3 transition">→</span>
              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}