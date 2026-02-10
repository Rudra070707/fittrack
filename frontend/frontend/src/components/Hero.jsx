import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      id="about"
      className="relative h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col justify-center items-center text-center px-6 overflow-hidden"
    >
      {/* Extra subtle visuals (CSS only) */}
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
      </div>

      {/* Floating Glows */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-green-400/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-600/20 blur-[140px] rounded-full" />

      {/* Small top accent (visual only) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[1px] bg-gradient-to-r from-transparent via-green-400/40 to-transparent" />

      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Fitness That Fits{" "}
        <span className="text-green-400 drop-shadow-[0_0_22px_rgba(34,197,94,0.35)]">
          Your Life
        </span>
      </motion.h1>

      <motion.p
        className="text-gray-300 max-w-2xl mb-10 text-lg md:text-xl leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.3 }}
      >
        Access gyms, yoga, zumba & personal training with one smart membership.
      </motion.p>

      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6 }}
      >
        {/* ✅ FIX: Go to Join page */}
        <Link
          to="/home/join"
          className="
            relative
            bg-green-400 text-black font-bold px-7 py-3 rounded-xl
            shadow-[0_18px_55px_rgba(0,0,0,0.55)]
            hover:scale-105 transition-transform
            hover:shadow-[0_0_28px_rgba(34,197,94,0.45)]
            active:scale-[1.02]
          "
        >
          <span className="relative z-10">Get Started</span>
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/25 via-transparent to-black/10 opacity-70" />
        </Link>

        <a
          href="#services"
          className="
            relative
            border border-white/40 px-7 py-3 rounded-xl text-white
            bg-white/0
            hover:bg-white hover:text-black
            transition
            shadow-[0_12px_40px_rgba(0,0,0,0.35)]
            active:scale-[0.99]
          "
        >
          Learn More
        </a>
      </motion.div>

      {/* Bottom fade (visual only) */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
    </section>
  );
}
