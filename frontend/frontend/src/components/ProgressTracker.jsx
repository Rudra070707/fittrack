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
  const [days, setDays] = useState(30);

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [didWorkout, setDidWorkout] = useState(false);
  const [workoutMinutes, setWorkoutMinutes] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [summary, setSummary] = useState(null);

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

  const loadRange = async () => {
    try {
      const res = await axios.get(`${API_BASE}/progress/range?days=${days}`, {
        headers,
      });
      setEntries(res.data.entries || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadSummary = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/progress/monthly-summary?year=${year}&month=${month}`,
        { headers }
      );
      setSummary(res.data.stats);
    } catch {
      setSummary(null);
    }
  };

  useEffect(() => {
    if (!token) return;
    loadRange();
  }, [days, token]);

  useEffect(() => {
    if (!token) return;
    loadSummary();
  }, [year, month, token]);

  const addEntry = async () => {
    if (!weight && !bodyFat && !didWorkout) {
      return alert("Enter weight/body fat or mark workout.");
    }

    try {
      const payload = {
        date,
        weightKg: weight === "" ? null : Number(weight),
        bodyFat: bodyFat === "" ? null : Number(bodyFat),
        didWorkout,
        workoutMinutes: Number(workoutMinutes || 0),
        workoutType: workoutType || "",
      };

      const res = await axios.post(`${API_BASE}/progress/upsert`, payload, {
        headers,
      });

      if (!res.data.success) return alert("Save failed");

      await loadRange();
      await loadSummary();

      setWeight("");
      setBodyFat("");
      setDidWorkout(false);
      setWorkoutMinutes("");
      setWorkoutType("");

      alert("Progress saved ✅");

    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  const currentStreak = useMemo(() => {
    if (!entries.length) return 0;

    const workoutSet = new Set(
      entries
        .filter((e) => e.didWorkout)
        .map((e) => new Date(e.date).toISOString().slice(0, 10))
    );

    let streak = 0;
    const iter = new Date();

    while (true) {
      const key = iter.toISOString().slice(0, 10);
      if (workoutSet.has(key)) streak++;
      else break;
      iter.setDate(iter.getDate() - 1);
    }

    return streak;
  }, [entries]);

  const latest = entries.length ? entries[entries.length - 1] : null;

  const labels = entries.map((e) =>
    new Date(e.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    })
  );

  const datasets = [
    {
      label: "Weight (kg)",
      data: entries.map((e) => e.weightKg ?? null),
      borderColor: "#22c55e",
      tension: 0.4,
    },
  ];

  const data = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#ffffff" } },
    },
  };

  const bmiValue = useMemo(() => {
    const w = weight !== "" ? weight : latest?.weightKg ?? "";
    if (!w || !height) return null;
    return calculateBMI(w, height);
  }, [weight, latest, height]);

  return (
    <div className="space-y-6">

      {/* Streak Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white/10 p-5 rounded-xl text-center"
      >
        <p className="text-gray-300">Current Streak</p>
        <p className="text-3xl font-bold text-green-400">
          {currentStreak} days
        </p>
      </motion.div>

      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-6">
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

        <input
          type="number"
          placeholder="Body Fat %"
          value={bodyFat}
          onChange={(e) => setBodyFat(e.target.value)}
          className="input"
        />
      </div>

      {/* Save button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        onClick={addEntry}
        className="w-full bg-green-400 text-black font-semibold py-3 rounded-lg"
      >
        Save Entry
      </motion.button>

      {/* BMI */}
      {bmiValue && (
        <div className="grid md:grid-cols-3 gap-4">

          <div className="bg-white/10 p-4 rounded-xl text-center">
            <p>BMI</p>
            <p className="text-2xl text-green-400">{bmiValue}</p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl text-center">
            <p>Status</p>
            <p>{bmiStatus(bmiValue)}</p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl text-center">
            <p>Last Saved</p>
            <p>
              {latest
                ? new Date(latest.date).toLocaleDateString("en-IN")
                : "—"}
            </p>
          </div>

        </div>
      )}

      {/* Chart */}
      {entries.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 rounded-xl p-4 h-[380px]"
        >
          <Line data={data} options={options} />
        </motion.div>
      ) : (
        <div className="bg-white/10 p-5 text-center text-gray-300">
          No progress saved yet.
        </div>
      )}

    </div>
  );
}