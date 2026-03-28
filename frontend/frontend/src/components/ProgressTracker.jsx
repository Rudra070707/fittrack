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

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API_BASE}/progress/range?days=30`, {
          headers,
        });
        setEntries(res.data.entries || []);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) load();
  }, [token]);

  const addEntry = async () => {
    if (!weight && !bodyFat && !didWorkout) {
      return alert("Enter data first");
    }

    try {
      await axios.post(
        `${API_BASE}/progress/upsert`,
        {
          weightKg: weight,
          bodyFat,
          didWorkout,
        },
        { headers }
      );

      alert("Saved ✅");

    } catch {
      alert("Error ❌");
    }
  };

  const labels = entries.map((e) =>
    new Date(e.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    })
  );

  const data = {
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

  const bmiValue = calculateBMI(weight, height);

  return (
    <div className="space-y-10">

      {/* 🔥 STREAK CARD */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-transparent"
      >
        <div className="p-6 rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 text-center transition group-hover:shadow-[0_0_40px_rgba(34,197,94,0.2)]">
          <p className="text-white/60 text-sm">Current Streak</p>
          <p className="text-5xl font-extrabold text-emerald-400">🔥</p>
          <p className="text-white/50 text-sm">Keep going</p>
        </div>
      </motion.div>

      {/* 🧾 INPUTS */}
      <div className="grid md:grid-cols-3 gap-6">

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
            className="
              px-4 py-3 rounded-2xl
              bg-black/30 border border-white/10
              text-white
              focus:ring-2 focus:ring-emerald-400
              outline-none transition
              hover:border-green-400/40
            "
          />
        ))}

      </div>

      {/* 🚀 SAVE BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={addEntry}
        className="
          w-full py-3 rounded-2xl font-semibold
          bg-gradient-to-r from-emerald-500 to-green-400
          text-black
          transition
          hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]
        "
      >
        Save Entry
      </motion.button>

      {/* 📊 BMI */}
      {bmiValue && (
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-5 text-center backdrop-blur-xl">
            <p className="text-white/60">BMI</p>
            <p className="text-2xl font-bold text-emerald-400">{bmiValue}</p>
          </div>

          <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-5 text-center backdrop-blur-xl">
            <p className="text-white/60">Status</p>
            <p>{bmiStatus(bmiValue)}</p>
          </div>

        </div>
      )}

      {/* 📈 CHART */}
      {entries.length > 0 ? (
        <motion.div
          className="bg-white/[0.05] border border-white/10 rounded-3xl p-6 h-[400px] backdrop-blur-xl"
        >
          <Line data={data} />
        </motion.div>
      ) : (
        <div className="text-center text-white/60">
          No progress yet
        </div>
      )}

    </div>
  );
}