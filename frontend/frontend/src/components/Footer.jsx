import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="
      relative
      bg-[#05070c]
      text-gray-400
      text-center
      py-16
      border-t border-white/10
      overflow-hidden
      "
    >

      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 z-0">

        <motion.div
          className="absolute -top-24 left-1/3 w-[500px] h-[220px] bg-green-400/10 blur-[140px] rounded-full"
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute -top-24 right-1/3 w-[500px] h-[220px] bg-emerald-400/10 blur-[140px] rounded-full"
          animate={{ x: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* logo */}
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Fit<span className="text-green-400">Track</span>
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Smart Gym Management System
        </p>

        {/* divider */}
        <div className="w-24 h-[2px] bg-green-400/40 mx-auto mt-6 mb-8" />

        {/* social icons */}
        <div className="flex justify-center gap-8 mb-8 text-xl">

          <a
            href="#"
            className="
            w-10 h-10
            flex items-center justify-center
            rounded-xl
            bg-white/5
            border border-white/10
            hover:border-green-400/40
            hover:text-green-400
            transition
            transform hover:scale-110
            "
          >
            🌐
          </a>

          <a
            href="#"
            className="
            w-10 h-10
            flex items-center justify-center
            rounded-xl
            bg-white/5
            border border-white/10
            hover:border-green-400/40
            hover:text-green-400
            transition
            transform hover:scale-110
            "
          >
            📧
          </a>

          <a
            href="#"
            className="
            w-10 h-10
            flex items-center justify-center
            rounded-xl
            bg-white/5
            border border-white/10
            hover:border-green-400/40
            hover:text-green-400
            transition
            transform hover:scale-110
            "
          >
            💬
          </a>

        </div>

        {/* copyright */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} FitTrack — Smart Gym Management System
        </p>

      </div>
    </footer>
  );
}