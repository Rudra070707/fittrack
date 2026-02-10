import { motion } from "framer-motion";
import ProgressTracker from "../components/ProgressTracker";

export default function Progress() {
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
            SERVICES / PROGRESS
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Progress <span className="text-green-400">Tracker</span>
          </h1>

          <p className="text-gray-300 mt-4 max-w-3xl leading-relaxed">
            Monitor your fitness journey over time. Track weight, body fat, and
            consistency to stay motivated and focused on long-term results.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tracker */}
          <motion.div
            className="lg:col-span-2 bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-7 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.65)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-2">
              Your Progress Data
            </h2>

            <p className="text-gray-300 mb-6 text-sm">
              Log entries regularly to see trends and improvements clearly.
            </p>

            {/* Existing component (UNCHANGED) */}
            <ProgressTracker />
          </motion.div>

          {/* Side info */}
          <motion.div
            className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4">Why Track Progress?</h3>

            <ul className="space-y-4 text-gray-300 text-sm">
              <li>• Helps identify what’s working and what’s not</li>
              <li>• Keeps motivation high with visible improvements</li>
              <li>• Prevents overtraining and plateaus</li>
              <li>• Builds long-term fitness discipline</li>
            </ul>

            <div className="mt-6 p-5 rounded-2xl bg-green-400/10 border border-green-400/20">
              <p className="text-green-300 text-xs tracking-[0.22em]">
                CONSISTENCY TIP
              </p>
              <p className="text-gray-200 mt-2">
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
