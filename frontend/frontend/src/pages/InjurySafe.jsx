import { motion } from "framer-motion";
import InjurySafeTraining from "../components/InjurySafeTraining";

export default function InjurySafe() {

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* 🌌 BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />

        {/* 🔥 SOFT MEDICAL GLOW (ADDED) */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-400/8 blur-[220px] rounded-full"/>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-400/8 blur-[220px] rounded-full"/>

        {/* 🔥 EXTRA DEPTH GLOW (NEW ADDITION) */}
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[250px] bg-emerald-400/10 blur-[140px] rounded-full"/>

        {/* 🔥 CENTER LIGHT (NEW ADDITION) */}
        <div className="absolute left-1/2 top-1/2 w-[500px] h-[250px] -translate-x-1/2 -translate-y-1/2 bg-emerald-400/10 blur-[140px]" />

        <motion.div
          className="absolute inset-0 opacity-70"
          animate={{
            background: [
              "radial-gradient(circle at 15% 25%, rgba(16,185,129,0.20), transparent 60%), radial-gradient(circle at 85% 35%, rgba(59,130,246,0.15), transparent 55%)",
              "radial-gradient(circle at 70% 20%, rgba(59,130,246,0.18), transparent 60%), radial-gradient(circle at 35% 80%, rgba(99,102,241,0.12), transparent 55%)",
              "radial-gradient(circle at 30% 70%, rgba(16,185,129,0.18), transparent 62%), radial-gradient(circle at 85% 60%, rgba(99,102,241,0.12), transparent 55%)"
            ]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

      </div>

      <motion.div
        className="relative max-w-6xl mx-auto px-6 py-20"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >

        {/* 🔥 HEADER */}
        <div className="mb-14">

          {/* 🔥 BADGE (NEW ADDITION) */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 backdrop-blur-md mb-6">
            🩺 Injury Recovery Mode
          </div>

          <p className="text-emerald-400 font-semibold tracking-[0.28em] text-xs">
            SERVICES / INJURY SAFE
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
            Injury-Safe{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(34,197,94,0.7)]">
              Training
            </span>
          </h1>

          <p className="text-white/70 mt-4 max-w-3xl leading-relaxed">
            Train smart while recovering. Get safe exercise suggestions based on
            pain or injury areas — designed to reduce risk and support healing.
          </p>

        </div>

        {/* 💎 MAIN CARD */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="
            group relative rounded-3xl p-[1px]
            bg-gradient-to-br from-white/10 to-transparent
          "
        >

          {/* 🔥 GLOW FIXED */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-emerald-400/10 blur-xl" />

          {/* 🔥 EXTRA INNER LIGHT (ADDED) */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent" />

          {/* 🔥 EXTRA EDGE GLOW (NEW ADDITION) */}
          <div className="pointer-events-none absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-emerald-400/20 via-transparent to-cyan-400/20 opacity-60 blur-md" />

          <div className="
            relative
            bg-white/6 backdrop-blur-2xl border border-white/12
            rounded-3xl p-7 md:p-8
            shadow-[0_26px_90px_rgba(0,0,0,0.65)]
            transition-all duration-300
            group-hover:shadow-[0_0_60px_rgba(34,197,94,0.35)]
          ">

            {/* subtle shine */}
            <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.15),transparent_60%)]" />

            {/* 🔥 EXTRA SHINE LAYER (NEW ADDITION) */}
            <div className="pointer-events-none absolute inset-0 opacity-20 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.2),transparent)]" />

            {/* ✅ IMPORTANT FIX: SAFE LAYERING */}
            <div className="relative z-10">
              <InjurySafeTraining />
            </div>

          </div>

        </motion.div>

      </motion.div>

    </section>
  );
}