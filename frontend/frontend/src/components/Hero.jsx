import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const location = useLocation();

  const openLogin = () => {
    navigate("/home/login", { state: { backgroundLocation: location } });
  };

  return (
    <section
      id="about"
      className="relative min-h-[calc(100vh-64px)] bg-[#05070c] text-white flex flex-col justify-center items-center text-center px-6 overflow-hidden"
    >
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

      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:26px_26px]" />

      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        Fitness That Fits{" "}
        <span className="text-green-400 drop-shadow-[0_0_18px_rgba(34,197,94,0.4)]">
          Your Life
        </span>
      </motion.h1>

      <motion.p
        className="text-gray-300 max-w-2xl mb-10 text-lg md:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        Access gyms, yoga, zumba & personal training with one smart membership.
      </motion.p>

      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6 }}
      >
        <button
          onClick={openLogin}
          className="bg-green-400 text-black font-bold px-7 py-3 rounded-xl shadow-[0_18px_55px_rgba(0,0,0,0.55)] hover:scale-105 transition"
        >
          Get Started
        </button>

        <a
          href="#services"
          className="border border-white/40 px-7 py-3 rounded-xl text-white hover:bg-white hover:text-black transition"
        >
          Learn More
        </a>
      </motion.div>
    </section>
  );
}