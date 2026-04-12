import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetStarted = () => {
    navigate("/home/select", {
      state: { backgroundLocation: location },
    });
  };

  const handleLearnMore = (e) => {
    e.preventDefault();
    navigate("/home/about");
  };

  return (
    <section
      id="about"
      className="
      relative
      min-h-screen
      flex flex-col
      justify-center
      items-center
      text-center
      px-6
      overflow-hidden
      text-white
      bg-transparent
      "
    >

      {/* 🌌 GLOBAL BACKGROUND DEPTH */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[700px] h-[700px] bg-indigo-500/20 blur-[160px] top-[-150px] left-[-150px]" />
        <div className="absolute w-[700px] h-[700px] bg-green-500/20 blur-[160px] bottom-[-150px] right-[-150px]" />

        {/* 🔥 EXTRA DEPTH LAYER */}
        <div className="absolute w-[600px] h-[600px] bg-cyan-400/10 blur-[180px] top-[20%] right-[10%]" />
      </div>

      {/* 🔥 PRIMARY GLOW */}
      <motion.div
        className="absolute -top-40 -left-40 w-[650px] h-[650px] bg-green-400/15 blur-[240px] rounded-full pointer-events-none"
        animate={{ x: [0, 120, 0], y: [0, 80, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 -right-40 w-[700px] h-[700px] bg-emerald-500/15 blur-[260px] rounded-full pointer-events-none"
        animate={{ x: [0, -120, 0], y: [0, -80, 0] }}
        transition={{ duration: 22, repeat: Infinity }}
      />

      {/* 🔥 CENTER LIGHT */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[600px] h-[400px] bg-green-400/10 blur-[160px] rounded-full" />
      </div>

      {/* ✨ GRID */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:32px_32px]" />

      {/* 🔥 HORIZONTAL LIGHT LINE */}
      <div className="pointer-events-none absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-400/20 to-transparent opacity-30" />

      {/* 🔥 FLOATING ICONS */}
      <motion.div
        className="absolute text-green-400 text-4xl left-12 top-40 opacity-20"
        animate={{ y: [0, -25, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        💪
      </motion.div>

      <motion.div
        className="absolute text-emerald-300 text-3xl right-16 top-60 opacity-20"
        animate={{ y: [0, -22, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        🔥
      </motion.div>

      <motion.div
        className="absolute text-green-300 text-3xl bottom-32 left-24 opacity-20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        ❤️
      </motion.div>

      {/* 💎 HERO CONTENT */}
      <div className="relative z-10 max-w-5xl">

        {/* 🔥 BADGE (NEW - STARTUP LEVEL TOUCH) */}
        <motion.div
          className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 backdrop-blur-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🚀 Smart Fitness Platform
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-[1.05] tracking-tight"
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Fitness That Fits{" "}
          <span className="
            bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400
            bg-clip-text text-transparent
            drop-shadow-[0_0_60px_rgba(34,197,94,1)]
          ">
            Your Life
          </span>
        </motion.h1>

        <motion.p
          className="text-gray-300 max-w-2xl mx-auto mb-14 text-lg md:text-xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Access gyms, yoga, zumba & personal training with one smart membership.
        </motion.p>

        <motion.div
          className="flex gap-6 justify-center flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
        >

          {/* 🔥 PRIMARY BUTTON */}
          <button
            onClick={handleGetStarted}
            className="
              px-9 py-3.5 rounded-2xl font-bold tracking-wide
              bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400
              text-black
              relative overflow-hidden
              transition-all duration-300
              shadow-[0_0_60px_rgba(34,197,94,0.9)]
              hover:shadow-[0_0_120px_rgba(34,197,94,1)]
              hover:scale-110
              active:scale-95
            "
          >
            <span className="absolute inset-0 overflow-hidden">
              <span className="absolute w-1/2 h-full bg-white/20 blur-lg -left-1/2 animate-[shine_2s_infinite]" />
            </span>
            <span className="relative z-10">Get Started</span>
          </button>

          {/* 🔥 SECONDARY BUTTON */}
          <a
            href="/home/about"
            onClick={handleLearnMore}
            className="
              px-9 py-3.5 rounded-2xl
              border border-white/20
              bg-white/5 backdrop-blur-xl
              transition-all duration-300
              hover:border-green-400/60
              hover:bg-white/10
              hover:scale-105
              hover:shadow-[0_0_40px_rgba(34,197,94,0.5)]
            "
          >
            Learn More
          </a>

        </motion.div>

      </div>

      {/* 👇 SCROLL INDICATOR */}
      <motion.div
        className="absolute bottom-10 text-gray-400 text-sm tracking-wide"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Scroll ↓
      </motion.div>

      {/* 🔥 FADE */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#05070c]" />

    </section>
  );
}