import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetStarted = () => {
    const isUserLoggedIn = !!localStorage.getItem("token");

    if (isUserLoggedIn) {
      navigate("/home/join");
      return;
    }

    navigate("/home/login", {
      state: { backgroundLocation: location },
    });
  };

  const handleLearnMore = (e) => {
    e.preventDefault();
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="relative min-h-[calc(100vh-128px)] pt-20 bg-[#05070c] text-white flex flex-col justify-center items-center text-center px-6 overflow-hidden"
    >
      {/* Animated Glow Background */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-green-400/20 blur-[200px] rounded-full"
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -bottom-60 -right-60 w-[700px] h-[700px] bg-emerald-600/18 blur-[220px] rounded-full"
        animate={{ x: [0, -70, 0], y: [0, -60, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* subtle grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:26px_26px]" />

      {/* Floating Icons */}
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

      {/* Heading */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        Fitness That Fits{" "}
        <span className="text-green-400 drop-shadow-[0_0_25px_rgba(34,197,94,0.6)]">
          Your Life
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-gray-300 max-w-2xl mb-10 text-lg md:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        Access gyms, yoga, zumba & personal training with one smart membership.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6 }}
      >
        <button
          type="button"
          onClick={handleGetStarted}
          className="bg-green-400 text-black font-bold px-7 py-3 rounded-xl shadow-[0_18px_55px_rgba(0,0,0,0.55)] hover:scale-110 transition animate-pulse"
        >
          Get Started
        </button>

        <a
          href="#services"
          onClick={handleLearnMore}
          className="border border-white/40 px-7 py-3 rounded-xl text-white hover:bg-white hover:text-black transition"
        >
          Learn More
        </a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 text-gray-400 text-sm"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Scroll ↓
      </motion.div>
    </section>
  );
}