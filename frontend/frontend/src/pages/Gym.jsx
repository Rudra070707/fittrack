import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Gym() {
  // These are TRAINING programs (not membership plans) ✅ keep hardcoded
  const gymPlans = [
    {
      title: "Beginner Strength",
      level: "Beginner",
      duration: "3 days/week",
      goal: "Foundation + Form",
      desc: "Perfect to start gym with structure and safe progression.",
      list: ["Full body basics", "Light weights", "Form focus", "Simple progression"],
    },
    {
      title: "Lean Muscle",
      level: "Intermediate",
      duration: "4 days/week",
      goal: "Hypertrophy + Consistency",
      desc: "Build muscle with split routines and progressive overload.",
      list: ["Upper/Lower split", "Progress tracking", "Core training", "Recovery built-in"],
    },
    {
      title: "Performance",
      level: "Advanced",
      duration: "5 days/week",
      goal: "Strength + Conditioning",
      desc: "Push strength and endurance with advanced planning.",
      list: ["Strength blocks", "Accessory work", "Conditioning days", "Deload weeks"],
    },
  ];

  const features = [
    { title: "Workout Planner", sub: "Structured routines for all levels" },
    { title: "Progress Tracking", sub: "Log sets, weights, and improvements" },
    { title: "Injury Safe", sub: "Safer training recommendations" },
    { title: "Consistency", sub: "Weekly structure + habit building" },
  ];

  // ✅ Choose which membership plan should be used when user clicks "Join"
  // You can change this to: { plan: "Basic Plan", planCode: "basic" } if you want
  const joinState = { plan: "Premium Plan", planCode: "premium" };

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
            SERVICES / GYM ACCESS
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Gym access made <span className="text-green-400">simple</span>.
          </h1>

          <p className="text-gray-300 mt-4 max-w-3xl leading-relaxed">
            Train anytime with a clean, modern experience—track your workouts, follow plans,
            and stay consistent with FitTrack.
          </p>
        </div>

        {/* Top Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
            <h2 className="text-2xl font-bold mb-6">What you get</h2>

            <ul className="space-y-4 text-gray-200">
              {[
                "Unlimited gym sessions with flexible routine tracking",
                "Smart workout planner suggestions (beginner to advanced)",
                "Progress tracking to stay motivated consistently",
                "Injury-safe guidance for safer training habits",
              ].map((text, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="text-green-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <span className="leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex gap-4 flex-wrap">
              {/* ✅ Pass plan state so Join.jsx shows LIVE price/features */}
              <Link
                to="/home/join"
                state={joinState}
                className="bg-green-400 text-black font-semibold px-7 py-3 rounded-xl hover:bg-green-500 transition"
              >
                Join Now
              </Link>

              <Link
                to="/home/workout"
                className="border border-white/15 px-7 py-3 rounded-xl hover:bg-white hover:text-black transition"
              >
                Explore Workout Planner
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.65)]">
            <h2 className="text-2xl font-bold mb-6">Best for</h2>

            <div className="space-y-3 text-gray-200 leading-relaxed">
              <p>
                <span className="text-green-400 font-semibold">Beginners</span> who want structure and guidance.
              </p>
              <p>
                <span className="text-green-400 font-semibold">Intermediate</span> users who want consistency + progress logs.
              </p>
              <p>
                <span className="text-green-400 font-semibold">Busy schedules</span> — quick, trackable workouts.
              </p>
            </div>

            <div className="mt-7 p-5 rounded-2xl bg-green-400/10 border border-green-400/20">
              <p className="text-green-300 text-xs tracking-[0.22em]">QUICK TIP</p>
              <p className="text-gray-200 mt-2 text-sm">
                Start with 3 days/week + track progress for 2 weeks. You’ll feel the difference fast.
              </p>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
            Key <span className="text-green-400">Features</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
              >
                <p className="font-bold text-lg">{f.title}</p>
                <p className="text-gray-400 text-sm mt-2">{f.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gym programs */}
        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
            Training <span className="text-green-400">Programs</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {gymPlans.map((p, i) => (
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
                  <p>📅 Frequency: {p.duration}</p>
                  <p>🎯 Goal: {p.goal}</p>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-gray-300 text-xs tracking-[0.22em] mb-3">WHAT’S INSIDE</p>
                  <ul className="space-y-2 text-gray-200 text-sm">
                    {p.list.map((x, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/home/workout"
                    className="mt-5 inline-block w-full text-center bg-green-400 text-black font-semibold py-3 rounded-xl hover:bg-green-500 transition"
                  >
                    Open Workout Planner
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-14 bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.55)] text-center">
          <p className="text-green-300 text-xs tracking-[0.22em]">READY TO TRAIN?</p>

          <h2 className="text-2xl md:text-3xl font-extrabold mt-3">
            Start Training with <span className="text-green-400">FitTrack</span>
          </h2>

          <p className="text-gray-300 mt-3 max-w-2xl mx-auto leading-relaxed">
            Pick a program, follow a routine, and track your progress—like premium gym platforms.
          </p>

          <div className="mt-7 flex gap-4 justify-center flex-wrap">
            {/* ✅ Pass plan state */}
            <Link
              to="/home/join"
              state={joinState}
              className="bg-green-400 text-black font-semibold px-8 py-3 rounded-xl hover:bg-green-500 transition"
            >
              Join Membership
            </Link>

            <Link
              to="/home/progress"
              className="border border-white/15 px-8 py-3 rounded-xl hover:bg-white hover:text-black transition"
            >
              Track Progress
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
