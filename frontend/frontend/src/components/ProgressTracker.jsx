import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ProgressTracker() {
  // ✅ Normalize token (supports "Bearer xxx" OR "xxx")
  const rawToken = localStorage.getItem("token");
  const token = rawToken?.startsWith("Bearer ") ? rawToken.split(" ")[1] : rawToken;

  const headers = useMemo(
    () => ({
      Authorization: token ? `Bearer ${token}` : ""
    }),
    [token]
  );

  const [entries, setEntries] = useState([]);
  const [days, setDays] = useState(30);

  // Inputs
  const [height, setHeight] = useState(""); // only for BMI calculation
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [didWorkout, setDidWorkout] = useState(false);
  const [workoutMinutes, setWorkoutMinutes] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  // Monthly summary
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
      const res = await axios.get(
        `http://localhost:5000/api/progress/range?days=${days}`,
        { headers }
      );
      setEntries(res.data.entries || []);
    } catch (err) {
      console.error("loadRange error:", err?.response?.data || err.message);
    }
  };

  const loadSummary = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/progress/monthly-summary?year=${year}&month=${month}`,
        { headers }
      );
      setSummary(res.data.stats);
    } catch (err) {
      console.error("loadSummary error:", err?.response?.data || err.message);
      setSummary(null);
    }
  };

  // ✅ include token so it loads right after login
  useEffect(() => {
    if (!token) return;
    loadRange();
    // eslint-disable-next-line
  }, [days, token]);

  useEffect(() => {
    if (!token) return;
    loadSummary();
    // eslint-disable-next-line
  }, [year, month, token]);

  const addEntry = async () => {
    if (!weight && !bodyFat && !didWorkout) {
      return alert("Enter weight/body fat or mark workout to save progress.");
    }
    if (!token) return alert("Please login again (token missing)");

    try {
      const payload = {
        date,
        weightKg: weight === "" ? null : Number(weight),
        bodyFat: bodyFat === "" ? null : Number(bodyFat),
        didWorkout,
        workoutMinutes: Number(workoutMinutes || 0),
        workoutType: workoutType || ""
      };

      const res = await axios.post(
        "http://localhost:5000/api/progress/upsert",
        payload,
        { headers }
      );

      if (!res.data.success) return alert("Save failed");

      await loadRange();
      await loadSummary();

      // reset inputs (keep height)
      setWeight("");
      setBodyFat("");
      setDidWorkout(false);
      setWorkoutMinutes("");
      setWorkoutType("");

      alert("Progress saved ✅");
    } catch (err) {
      console.error("addEntry error:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Save failed (check progress routes / auth)");
    }
  };

  // ✅ Streak calculation (consecutive workout days ending today)
  const currentStreak = useMemo(() => {
    if (!entries.length) return 0;

    const workoutSet = new Set(
      entries
        .filter((e) => e.didWorkout)
        .map((e) => {
          const d = new Date(e.date);
          d.setHours(0, 0, 0, 0);
          return d.toISOString().slice(0, 10);
        })
    );

    let streak = 0;
    const iter = new Date();
    iter.setHours(0, 0, 0, 0);

    while (true) {
      const key = iter.toISOString().slice(0, 10);
      if (workoutSet.has(key)) streak++;
      else break;
      iter.setDate(iter.getDate() - 1);
    }

    return streak;
  }, [entries]);

  const latest = entries.length ? entries[entries.length - 1] : null;

  // Labels for chart
  const labels = useMemo(() => {
    return entries.map((e) =>
      new Date(e.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
    );
  }, [entries]);

  // Datasets (DB driven)
  const datasets = useMemo(() => {
    const ds = [];

    // Weight
    if (entries.some((e) => typeof e.weightKg === "number")) {
      ds.push({
        label: "Weight (kg)",
        data: entries.map((e) => (typeof e.weightKg === "number" ? e.weightKg : null)),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.15)",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: "#22c55e"
      });
    }

    // Body Fat
    if (entries.some((e) => typeof e.bodyFat === "number")) {
      ds.push({
        label: "Body Fat %",
        data: entries.map((e) => (typeof e.bodyFat === "number" ? e.bodyFat : null)),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.15)",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: "#3b82f6"
      });
    }

    // If nothing exists yet, show weight line with nulls (avoids chart crash)
    if (ds.length === 0) {
      ds.push({
        label: "Weight (kg)",
        data: entries.map(() => null),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.15)",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: "#22c55e"
      });
    }

    return ds;
  }, [entries]);

  const data = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#ffffff", font: { size: 14 } }
      }
    },
    scales: {
      x: {
        ticks: { color: "#ffffff" },
        grid: { color: "rgba(255,255,255,0.15)" }
      },
      y: {
        beginAtZero: false,
        ticks: { color: "#ffffff" },
        grid: { color: "rgba(255,255,255,0.15)" }
      }
    }
  };

  const bmiValue = useMemo(() => {
    const w = weight !== "" ? weight : (latest?.weightKg ?? "");
    if (!w || !height) return null;
    return calculateBMI(w, height);
  }, [weight, latest, height]);

  return (
    <div className="space-y-6">

      {/* Top Controls */}
      <div className="grid md:grid-cols-3 gap-4">
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="w-full bg-black/20 border border-white/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400"
        >
          <option value={7}>Last 7 days</option>
          <option value={14}>Last 14 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-black/20 border border-white/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400"
        />

        <div className="bg-white/10 p-4 rounded-xl text-center">
          <p className="text-gray-300">Current Streak</p>
          <p className="text-2xl font-bold text-green-400">{currentStreak} days</p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-6">
        <input
          type="number"
          placeholder="Height (cm) (for BMI)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full bg-black/20 border border-white/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400"
        />

        <input
          type="number"
          step="0.1"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full bg-black/20 border border-white/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400"
        />

        <input
          type="number"
          step="0.1"
          placeholder="Body Fat (%)"
          value={bodyFat}
          onChange={(e) => setBodyFat(e.target.value)}
          className="w-full bg-black/20 border border-white/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Workout Inputs */}
      <div className="grid md:grid-cols-3 gap-6">
        <label className="flex items-center gap-3 bg-black/20 border border-white/30 rounded-lg px-4 py-3">
          <input
            type="checkbox"
            checked={didWorkout}
            onChange={(e) => setDidWorkout(e.target.checked)}
          />
          <span className="text-white">Did Workout</span>
        </label>

        <input
          type="number"
          placeholder="Workout Minutes"
          value={workoutMinutes}
          onChange={(e) => setWorkoutMinutes(e.target.value)}
          className="w-full bg-black/20 border border-white/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400"
        />

        <input
          type="text"
          placeholder="Workout Type (Push/Pull/Legs...)"
          value={workoutType}
          onChange={(e) => setWorkoutType(e.target.value)}
          className="w-full bg-black/20 border border-white/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Button */}
      <button
        onClick={addEntry}
        className="w-full bg-green-400 text-black font-semibold py-3 rounded-lg hover:bg-green-500 transition"
      >
        Save Entry & Update Charts
      </button>

      {/* Monthly Summary */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xl font-semibold">Monthly Fitness Summary</p>
            <p className="text-gray-300 text-sm">
              Avg Weight: {summary?.avgWeight != null ? `${summary.avgWeight.toFixed(1)} kg` : "—"} •{" "}
              Weight Change: {summary?.weightChange != null ? `${summary.weightChange.toFixed(1)} kg` : "—"} •{" "}
              Avg Body Fat: {summary?.avgBodyFat != null ? `${summary.avgBodyFat.toFixed(1)}%` : "—"} •{" "}
              Body Fat Change: {summary?.bodyFatChange != null ? `${summary.bodyFatChange.toFixed(1)}%` : "—"}
            </p>
          </div>

          <div className="flex gap-3">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="bg-black/20 border border-white/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-green-400"
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={i} value={i + 1}>
                  {new Date(2000, i, 1).toLocaleString("en-IN", { month: "long" })}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-28 bg-black/20 border border-white/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-5">
          <div className="bg-white/10 p-4 rounded-xl text-center">
            <p className="text-gray-300">Workouts</p>
            <p className="text-2xl font-bold text-green-400">{summary?.workoutDays ?? "—"}</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl text-center">
            <p className="text-gray-300">Total Minutes</p>
            <p className="text-2xl font-bold text-green-400">{summary?.totalMinutes ?? "—"}</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl text-center">
            <p className="text-gray-300">Best Streak</p>
            <p className="text-2xl font-bold text-green-400">{summary?.bestStreak ?? "—"} days</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl text-center">
            <p className="text-gray-300">Last Weight</p>
            <p className="text-2xl font-bold text-green-400">
              {summary?.lastWeight != null ? `${summary.lastWeight} kg` : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* BMI Cards */}
      {bmiValue && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/10 p-4 rounded-xl text-center">
            <p className="text-gray-300">BMI</p>
            <p className="text-2xl font-bold text-green-400">{bmiValue}</p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl text-center">
            <p className="text-gray-300">Status</p>
            <p className="text-xl font-semibold">{bmiStatus(bmiValue)}</p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl text-center">
            <p className="text-gray-300">Last Saved</p>
            <p className="font-medium">
              {latest ? new Date(latest.date).toLocaleDateString("en-IN") : "—"}
            </p>
          </div>
        </div>
      )}

      {/* Chart */}
      {entries.length > 0 ? (
        <div className="mt-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 h-[380px]">
          <Line data={data} options={options} />
        </div>
      ) : (
        <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-center text-gray-300">
          No progress saved yet. Add your first entry ✨
        </div>
      )}
    </div>
  );
}
