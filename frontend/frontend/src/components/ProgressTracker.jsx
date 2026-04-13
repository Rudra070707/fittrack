import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { API_BASE } from "../api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ProgressTracker() {

  const rawToken = localStorage.getItem("token");
  const token = rawToken?.startsWith("Bearer ")
    ? rawToken.split(" ")[1]
    : rawToken;

  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const [entries, setEntries] = useState([]);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [didWorkout, setDidWorkout] = useState(false);

  // ✅ NEW STATES (NO UI CHANGE)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculateBMI = (w, h) => {
    const heightMeters = Number(h) / 100;
    if (!heightMeters || !w) return null;
    return (Number(w) / (heightMeters * heightMeters)).toFixed(1);
  };

  const bmiStatus = (bmi) => {
    const v = Number(bmi);
    if (v < 18.5) return "Underweight";
    if (v < 25) return "Normal";
    if (v < 30) return "Overweight";
    return "Obese";
  };

  // ✅ LOAD FUNCTION (EXTRACTED)
  const loadEntries = async () => {
    try {
      const res = await axios.get(`${API_BASE}/progress/range?days=30`, {
        headers,
      });
      setEntries(res.data.entries || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load progress");
    }
  };

  useEffect(() => {
    if (token) loadEntries();
  }, [token]);

  const addEntry = async () => {

    if (!weight && !bodyFat && !didWorkout) {
      setError("Enter at least one field");
      return;
    }

    setError("");

    try {

      setLoading(true);

      await axios.post(
        `${API_BASE}/progress/upsert`,
        {
          weightKg: weight || null,
          bodyFat: bodyFat || null,
          didWorkout,
          date: new Date(), // ✅ IMPORTANT FIX
        },
        { headers }
      );

      // ✅ REFETCH AFTER SAVE
      await loadEntries();

      // ✅ RESET INPUTS
      setWeight("");
      setBodyFat("");
      setDidWorkout(false);

    } catch (err) {

      console.error(err);

      setError(
        err?.response?.data?.message ||
        "Error saving progress"
      );

    } finally {
      setLoading(false);
    }
  };

  const labels = entries.map((e) =>
    new Date(e.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    })
  );

  const weightData = {
    labels,
    datasets: [
      {
        label: "Weight (kg)",
        data: entries.map((e) => e.weightKg),
        borderColor: "#22c55e",
        tension: 0.4,
      },
    ],
  };

  const bodyFatData = {
    labels,
    datasets: [
      {
        label: "Body Fat (%)",
        data: entries.map((e) => e.bodyFat),
        borderColor: "#38bdf8",
        tension: 0.4,
      },
    ],
  };

  const workoutData = {
    labels,
    datasets: [
      {
        label: "Workout Done",
        data: entries.map((e) => (e.didWorkout ? 1 : 0)),
        borderColor: "#facc15",
        tension: 0.3,
      },
    ],
  };

  const bmiValue = calculateBMI(weight, height);

  return (
    <div className="space-y-12">

      {/* 🔥 STREAK CARD */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-transparent"
      >
        <div className="
          p-8 rounded-3xl
          bg-white/[0.05] backdrop-blur-xl
          border border-white/10
          text-center
          transition
          group-hover:shadow-[0_0_50px_rgba(34,197,94,0.25)]
        ">
          <p className="text-white/60 text-sm tracking-wide">Consistency</p>
          <p className="text-6xl font-extrabold text-emerald-400">🔥</p>
          <p className="text-white/50 text-sm">Stay consistent daily</p>
        </div>
      </motion.div>

      {/* 🧾 INPUTS */}
      <div className="grid md:grid-cols-3 gap-8">

        {[{
          val: height,
          set: setHeight,
          ph: "Height (cm)"
        },{
          val: weight,
          set: setWeight,
          ph: "Weight (kg)"
        },{
          val: bodyFat,
          set: setBodyFat,
          ph: "Body Fat %"
        }].map((f, i) => (
          <input
            key={i}
            type="number"
            placeholder={f.ph}
            value={f.val}
            onChange={(e) => f.set(e.target.value)}
            className="px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-emerald-400 outline-none"
          />
        ))}

      </div>

      {/* ✅ ERROR UI (NEW) */}
      {error && (
        <p className="text-red-400 text-sm">
          {error}
        </p>
      )}

      {/* 🚀 SAVE */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={addEntry}
        disabled={loading}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-400 text-black font-semibold disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Entry"}
      </motion.button>

      {/* 📊 BMI */}
      {bmiValue && (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card text-center">
            <p>BMI</p>
            <p className="text-3xl text-emerald-400">{bmiValue}</p>
          </div>
          <div className="card text-center">
            <p>Status</p>
            <p>{bmiStatus(bmiValue)}</p>
          </div>
        </div>
      )}

      {/* 📈 CHARTS */}
      {entries.length > 0 ? (
        <div className="space-y-10">

          <div className="card">
            <h3 className="mb-4">Weight Progress</h3>
            <Line data={weightData} />
          </div>

          <div className="card">
            <h3 className="mb-4">Body Fat</h3>
            <Line data={bodyFatData} />
          </div>

          <div className="card">
            <h3 className="mb-4">Workout Consistency</h3>
            <Line data={workoutData} />
          </div>

        </div>
      ) : (
        <div className="text-center text-white/60">
          No progress yet 🚀
        </div>
      )}

    </div>
  );
}