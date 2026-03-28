import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserDashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://fittrack-weld.vercel.app/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data.user);
        setPlan(res.data.plan);

      } catch (err) {

        console.error(err);
        navigate("/home/login");

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white/60">
        Loading dashboard...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#05080f] text-white px-6 py-16 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-20 w-[400px] h-[400px] bg-green-400/10 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 right-20 w-[400px] h-[400px] bg-emerald-400/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">
          <p className="text-green-400 text-xs tracking-[0.3em] font-semibold">
            USER DASHBOARD
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-3">
            Welcome, {user?.name || "User"} 👋
          </h1>

          <p className="text-white/60 mt-3">
            Track your fitness journey and membership details.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* PLAN */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-3xl bg-white/[0.05] border border-white/10 backdrop-blur-xl"
          >
            <p className="text-white/60 text-sm">Active Plan</p>

            <h2 className="text-3xl font-bold mt-4">
              {plan?.name || "No Plan Selected"}
            </h2>

            <p className="text-green-400 text-lg mt-2">
              ₹{plan?.price || 0} / month
            </p>
          </motion.div>

          {/* USER */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-3xl bg-white/[0.05] border border-white/10 backdrop-blur-xl"
          >
            <p className="text-white/60 text-sm">Account Info</p>

            <h2 className="text-2xl font-semibold mt-4">
              {user?.email}
            </h2>

            <p className="text-white/50 mt-2 text-sm">
              Member since {new Date(user?.createdAt).toDateString()}
            </p>
          </motion.div>

        </div>

        {/* FUTURE */}
        <div className="mt-12 p-8 rounded-3xl bg-white/[0.03] border border-white/10 text-center text-white/50">
          🚀 More features coming soon (progress tracking, workouts, payments)
        </div>

      </div>

    </section>
  );
}