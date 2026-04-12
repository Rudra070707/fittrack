import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CountUp from "react-countup";

// 📊 CHARTS
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

// 🔥 API
import { API_BASE, getUserToken } from "../api";

export default function UserDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [stats] = useState({
    workouts: 18,
    calories: 5400,
    activeDays: 12,
  });

  const progressData = [60, 70, 65, 80, 75, 90];

  // 📊 NEW CHART DATA
  const chartData = [
    { day: "Mon", progress: 60, calories: 400 },
    { day: "Tue", progress: 70, calories: 520 },
    { day: "Wed", progress: 65, calories: 480 },
    { day: "Thu", progress: 80, calories: 600 },
    { day: "Fri", progress: 75, calories: 550 },
    { day: "Sat", progress: 90, calories: 700 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getUserToken();

        if (!token) {
          navigate("/home/login");
          return;
        }

        const res = await axios.get(`${API_BASE}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user || null);
        setPlan(res.data.plan || null);
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
          setTimeout(() => {
            localStorage.removeItem("token");
            navigate("/home/login");
          }, 1500);
        } else {
          setError("Failed to load dashboard.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05080f] relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-[700px] h-[700px] bg-indigo-500/20 blur-[160px] top-[-150px] left-[-150px]" />
          <div className="absolute w-[700px] h-[700px] bg-green-500/20 blur-[160px] bottom-[-150px] right-[-150px]" />
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white/60 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#05080f] text-red-400 text-lg">
        {error}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#05080f] text-white px-6 md:px-14 py-20 relative overflow-hidden">

      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[700px] h-[700px] bg-indigo-500/20 blur-[160px] top-[-150px] left-[-150px]" />
        <div className="absolute w-[700px] h-[700px] bg-green-500/20 blur-[160px] bottom-[-150px] right-[-150px]" />

        <motion.div
          className="absolute inset-0 opacity-50"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(16,185,129,0.25), transparent 60%)",
              "radial-gradient(circle at 80% 20%, rgba(99,102,241,0.25), transparent 60%)",
              "radial-gradient(circle at 30% 80%, rgba(16,185,129,0.25), transparent 60%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-16">
          <motion.div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 backdrop-blur-md mb-6">
            🚀 Fitness Dashboard
          </motion.div>

          <p className="text-green-400 text-xs tracking-[0.4em] font-semibold">
            USER DASHBOARD
          </p>

          <h1 className="text-5xl font-extrabold mt-4">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
              {user?.name || "User"}
            </span>
          </h1>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { label: "Workouts", value: stats.workouts },
            { label: "Calories", value: stats.calories },
            { label: "Active Days", value: stats.activeDays },
          ].map((s, i) => (
            <motion.div key={i} whileHover={{ y: -12, scale: 1.05 }} className="card text-center">
              <p className="text-white/60 text-sm">{s.label}</p>
              <h2 className="text-4xl font-bold text-green-400 mt-2">
                <CountUp end={s.value} duration={2} />
              </h2>
            </motion.div>
          ))}
        </div>

        {/* 📊 CHARTS */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">

          {/* LINE */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-4">Progress Trend</h3>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="progress"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* BAR */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-4">Calories Burned</h3>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />

                <Bar dataKey="calories" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* ORIGINAL PROGRESS (UNCHANGED) */}
        <div className="mt-20 card p-12 relative overflow-hidden">
          <h3 className="text-2xl font-bold mb-12">Weekly Progress</h3>

          <div className="flex items-end gap-6 h-64">
            {progressData.map((val, i) => (
              <div key={i} className="flex-1 relative group h-full">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="absolute bottom-0 w-full rounded-t-2xl bg-gradient-to-t from-green-500 to-emerald-300"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}