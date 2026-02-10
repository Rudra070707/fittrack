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
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 py-24 overflow-hidden">
      {/* Subtle grid + overlays */}
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
      </div>

      {/* Floating Glows */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-green-400/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-600/20 blur-[140px] rounded-full" />
      <div className="absolute top-1/3 -right-28 w-[520px] h-[520px] bg-blue-500/10 blur-[180px] rounded-full" />

      {/* top accent line */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[1px] bg-gradient-to-r from-transparent via-green-400/40 to-transparent" />

      <div className="max-w-5xl mx-auto relative">
        <motion.p
          className="text-green-400 font-semibold tracking-[0.25em] text-xs"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ABOUT FITTRACK
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight drop-shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Smart Fitness.{" "}
          <span className="text-green-400 drop-shadow-[0_0_22px_rgba(34,197,94,0.35)]">
            Simple Progress.
          </span>
        </motion.h1>

        <motion.p
          className="text-gray-300 mt-6 text-lg md:text-xl max-w-3xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          FitTrack is a modern fitness & gym management platform designed to help users
          plan workouts, follow healthy routines, and track progress—while keeping the
          experience smooth, clean, and easy to use.
        </motion.p>

        {/* Small “chips” like real websites */}
        <div className="mt-10 flex flex-wrap gap-3">
          {["Workout Planner", "Diet Guidance", "Progress Tracking", "Injury-Safe"].map((t, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full text-sm bg-white/5 border border-white/10 backdrop-blur-xl
                         text-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            >
              <span className="text-green-400 font-bold mr-2">•</span>
              {t}
            </span>
          ))}
        </div>

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="
                group relative
                bg-white/6 backdrop-blur-xl
                border border-white/10
                rounded-3xl p-8
                shadow-[0_22px_60px_rgba(0,0,0,0.55)]
                hover:shadow-[0_0_35px_rgba(34,197,94,0.25)]
                hover:-translate-y-1 transition-all duration-300
                overflow-hidden
              "
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 bg-green-400/15 blur-3xl rounded-full opacity-80" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              <h3 className="text-xl font-extrabold mb-3">{card.title}</h3>
              <p className="text-gray-300 leading-relaxed">{card.desc}</p>

              <div className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
              <p className="mt-4 text-xs text-gray-500 tracking-wider uppercase">
                FitTrack Experience
              </p>
            </motion.div>
          ))}
        </div>

        {/* Extra section */}
        <div className="mt-16 bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-[0_22px_60px_rgba(0,0,0,0.55)] overflow-hidden relative">
          <div className="pointer-events-none absolute -top-20 left-10 w-72 h-72 bg-green-400/12 blur-[140px] rounded-full" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Core Features</h2>
              <p className="text-gray-300">
                Built to feel clean, fast, and “real product” from day one.
              </p>
            </div>

            {/* Tiny stats strip */}
            <div className="flex gap-3 flex-wrap">
              {[
                { k: "Fast UI", v: "Smooth" },
                { k: "Design", v: "Premium" },
                { k: "Support", v: "24/7" },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="px-4 py-3 rounded-2xl bg-black/25 border border-white/10"
                >
                  <p className="text-xs text-gray-400">{s.k}</p>
                  <p className="text-white font-bold">{s.v}</p>
                </div>
              ))}
            </div>
          </div>

          <ul className="text-gray-200 space-y-3 mt-8">
            {features.map((f, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-green-400 font-bold">✓</span>
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
    </section>
  );
}
