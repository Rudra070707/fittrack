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
    <section className="relative min-h-screen overflow-hidden text-white bg-[#05070c]">

      {/* Background glow */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-green-400/20 blur-[200px] rounded-full"
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 -right-40 w-[650px] h-[650px] bg-emerald-500/15 blur-[220px] rounded-full"
        animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      <motion.div
        className="relative max-w-6xl mx-auto px-6 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >

        {/* Header */}
        <div className="mb-12">
          <p className="text-green-400 font-semibold tracking-[0.28em] text-xs">
            SERVICES / GYM ACCESS
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Gym access made <span className="text-green-400">simple</span>
          </h1>

          <p className="text-gray-300 mt-4 max-w-3xl">
            Train anytime, follow structured programs and track progress with FitTrack.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="bg-white/6 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
            >
              <p className="font-bold text-lg">{f.title}</p>
              <p className="text-gray-400 text-sm mt-2">{f.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Programs */}
        <div className="mt-16">

          <h2 className="text-3xl font-extrabold mb-8">
            Training <span className="text-green-400">Programs</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {gymPlans.map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white/6 border border-white/10 rounded-3xl p-7 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              >

                <div className="flex justify-between mb-3">
                  <h3 className="text-xl font-bold">{p.title}</h3>

                  <span className="text-xs px-3 py-1 rounded-full bg-black/30 border border-white/10">
                    {p.level}
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-4">{p.desc}</p>

                <div className="text-sm text-gray-400 mb-4 space-y-1">
                  <p>📅 {p.duration}</p>
                  <p>🎯 {p.goal}</p>
                </div>

                <ul className="space-y-2 text-sm text-gray-200">
                  {p.list.map((x, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-green-400">•</span>
                      {x}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/home/workout"
                  className="mt-6 block text-center bg-green-400 text-black font-semibold py-3 rounded-xl hover:bg-green-500 transition"
                >
                  Open Workout Planner
                </Link>

              </motion.div>
            ))}

          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">

          <p className="text-green-300 text-xs tracking-[0.22em]">
            READY TO TRAIN?
          </p>

          <h2 className="text-3xl font-extrabold mt-3">
            Start Training with <span className="text-green-400">FitTrack</span>
          </h2>

          <div className="mt-6 flex justify-center gap-4 flex-wrap">

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/home/join"
                state={joinState}
                className="bg-green-400 text-black font-semibold px-8 py-3 rounded-xl hover:bg-green-500 transition"
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