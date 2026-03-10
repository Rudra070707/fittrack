import { motion } from "framer-motion";
import InjurySafeTraining from "../components/InjurySafeTraining";

export default function InjurySafe() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05070c] text-white">

      {/* Background glow */}
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

      <motion.div
        className="relative max-w-6xl mx-auto px-6 py-16"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >

        {/* Header */}
        <div className="mb-12">

          <p className="text-green-400 font-semibold tracking-[0.28em] text-xs">
            SERVICES / INJURY SAFE
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Injury-Safe <span className="text-green-400">Training</span>
          </h1>

          <p className="text-gray-300 mt-4 max-w-3xl leading-relaxed">
            Train smart while recovering. Get safe exercise suggestions based on
            pain or injury areas — designed to reduce risk and support healing.
          </p>

        </div>

        {/* Main component */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="transition"
        >
          <InjurySafeTraining />
        </motion.div>

      </motion.div>
    </section>
  );
}