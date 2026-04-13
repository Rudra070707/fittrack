import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE } from "../api";
// import toast from "react-hot-toast"; // 🔥 enable later

export default function SmartWorkoutPlanner() {

  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("");
  const [days, setDays] = useState("");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ ADDED ERROR STATE
  const [error, setError] = useState("");

  const generatePlan = async () => {

    // ✅ IMPROVED VALIDATION
    if (!goal || !level || !days) {
      setError("Please select goal, level and days");
      return;
    }

    setError("");
    setPlan(null);

    try {

      setLoading(true);

      const res = await axios.post(`${API_BASE}/workout/generate`, {
        goal,
        level,
        days: Number(days),
      });

      if (!res.data?.success) {
        setError(res.data?.message || "Failed to generate workout plan");
        return;
      }

      setPlan(res.data.plan);

      // ✅ SMOOTH SCROLL TO RESULT
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth"
        });
      }, 200);

    } catch (err) {

      console.error(err);

      setError(
        err?.response?.data?.message ||
        "Something went wrong while generating workout"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* 🌌 BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black" />

        {/* 🔥 ADDED GLOW LAYERS */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-400/10 blur-[200px] rounded-full"/>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-400/10 blur-[200px] rounded-full"/>

        {/* 🔥 CENTER LIGHT */}
        <div className="absolute left-1/2 top-1/2 w-[500px] h-[250px] -translate-x-1/2 -translate-y-1/2 bg-emerald-400/10 blur-[140px]" />

        <motion.div
          className="absolute inset-0 opacity-80"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(16,185,129,0.25), transparent 60%)",
              "radial-gradient(circle at 70% 20%, rgba(59,130,246,0.25), transparent 60%)",
              "radial-gradient(circle at 30% 70%, rgba(16,185,129,0.25), transparent 60%)"
            ]
          }}
          transition={{ duration: 16, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative max-w-6xl mx-auto px-6 py-16"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
      >

        {/* HEADER */}
        <div className="mb-14">

          <p className="text-emerald-400 tracking-[0.32em] text-xs font-semibold">
            SERVICES / WORKOUT PLANNER
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
            Smart{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,197,94,0.8)]">
              Workout Planner
            </span>
          </h1>

          <p className="text-white/65 mt-4 max-w-2xl leading-relaxed">
            Generate a personalized workout routine based on your goal and experience.
          </p>

        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 gap-10">

          {/* FORM */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="
              group relative
              lg:col-span-2
              bg-white/6 backdrop-blur-2xl
              border border-white/12
              rounded-3xl p-8
              shadow-[0_30px_100px_rgba(0,0,0,0.7)]
            "
          >

            {/* 🔥 INNER LIGHT */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent rounded-3xl"/>

            {/* 🔥 HOVER GLOW */}
            <div className="pointer-events-none absolute -inset-3 opacity-0 group-hover:opacity-100 bg-emerald-400/20 blur-2xl rounded-3xl transition"/>

            <h2 className="text-2xl font-bold mb-6 tracking-wide">
              Your Preferences
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {[{
                value: goal,
                setter: setGoal,
                options: ["Weight Loss", "Muscle Gain", "Strength", "General Fitness"],
                placeholder: "Select goal"
              },{
                value: level,
                setter: setLevel,
                options: ["Beginner", "Intermediate", "Advanced"],
                placeholder: "Select level"
              },{
                value: days,
                setter: setDays,
                options: ["3", "5", "6"],
                placeholder: "Select days"
              }].map((f, i) => (
                <select
                  key={i}
                  value={f.value}
                  onChange={(e) => f.setter(e.target.value)}
                  className="
                    px-4 py-3 rounded-2xl
                    bg-black/40 border border-white/10
                    text-white outline-none
                    focus:ring-2 focus:ring-emerald-400
                    focus:border-emerald-400/40
                    focus:shadow-[0_0_30px_rgba(34,197,94,0.5)]
                    transition-all duration-300
                    hover:border-emerald-400/40
                  "
                >
                  <option value="">{f.placeholder}</option>
                  {f.options.map((o, j) => (
                    <option key={j}>{o}</option>
                  ))}
                </select>
              ))}

            </div>

            {/* ✅ ERROR MESSAGE */}
            {error && (
              <p className="mt-4 text-red-400 text-sm">
                {error}
              </p>
            )}

            <motion.button
              onClick={generatePlan}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                mt-8 px-8 py-3 rounded-2xl font-semibold tracking-wide
                bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-400
                text-black
                transition-all duration-300
                shadow-[0_0_30px_rgba(34,197,94,0.5)]
                hover:shadow-[0_0_60px_rgba(34,197,94,0.9)]
                disabled:opacity-60
              "
            >
              {loading ? "Generating..." : "Generate Workout Plan"}
            </motion.button>

          </motion.div>

          {/* TIPS */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="
              group relative
              bg-white/6 backdrop-blur-2xl
              border border-white/12
              rounded-3xl p-8
              shadow-[0_30px_100px_rgba(0,0,0,0.7)]
            "
          >

            {/* 🔥 GLOW */}
            <div className="pointer-events-none absolute -inset-3 opacity-0 group-hover:opacity-100 bg-emerald-400/20 blur-2xl rounded-3xl transition"/>

            <h3 className="text-xl font-bold mb-4 tracking-wide">
              Training Tips
            </h3>

            <ul className="space-y-4 text-white/70 text-sm leading-relaxed">
              <li>• Warm up before workouts</li>
              <li>• Focus on proper form</li>
              <li>• Rest muscle groups properly</li>
              <li>• Track progress weekly</li>
            </ul>

          </motion.div>

        </div>

        {/* RESULT */}
        {plan && (
          <motion.div
            className="
              mt-14
              relative
              bg-white/6 backdrop-blur-2xl
              border border-white/12
              rounded-3xl p-8
              shadow-[0_30px_100px_rgba(0,0,0,0.7)]
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >

            {/* 🔥 GLOW */}
            <div className="absolute -inset-3 bg-emerald-400/10 blur-3xl rounded-3xl opacity-60"/>

            <h2 className="text-2xl font-bold mb-6 tracking-wide">
              Your Weekly Workout Plan
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              {Object.entries(plan).map(([day, workouts], i) => (

                <motion.div
                  key={day}
                  whileHover={{ scale: 1.06, y: -6 }}
                  className="
                    rounded-2xl p-5
                    bg-black/30 border border-white/10
                    transition-all duration-300
                    hover:border-emerald-400/40
                    hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]
                  "
                >

                  <p className="text-emerald-400 font-semibold mb-3 tracking-wide">
                    Day {i + 1}
                  </p>

                  <ul className="space-y-2 text-white/80 text-sm leading-relaxed">
                    {workouts.map((w, idx) => (
                      <li key={idx}>• {w}</li>
                    ))}
                  </ul>

                </motion.div>

              ))}

            </div>

          </motion.div>
        )}

      </motion.div>
    </section>
  );
}