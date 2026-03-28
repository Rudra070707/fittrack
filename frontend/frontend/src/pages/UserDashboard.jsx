import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/home/login");
          return;
        }

        const res = await axios.get(
          "https://fittrack-weld.vercel.app/api/users/me",
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
        setError("Failed to load dashboard. Please login again.");
        localStorage.clear();
        setTimeout(() => navigate("/home/login"), 1500);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // 🔄 LOADING
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#05080f] text-white/60">
        <div className="animate-pulse text-lg tracking-wide">
          Loading dashboard...
        </div>
      </div>
    );
  }

  // ❌ ERROR
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

        {/* 📊 CARDS */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* 🟢 ACTIVE PLAN */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent"
          >
            <div className="relative p-8 rounded-3xl bg-white/[0.05] border border-white/10 backdrop-blur-xl transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(34,197,94,0.2)]">

              <div className="absolute -top-10 -right-10 w-44 h-44 bg-green-400/20 blur-[140px] rounded-full" />

              <p className="text-white/60 text-sm">Active Plan</p>

              <h2 className="text-3xl font-bold mt-4">
                {plan?.name || "No Plan Selected"}
              </h2>

              <p className="text-green-400 text-lg mt-2">
                ₹{plan?.price || 0} / month
              </p>

              {!plan && (
                <button
                  onClick={() => navigate("/home")}
                  className="
                    mt-6 px-5 py-2 rounded-xl font-semibold
                    bg-green-400 text-black
                    transition-all duration-300
                    hover:bg-green-500 hover:scale-105
                    hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]
                  "
                >
                  Choose Plan
                </button>
              )}

            </div>
          </motion.div>

          {/* 🔵 USER INFO */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent"
          >
            <div className="relative p-8 rounded-3xl bg-white/[0.05] border border-white/10 backdrop-blur-xl transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]">

              <div className="absolute -top-10 -right-10 w-44 h-44 bg-blue-400/20 blur-[140px] rounded-full" />

              <p className="text-white/60 text-sm">Account Info</p>

              <h2 className="text-2xl font-semibold mt-4 break-all">
                {user?.email || "No email"}
              </h2>

              <p className="text-white/50 mt-2 text-sm">
                Member since{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toDateString()
                  : "N/A"}
              </p>

            </div>
          </motion.div>

        </div>

        {/* 🚀 FUTURE SECTION */}
        <div className="mt-12 p-8 rounded-3xl bg-white/[0.03] border border-white/10 text-center text-white/50 backdrop-blur-xl">
          🚀 More features coming soon (progress tracking, workouts, payments)
        </div>

      </div>
    </section>
  );
}