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

      {/* 🌌 BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />

        {/* 🔥 EXTRA DEPTH */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-400/10 blur-[200px] rounded-full"/>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-400/10 blur-[200px] rounded-full"/>

        {/* 🔥 CENTER LIGHT */}
        <div className="absolute left-1/2 top-1/2 w-[600px] h-[300px] -translate-x-1/2 -translate-y-1/2 bg-green-400/10 blur-[160px]" />

        <motion.div
          className="absolute inset-0 opacity-80"
          animate={{
            background: [
              "radial-gradient(circle at 15% 25%, rgba(16,185,129,0.28), transparent 60%), radial-gradient(circle at 85% 35%, rgba(59,130,246,0.20), transparent 55%)",
              "radial-gradient(circle at 70% 20%, rgba(59,130,246,0.26), transparent 60%), radial-gradient(circle at 35% 80%, rgba(99,102,241,0.18), transparent 55%)",
              "radial-gradient(circle at 30% 70%, rgba(16,185,129,0.24), transparent 62%), radial-gradient(circle at 85% 60%, rgba(99,102,241,0.20), transparent 55%)"
            ]
          }}
          transition={{ duration: 16, repeat: Infinity }}
        />

      </div>

      <motion.div className="relative max-w-6xl mx-auto px-6 py-20">

        {/* 🔥 HEADER */}
        <div className="mb-14">

          {/* 🔥 BADGE (NEW) */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 backdrop-blur-md mb-6">
            💃 Zumba Fitness
          </div>

          <p className="text-emerald-400 tracking-[0.28em] text-xs">
            SERVICES / ZUMBA
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Dance your way to{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,197,94,0.7)]">
              fitness
            </span>.
          </h1>

          <p className="text-white/70 mt-4 max-w-3xl">
            Fun, high-energy cardio that improves stamina, burns calories.
          </p>

        </div>

        {/* 💎 TOP CARDS */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Highlights */}
          <motion.div whileHover={{scale:1.02}} className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-transparent">

            <div className="pointer-events-none absolute -inset-3 opacity-0 group-hover:opacity-100 bg-emerald-400/20 blur-2xl rounded-3xl transition"/>

            <div className="relative bg-white/6 border border-white/12 rounded-3xl p-8 backdrop-blur-2xl">

              <h2 className="text-2xl font-bold mb-6">Highlights</h2>

              <ul className="space-y-4">
                {[
                  "Cardio + full body movement",
                  "Great for weight loss",
                  "Suitable for beginners",
                  "Track progress with FitTrack",
                ].map((t,i)=>(
                  <li key={i} className="flex gap-3">
                    <span className="text-emerald-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">✓</span>
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-4">
                <Link to="/home/join" state={joinState}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-black font-semibold hover:shadow-[0_0_35px_rgba(34,197,94,0.8)] transition">
                  Join Zumba
                </Link>
                <Link to="/home/progress"
                  className="px-6 py-3 rounded-xl border border-white/15 hover:bg-white hover:text-black transition">
                  Track Progress
                </Link>
              </div>

            </div>

          </motion.div>

          {/* Plan */}
          <motion.div whileHover={{scale:1.02}} className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-transparent">

            <div className="pointer-events-none absolute -inset-3 opacity-0 group-hover:opacity-100 bg-emerald-400/20 blur-2xl rounded-3xl transition"/>

            <div className="relative bg-white/6 border border-white/12 rounded-3xl p-8 backdrop-blur-2xl">

              <h2 className="text-2xl font-bold mb-6">Recommended plan</h2>

              <p><span className="text-emerald-400">Frequency:</span> 3–5 days</p>
              <p><span className="text-emerald-400">Session:</span> 30–45 min</p>
              <p><span className="text-emerald-400">Goal:</span> Fat loss</p>

              <div className="mt-6 bg-emerald-400/10 p-4 rounded-xl border border-emerald-400/20">
                <p className="text-sm">Pair with diet plan</p>
              </div>

            </div>

          </motion.div>

        </div>

        {/* 🔥 FOCUS */}
        <div className="mt-20 grid md:grid-cols-4 gap-6">
          {focusAreas.map((f,i)=>(
            <motion.div key={i} whileHover={{scale:1.05}}
              className="bg-white/6 border border-white/12 p-6 rounded-2xl backdrop-blur-xl hover:shadow-[0_0_40px_rgba(34,197,94,0.3)] transition">
              <p className="font-bold">{f.title}</p>
              <p className="text-white/60">{f.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* 💪 PROGRAMS */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {zumbaPlans.map((p,i)=>(
            <motion.div key={i} whileHover={{y:-12,scale:1.03}}
              className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-transparent">

              <div className="pointer-events-none absolute -inset-3 opacity-0 group-hover:opacity-100 bg-emerald-400/20 blur-2xl rounded-3xl transition"/>

              <div className="relative bg-white/6 border border-white/12 rounded-3xl p-7 backdrop-blur-2xl">

                <h3 className="text-xl font-bold">{p.title}</h3>

                <p className="text-white/60 text-sm mt-2">{p.desc}</p>

                <ul className="mt-4 space-y-1 text-white/80">
                  {p.list.map((x,i)=>(<li key={i}>• {x}</li>))}
                </ul>

                <Link
                  to="/home/join"
                  state={joinState}
                  className="mt-5 block text-center bg-gradient-to-r from-emerald-500 to-emerald-400 text-black py-2 rounded-xl font-semibold hover:shadow-[0_0_35px_rgba(34,197,94,0.8)] transition"
                >
                  Start Program
                </Link>

              </div>

            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}