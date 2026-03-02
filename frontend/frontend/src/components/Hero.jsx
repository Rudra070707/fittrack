import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      id="about"
      className="relative h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col justify-center items-center text-center px-6 overflow-hidden"
    >
      {/* grain + vignette */}
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
      </div>

      {/* aurora glows (animated) */}
      <motion.div
        className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-green-400/18 blur-[160px] rounded-full"
        animate={{ x: [0, 90, 0], y: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-52 -right-52 w-[640px] h-[640px] bg-emerald-600/16 blur-[190px] rounded-full"
        animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-0 right-0 w-[520px] h-[520px] bg-sky-500/12 blur-[180px] rounded-full"
        animate={{ x: [0, -70, 0], y: [0, 60, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* accent line */}
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
        <Link
          to="/home/join"
          className="relative bg-green-400 text-black font-bold px-7 py-3 rounded-xl shadow-[0_18px_55px_rgba(0,0,0,0.55)] hover:scale-105 transition-transform hover:shadow-[0_0_28px_rgba(34,197,94,0.45)] active:scale-[1.02]"
        >
          <span className="relative z-10">Get Started</span>
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/25 via-transparent to-black/10 opacity-70" />
        </Link>

        <a
          href="#services"
          className="relative border border-white/40 px-7 py-3 rounded-xl text-white hover:bg-white hover:text-black transition shadow-[0_12px_40px_rgba(0,0,0,0.35)] active:scale-[0.99]"
        >
          Learn More
        </a>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
    </section>
  );
}