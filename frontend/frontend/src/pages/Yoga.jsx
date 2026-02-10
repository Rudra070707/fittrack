import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Yoga() {
  const programs = [
    {
      title: "Beginner Flow",
      level: "Beginner",
      duration: "15–20 min",
      goal: "Flexibility + Stress Relief",
      desc: "Simple poses + breathing to improve posture and calm the mind.",
      list: ["Tadasana", "Cat-Cow", "Child Pose", "Downward Dog", "Breathing (3 min)"],
    },
    {
      title: "Strength & Balance",
      level: "Intermediate",
      duration: "25–30 min",
      goal: "Core Strength + Stability",
      desc: "Build balance and strength safely with controlled transitions.",
      list: ["Plank Hold", "Warrior I/II", "Chair Pose", "Bridge Pose", "Cooldown Stretch"],
    },
    {
      title: "Advanced Mobility",
      level: "Advanced",
      duration: "35–40 min",
      goal: "Deep Mobility + Endurance",
      desc: "Longer holds + deeper stretches for experienced users.",
      list: ["Sun Salutation", "Cobra Pose", "Pigeon Stretch", "Seated Forward Fold", "Box Breathing"],
    },
  ];

  const focusAreas = [
    { title: "Stress Relief", sub: "Calm breathing + slow flow routines" },
    { title: "Back Pain Care", sub: "Mobility-focused stretches (safe)" },
    { title: "Flexibility Boost", sub: "Hips, hamstrings, shoulders" },
    { title: "Sleep & Recovery", sub: "Relaxing wind-down sessions" },
  ];

  const quickRoutines = [
    {
      title: "15-min Morning Mobility",
      time: "15 min",
      points: ["Neck + shoulder release", "Spine mobility", "Hip opener stretch", "2-min breathing"],
    },
    {
      title: "10-min Stress Reset",
      time: "10 min",
      points: ["Box breathing", "Child pose", "Seated twist", "Slow forward fold"],
    },
    {
      title: "20-min Full Body Flow",
      time: "20 min",
      points: ["Warm-up flow", "Standing balance", "Core hold", "Cooldown stretch"],
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      {/* Background (MATCHES InjurySafe.jsx) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800" />

      {/* Glows + grid (MATCHES InjurySafe.jsx) */}
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
            SERVICES / YOGA
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Strong body. Calm <span className="text-green-400">mind</span>.
          </h1>

          <p className="text-gray-300 mt-4 max-w-3xl leading-relaxed">
            Improve flexibility, reduce stress, and build strength safely with guided yoga routines
            and injury-safe support — inspired by premium fitness platforms.
          </p>
        </div>

        {/* Top Cards (keep your content but matched styling) */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
            <h2 className="text-2xl font-bold mb-6">Why Yoga on FitTrack</h2>

            <ul className="space-y-4 text-gray-200">
              {[
                "Better mobility + flexibility over time",
                "Injury-safe routines and recovery support",
                "Improves posture and reduces stiffness",
                "Helps stress control and sleep quality",
              ].map((text, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="text-green-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <span className="leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex gap-4 flex-wrap">
              <Link
                to="/home/join"
                className="bg-green-400 text-black font-semibold px-7 py-3 rounded-xl hover:bg-green-500 transition"
              >
                Start Yoga
              </Link>

              <Link
                to="/home/injury"
                className="border border-white/15 px-7 py-3 rounded-xl text-white hover:bg-white hover:text-black transition"
              >
                Injury-Safe Training
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.65)]">
            <h2 className="text-2xl font-bold mb-6">Perfect for</h2>

            <div className="space-y-3 text-gray-200 leading-relaxed">
              <p>
                <span className="text-green-400 font-semibold">Beginners</span> starting a healthy routine.
              </p>
              <p>
                <span className="text-green-400 font-semibold">Office workers</span> dealing with stiffness or back pain risk.
              </p>
              <p>
                <span className="text-green-400 font-semibold">Fitness users</span> who need mobility and recovery.
              </p>
            </div>

            <div className="mt-7 p-5 rounded-2xl bg-green-400/10 border border-green-400/20">
              <p className="text-green-300 text-xs tracking-[0.22em]">SIMPLE ROUTINE</p>
              <p className="text-gray-200 mt-2 text-sm">
                15 minutes daily (stretch + breathing) is enough to see noticeable mobility improvements.
              </p>
            </div>
          </div>
        </div>

        {/* Yoga Programs */}
        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
            Guided Yoga <span className="text-green-400">Programs</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((p, i) => (
              <div
                key={i}
                className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-[0_25px_80px_rgba(0,0,0,0.55)] hover:shadow-[0_0_40px_rgba(34,197,94,0.18)] transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-black/30 border border-white/10 text-gray-200">
                    {p.level}
                  </span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">{p.desc}</p>

                <div className="text-sm text-gray-400 space-y-1 mb-4">
                  <p>⏱ Duration: {p.duration}</p>
                  <p>🎯 Goal: {p.goal}</p>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-gray-300 text-xs tracking-[0.22em] mb-3">EXERCISES</p>
                  <ul className="space-y-2 text-gray-200 text-sm">
                    {p.list.map((x, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/home/join"
                    className="mt-5 inline-block w-full text-center bg-green-400 text-black font-semibold py-3 rounded-xl hover:bg-green-500 transition"
                  >
                    Start Program
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Focus Areas (CultFit-style) */}
        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
            Focus <span className="text-green-400">Areas</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {focusAreas.map((f, i) => (
              <div
                key={i}
                className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.45)] hover:shadow-[0_0_35px_rgba(34,197,94,0.16)] transition"
              >
                <p className="font-bold text-lg">{f.title}</p>
                <p className="text-gray-400 text-sm mt-2">{f.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Routines */}
        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
            Quick <span className="text-green-400">Routines</span>
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {quickRoutines.map((r, i) => (
              <div
                key={i}
                className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{r.title}</h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-black/30 border border-white/10 text-gray-200">
                    {r.time}
                  </span>
                </div>

                <ul className="mt-4 space-y-2 text-gray-200 text-sm">
                  {r.points.map((p, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/home/join"
                  className="mt-6 inline-block w-full text-center border border-white/15 py-3 rounded-xl hover:bg-white hover:text-black transition"
                >
                  Add to My Plan
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-14 bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.55)] text-center">
          <p className="text-green-300 text-xs tracking-[0.22em]">READY TO START?</p>

          <h2 className="text-2xl md:text-3xl font-extrabold mt-3">
            Start Your Yoga Journey with <span className="text-green-400">FitTrack</span>
          </h2>

          <p className="text-gray-300 mt-3 max-w-2xl mx-auto leading-relaxed">
            Choose a program, follow quick routines, and build a daily habit — just like premium gym apps.
          </p>

          <div className="mt-7 flex gap-4 justify-center flex-wrap">
            <Link
              to="/home/join"
              className="bg-green-400 text-black font-semibold px-8 py-3 rounded-xl hover:bg-green-500 transition"
            >
              Join Yoga Program
            </Link>

            <Link
              to="/home/injury"
              className="border border-white/15 px-8 py-3 rounded-xl hover:bg-white hover:text-black transition"
            >
              Injury-Safe Support
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
