import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Zumba() {
  // These are PROGRAMS (not membership plans) ✅ keep hardcoded
  const zumbaPlans = [
    {
      title: "Beginner Burn",
      level: "Beginner",
      duration: "20–30 min",
      goal: "Stamina + Fun cardio",
      desc: "Easy steps, low impact options, perfect to start consistency.",
      list: ["Warm-up groove (5 min)", "Basic steps (10 min)", "Fun combo (10 min)", "Cooldown stretch (5 min)"],
    },
    {
      title: "Fat Loss Party",
      level: "Intermediate",
      duration: "30–40 min",
      goal: "Calorie burn + Conditioning",
      desc: "Higher energy tracks with full-body movement and faster pace.",
      list: ["Warm-up (5 min)", "Dance cardio (20 min)", "HIIT bursts (8 min)", "Cooldown (5 min)"],
    },
    {
      title: "Power Zumba",
      level: "Advanced",
      duration: "40–50 min",
      goal: "Endurance + Performance",
      desc: "Longer sessions, intense tracks, strong core engagement.",
      list: ["Warm-up (6 min)", "Power combos (25 min)", "Core finisher (8 min)", "Cooldown (6 min)"],
    },
  ];

  const focusAreas = [
    { title: "Weight Loss", sub: "High-energy calorie burn sessions" },
    { title: "Stamina", sub: "Cardio endurance + heart health" },
    { title: "Mood Boost", sub: "Fun music to stay consistent" },
    { title: "Full Body", sub: "Arms, legs, core—everything moves" },
  ];

  // ✅ Choose which membership plan should be used when user clicks "Join"
  const joinState = { plan: "Premium Plan", planCode: "premium" };

  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800" />

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
        <div className="mb-12">
          <p className="text-green-400 font-semibold tracking-[0.28em] text-xs">
            SERVICES / ZUMBA
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Dance your way to <span className="text-green-400">fitness</span>.
          </h1>

          <p className="text-gray-300 mt-4 max-w-3xl leading-relaxed">
            Fun, high-energy cardio that improves stamina, burns calories, and keeps you consistent—
            without feeling like a “boring workout”.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
            <h2 className="text-2xl font-bold mb-6">Highlights</h2>

            <ul className="space-y-4 text-gray-200">
              {[
                "Cardio + full body movement for better endurance",
                "Great for weight loss & mood boost",
                "Suitable for beginners—easy to start",
                "Track routine + progress with FitTrack",
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

          <div className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.65)]">
            <h2 className="text-2xl font-bold mb-6">Recommended plan</h2>

            <div className="space-y-3 text-gray-200 leading-relaxed">
              <p>
                <span className="text-green-400 font-semibold">Frequency:</span> 3–5 days/week
              </p>
              <p>
                <span className="text-green-400 font-semibold">Session:</span> 30–45 minutes
              </p>
              <p>
                <span className="text-green-400 font-semibold">Goal:</span> Fat loss + stamina + consistency
              </p>
            </div>

            <div className="mt-7 p-5 rounded-2xl bg-green-400/10 border border-green-400/20">
              <p className="text-green-300 text-xs tracking-[0.22em]">PRO TIP</p>
              <p className="text-gray-200 mt-2 text-sm">
                Pair Zumba with a basic diet plan for faster results.
              </p>

              <Link
                to="/home/diet"
                className="inline-block mt-4 text-green-400 font-semibold hover:underline"
              >
                Open Diet Planner →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
            Focus <span className="text-green-400">Areas</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {focusAreas.map((f, i) => (
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

        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
            Zumba <span className="text-green-400">Programs</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {zumbaPlans.map((p, i) => (
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
                  <p className="text-gray-300 text-xs tracking-[0.22em] mb-3">SESSION FLOW</p>
                  <ul className="space-y-2 text-gray-200 text-sm">
                    {p.list.map((x, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>

                  {/* ✅ Pass plan state */}
                  <Link
                    to="/home/join"
                    state={joinState}
                    className="mt-5 inline-block w-full text-center bg-green-400 text-black font-semibold py-3 rounded-xl hover:bg-green-500 transition"
                  >
                    Start Program
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.55)] text-center">
          <p className="text-green-300 text-xs tracking-[0.22em]">READY TO MOVE?</p>

          <h2 className="text-2xl md:text-3xl font-extrabold mt-3">
            Make Cardio Fun with <span className="text-green-400">Zumba</span>
          </h2>

          <p className="text-gray-300 mt-3 max-w-2xl mx-auto leading-relaxed">
            Pick a plan, follow weekly frequency, and track progress like premium fitness apps.
          </p>

          <div className="mt-7 flex gap-4 justify-center flex-wrap">
            {/* ✅ Pass plan state */}
            <Link
              to="/home/join"
              state={joinState}
              className="bg-green-400 text-black font-semibold px-8 py-3 rounded-xl hover:bg-green-500 transition"
            >
              Join Zumba Program
            </Link>

            <Link
              to="/home/diet"
              className="border border-white/15 px-8 py-3 rounded-xl hover:bg-white hover:text-black transition"
            >
              Open Diet Planner
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
