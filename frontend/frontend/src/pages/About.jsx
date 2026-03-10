import { motion } from "framer-motion";

export default function About() {
  const cards = [
    {
      title: "What FitTrack Provides",
      desc: "Workout planning, diet guidance, progress tracking and injury-safe training support in one dashboard.",
    },
    {
      title: "Who It’s For",
      desc: "Beginners, fitness enthusiasts, and anyone who wants a structured path to stay consistent.",
    },
    {
      title: "Why FitTrack",
      desc: "A simple UI, quick navigation, and smart features that feel like a real fitness product.",
    },
  ];

  const features = [
    "Personalized workout planner for consistent training",
    "Diet planning support for better results",
    "Progress tracking to stay motivated",
    "Injury-safe training guidance for safer workouts",
    "FitTrack AI Assistant for instant fitness help",
  ];

  return (
    <section className="relative min-h-screen bg-[#05070c] text-white px-6 py-28 overflow-hidden">

      {/* Animated glow backgrounds */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-green-400/20 blur-[200px] rounded-full"
        animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-0 -right-40 w-[650px] h-[650px] bg-emerald-500/15 blur-[220px] rounded-full"
        animate={{ x: [0, -90, 0], y: [0, -60, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:26px_26px]" />

      <div className="max-w-6xl mx-auto relative">

        {/* Heading */}
        <motion.p
          className="text-green-400 font-semibold tracking-[0.3em] text-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ABOUT FITTRACK
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Smart Fitness.
          <span className="text-green-400"> Simple Progress.</span>
        </motion.h1>

        <motion.p
          className="text-gray-300 mt-6 text-lg max-w-3xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          FitTrack is a modern fitness & gym management platform designed to
          help users plan workouts, follow healthy routines, and track progress
          — while keeping the experience smooth, clean, and intuitive.
        </motion.p>

        {/* Feature chips */}
        <div className="mt-10 flex flex-wrap gap-3">
          {[
            "Workout Planner",
            "Diet Guidance",
            "Progress Tracking",
            "Injury-Safe Training",
          ].map((t, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-full text-sm bg-white/5 border border-white/10 backdrop-blur-xl text-gray-200 hover:border-green-400/40 hover:shadow-[0_0_25px_rgba(34,197,94,0.35)] transition-all"
            >
              <span className="text-green-400 font-bold mr-2">•</span>
              {t}
            </motion.span>
          ))}
        </div>

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="group relative bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.6)] hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(34,197,94,0.25)] transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <h3 className="text-xl font-bold mb-4">{card.title}</h3>
              <p className="text-gray-300 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Core features */}
        <motion.div
          className="mt-20 bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:shadow-[0_0_40px_rgba(34,197,94,0.25)] transition-all"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Core Features</h2>

          <ul className="space-y-4">
            {features.map((f, idx) => (
              <motion.li
                key={idx}
                className="flex gap-3 text-gray-200"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <span className="text-green-400 font-bold">✓</span>
                {f}
              </motion.li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}