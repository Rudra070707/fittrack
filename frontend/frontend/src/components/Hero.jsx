import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetStarted = () => {
    navigate("/home/login", {
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
      min-h-[calc(100vh-128px)]
      flex flex-col
      justify-center
      items-center
      text-center
      px-6
      overflow-hidden
      text-white
      "
    >

      {/* Background glow (same style as other pages) */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-green-400/20 blur-[200px] rounded-full"
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 -right-40 w-[650px] h-[650px] bg-emerald-500/15 blur-[220px] rounded-full"
        animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:26px_26px]" />

      {/* Floating Icons (unchanged) */}
      <motion.div
        className="absolute text-green-400 text-4xl left-12 top-40 opacity-40"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        💪
      </motion.div>

      <motion.div
        className="absolute text-emerald-300 text-3xl right-16 top-60 opacity-40"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        🔥
      </motion.div>

      <motion.div
        className="absolute text-green-300 text-3xl bottom-32 left-24 opacity-40"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        ❤️
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl">

        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          Fitness That Fits{" "}
          <span className="text-green-400">
            Your Life
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg md:text-xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Access gyms, yoga, zumba & personal training with one smart membership.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6 }}
        >

          <button
            type="button"
            onClick={handleGetStarted}
            className="
            px-7 py-3
            rounded-2xl
            font-bold
            bg-green-400
            text-black
            hover:bg-green-500
            shadow-[0_0_35px_rgba(34,197,94,0.45)]
            transition
            "
          >
            Get Started
          </button>

          <a
            href="/home/about"
            onClick={handleLearnMore}
            className="
            px-7 py-3
            rounded-2xl
            border border-white/20
            bg-white/5
            backdrop-blur-xl
            hover:border-green-400/40
            hover:bg-white/10
            transition
            "
          >
            Learn More
          </a>

        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 text-gray-400 text-sm tracking-wide"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Scroll ↓
      </motion.div>

    </section>
  );
}