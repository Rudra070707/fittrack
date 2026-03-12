import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Gym() {

  const gymPlans = [
    {
      title: "Beginner Strength",
      level: "Beginner",
      duration: "3 days/week",
      goal: "Foundation + Form",
      desc: "Perfect to start gym with structure and safe progression.",
      list: [
        "Full body basics",
        "Light weights",
        "Form focus",
        "Simple progression",
      ],
    },
    {
      title: "Lean Muscle",
      level: "Intermediate",
      duration: "4 days/week",
      goal: "Hypertrophy + Consistency",
      desc: "Build muscle with split routines and progressive overload.",
      list: [
        "Upper/Lower split",
        "Progress tracking",
        "Core training",
        "Recovery built-in",
      ],
    },
    {
      title: "Performance",
      level: "Advanced",
      duration: "5 days/week",
      goal: "Strength + Conditioning",
      desc: "Push strength and endurance with advanced planning.",
      list: [
        "Strength blocks",
        "Accessory work",
        "Conditioning days",
        "Deload weeks",
      ],
    },
  ];

  const features = [
    { title: "Workout Planner", sub: "Structured routines for all levels" },
    { title: "Progress Tracking", sub: "Log sets, weights, and improvements" },
    { title: "Injury Safe", sub: "Safer training recommendations" },
    { title: "Consistency", sub: "Weekly structure + habit building" },
  ];

  const joinState = { plan: "Premium Plan", planCode: "premium" };

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* Animated background like Hero */}
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >

        {/* Header */}
        <div className="mb-14">

          <p className="text-emerald-400 font-semibold tracking-[0.28em] text-xs">
            SERVICES / GYM ACCESS
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Gym access made{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              simple
            </span>
          </h1>

          <p className="text-white/70 mt-4 max-w-3xl">
            Train anytime, follow structured programs and track progress with FitTrack.
          </p>

        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-4 gap-6">

          {features.map((f, i) => (

            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
            >
              <p className="font-bold text-lg">{f.title}</p>
              <p className="text-white/60 text-sm mt-2">{f.sub}</p>
            </motion.div>

          ))}

        </div>

        {/* Programs */}
        <div className="mt-20">

          <h2 className="text-3xl font-extrabold mb-10">
            Training <span className="text-emerald-400">Programs</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {gymPlans.map((p, i) => (

              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-8 shadow-[0_26px_90px_rgba(0,0,0,0.65)]"
              >

                <div className="flex justify-between mb-4">

                  <h3 className="text-xl font-bold">{p.title}</h3>

                  <span className="text-xs px-3 py-1 rounded-full bg-black/30 border border-white/10">
                    {p.level}
                  </span>

                </div>

                <p className="text-white/70 text-sm mb-5">{p.desc}</p>

                <div className="text-sm text-white/60 mb-5 space-y-1">
                  <p>📅 {p.duration}</p>
                  <p>🎯 {p.goal}</p>
                </div>

                <ul className="space-y-2 text-sm text-white/85">

                  {p.list.map((x, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-emerald-400">•</span>
                      {x}
                    </li>
                  ))}

                </ul>

                <Link
                  to="/home/workout"
                  className="mt-7 block text-center bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-semibold py-3 rounded-xl shadow-[0_12px_34px_rgba(34,197,94,0.25)] hover:scale-[1.02] transition"
                >
                  Open Workout Planner
                </Link>

              </motion.div>

            ))}

          </div>

        </div>

        {/* CTA */}
        <div className="mt-20 text-center">

          <p className="text-emerald-300 text-xs tracking-[0.22em]">
            READY TO TRAIN?
          </p>

          <h2 className="text-3xl font-extrabold mt-3">
            Start Training with <span className="text-emerald-400">FitTrack</span>
          </h2>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/home/join"
                state={joinState}
                className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-semibold px-8 py-3 rounded-xl shadow-[0_12px_34px_rgba(34,197,94,0.25)]"
              >
                Join Membership
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/home/progress"
                className="border border-white/15 px-8 py-3 rounded-xl hover:bg-white hover:text-black transition"
              >
                Track Progress
              </Link>
            </motion.div>

          </div>

        </div>

      </motion.div>

    </section>
  );
}