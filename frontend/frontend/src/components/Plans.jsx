import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Plans = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState("");

  const BASE_URL =
  (import.meta.env.VITE_API_URL?.includes("/api")
    ? import.meta.env.VITE_API_URL
    : `${import.meta.env.VITE_API_URL}/api`) ||
  "https://fittrack-otl5.onrender.com/api";
  const isLoggedIn = useMemo(() => {
    return !!localStorage.getItem("token");
  }, []);

  useEffect(() => {

    const run = async () => {

      try {
        setLoading(true);
        setError("");

        console.log("🚀 Fetching plans from:", `${BASE_URL}/plans/all`);

        // ✅ FIXED API
        const res = await axios.get(`${BASE_URL}/plans/all`);

        console.log("✅ FULL RESPONSE:", res);
        console.log("✅ RESPONSE DATA:", res.data);

        if (res.data?.success) {
          setPlans(res.data.plans || []);
        } else {
          console.warn("⚠️ API success false");
          setPlans([]);
          setError("No plans returned from server");
        }

      } catch (err) {
        console.error("❌ Plan fetch error:", err);
        console.error("❌ Response:", err.response);

        setPlans([]);
        setError(
          err.response?.data?.message ||
          err.message ||
          "Failed to load plans"
        );

      } finally {
        setLoading(false);
      }

    };

    run();

  }, []);

  const formatINR = (num) => Number(num || 0).toLocaleString("en-IN");

  const choosePlan = async (plan) => {

    setError("");

    if (!isLoggedIn) {
      navigate("/home/login", {
        state: {
          backgroundLocation: location,
          selectedPlan: {
            plan: plan.name,
            planCode: plan.code,
          },
        },
      });
      return;
    }

    try {

      setProcessingId(plan._id);

      const token = localStorage.getItem("token");

      console.log("🚀 Selecting plan:", plan.code);

      // ✅ FIXED URL + ROUTE
      const res = await axios.post(
        `${BASE_URL}/plans/select-plan`,
        { planCode: plan.code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ SELECT PLAN RESPONSE:", res.data);

      alert("✅ Plan activated successfully");
      navigate("/home/dashboard");

    } catch (err) {
      console.error("❌ Plan select error:", err);
      setError(err.response?.data?.message || "Failed to select plan");
    } finally {
      setProcessingId(null);
    }

  };

  return (
    <section className="relative py-36 px-6 text-white overflow-hidden bg-transparent">

      {/* 🌌 GLOBAL BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[700px] h-[700px] bg-indigo-500/10 blur-[160px] top-[-150px] left-[-150px]" />
        <div className="absolute w-[700px] h-[700px] bg-green-500/10 blur-[160px] bottom-[-150px] right-[-150px]" />

        <div className="absolute w-[600px] h-[600px] bg-cyan-400/10 blur-[180px] top-[30%] left-[40%]" />
      </div>

      <div className="pointer-events-none absolute -top-32 left-0 w-full h-32 bg-gradient-to-b from-[#05070c] to-transparent opacity-60" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05070c] to-transparent opacity-60" />

      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-green-400/10 blur-[160px] rounded-full pointer-events-none"
        animate={{ x: [0, 80, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 right-1/4 w-[700px] h-[300px] bg-emerald-400/10 blur-[160px] rounded-full pointer-events-none"
        animate={{ x: [0, -80, 0] }}
        transition={{ duration: 22, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center">

        <motion.p
          className="text-green-400 tracking-[0.4em] text-xs font-semibold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          PRICING
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mt-4 tracking-tight leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Membership{" "}
          <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(34,197,94,1)]">
            Plans
          </span>
        </motion.h1>

        <motion.p
          className="text-white/60 mt-6 text-lg max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Choose a plan that matches your fitness journey.
        </motion.p>

      </div>

      {/* 🔴 ERROR DISPLAY */}
      {error && (
        <div className="text-center mt-6 text-red-400 font-medium">
          {error}
        </div>
      )}

      {/* ⏳ LOADING */}
      {loading && (
        <div className="text-center mt-16 text-white/60 animate-pulse tracking-wide">
          Loading plans...
        </div>
      )}

      {/* ⚠️ EMPTY STATE */}
      {!loading && plans.length === 0 && !error && (
        <div className="text-center mt-16 text-yellow-400">
          No plans found ⚠️ (Check backend / seed API)
        </div>
      )}

      {!loading && plans.length > 0 && (

        <div className="max-w-6xl mx-auto mt-24 grid gap-12 md:grid-cols-2 lg:grid-cols-3 items-stretch">

          {plans.map((plan, i) => {

            const isPopular = !!plan.highlight;
            const isProcessing = processingId === plan._id;

            return (

              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.2, duration: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ y: -22, scale: 1.07 }}
                className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent h-full"
              >

                <div className="absolute -inset-3 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-green-400/25 blur-3xl pointer-events-none" />
                <div className="absolute -inset-1 translate-y-6 bg-black/30 blur-2xl rounded-3xl opacity-60 group-hover:translate-y-12 transition-all duration-500 pointer-events-none" />

                <div className={`relative rounded-3xl p-10 h-full flex flex-col justify-between backdrop-blur-2xl border transition-all duration-300
                  ${isPopular
                    ? "border-green-400/60 bg-white/10 shadow-[0_0_100px_rgba(34,197,94,0.4)] scale-[1.06]"
                    : "border-white/10 bg-white/[0.05]"
                  }
                `}>

                  {isPopular && (
                    <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-green-400/20 border border-green-400/50 text-green-300 backdrop-blur-md shadow-[0_0_25px_rgba(34,197,94,0.5)]">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h2 className="text-2xl font-bold text-center tracking-wide group-hover:text-green-300 transition">
                      {plan.name}
                    </h2>

                    <p className="text-center text-5xl font-extrabold mt-6 tracking-tight">
                      ₹{formatINR(plan.price)}
                    </p>

                    <p className="text-center text-white/50 text-sm mt-1">
                      per month
                    </p>

                    <ul className="mt-8 space-y-3 text-white/70">
                      {(plan.features || []).map((f, j) => (
                        <li key={j} className="flex gap-3 items-start">
                          <span className="text-green-400">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => choosePlan(plan)}
                    disabled={isProcessing}
                    className={`mt-10 w-full rounded-2xl py-3.5 font-semibold transition-all duration-300 tracking-wide relative overflow-hidden
                    ${isPopular
                      ? "bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 text-black shadow-[0_0_60px_rgba(34,197,94,0.9)] hover:shadow-[0_0_120px_rgba(34,197,94,1)] hover:scale-105"
                      : "bg-white/10 hover:bg-white/20 hover:scale-105"
                    }
                    ${isProcessing ? "opacity-60 cursor-not-allowed" : ""}
                    `}
                  >
                    <span className="relative z-10">
                      {isProcessing ? "Processing..." : "Choose Plan"}
                    </span>
                  </button>

                </div>

              </motion.div>

            );

          })}

        </div>

      )}

    </section>
  );
};

export default Plans;