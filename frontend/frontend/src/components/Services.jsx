import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const services = [
  { title: "Gym Access", desc: "Unlimited gym sessions", path: "/home/gym" },
  { title: "Zumba", desc: "Daily dance workouts", path: "/home/zumba" },
  { title: "Yoga", desc: "Mind & body balance", path: "/home/yoga" },
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <motion.section
      id="services"
      className="
        relative py-32 px-6
        bg-gradient-to-br from-black via-gray-900 to-gray-800
        text-white overflow-hidden
      "
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1 }}
    >
      {/* Premium ambient layer (visual only) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-green-400/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 -right-24 w-[620px] h-[620px] bg-green-600/10 blur-[170px] rounded-full" />
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:26px_26px]" />
      </div>

      {/* Section Heading */}
      <div className="text-center mb-20 relative">
        <p className="text-green-400 font-semibold tracking-[0.25em] text-xs">
          WHAT WE OFFER
        </p>

        <h2 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight">
          Our <span className="text-green-400">Services</span>
        </h2>

        <p className="text-gray-300 mt-5 max-w-2xl mx-auto text-lg">
          Everything you need to transform your fitness lifestyle — all in one place.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto relative">
        {services.map((s, i) => (
          <motion.div
            key={i}
            onClick={() => navigate(s.path)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate(s.path);
            }}
            className="
              group relative cursor-pointer
              rounded-3xl p-[1px]
              bg-gradient-to-br from-white/15 via-white/5 to-transparent
              transition-all duration-300
              hover:scale-[1.03]
            "
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: i * 0.18 }}
          >
            {/* Inner card */}
            <div
              className="
                relative rounded-3xl p-8
                bg-white/[0.06] backdrop-blur-xl
                border border-white/10
                shadow-[0_20px_60px_rgba(0,0,0,0.55)]
                transition-all duration-300
                group-hover:border-green-400/30
                group-hover:shadow-[0_0_45px_rgba(34,197,94,0.22)]
                overflow-hidden
              "
            >
              {/* hover shine */}
              <div
                className="
                  pointer-events-none absolute inset-0
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  bg-[radial-gradient(600px_circle_at_20%_10%,rgba(34,197,94,0.18),transparent_45%)]
                "
              />

              {/* subtle top line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />

              {/* Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="
                    w-12 h-12 rounded-2xl
                    bg-green-400/15 border border-green-400/25
                    flex items-center justify-center
                    shadow-[0_0_18px_rgba(34,197,94,0.18)]
                    transition-all duration-300
                    group-hover:shadow-[0_0_28px_rgba(34,197,94,0.30)]
                  "
                >
                  <span className="text-green-300 font-extrabold text-lg">
                    {i + 1}
                  </span>
                </div>

                <p className="text-xs tracking-[0.25em] uppercase text-gray-400">
                  FitTrack Service
                </p>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-extrabold mb-3 group-hover:text-white transition-colors">
                {s.title}
              </h3>

              <p className="text-gray-300 leading-relaxed">
                {s.desc}
              </p>

              {/* CTA row */}
              <div className="mt-8 flex items-center justify-between">
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  View details
                </span>

                <span
                  className="
                    text-sm font-semibold
                    text-green-300
                    translate-x-0 group-hover:translate-x-1
                    transition-transform duration-300
                  "
                >
                  →
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
