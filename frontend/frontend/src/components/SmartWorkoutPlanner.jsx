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

  const generatePlan = async () => {

    if (!goal || !level || !days) {
      // toast.error("Please select all fields");
      return;
    }

    try {

      setLoading(true);
      // const loadingToast = toast.loading("Generating plan...");

      const res = await axios.post(`${API_BASE}/workout/generate`, {
        goal,
        level,
        days: Number(days),
      });

      if (!res.data?.success) {
        // toast.error(res.data?.message || "Failed to generate plan");
        return;
      }

      setPlan(res.data.plan);
      // toast.success("Workout plan ready 💪");

    } catch (err) {

      console.error(err);

      // toast.error("Server error generating workout plan");

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* 🌌 BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black" />

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
        <div className="mb-12">
          <p className="text-emerald-400 tracking-[0.28em] text-xs font-semibold">
            SERVICES / WORKOUT PLANNER
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Smart{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Workout Planner
            </span>
          </h1>

          <p className="text-white/65 mt-4 max-w-2xl">
            Generate a personalized workout routine based on your goal and experience.
          </p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* FORM */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="lg:col-span-2 bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-8"
          >

            <h2 className="text-2xl font-bold mb-6">
              Your Preferences
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

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
                    bg-black/30 border border-white/10
                    text-white outline-none
                    focus:ring-2 focus:ring-emerald-400
                    transition hover:border-emerald-400/40
                  "
                >
                  <option value="">{f.placeholder}</option>
                  {f.options.map((o, j) => (
                    <option key={j}>{o}</option>
                  ))}
                </select>
              ))}

            </div>

            <motion.button
              onClick={generatePlan}
              disabled={loading}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="
                mt-8 px-8 py-3 rounded-2xl font-semibold
                bg-gradient-to-r from-emerald-500 to-emerald-400
                text-black
                transition-all duration-300
                hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]
                disabled:opacity-60
              "
            >
              {loading ? "Generating..." : "Generate Workout Plan"}
            </motion.button>

          </motion.div>

          {/* TIPS */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-8"
          >

            <h3 className="text-xl font-bold mb-4">
              Training Tips
            </h3>

            <ul className="space-y-4 text-white/70 text-sm">
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
            className="mt-12 bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >

            <h2 className="text-2xl font-bold mb-6">
              Your Weekly Workout Plan
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              {Object.entries(plan).map(([day, workouts], i) => (

                <motion.div
                  key={day}
                  whileHover={{ scale: 1.05 }}
                  className="
                    rounded-2xl p-5
                    bg-black/30 border border-white/10
                    transition hover:border-emerald-400/40
                  "
                >

                  <p className="text-emerald-400 font-semibold mb-3">
                    Day {i + 1}
                  </p>

                  <ul className="space-y-2 text-white/80 text-sm">
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