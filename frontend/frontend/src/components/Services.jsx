import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const services = [
  { title: "Gym Access", desc: "Unlimited gym sessions", path: "/home/gym" },
  { title: "Zumba", desc: "Daily dance workouts", path: "/home/zumba" },
  { title: "Yoga", desc: "Mind & body balance", path: "/home/yoga" },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Services() {
  const navigate = useNavigate();

  return (
    <section
      id="services"
      className="relative py-32 px-6 bg-[#05070c] text-white overflow-hidden"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-green-400/15 blur-[180px] rounded-full"
          animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -right-32 w-[700px] h-[700px] bg-emerald-500/12 blur-[200px] rounded-full"
          animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 relative"
      >
        <p className="text-green-400 font-semibold tracking-[0.3em] text-xs">
          WHAT WE OFFER
        </p>

        <h2 className="text-4xl md:text-6xl font-extrabold mt-4">
          Our <span className="text-green-400">Services</span>
        </h2>

        <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
          Everything you need to transform your fitness lifestyle.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto relative"
      >
        {services.map((s, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            onClick={() => navigate(s.path)}
            className="group relative cursor-pointer rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-transparent hover:scale-[1.03] transition-transform duration-300"
          >
            <div className="relative rounded-3xl p-8 bg-white/[0.05] backdrop-blur-xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.6)] overflow-hidden group-hover:border-green-400/40 transition-all duration-300">
              {/* hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_circle_at_20%_10%,rgba(34,197,94,0.25),transparent_45%)]" />

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              >
                <div className="w-14 h-14 rounded-2xl bg-green-400/15 border border-green-400/25 flex items-center justify-center text-green-300 font-bold text-xl shadow-[0_0_25px_rgba(34,197,94,0.25)]">
                  {i + 1}
                </div>
              </motion.div>

              <h3 className="text-2xl font-bold mt-6">{s.title}</h3>
              <p className="text-gray-400 mt-3">{s.desc}</p>

              <div className="mt-8 text-sm text-green-300 group-hover:translate-x-1 transition-transform duration-300">
                Explore →
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}