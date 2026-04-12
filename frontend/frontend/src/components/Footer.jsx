import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-28 text-gray-400 overflow-hidden bg-transparent">

      {/* 🌌 GLOBAL BACKGROUND CONSISTENCY */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[700px] h-[700px] bg-indigo-500/10 blur-[160px] top-[-200px] left-[-150px]" />
        <div className="absolute w-[700px] h-[700px] bg-green-500/10 blur-[160px] bottom-[-200px] right-[-150px]" />

        {/* 🔥 EXTRA DEPTH */}
        <div className="absolute w-[600px] h-[600px] bg-cyan-400/10 blur-[180px] top-[20%] left-[40%]" />
      </div>

      {/* 🔥 TOP BLEND */}
      <div className="pointer-events-none absolute -top-32 left-0 w-full h-32 bg-gradient-to-b from-transparent via-[#05070c]/60 to-[#05070c]" />

      {/* 🔥 PRIMARY GLOW */}
      <motion.div
        className="absolute -top-20 left-1/3 w-[600px] h-[250px] bg-green-400/10 blur-[160px] rounded-full pointer-events-none"
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      {/* 🔥 SECONDARY GLOW */}
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[200px] bg-emerald-400/10 blur-[140px] rounded-full pointer-events-none"
        animate={{ x: [0, -100, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      {/* 🔥 SIDE DEPTH */}
      <div className="absolute left-0 top-1/2 w-[350px] h-[220px] bg-green-400/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* 💎 TOP BRAND */}
        <div className="text-center mb-20">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-wide"
          >
            Fit
            <span className="text-green-400 drop-shadow-[0_0_35px_rgba(34,197,94,1)]">
              Track
            </span>
          </motion.h2>

          <motion.p
            className="text-sm text-gray-400 mt-4 tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Smart Fitness & Gym Management Platform
          </motion.p>

          <div className="w-40 h-[2px] bg-gradient-to-r from-green-400/20 via-green-400/70 to-green-400/20 mx-auto mt-8 rounded-full" />

        </div>

        {/* 📦 GRID */}
        <div className="grid md:grid-cols-3 gap-14 text-sm mb-24">

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-5 tracking-wide">
              Navigation
            </h3>

            <ul className="space-y-3">
              {["About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`/home/${item.toLowerCase()}`}
                    className="
                      relative inline-block
                      hover:text-green-400 transition-all duration-300
                      after:absolute after:left-0 after:-bottom-1
                      after:h-[2px] after:w-0
                      after:bg-gradient-to-r after:from-green-400 after:to-emerald-300
                      after:transition-all after:duration-300
                      hover:after:w-full
                    "
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold mb-5 tracking-wide">
              Features
            </h3>

            <ul className="space-y-3">
              {[
                "Workout Planner",
                "Progress Tracker",
                "Injury-Safe Training",
                "Gym Access",
              ].map((item) => (
                <li
                  key={item}
                  className="
                    cursor-pointer
                    hover:text-green-400
                    hover:translate-x-3
                    transition-all duration-300
                  "
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-semibold mb-5 tracking-wide">
              Connect
            </h3>

            <ul className="space-y-3">
              <li className="hover:text-green-400 transition">
                📧 support@fittrack.com
              </li>

              <li className="hover:text-green-400 transition">
                📍 India
              </li>

              <li className="flex gap-4 mt-6 justify-center md:justify-start">

                {["🌐", "📸", "🐦"].map((icon, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.25, y: -6 }}
                    className="
                      w-11 h-11 flex items-center justify-center
                      rounded-2xl bg-white/5 border border-white/10
                      backdrop-blur-xl
                      hover:bg-green-400/20
                      hover:shadow-[0_0_45px_rgba(34,197,94,0.9)]
                      transition-all duration-300 cursor-pointer
                    "
                  >
                    {icon}
                  </motion.span>
                ))}

              </li>
            </ul>
          </div>

        </div>

        {/* ⚡ BOTTOM */}
        <div className="text-center pt-8 text-xs text-gray-500 tracking-wide opacity-70 border-t border-white/10">

          {/* 🔥 SUBTLE GLOW LINE */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-green-400/30 to-transparent mb-6" />

          © {new Date().getFullYear()} FitTrack. All rights reserved.

        </div>

      </div>

    </footer>
  );
}