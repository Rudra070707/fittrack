import { motion } from "framer-motion";
import ProgressTracker from "../components/ProgressTracker";

export default function Progress() {

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* Global animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black"/>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]"/>

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

        {/* Header */}
        <div className="mb-14">

          <p className="text-emerald-400 font-semibold tracking-[0.28em] text-xs">
            SERVICES / PROGRESS
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Progress{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Tracker
            </span>
          </h1>

          <p className="text-white/70 mt-4 max-w-3xl leading-relaxed">
            Monitor your fitness journey over time. Track weight, body fat, and
            workout consistency to stay motivated and focused on long-term
            results.
          </p>

        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Tracker */}
          <motion.div
            whileHover={{ scale:1.01 }}
            className="lg:col-span-2 bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-7 md:p-8 shadow-[0_26px_90px_rgba(0,0,0,0.65)] transition"
          >

            <h2 className="text-2xl font-bold mb-2">
              Your Progress Data
            </h2>

            <p className="text-white/70 mb-6 text-sm">
              Log entries regularly to see trends and improvements clearly.
            </p>

            {/* Existing component */}
            <ProgressTracker/>

          </motion.div>

          {/* Side info */}
          <motion.div
            whileHover={{ scale:1.02 }}
            className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-7 shadow-[0_26px_90px_rgba(0,0,0,0.65)]"
          >

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

            <div className="mt-6 p-5 rounded-2xl bg-emerald-400/10 border border-emerald-400/20">

              <p className="text-emerald-300 text-xs tracking-[0.22em]">
                CONSISTENCY TIP
              </p>

              <p className="text-white/80 mt-2 text-sm">
                Update your progress once per week at the same time of day for
                accurate comparison.
              </p>

            </div>

          </motion.div>

        </div>

      </motion.div>

    </section>
  );
}