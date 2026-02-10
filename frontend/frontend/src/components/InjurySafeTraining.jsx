import { useState } from "react";
import axios from "axios";

export default function InjurySafeTraining() {
  const [injuryInput, setInjuryInput] = useState("");
  const [plan, setPlan] = useState(null);
  const [bodyPart, setBodyPart] = useState("");
  const [error, setError] = useState("");

  const handleGeneratePlan = async () => {
    try {
      setError("");
      setPlan(null);

      const text = injuryInput.trim();
      if (!text) {
        setError("Please enter a body part");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/injury-safe/generate", { text });

      setBodyPart(res.data.bodyPart);
      setPlan(res.data.plan);
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to generate plan";
      setError(msg);
      setPlan(null);
      setBodyPart("");
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Input panel */}
      <div className="lg:col-span-1 bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
        <h2 className="text-2xl font-bold mb-4">Injury / Pain Area</h2>

        <p className="text-gray-300 text-sm mb-6">
          Type your pain area (example: “upper back pain”, “knee hurts”).
        </p>

        <input
          type="text"
          value={injuryInput}
          onChange={(e) => setInjuryInput(e.target.value)}
          placeholder="e.g. Upper back pain, Knee hurts"
          className="w-full bg-black/30 border border-white/15 rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          onClick={handleGeneratePlan}
          className="w-full bg-green-400 text-black font-semibold py-3 rounded-xl hover:bg-green-500 transition"
        >
          Generate Safe Plan
        </button>

        <div className="mt-6 p-5 rounded-2xl bg-green-400/10 border border-green-400/20">
          <p className="text-green-300 text-xs tracking-[0.22em]">SAFETY NOTE</p>
          <p className="text-gray-200 mt-2 text-sm">
            Stop immediately if pain increases. Consult a professional if pain persists.
          </p>
        </div>
      </div>

      {/* Result panel */}
      <div className="lg:col-span-2 bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-[0_25px_80px_rgba(0,0,0,0.65)]">
        {!plan ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-center">
            Enter a body part to see injury-safe training recommendations.
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">
              Recommended Plan — <span className="text-green-400">{bodyPart}</span>
            </h2>

            <div className="space-y-5 text-gray-200">
              <p><strong>Avoid:</strong> {plan.avoid.join(", ")}</p>
              <p><strong>Replace with:</strong> {plan.replace.join(", ")}</p>
              <p><strong>Warm-up:</strong> {plan.warmup.join(", ")}</p>
              <p><strong>Intensity:</strong> {plan.intensity}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
