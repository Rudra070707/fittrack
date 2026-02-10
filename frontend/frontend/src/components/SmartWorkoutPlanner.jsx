import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

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

      const res = await axios.post("http://localhost:5000/api/workout/generate", {
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
      console.error("Workout plan generate error:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Server error generating workout plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
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
            SERVICES / WORKOUT PLANNER
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Smart <span className="text-green-400">Workout Planner</span>
          </h1>

          <p className="text-gray-300 mt-4 max-w-2xl leading-relaxed">
            Generate a structured workout routine based on your goal, experience
            level and weekly availability.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* FORM */}
          <motion.div
            className="lg:col-span-2 bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-7 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.65)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Your Preferences</h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-gray-300 font-medium">
                  Fitness Goal
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10 outline-none focus:ring-2 focus:ring-green-400/80 transition"
                >
                  <option value="">Select goal</option>
                  <option>Weight Loss</option>
                  <option>Muscle Gain</option>
                  <option>Strength</option>
                  <option>General Fitness</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-300 font-medium">
                  Experience Level
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10 outline-none focus:ring-2 focus:ring-green-400/80 transition"
                >
                  <option value="">Select level</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-300 font-medium">
                  Workout Days / Week
                </label>
                <select
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10 outline-none focus:ring-2 focus:ring-green-400/80 transition"
                >
                  <option value="">Select days</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>

            <button
              onClick={generatePlan}
              disabled={loading}
              className={`
                mt-8 px-8 py-3 rounded-2xl
                bg-green-400 text-black font-semibold
                shadow-[0_0_30px_rgba(34,197,94,0.55)]
                hover:bg-green-500 hover:shadow-[0_0_45px_rgba(34,197,94,0.75)]
                hover:scale-[1.02]
                transition-all duration-300
                ${loading ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              {loading ? "Generating..." : "Generate Workout Plan"}
            </button>
          </motion.div>

          {/* SIDE INFO */}
          <motion.div
            className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4">Training Tips</h3>

            <ul className="space-y-4 text-gray-300 text-sm">
              <li>• Warm up for 5–10 minutes before workouts</li>
              <li>• Focus on form over heavy weights</li>
              <li>• Rest at least 48h before training same muscle group</li>
              <li>• Track progress weekly for motivation</li>
            </ul>

            <div className="mt-6 p-5 rounded-2xl bg-green-400/10 border border-green-400/20">
              <p className="text-green-300 text-xs tracking-[0.22em]">
                PRO TIP
              </p>
              <p className="text-gray-200 mt-2">
                Combine this plan with Diet Planner for faster results.
              </p>
            </div>
          </motion.div>
        </div>

        {/* RESULT */}
        {plan && (
          <motion.div
            className="mt-12 bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.65)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6">
              Your Weekly Workout Plan
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(plan).map(([day, workouts], i) => (
                <div
                  key={day}
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
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
