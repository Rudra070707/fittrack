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
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white px-6 py-28 overflow-hidden">

      {/* Animated soft glow */}
      <motion.div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-green-400/20 blur-[180px] rounded-full"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative">

        <motion.p
          className="text-green-400 font-semibold tracking-[0.3em] text-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ABOUT FITTRACK
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Smart Fitness.
          <span className="text-green-400"> Simple Progress.</span>
        </motion.h1>

        <motion.p
          className="text-gray-300 mt-6 text-lg max-w-3xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          FitTrack is a modern fitness & gym management platform designed to help users
          plan workouts, follow healthy routines, and track progress—while keeping the
          experience smooth, clean, and easy to use.
        </motion.p>

        {/* Chips */}
        <div className="mt-10 flex flex-wrap gap-3">
          {["Workout Planner", "Diet Guidance", "Progress Tracking", "Injury-Safe"].map((t, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full text-sm bg-white/5 border border-white/10 backdrop-blur-xl text-gray-200 hover:border-green-400/40 hover:shadow-[0_0_20px_rgba(34,197,94,0.25)] transition-all duration-300"
            >
              <span className="text-green-400 font-bold mr-2">•</span>
              {t}
            </span>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(34,197,94,0.25)] transition-all duration-300"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <h3 className="text-xl font-bold mb-4">{card.title}</h3>
              <p className="text-gray-300 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:shadow-[0_0_40px_rgba(34,197,94,0.25)] transition-all duration-300">
          <h2 className="text-3xl font-bold mb-6">Core Features</h2>

          <ul className="space-y-4">
            {features.map((f, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-green-400 font-bold">✓</span>
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}