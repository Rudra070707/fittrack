import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE } from "../api";

export default function Diet() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [pref, setPref] = useState("");

  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const applyPreset = (type) => {
    if (type === "cut") {
      setGoal("Weight Loss");
      setPref("Mixed");
    }
    if (type === "bulk") {
      setGoal("Muscle Gain");
      setPref("Mixed");
    }
    if (type === "veg") {
      setPref("Veg");
    }
  };

  const preview = useMemo(() => {
    const h = Number(height);
    const w = Number(weight);
    const ok = h > 0 && w > 0 && goal && pref;
    if (!ok) return null;

    const calories =
      goal === "Weight Loss" ? 1800 : goal === "Muscle Gain" ? 2400 : 2100;

    const protein =
      goal === "Muscle Gain"
        ? "120–140g"
        : goal === "Weight Loss"
        ? "90–110g"
        : "100–120g";

    const carbs =
      goal === "Weight Loss"
        ? "160–200g"
        : goal === "Muscle Gain"
        ? "250–320g"
        : "200–260g";

    const fats =
      goal === "Weight Loss"
        ? "45–55g"
        : goal === "Muscle Gain"
        ? "60–75g"
        : "55–70g";

    return { calories, protein, carbs, fats };
  }, [height, weight, goal, pref]);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!height || !weight || !goal || !pref) {
      alert("Please fill all fields ✅");
      return;
    }

    setError("");
    setLoading(true);
    setDietPlan(null);

    try {
      const res = await axios.post(`${API_BASE}/diet`, {
        height: Number(height),
        weight: Number(weight),
        goal,
        preference: pref,
      });

      if (!res.data?.success) {
        setError(res.data?.message || "Failed to generate diet plan ❌");
        return;
      }

      setDietPlan(res.data.plan);
      alert("Diet plan generated successfully 🎯");

    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to generate diet plan ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">

      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800" />

      <motion.div
        className="relative max-w-6xl mx-auto px-6 py-16"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
      >

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-green-400 font-semibold tracking-[0.28em] text-xs">
              SERVICES / DIET PLANNER
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
              Build a diet plan that{" "}
              <span className="text-green-400">actually fits</span> your goal.
            </h1>

            <p className="text-gray-300 mt-4 max-w-2xl">
              Enter your basics and generate a plan you can follow daily.
            </p>
          </div>

          {/* PRESET BUTTONS */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Quick: Fat Loss", type: "cut" },
              { label: "Quick: Muscle Gain", type: "bulk" },
              { label: "Veg Mode", type: "veg" },
            ].map((b) => (
              <motion.button
                key={b.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => applyPreset(b.type)}
                className="px-4 py-2 rounded-2xl bg-white/8 border border-white/10 hover:bg-white/12 transition"
              >
                {b.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="mt-10 grid lg:grid-cols-3 gap-8">

          {/* FORM */}
          <form
            onSubmit={handleGenerate}
            className="lg:col-span-2 bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >

            <h2 className="text-xl font-bold mb-6">Your Details</h2>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="number"
                placeholder="Height (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="input"
              />

              <input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="input"
              />

              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="input"
              >
                <option value="">Select goal</option>
                <option>Weight Loss</option>
                <option>Muscle Gain</option>
              </select>

              <select
                value={pref}
                onChange={(e) => setPref(e.target.value)}
                className="input"
              >
                <option value="">Select preference</option>
                <option>Veg</option>
                <option>Non-Veg</option>
                <option>Mixed</option>
              </select>

            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              disabled={loading}
              className="mt-7 px-7 py-3 rounded-2xl bg-green-400 text-black font-semibold"
            >
              {loading ? "Generating..." : "Generate Diet Plan"}
            </motion.button>

          </form>

        </div>
      </motion.div>
    </div>
  );
}