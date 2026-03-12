import { motion } from "framer-motion";
import InjurySafeTraining from "../components/InjurySafeTraining";

export default function InjurySafe() {

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />

        <motion.div
          className="absolute inset-0 opacity-80"
          animate={{
            background: [
              "radial-gradient(circle at 15% 25%, rgba(16,185,129,0.28), transparent 60%), radial-gradient(circle at 85% 35%, rgba(59,130,246,0.20), transparent 55%)",
              "radial-gradient(circle at 70% 20%, rgba(59,130,246,0.26), transparent 60%), radial-gradient(circle at 35% 80%, rgba(99,102,241,0.18), transparent 55%)",
              "radial-gradient(circle at 30% 70%, rgba(16,185,129,0.24), transparent 62%), radial-gradient(circle at 85% 60%, rgba(99,102,241,0.20), transparent 55%)"
            ]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

      </div>

      <motion.div
        className="relative max-w-6xl mx-auto px-6 py-20"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >

        {/* Header */}
        <div className="mb-14">

          <p className="text-emerald-400 font-semibold tracking-[0.28em] text-xs">
            SERVICES / INJURY SAFE
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Injury-Safe{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Training
            </span>
          </h1>

          <p className="text-white/70 mt-4 max-w-3xl leading-relaxed">
            Train smart while recovering. Get safe exercise suggestions based on
            pain or injury areas — designed to reduce risk and support healing.
          </p>

        </div>

        {/* Main component */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-7 md:p-8 shadow-[0_26px_90px_rgba(0,0,0,0.65)] transition"
        >
          <InjurySafeTraining />
        </motion.div>

      </motion.div>

    </section>
  );
}