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
    <div className="relative min-h-screen overflow-hidden text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800" />

      {/* Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-green-500/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 -right-24 w-[560px] h-[560px] bg-emerald-400/10 blur-[170px] rounded-full" />
      </div>

      <motion.div
        className="relative max-w-6xl mx-auto px-6 py-16"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >

        {/* Header */}
        <div className="mb-12">
          <p className="text-green-400 font-semibold tracking-[0.28em] text-xs">
            SERVICES / WORKOUT PLANNER
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Smart <span className="text-green-400">Workout Planner</span>
          </h1>

          <p className="text-gray-300 mt-4 max-w-2xl">
            Generate a personalized workout routine based on your goal,
            experience level and weekly availability.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Form */}
          <motion.div
            className="lg:col-span-2 bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-[0_25px_80px_rgba(0,0,0,0.65)]"
            whileHover={{ scale: 1.01 }}
          >

            <h2 className="text-2xl font-bold mb-6">Your Preferences</h2>

            <div className="grid md:grid-cols-2 gap-5">

              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-black/30 border border-white/10 focus:ring-2 focus:ring-green-400"
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
                className="px-4 py-3 rounded-2xl bg-black/30 border border-white/10 focus:ring-2 focus:ring-green-400"
              >
                <option value="">Select level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>

              <select
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-black/30 border border-white/10 focus:ring-2 focus:ring-green-400"
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
              className="mt-8 px-8 py-3 rounded-2xl bg-green-400 text-black font-semibold shadow-[0_0_30px_rgba(34,197,94,0.55)] hover:bg-green-500"
            >
              {loading ? "Generating..." : "Generate Workout Plan"}
            </motion.button>

          </motion.div>

          {/* Tips */}
          <motion.div
            className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
            whileHover={{ scale: 1.02 }}
          >

            <h3 className="text-xl font-bold mb-4">Training Tips</h3>

            <ul className="space-y-4 text-gray-300 text-sm">
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
            className="mt-12 bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
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
                  className="rounded-2xl bg-black/30 border border-white/10 p-5"
                >

                  <p className="text-green-400 font-semibold mb-3">
                    Day {i + 1}
                  </p>

                  <ul className="space-y-2 text-gray-200 text-sm">

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
    </div>
  );
}