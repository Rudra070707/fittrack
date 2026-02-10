import { motion } from "framer-motion";
import InjurySafeTraining from "../components/InjurySafeTraining";

export default function InjurySafe() {
  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800" />

      {/* Glows + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-green-500/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 -right-24 w-[560px] h-[560px] bg-emerald-400/10 blur-[170px] rounded-full" />
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:26px_26px]" />
      </div>

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

        {/* Main content */}
        <InjurySafeTraining />
      </motion.div>
    </section>
  );
}
