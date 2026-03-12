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

    if (!isLoggedIn) {
      navigate("/home/login", {
        state: { backgroundLocation: location },
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

      {/* subtle transition from hero */}
      <div className="pointer-events-none absolute -top-32 left-0 w-full h-32 bg-gradient-to-b from-[#05070c] to-transparent" />

      {/* glow accents */}
      <motion.div
        className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-green-400/10 blur-[200px] rounded-full"
        animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 -right-32 w-[750px] h-[750px] bg-emerald-400/10 blur-[220px] rounded-full"
        animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      <div className="relative z-10 text-center mb-20">

        <p className="text-green-400 tracking-[0.3em] text-xs font-semibold">
          WHAT WE OFFER
        </p>

        <h2 className="text-4xl md:text-6xl font-extrabold mt-4">
          Our <span className="text-green-400">Services</span>
        </h2>

        <p className="text-white/60 mt-6 max-w-2xl mx-auto text-lg">
          Everything you need to transform your fitness lifestyle.
        </p>

      </div>

      <div className="relative z-10 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {services.map((s, i) => (

          <motion.div
            key={i}
            whileHover={{ y: -10, scale: 1.03 }}
            onClick={() => handleServiceClick(s.path)}
            className="group cursor-pointer relative rounded-3xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent"
          >

            <div className="relative rounded-3xl p-8 bg-white/[0.05] backdrop-blur-xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)]" />

              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-green-400/15 border border-green-400/25 text-2xl">
                {s.icon}
              </div>

              <h3 className="text-2xl font-bold mt-6">
                {s.title}
              </h3>

              <p className="text-white/60 mt-3">
                {s.desc}
              </p>

              <div className="mt-8 text-green-300 text-sm">
                Explore →
              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}