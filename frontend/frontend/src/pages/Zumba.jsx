import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Zumba() {

  const zumbaPlans = [
    {
      title: "Beginner Burn",
      level: "Beginner",
      duration: "20–30 min",
      goal: "Stamina + Fun cardio",
      desc: "Easy steps, low impact options, perfect to start consistency.",
      list: [
        "Warm-up groove (5 min)",
        "Basic steps (10 min)",
        "Fun combo (10 min)",
        "Cooldown stretch (5 min)",
      ],
    },
    {
      title: "Fat Loss Party",
      level: "Intermediate",
      duration: "30–40 min",
      goal: "Calorie burn + Conditioning",
      desc: "Higher energy tracks with full-body movement and faster pace.",
      list: [
        "Warm-up (5 min)",
        "Dance cardio (20 min)",
        "HIIT bursts (8 min)",
        "Cooldown (5 min)",
      ],
    },
    {
      title: "Power Zumba",
      level: "Advanced",
      duration: "40–50 min",
      goal: "Endurance + Performance",
      desc: "Longer sessions, intense tracks, strong core engagement.",
      list: [
        "Warm-up (6 min)",
        "Power combos (25 min)",
        "Core finisher (8 min)",
        "Cooldown (6 min)",
      ],
    },
  ];

  const focusAreas = [
    { title: "Weight Loss", sub: "High-energy calorie burn sessions" },
    { title: "Stamina", sub: "Cardio endurance + heart health" },
    { title: "Mood Boost", sub: "Fun music to stay consistent" },
    { title: "Full Body", sub: "Arms, legs, core—everything moves" },
  ];

  const joinState = { plan: "Premium Plan", planCode: "premium" };

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* Animated background */}
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
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
      >

        {/* Header */}
        <div className="mb-14">

          <p className="text-emerald-400 font-semibold tracking-[0.28em] text-xs">
            SERVICES / ZUMBA
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Dance your way to{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              fitness
            </span>.
          </h1>

          <p className="text-white/70 mt-4 max-w-3xl leading-relaxed">
            Fun, high-energy cardio that improves stamina, burns calories,
            and keeps you consistent without boring workouts.
          </p>

        </div>

        {/* Top Cards */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Highlights */}
          <div className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-8 shadow-[0_26px_90px_rgba(0,0,0,0.65)]">

            <h2 className="text-2xl font-bold mb-6">Highlights</h2>

            <ul className="space-y-4 text-white/80">
              {[
                "Cardio + full body movement for endurance",
                "Great for weight loss & mood boost",
                "Suitable for beginners",
                "Track routine + progress with FitTrack",
              ].map((text, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex gap-4 flex-wrap">

              <Link
                to="/home/join"
                state={joinState}
                className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-semibold px-7 py-3 rounded-xl shadow-[0_12px_34px_rgba(34,197,94,0.25)]"
              >
                Join Zumba
              </Link>

              <Link
                to="/home/progress"
                className="border border-white/15 px-7 py-3 rounded-xl hover:bg-white hover:text-black transition"
              >
                Track Progress
              </Link>

            </div>

          </div>

          {/* Recommended Plan */}
          <div className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-8 shadow-[0_26px_90px_rgba(0,0,0,0.65)]">

            <h2 className="text-2xl font-bold mb-6">Recommended plan</h2>

            <div className="space-y-3 text-white/80">

              <p>
                <span className="text-emerald-400 font-semibold">Frequency:</span>{" "}
                3–5 days/week
              </p>

              <p>
                <span className="text-emerald-400 font-semibold">Session:</span>{" "}
                30–45 minutes
              </p>

              <p>
                <span className="text-emerald-400 font-semibold">Goal:</span>{" "}
                Fat loss + stamina
              </p>

            </div>

            <div className="mt-7 p-5 rounded-2xl bg-emerald-400/10 border border-emerald-400/20">

              <p className="text-emerald-300 text-xs tracking-[0.22em]">
                PRO TIP
              </p>

              <p className="text-white/80 mt-2 text-sm">
                Pair Zumba with a diet plan for faster results.
              </p>

              <Link
                to="/home/diet"
                className="inline-block mt-4 text-emerald-400 font-semibold hover:underline"
              >
                Open Diet Planner →
              </Link>

            </div>

          </div>

        </div>

        {/* Focus Areas */}
        <div className="mt-20">

          <h2 className="text-3xl font-extrabold mb-8">
            Focus <span className="text-emerald-400">Areas</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {focusAreas.map((f, i) => (
              <div
                key={i}
                className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-2xl p-6 shadow-lg"
              >
                <p className="font-bold text-lg">{f.title}</p>
                <p className="text-white/60 text-sm mt-2">{f.sub}</p>
              </div>
            ))}

          </div>

        </div>

        {/* Programs */}
        <div className="mt-20">

          <h2 className="text-3xl font-extrabold mb-8">
            Zumba <span className="text-emerald-400">Programs</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {zumbaPlans.map((p, i) => (
              <div
                key={i}
                className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-7 shadow-[0_26px_90px_rgba(0,0,0,0.65)]"
              >

                <div className="flex justify-between mb-3">

                  <h3 className="text-xl font-bold">{p.title}</h3>

                  <span className="text-xs px-3 py-1 rounded-full bg-black/30 border border-white/10">
                    {p.level}
                  </span>

                </div>

                <p className="text-white/70 text-sm mb-4">{p.desc}</p>

                <p className="text-white/60 text-sm mb-4">
                  ⏱ {p.duration} • 🎯 {p.goal}
                </p>

                <ul className="space-y-2 text-sm">

                  {p.list.map((x, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-emerald-400">•</span>
                      {x}
                    </li>
                  ))}

                </ul>

                <Link
                  to="/home/join"
                  state={joinState}
                  className="mt-6 block text-center bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-semibold py-3 rounded-xl shadow-[0_12px_34px_rgba(34,197,94,0.25)] hover:scale-[1.02] transition"
                >
                  Start Program
                </Link>

              </div>
            ))}

          </div>

        </div>

      </motion.div>

    </section>
  );
}