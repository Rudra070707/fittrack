import { motion } from "framer-motion";
import ProgressTracker from "../components/ProgressTracker";

export default function Progress() {

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* 🌌 BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black"/>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]"/>

        {/* 🔥 EXTRA DEPTH */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-400/10 blur-[200px] rounded-full"/>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-400/10 blur-[200px] rounded-full"/>

        {/* 🔥 CENTER LIGHT (NEW) */}
        <div className="absolute left-1/2 top-1/2 w-[600px] h-[300px] -translate-x-1/2 -translate-y-1/2 bg-green-400/10 blur-[160px]" />

        <motion.div
          className="absolute inset-0 opacity-80"
          animate={{
            background:[
              "radial-gradient(circle at 15% 25%, rgba(16,185,129,0.28), transparent 60%), radial-gradient(circle at 85% 35%, rgba(59,130,246,0.20), transparent 55%)",
              "radial-gradient(circle at 70% 20%, rgba(59,130,246,0.26), transparent 60%), radial-gradient(circle at 35% 80%, rgba(99,102,241,0.18), transparent 55%)",
              "radial-gradient(circle at 30% 70%, rgba(16,185,129,0.24), transparent 62%), radial-gradient(circle at 85% 60%, rgba(99,102,241,0.20), transparent 55%)"
            ]
          }}
          transition={{duration:16,repeat:Infinity,ease:"easeInOut"}}
        />

      </div>

      <motion.div
        className="relative max-w-6xl mx-auto px-6 py-20"
        initial={{ opacity:0, y:14 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.45, ease:[0.22,1,0.36,1] }}
      >

        {/* 🔥 HEADER */}
        <div className="mb-14">

          {/* 🔥 BADGE */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 backdrop-blur-md mb-6">
            📊 Analytics Dashboard
          </div>

          <p className="text-emerald-400 font-semibold tracking-[0.28em] text-xs">
            SERVICES / PROGRESS
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
            Progress{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,197,94,0.8)]">
              Tracker
            </span>
          </h1>

          <p className="text-white/70 mt-4 max-w-3xl leading-relaxed">
            Monitor your fitness journey over time. Track weight, body fat, and
            workout consistency to stay motivated and focused on long-term
            results.
          </p>

        </div>

        {/* 💎 MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* 📊 TRACKER */}
          <motion.div
            whileHover={{ scale:1.02 }}
            className="
              group relative rounded-3xl p-[1px]
              bg-gradient-to-br from-white/10 to-transparent
              lg:col-span-2
            "
          >

            {/* 🔥 GLOW UPGRADE */}
            <div className="pointer-events-none absolute -inset-3 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-emerald-400/20 blur-2xl"/>

            {/* 🔥 INNER LIGHT */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent"/>

            <div className="
              relative
              bg-white/6 backdrop-blur-2xl border border-white/12
              rounded-3xl p-7 md:p-8
              shadow-[0_30px_100px_rgba(0,0,0,0.7)]
              transition-all duration-300
              group-hover:shadow-[0_0_70px_rgba(34,197,94,0.35)]
            ">

              <h2 className="text-2xl font-bold mb-2">
                Your Progress Data
              </h2>

              <p className="text-white/70 mb-6 text-sm">
                Log entries regularly to see trends and improvements clearly.
              </p>

              {/* 🔥 SUBTLE SHINE */}
              <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.15),transparent_60%)]"/>

              {/* MAIN COMPONENT */}
              <ProgressTracker/>

            </div>

          </motion.div>

          {/* 📌 SIDE PANEL */}
          <motion.div
            whileHover={{ scale:1.04 }}
            className="
              group relative rounded-3xl p-[1px]
              bg-gradient-to-br from-white/10 to-transparent
            "
          >

            {/* 🔥 GLOW */}
            <div className="pointer-events-none absolute -inset-3 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-emerald-400/20 blur-2xl"/>

            <div className="
              relative
              bg-white/6 backdrop-blur-2xl border border-white/12
              rounded-3xl p-7
              shadow-[0_30px_100px_rgba(0,0,0,0.7)]
              transition-all duration-300
              group-hover:shadow-[0_0_60px_rgba(34,197,94,0.3)]
            ">

              <h3 className="text-xl font-bold mb-4">
                Why Track Progress?
              </h3>

              <ul className="space-y-4 text-white/70 text-sm">

                <li className="flex gap-2">
                  <span className="text-emerald-400">•</span>
                  Helps identify what’s working and what’s not
                </li>

                <li className="flex gap-2">
                  <span className="text-emerald-400">•</span>
                  Keeps motivation high with visible improvements
                </li>

                <li className="flex gap-2">
                  <span className="text-emerald-400">•</span>
                  Prevents overtraining and plateaus
                </li>

                <li className="flex gap-2">
                  <span className="text-emerald-400">•</span>
                  Builds long-term fitness discipline
                </li>

              </ul>

              {/* 💡 TIP BOX */}
              <div className="mt-6 p-5 rounded-2xl bg-emerald-400/10 border border-emerald-400/20">

                <p className="text-emerald-300 text-xs tracking-[0.22em]">
                  CONSISTENCY TIP
                </p>

                <p className="text-white/80 mt-2 text-sm">
                  Update your progress once per week at the same time of day for
                  accurate comparison.
                </p>

              </div>

              {/* 🔥 EXTRA MICRO CTA */}
              <div className="mt-6 text-xs text-white/50">
                Small progress daily = big results 📈
              </div>

            </div>

          </motion.div>

        </div>

      </motion.div>

    </section>
  );
}