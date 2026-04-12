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
      list: [
        "Tadasana",
        "Cat-Cow",
        "Child Pose",
        "Downward Dog",
        "Breathing (3 min)",
      ],
    },
    {
      title: "Strength & Balance",
      level: "Intermediate",
      duration: "25–30 min",
      goal: "Core Strength + Stability",
      desc: "Build balance and strength safely with controlled transitions.",
      list: [
        "Plank Hold",
        "Warrior I / II",
        "Chair Pose",
        "Bridge Pose",
        "Cooldown Stretch",
      ],
    },
    {
      title: "Advanced Mobility",
      level: "Advanced",
      duration: "35–40 min",
      goal: "Deep Mobility + Endurance",
      desc: "Longer holds + deeper stretches for experienced users.",
      list: [
        "Sun Salutation",
        "Cobra Pose",
        "Pigeon Stretch",
        "Seated Forward Fold",
        "Box Breathing",
      ],
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
      points: [
        "Neck + shoulder release",
        "Spine mobility",
        "Hip opener stretch",
        "2-min breathing",
      ],
    },
    {
      title: "10-min Stress Reset",
      time: "10 min",
      points: [
        "Box breathing",
        "Child pose",
        "Seated twist",
        "Slow forward fold",
      ],
    },
    {
      title: "20-min Full Body Flow",
      time: "20 min",
      points: [
        "Warm-up flow",
        "Standing balance",
        "Core hold",
        "Cooldown stretch",
      ],
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* 🌿 BACKGROUND (SOFT + CALM) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black"/>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_55%)]"/>

        {/* 🌿 SOFT GLOW */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-400/8 blur-[220px] rounded-full"/>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-400/8 blur-[220px] rounded-full"/>

        {/* 🔥 CENTER LIGHT (NEW DEPTH) */}
        <div className="absolute left-1/2 top-1/2 w-[500px] h-[250px] -translate-x-1/2 -translate-y-1/2 bg-emerald-400/8 blur-[140px]" />

        <motion.div
          className="absolute inset-0 opacity-70"
          animate={{
            background:[
              "radial-gradient(circle at 15% 25%, rgba(16,185,129,0.18), transparent 60%), radial-gradient(circle at 85% 35%, rgba(59,130,246,0.12), transparent 55%)",
              "radial-gradient(circle at 70% 20%, rgba(59,130,246,0.14), transparent 60%), radial-gradient(circle at 35% 80%, rgba(99,102,241,0.10), transparent 55%)",
              "radial-gradient(circle at 30% 70%, rgba(16,185,129,0.16), transparent 62%), radial-gradient(circle at 85% 60%, rgba(99,102,241,0.10), transparent 55%)"
            ]
          }}
          transition={{duration:18,repeat:Infinity}}
        />

      </div>

      <motion.div className="relative max-w-6xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="mb-14">

          {/* 🔥 BADGE */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 backdrop-blur-md mb-6">
            🧘 Yoga Wellness
          </div>

          <p className="text-emerald-400 text-xs tracking-[0.28em]">
            SERVICES / YOGA
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Strong body. Calm{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(34,197,94,0.7)]">
              mind
            </span>.
          </h1>

          <p className="text-white/70 mt-4 max-w-3xl">
            Improve flexibility, reduce stress, and build strength safely.
          </p>
        </div>

        {/* INFO CARDS */}
        <div className="grid lg:grid-cols-2 gap-8">

          <motion.div whileHover={{scale:1.02}} className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-transparent">

            <div className="pointer-events-none absolute -inset-3 opacity-0 group-hover:opacity-100 bg-emerald-400/15 blur-2xl rounded-3xl"/>

            <div className="relative bg-white/6 border border-white/12 rounded-3xl p-8 backdrop-blur-2xl">

              <h2 className="text-2xl font-bold mb-6">Why Yoga on FitTrack</h2>

              <ul className="space-y-4">
                {[
                  "Improve flexibility and mobility",
                  "Injury-safe routines",
                  "Better posture & reduced stiffness",
                  "Helps stress and sleep quality",
                ].map((t,i)=>(
                  <li key={i} className="flex gap-3">
                    <span className="text-emerald-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">✓</span>
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-4">
                <Link to="/home/join"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-black font-semibold hover:shadow-[0_0_30px_rgba(34,197,94,0.7)] transition">
                  Start Yoga
                </Link>
                <Link to="/home/injury"
                  className="px-6 py-3 rounded-xl border border-white/15 hover:bg-white hover:text-black transition">
                  Injury-Safe
                </Link>
              </div>

            </div>

          </motion.div>

          <motion.div whileHover={{scale:1.02}} className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-transparent">

            <div className="pointer-events-none absolute -inset-3 opacity-0 group-hover:opacity-100 bg-emerald-400/15 blur-2xl rounded-3xl"/>

            <div className="relative bg-white/6 border border-white/12 rounded-3xl p-8 backdrop-blur-2xl">
              <h2 className="text-2xl font-bold mb-6">Perfect for</h2>

              <p><span className="text-emerald-400">Beginners</span></p>
              <p><span className="text-emerald-400">Office workers</span></p>
              <p><span className="text-emerald-400">Fitness users</span></p>
            </div>

          </motion.div>

        </div>

        {/* PROGRAMS */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {programs.map((p,i)=>(
            <motion.div key={i} whileHover={{y:-12,scale:1.03}}
              className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-transparent">

              <div className="pointer-events-none absolute -inset-3 opacity-0 group-hover:opacity-100 bg-emerald-400/15 blur-2xl rounded-3xl"/>

              <div className="relative bg-white/6 border border-white/12 rounded-3xl p-7 backdrop-blur-2xl">

                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="text-white/60 text-sm mt-2">{p.desc}</p>

                <ul className="mt-4 space-y-1 text-white/80">
                  {p.list.map((x,i)=>(<li key={i}>• {x}</li>))}
                </ul>

              </div>
            </motion.div>
          ))}
        </div>

        {/* FOCUS */}
        <div className="mt-20 grid md:grid-cols-4 gap-6">
          {focusAreas.map((f,i)=>(
            <motion.div key={i} whileHover={{scale:1.05}}
              className="bg-white/6 border border-white/12 p-6 rounded-2xl backdrop-blur-xl hover:shadow-[0_0_35px_rgba(34,197,94,0.25)] transition">
              <p className="font-bold">{f.title}</p>
              <p className="text-white/60">{f.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* QUICK ROUTINES */}
        <div className="mt-20 grid lg:grid-cols-3 gap-8">
          {quickRoutines.map((r,i)=>(
            <motion.div key={i} whileHover={{scale:1.04}}
              className="bg-white/6 border border-white/12 p-7 rounded-3xl backdrop-blur-2xl hover:shadow-[0_0_35px_rgba(34,197,94,0.25)] transition">

              <h3 className="font-bold text-lg">{r.title}</h3>

              <p className="text-emerald-400 text-sm mb-3">{r.time}</p>

              <ul className="space-y-1 text-white/80">
                {r.points.map((p,i)=>(<li key={i}>• {p}</li>))}
              </ul>

            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}