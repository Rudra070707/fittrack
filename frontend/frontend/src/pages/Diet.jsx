import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

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
      // ✅ CORRECT API (matches server.js + routes)
      const res = await axios.post("http://localhost:5000/api/diet", {
        height: Number(height),
        weight: Number(weight),
        goal,
        preference: pref,
      });

      if (!res.data?.success) {
        setError(res.data?.message || "Failed to generate diet plan ❌");
        setLoading(false);
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

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-green-500/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 -right-24 w-[560px] h-[560px] bg-emerald-400/10 blur-[170px] rounded-full" />
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:26px_26px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
      </div>

      <motion.div
        className="relative max-w-6xl mx-auto px-6 py-16"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-green-400 font-semibold tracking-[0.28em] text-xs">
              SERVICES / DIET PLANNER
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
              Build a diet plan that{" "}
              <span className="text-green-400">actually fits</span> your goal.
            </h1>
            <p className="text-gray-300 mt-4 max-w-2xl leading-relaxed">
              Enter your basics, choose your goal + preference, and get a clean plan
              you can follow daily.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => applyPreset("cut")}
              className="px-4 py-2 rounded-2xl bg-white/8 border border-white/10 hover:bg-white/12 transition"
            >
              Quick: Fat Loss
            </button>
            <button
              type="button"
              onClick={() => applyPreset("bulk")}
              className="px-4 py-2 rounded-2xl bg-white/8 border border-white/10 hover:bg-white/12 transition"
            >
              Quick: Muscle Gain
            </button>
            <button
              type="button"
              onClick={() => applyPreset("veg")}
              className="px-4 py-2 rounded-2xl bg-white/8 border border-white/10 hover:bg-white/12 transition"
            >
              Veg Mode
            </button>
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-8">
          <motion.form
            onSubmit={handleGenerate}
            className="lg:col-span-2 bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-7 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.65)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-bold">Your Details</h2>
              <span className="text-xs text-gray-400 px-3 py-1 rounded-full border border-white/10 bg-black/20">
                Takes ~10 seconds
              </span>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-gray-300 font-medium">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 170"
                  className="mt-2 w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10 outline-none focus:ring-2 focus:ring-green-400/80 transition"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 font-medium">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 65"
                  className="mt-2 w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10 outline-none focus:ring-2 focus:ring-green-400/80 transition"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 font-medium">Goal</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10 outline-none focus:ring-2 focus:ring-green-400/80 transition"
                >
                  <option value="">Select goal</option>
                  <option>Weight Loss</option>
                  <option>Muscle Gain</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-300 font-medium">Diet Preference</label>
                <select
                  value={pref}
                  onChange={(e) => setPref(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10 outline-none focus:ring-2 focus:ring-green-400/80 transition"
                >
                  <option value="">Select preference</option>
                  <option>Veg</option>
                  <option>Non-Veg</option>
                  <option>Mixed</option>
                </select>
              </div>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div className="text-sm text-gray-400">We’ll generate a plan based on your inputs.</div>

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full sm:w-auto px-7 py-3 rounded-2xl
                  bg-green-400 text-black font-semibold
                  shadow-[0_0_30px_rgba(34,197,94,0.55)]
                  hover:bg-green-500 hover:shadow-[0_0_45px_rgba(34,197,94,0.75)]
                  hover:scale-[1.02] active:scale-[0.99]
                  transition-all duration-300
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                {loading ? "Generating..." : "Generate Diet Plan"}
              </button>
            </div>

            {/* PREVIEW */}
            <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-xs text-gray-400 tracking-[0.22em]">PREVIEW</p>

              {!preview ? (
                <p className="text-gray-300 mt-2">Fill the fields to see a quick preview here.</p>
              ) : (
                <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Calories/day", value: preview.calories },
                    { label: "Protein", value: preview.protein },
                    { label: "Carbs", value: preview.carbs },
                    { label: "Fats", value: preview.fats },
                  ].map((x) => (
                    <div key={x.label} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                      <p className="text-gray-400 text-xs">{x.label}</p>
                      <p className="text-white font-bold text-lg mt-1">{x.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ✅ GENERATED PLAN */}
            <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-gray-400 tracking-[0.22em]">GENERATED PLAN</p>

                {dietPlan && (
                  <button
                    type="button"
                    onClick={() => setDietPlan(null)}
                    className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition"
                  >
                    Clear
                  </button>
                )}
              </div>

              {error && (
                <p className="mt-3 text-sm text-red-300 border border-red-400/20 bg-red-500/10 rounded-xl p-3">
                  {error}
                </p>
              )}

              {!dietPlan && !error && (
                <p className="mt-3 text-gray-300">
                  Your generated diet plan will appear here after clicking{" "}
                  <span className="text-green-300 font-semibold">Generate Diet Plan</span>.
                </p>
              )}

              {dietPlan && (
                <div className="mt-4 space-y-4">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Calories/day", value: dietPlan.calories },
                      { label: "Protein", value: dietPlan.protein },
                      { label: "Carbs", value: dietPlan.carbs },
                      { label: "Fats", value: dietPlan.fats },
                    ].map((m) => (
                      <div key={m.label} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                        <p className="text-gray-400 text-xs">{m.label}</p>
                        <p className="text-white font-bold text-lg mt-1">{m.value ?? "—"}</p>
                      </div>
                    ))}
                  </div>

                  {Array.isArray(dietPlan.meals) && dietPlan.meals.length > 0 && (
                    <div className="space-y-3">
                      {dietPlan.meals.map((meal, idx) => (
                        <div key={idx} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                          <p className="text-green-300 font-semibold">{meal.title || `Meal ${idx + 1}`}</p>
                          <p className="text-gray-200 mt-1">{meal.items}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {dietPlan.note && (
                    <p className="text-gray-300 text-sm border border-white/10 bg-white/5 rounded-xl p-3">
                      {dietPlan.note}
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.form>

          {/* Tips card (unchanged) */}
          <motion.aside
            className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-7 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold">Pro Tips</h3>
            <p className="text-gray-300 mt-3 leading-relaxed">Small changes done consistently = fast results.</p>

            <div className="mt-6 space-y-4">
              {[
                { title: "Protein first", desc: "Start meals with protein to stay fuller longer." },
                { title: "Hydration", desc: "Aim 2–3L water daily. Improves energy + recovery." },
                { title: "Simple plate rule", desc: "½ veggies, ¼ protein, ¼ carbs for easy balance." },
                { title: "Consistency > perfection", desc: "Follow the plan 80% of the time to see progress." },
              ].map((t) => (
                <div key={t.title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-green-300 font-semibold">{t.title}</p>
                  <p className="text-gray-300 text-sm mt-1">{t.desc}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </motion.div>
    </div>
  );
}
