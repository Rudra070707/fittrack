import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-24 text-center text-gray-400 overflow-hidden border-t border-white/10">

      <motion.div
        className="absolute -top-20 left-1/3 w-[500px] h-[200px] bg-green-400/10 blur-[140px] rounded-full"
        animate={{ x: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-extrabold text-white">
          Fit<span className="text-green-400">Track</span>
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Smart Gym Management System
        </p>

        <div className="w-24 h-[2px] bg-green-400/40 mx-auto mt-6 mb-10" />

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} FitTrack
        </p>

      </div>

    </footer>
  );
}