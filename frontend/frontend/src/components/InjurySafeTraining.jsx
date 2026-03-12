import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { API_BASE } from "../api";

export default function InjurySafeTraining() {

  const [injuryInput, setInjuryInput] = useState("");
  const [plan, setPlan] = useState(null);
  const [bodyPart, setBodyPart] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGeneratePlan = async () => {

    try {

      setError("");
      setPlan(null);

      const text = injuryInput.trim();

      if (!text) {
        setError("Please enter a body part");
        return;
      }

      setLoading(true);

      const res = await axios.post(`${API_BASE}/injury-safe/generate`, { text });

      setBodyPart(res.data.bodyPart);
      setPlan(res.data.plan);

    } catch (err) {

      const msg = err?.response?.data?.message || "Failed to generate plan";

      setError(msg);
      setPlan(null);
      setBodyPart("");

    }

    setLoading(false);
  };

  return (
    <div className="relative grid lg:grid-cols-3 gap-8">

      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0">

        <motion.div
          className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-emerald-400/15 blur-[180px] rounded-full"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
        />

      </div>

      {/* Input Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
        lg:col-span-1
        bg-white/6 backdrop-blur-2xl
        border border-white/12
        rounded-3xl
        p-8
        shadow-[0_26px_90px_rgba(0,0,0,0.65)]
        "
      >

        <h2 className="text-2xl font-bold mb-4">
          Injury / Pain Area
        </h2>

        <p className="text-white/60 text-sm mb-6">
          Type your pain area (example: “upper back pain”, “knee hurts”).
        </p>

        <input
          type="text"
          value={injuryInput}
          onChange={(e) => setInjuryInput(e.target.value)}
          placeholder="e.g. Upper back pain, Knee hurts"
          className="
          w-full px-4 py-3
          rounded-2xl
          bg-black/30
          border border-white/12
          text-white
          placeholder-white/40
          outline-none
          focus:ring-2 focus:ring-emerald-400
          transition
          "
        />

        {error && (
          <p className="text-red-400 text-sm mt-3">
            {error}
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleGeneratePlan}
          className="
          mt-6 w-full py-3 rounded-2xl
          bg-gradient-to-r from-emerald-500 to-emerald-400
          text-slate-950 font-semibold
          shadow-[0_12px_34px_rgba(34,197,94,0.25)]
          transition
          "
        >
          {loading ? "Generating..." : "Generate Safe Plan"}
        </motion.button>

        {/* Safety note */}
        <div className="mt-6 p-5 rounded-2xl bg-emerald-400/10 border border-emerald-400/20">

          <p className="text-emerald-300 text-xs tracking-[0.22em]">
            SAFETY NOTE
          </p>

          <p className="text-white/70 mt-2 text-sm">
            Stop immediately if pain increases. Consult a professional if pain persists.
          </p>

        </div>

      </motion.div>

      {/* Result Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
        lg:col-span-2
        bg-white/6 backdrop-blur-2xl
        border border-white/12
        rounded-3xl
        p-8
        shadow-[0_26px_90px_rgba(0,0,0,0.65)]
        "
      >

        {!plan ? (

          <div className="h-full flex items-center justify-center text-white/50 text-center">
            Enter a body part to see injury-safe training recommendations.
          </div>

        ) : (

          <>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold mb-6"
            >
              Recommended Plan —{" "}
              <span className="text-emerald-400">{bodyPart}</span>
            </motion.h2>

            <div className="space-y-5 text-white/80">

              <p>
                <strong className="text-white">Avoid:</strong>{" "}
                {plan.avoid.join(", ")}
              </p>

              <p>
                <strong className="text-white">Replace with:</strong>{" "}
                {plan.replace.join(", ")}
              </p>

              <p>
                <strong className="text-white">Warm-up:</strong>{" "}
                {plan.warmup.join(", ")}
              </p>

              <p>
                <strong className="text-white">Intensity:</strong>{" "}
                {plan.intensity}
              </p>

            </div>

          </>

        )}

      </motion.div>

    </div>
  );
}