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
    <div className="relative grid lg:grid-cols-3 gap-10">

      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0">

        <motion.div
          className="absolute -top-40 -left-40 w-[560px] h-[560px] bg-emerald-400/20 blur-[200px] rounded-full"
          animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
          transition={{ duration: 16, repeat: Infinity }}
        />

        {/* 🔥 ADDED EXTRA DEPTH GLOW */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-400/10 blur-[180px] rounded-full"/>

        {/* 🔥 CENTER LIGHT */}
        <div className="absolute left-1/2 top-1/2 w-[400px] h-[200px] -translate-x-1/2 -translate-y-1/2 bg-emerald-400/10 blur-[120px]" />

      </div>

      {/* Input Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
        group relative
        lg:col-span-1
        bg-white/6 backdrop-blur-2xl
        border border-white/12
        rounded-3xl
        p-8
        shadow-[0_30px_100px_rgba(0,0,0,0.75)]
        "
      >

        {/* 🔥 INNER LIGHT */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent rounded-3xl"/>

        {/* 🔥 HOVER GLOW */}
        <div className="pointer-events-none absolute -inset-3 opacity-0 group-hover:opacity-100 bg-emerald-400/20 blur-2xl rounded-3xl transition"/>

        <h2 className="text-2xl font-bold mb-4 tracking-wide">
          Injury / Pain Area
        </h2>

        <p className="text-white/60 text-sm mb-6 leading-relaxed">
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
          bg-black/40
          border border-white/12
          text-white
          placeholder-white/40
          outline-none
          focus:ring-2 focus:ring-emerald-400
          focus:border-emerald-400/40
          focus:shadow-[0_0_30px_rgba(34,197,94,0.5)]
          transition-all duration-300
          "
        />

        {error && (
          <p className="text-red-400 text-sm mt-3">
            {error}
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleGeneratePlan}
          className="
          mt-6 w-full py-3 rounded-2xl
          bg-gradient-to-r from-emerald-500 via-emerald-400 to-green-400
          text-slate-950 font-semibold tracking-wide
          shadow-[0_15px_40px_rgba(34,197,94,0.35)]
          hover:shadow-[0_0_60px_rgba(34,197,94,0.9)]
          transition-all duration-300
          "
        >
          {loading ? "Generating..." : "Generate Safe Plan"}
        </motion.button>

        {/* Safety note */}
        <div className="mt-6 p-5 rounded-2xl bg-emerald-400/10 border border-emerald-400/30 backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.15)]">

          <p className="text-emerald-300 text-xs tracking-[0.25em]">
            SAFETY NOTE
          </p>

          <p className="text-white/70 mt-2 text-sm leading-relaxed">
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
        group relative
        lg:col-span-2
        bg-white/6 backdrop-blur-2xl
        border border-white/12
        rounded-3xl
        p-8
        shadow-[0_30px_100px_rgba(0,0,0,0.75)]
        "
      >

        {/* 🔥 GLOW */}
        <div className="pointer-events-none absolute -inset-3 opacity-0 group-hover:opacity-100 bg-emerald-400/20 blur-3xl rounded-3xl transition"/>

        {!plan ? (

          <div className="h-full flex flex-col items-center justify-center text-white/50 text-center gap-3">

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl opacity-40"
            >
              🧠
            </motion.div>

            <p className="max-w-md leading-relaxed">
              Enter a body part to generate a personalized injury-safe training plan.
            </p>

          </div>

        ) : (

          <>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold mb-6 tracking-wide"
            >
              Recommended Plan —{" "}
              <span className="text-emerald-400 drop-shadow-[0_0_12px_rgba(34,197,94,0.7)]">
                {bodyPart}
              </span>
            </motion.h2>

            <div className="space-y-6 text-white/80">

              <motion.p whileHover={{ scale: 1.02 }}>
                <strong className="text-white">Avoid:</strong>{" "}
                {plan.avoid.join(", ")}
              </motion.p>

              <motion.p whileHover={{ scale: 1.02 }}>
                <strong className="text-white">Replace with:</strong>{" "}
                {plan.replace.join(", ")}
              </motion.p>

              <motion.p whileHover={{ scale: 1.02 }}>
                <strong className="text-white">Warm-up:</strong>{" "}
                {plan.warmup.join(", ")}
              </motion.p>

              <motion.p whileHover={{ scale: 1.02 }}>
                <strong className="text-white">Intensity:</strong>{" "}
                {plan.intensity}
              </motion.p>

            </div>

          </>

        )}

      </motion.div>

    </div>
  );
}