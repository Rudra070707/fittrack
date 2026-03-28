import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-24 text-gray-400 overflow-hidden border-t border-white/10">

      {/* 🔥 Background Glow */}
      <motion.div
        className="absolute -top-20 left-1/3 w-[500px] h-[200px] bg-green-400/10 blur-[140px] rounded-full"
        animate={{ x: [0, 60, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* 💎 TOP BRAND */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white tracking-wide">
            Fit
            <span className="text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]">
              Track
            </span>
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Smart Fitness & Gym Management Platform
          </p>

          <div className="w-24 h-[2px] bg-green-400/40 mx-auto mt-6" />
        </div>

        {/* 📦 GRID SECTIONS */}
        <div className="grid md:grid-cols-3 gap-10 text-sm mb-14">

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {["About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`/home/${item.toLowerCase()}`}
                    className="hover:text-green-400 transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              {[
                "Workout Planner",
                "Progress Tracker",
                "Injury-Safe Training",
                "Gym Access",
              ].map((item) => (
                <li key={item} className="hover:text-green-400 transition">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li className="hover:text-green-400 transition">📧 support@fittrack.com</li>
              <li className="hover:text-green-400 transition">📍 India</li>
              <li className="flex gap-3 mt-3 justify-center md:justify-start">

                {/* Social Icons */}
                {["🌐", "📸", "🐦"].map((icon, i) => (
                  <span
                    key={i}
                    className="
                      w-9 h-9 flex items-center justify-center
                      rounded-xl bg-white/5 border border-white/10
                      hover:bg-green-400/20 hover:scale-110
                      transition-all cursor-pointer
                    "
                  >
                    {icon}
                  </span>
                ))}

              </li>
            </ul>
          </div>

        </div>

        {/* ⚡ BOTTOM */}
        <div className="text-center border-t border-white/10 pt-6 text-xs text-gray-500">
          © {new Date().getFullYear()} FitTrack. All rights reserved.
        </div>

      </div>

    </footer>
  );
}