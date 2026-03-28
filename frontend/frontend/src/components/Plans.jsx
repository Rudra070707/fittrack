import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { getPlans } from "../api";
import axios from "axios";

const Plans = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState("");

  const isLoggedIn = useMemo(() => {
    return !!localStorage.getItem("token");
  }, []);

  useEffect(() => {

    const run = async () => {

      try {
        setLoading(true);
        const res = await getPlans();

        if (res?.success) setPlans(res.plans || []);
        else setPlans([]);

      } catch (err) {
        console.error("Plan fetch error:", err);
        setPlans([]);
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

      await axios.post(
        "https://fittrack-weld.vercel.app/api/users/select-plan",
        { planId: plan._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Plan activated successfully");
      navigate("/home/dashboard");

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to select plan");
    } finally {
      setProcessingId(null);
    }

  };

  return (
    <section className="relative py-32 px-6 text-white overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-green-400/10 blur-[160px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">

        <p className="text-green-400 tracking-[0.3em] text-xs font-semibold">
          PRICING
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold mt-4">
          Membership{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
            Plans
          </span>
        </h1>

        <p className="text-white/60 mt-6 text-lg max-w-2xl mx-auto">
          Choose a plan that matches your fitness journey.
        </p>

      </div>

      {/* ERROR */}
      {error && (
        <div className="text-center mt-6 text-red-400">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="text-center mt-16 text-white/60 animate-pulse">
          Loading plans...
        </div>
      )}

      {!loading && plans.length > 0 && (

        <div className="max-w-6xl mx-auto mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">

          {plans.map((plan) => {

            const isPopular = !!plan.highlight;
            const isProcessing = processingId === plan._id;

            return (

              <motion.div
                key={plan._id}
                whileHover={{ y: -12, scale: 1.03 }}
                className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent"
              >

                {/* 🔥 OUTER GLOW ON HOVER */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-green-400/10 blur-xl" />

                <div className={`relative rounded-3xl p-8 backdrop-blur-xl border transition-all duration-300
                  ${isPopular
                    ? "border-green-400/40 bg-white/10 shadow-[0_0_40px_rgba(34,197,94,0.15)]"
                    : "border-white/10 bg-white/[0.05]"
                  }
                `}>

                  {/* 🔥 POPULAR TAG */}
                  {isPopular && (
                    <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-green-400/20 border border-green-400/40 text-green-300 backdrop-blur-md">
                      Most Popular
                    </div>
                  )}

                  <h2 className="text-2xl font-bold text-center">
                    {plan.name}
                  </h2>

                  {/* 💰 PRICE */}
                  <p className="text-center text-5xl font-extrabold mt-6 tracking-tight">
                    ₹{formatINR(plan.price)}
                  </p>

                  <p className="text-center text-white/50 text-sm mt-1">
                    per month
                  </p>

                  {/* FEATURES */}
                  <ul className="mt-8 space-y-3 text-white/70">
                    {(plan.features || []).map((f, j) => (
                      <li key={j} className="flex gap-3 items-start">
                        <span className="text-green-400">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* 🚀 BUTTON */}
                  <button
                    onClick={() => choosePlan(plan)}
                    disabled={isProcessing}
                    className={`mt-8 w-full rounded-2xl py-3 font-semibold transition-all duration-300
                    ${isPopular
                      ? "bg-green-400 text-black hover:bg-green-500 hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]"
                      : "bg-white/10 hover:bg-white/20 hover:scale-105"
                    }
                    ${isProcessing ? "opacity-60 cursor-not-allowed" : ""}
                    `}
                  >
                    {isProcessing ? "Processing..." : "Choose Plan"}
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