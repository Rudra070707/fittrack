import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 🔥 NEW IMPORT (VERY IMPORTANT)
import { API_BASE, getUserToken } from "../api";

export default function UserDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 NEW: dummy stats (replace later with API)
  const [stats] = useState({
    workouts: 18,
    calories: 5400,
    activeDays: 12,
  });

  // 🔥 NEW: dummy progress data
  const progressData = [60, 70, 65, 80, 75, 90];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getUserToken();

        console.log("TOKEN:", token);
        console.log("API BASE:", API_BASE);

        if (!token) {
          navigate("/home/login");
          return;
        }

        const res = await axios.get(
          `${API_BASE}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data.user || null);
        setPlan(res.data.plan || null);

      } catch (err) {
        console.error("Dashboard fetch error:", err);

        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");

          setTimeout(() => {
            localStorage.removeItem("token");
            navigate("/home/login");
          }, 1500);

        } else {
          setError("Failed to load dashboard. Please try again.");
        }

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05080f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white/60 tracking-wide">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#05080f] text-red-400">
        {error}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#05080f] text-white px-6 py-16 relative overflow-hidden">

      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-20 w-[450px] h-[450px] bg-green-400/10 blur-[160px] rounded-full" />
        <div className="absolute -bottom-40 right-20 w-[450px] h-[450px] bg-emerald-400/10 blur-[160px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* 🧠 HEADER */}
        <div className="mb-12">
          <p className="text-green-400 text-xs tracking-[0.3em] font-semibold">
            USER DASHBOARD
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-3 tracking-tight">
            Welcome,{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              {user?.name || "User"}
            </span>{" "}
            👋
          </h1>

          <p className="text-white/60 mt-3">
            Track your fitness journey and membership details.
          </p>
        </div>

        {/* 🔥 STATS CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Workouts", value: stats.workouts },
            { label: "Calories Burned", value: stats.calories },
            { label: "Active Days", value: stats.activeDays },
          ].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:shadow-[0_0_25px_rgba(34,197,94,0.2)] transition"
            >
              <p className="text-white/60 text-sm">{s.label}</p>
              <h2 className="text-2xl font-bold mt-2">{s.value}</h2>
            </motion.div>
          ))}
        </div>

        {/* 📊 CARDS */}
        <div className="grid md:grid-cols-2 gap-8">

          <motion.div whileHover={{ scale: 1.04 }} className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent">
            <div className="relative p-8 rounded-3xl bg-white/[0.05] border border-white/10 backdrop-blur-xl">
              <p className="text-white/60 text-sm">Active Plan</p>
              <h2 className="text-3xl font-bold mt-4">{plan?.name || "No Plan Selected"}</h2>
              <p className="text-green-400 text-lg mt-2">₹{plan?.price || 0} / month</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent">
            <div className="relative p-8 rounded-3xl bg-white/[0.05] border border-white/10 backdrop-blur-xl">
              <p className="text-white/60 text-sm">Account Info</p>
              <h2 className="text-2xl font-semibold mt-4 break-all">{user?.email || "No email"}</h2>
              <p className="text-white/50 mt-2 text-sm">
                Member since{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toDateString()
                  : "N/A"}
              </p>
            </div>
          </motion.div>

        </div>

        {/* 🔥 WEEKLY PROGRESS (ULTIMATE VERSION) */}
        <div className="mt-12 p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
          <h3 className="text-xl font-bold mb-6">Weekly Progress</h3>

          <div className="flex items-end gap-4 h-52">

            {progressData.map((val, i) => (

              <div
                key={i}
                className="flex-1 h-full relative flex items-end justify-center group hover:-translate-y-1 transition"
              >

                {/* track */}
                <div className="absolute bottom-0 w-full h-full bg-white/5 rounded-xl" />

                {/* bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="
                    absolute bottom-0 w-full
                    bg-gradient-to-t from-emerald-500 via-green-400 to-emerald-300
                    rounded-t-2xl rounded-b-xl
                    shadow-[0_10px_30px_rgba(34,197,94,0.35)]
                  "
                />

                {/* tooltip */}
                <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition text-xs bg-black/70 px-2 py-1 rounded text-emerald-300">
                  {val}%
                </div>

                {/* day */}
                <div className="absolute -bottom-6 text-xs text-white/40">
                  Day {i + 1}
                </div>

              </div>

            ))}

          </div>
        </div>

        {/* 🔥 RECENT ACTIVITY */}
        <div className="mt-12 p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>

          <ul className="space-y-3 text-white/70 text-sm">
            <li>✅ Completed workout session</li>
            <li>🔥 Burned 500 calories</li>
            <li>📅 Active for 7 days streak</li>
          </ul>
        </div>

        {/* 🚀 FUTURE */}
        <div className="mt-12 p-8 rounded-3xl bg-white/[0.03] border border-white/10 text-center text-white/50 backdrop-blur-xl">
          🚀 More features coming soon (progress tracking, workouts, payments)
        </div>

      </div>
    </section>
  );
}