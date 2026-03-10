import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-[#05070c] text-gray-400 text-center py-10 border-t border-white/10 overflow-hidden"
    >
      {/* glow background */}
      <motion.div
        className="absolute -top-20 left-1/3 w-[400px] h-[200px] bg-green-400/10 blur-[120px] rounded-full"
        animate={{ x: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -top-20 right-1/3 w-[400px] h-[200px] bg-emerald-400/10 blur-[120px] rounded-full"
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Logo */}
        <h2 className="text-xl font-bold text-white mb-2">
          Fit<span className="text-green-400">Track</span>
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Smart Gym Management System
        </p>

        {/* social icons */}
        <div className="flex justify-center gap-6 mb-6 text-lg">
          <a
            href="#"
            className="hover:text-green-400 transition transform hover:scale-110"
          >
            🌐
          </a>
          <a
            href="#"
            className="hover:text-green-400 transition transform hover:scale-110"
          >
            📧
          </a>
          <a
            href="#"
            className="hover:text-green-400 transition transform hover:scale-110"
          >
            💬
          </a>
        </div>

        {/* copyright */}
        <p className="text-sm text-gray-500">
          © 2025 FitTrack — Smart Gym Management System
        </p>
      </div>
    </footer>
  );
}