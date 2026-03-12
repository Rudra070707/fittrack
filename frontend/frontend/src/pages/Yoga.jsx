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

      {/* Global animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black"/>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]"/>

        <motion.div
          className="absolute inset-0 opacity-80"
          animate={{
            background:[
              "radial-gradient(circle at 15% 25%, rgba(16,185,129,0.28), transparent 60%), radial-gradient(circle at 85% 35%, rgba(59,130,246,0.20), transparent 55%)",
              "radial-gradient(circle at 70% 20%, rgba(59,130,246,0.26), transparent 60%), radial-gradient(circle at 35% 80%, rgba(99,102,241,0.18), transparent 55%)",
              "radial-gradient(circle at 30% 70%, rgba(16,185,129,0.24), transparent 62%), radial-gradient(circle at 85% 60%, rgba(99,102,241,0.20), transparent 55%)"
            ]
          }}
          transition={{duration:16,repeat:Infinity,ease:"easeInOut"}}
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
            SERVICES / YOGA
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Strong body. Calm{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              mind
            </span>.
          </h1>

          <p className="text-white/70 mt-4 max-w-3xl leading-relaxed">
            Improve flexibility, reduce stress, and build strength safely with
            guided yoga routines and recovery support.
          </p>

        </div>

        {/* Info Cards */}
        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-8 shadow-[0_26px_90px_rgba(0,0,0,0.65)]">

            <h2 className="text-2xl font-bold mb-6">Why Yoga on FitTrack</h2>

            <ul className="space-y-4 text-white/80">

              {[
                "Improve flexibility and mobility",
                "Injury-safe routines",
                "Better posture & reduced stiffness",
                "Helps stress and sleep quality",
              ].map((t,i)=>(
                <li key={i} className="flex gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  {t}
                </li>
              ))}

            </ul>

            <div className="mt-8 flex gap-4 flex-wrap">

              <Link
                to="/home/join"
                className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-semibold px-6 py-3 rounded-xl shadow-[0_12px_34px_rgba(34,197,94,0.25)]"
              >
                Start Yoga
              </Link>

              <Link
                to="/home/injury"
                className="border border-white/15 px-6 py-3 rounded-xl hover:bg-white hover:text-black transition"
              >
                Injury-Safe Training
              </Link>

            </div>

          </div>

          <div className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-8 shadow-[0_26px_90px_rgba(0,0,0,0.65)]">

            <h2 className="text-2xl font-bold mb-6">Perfect for</h2>

            <div className="space-y-4 text-white/80">

              <p>
                <span className="text-emerald-400 font-semibold">Beginners</span> starting a healthy routine.
              </p>

              <p>
                <span className="text-emerald-400 font-semibold">Office workers</span> dealing with stiffness.
              </p>

              <p>
                <span className="text-emerald-400 font-semibold">Fitness users</span> who need mobility and recovery.
              </p>

            </div>

          </div>

        </div>

        {/* Programs */}
        <div className="mt-20">

          <h2 className="text-3xl font-extrabold mb-10">
            Guided Yoga <span className="text-emerald-400">Programs</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {programs.map((p,i)=>(
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

                  {p.list.map((x,idx)=>(
                    <li key={idx} className="flex gap-2">
                      <span className="text-emerald-400">•</span>
                      {x}
                    </li>
                  ))}

                </ul>

              </div>
            ))}

          </div>

        </div>

        {/* Focus Areas */}
        <div className="mt-20">

          <h2 className="text-3xl font-extrabold mb-8">
            Focus <span className="text-emerald-400">Areas</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {focusAreas.map((f,i)=>(
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

        {/* Quick Routines */}
        <div className="mt-20">

          <h2 className="text-3xl font-extrabold mb-8">
            Quick <span className="text-emerald-400">Routines</span>
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">

            {quickRoutines.map((r,i)=>(
              <div
                key={i}
                className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-7 shadow-lg"
              >

                <div className="flex justify-between">
                  <h3 className="text-xl font-bold">{r.title}</h3>

                  <span className="text-xs px-3 py-1 rounded-full bg-black/30 border border-white/10">
                    {r.time}
                  </span>
                </div>

                <ul className="mt-4 space-y-2 text-sm">

                  {r.points.map((p,idx)=>(
                    <li key={idx} className="flex gap-2">
                      <span className="text-emerald-400">✓</span>
                      {p}
                    </li>
                  ))}

                </ul>

              </div>
            ))}

          </div>

        </div>

      </motion.div>

    </section>
  );
}