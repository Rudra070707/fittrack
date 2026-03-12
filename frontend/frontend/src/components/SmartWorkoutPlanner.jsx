import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE } from "../api";

export default function SmartWorkoutPlanner() {

  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("");
  const [days, setDays] = useState("");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {

    if (!goal || !level || !days) {
      alert("Please select all fields before generating a plan");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(`${API_BASE}/workout/generate`, {
        goal,
        level,
        days: Number(days),
      });

      if (!res.data?.success) {
        alert(res.data?.message || "Failed to generate plan");
        return;
      }

      setPlan(res.data.plan);

    } catch (err) {

      console.error(
        "Workout plan generate error:",
        err?.response?.data || err.message
      );

      alert(
        err?.response?.data?.message ||
          "Server error generating workout plan"
      );

    } finally {
      setLoading(false);
    }
  };

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
        className="relative max-w-6xl mx-auto px-6 py-16"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
      >

        {/* Header */}
        <div className="mb-12">

          <p className="text-emerald-400 font-semibold tracking-[0.28em] text-xs">
            SERVICES / WORKOUT PLANNER
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Smart{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Workout Planner
            </span>
          </h1>

          <p className="text-white/65 mt-4 max-w-2xl">
            Generate a personalized workout routine based on your goal,
            experience level and weekly availability.
          </p>

        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Form */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="lg:col-span-2 bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-8 shadow-[0_26px_90px_rgba(0,0,0,0.65)]"
          >

            <h2 className="text-2xl font-bold mb-6">
              Your Preferences
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-black/30 border border-white/12 text-white focus:ring-2 focus:ring-emerald-400 outline-none"
              >
                <option value="">Select goal</option>
                <option>Weight Loss</option>
                <option>Muscle Gain</option>
                <option>Strength</option>
                <option>General Fitness</option>
              </select>

              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-black/30 border border-white/12 text-white focus:ring-2 focus:ring-emerald-400 outline-none"
              >
                <option value="">Select level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>

              <select
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-black/30 border border-white/12 text-white focus:ring-2 focus:ring-emerald-400 outline-none"
              >
                <option value="">Select days</option>
                <option value="3">3 days</option>
                <option value="5">5 days</option>
                <option value="6">6 days</option>
              </select>

            </div>

            <motion.button
              onClick={generatePlan}
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="mt-8 px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-semibold shadow-[0_12px_34px_rgba(34,197,94,0.25)] hover:scale-[1.02] transition"
            >
              {loading ? "Generating..." : "Generate Workout Plan"}
            </motion.button>

          </motion.div>

          {/* Tips */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-8 shadow-[0_26px_90px_rgba(0,0,0,0.65)]"
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

        {/* Result */}
        {plan && (
          <motion.div
            className="mt-12 bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-8 shadow-[0_26px_90px_rgba(0,0,0,0.65)]"
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
                  whileHover={{ scale: 1.04 }}
                  className="rounded-2xl bg-black/30 border border-white/12 p-5"
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