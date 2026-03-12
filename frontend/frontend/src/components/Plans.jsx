import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { getPlans } from "../api";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const Plans = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = useMemo(() => {
    return !!localStorage.getItem("token") || !!localStorage.getItem("adminToken");
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

  const choosePlan = (plan) => {

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

    navigate("/home/join", {
      state: {
        plan: plan.name,
        planCode: plan.code,
      },
    });

  };

  return (
    <section
      className="
      relative
      py-28
      px-6
      text-white
      overflow-hidden
      "
    >

      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />

        <motion.div
          className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-emerald-400/15 blur-[200px] rounded-full"
          animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-0 -right-32 w-[750px] h-[750px] bg-green-400/12 blur-[220px] rounded-full"
          animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

      </div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto text-center"
      >

        <p className="text-emerald-400 font-semibold tracking-[0.3em] text-xs">
          PRICING
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold mt-4">
          Membership{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Plans
          </span>
        </h1>

        <p className="text-white/60 mt-6 text-lg max-w-2xl mx-auto">
          Choose a plan that matches your fitness journey.
        </p>

      </motion.div>

      {/* Loading */}
      {loading && (
        <div className="relative z-10 text-center mt-16 text-white/60">
          Loading plans...
        </div>
      )}

      {/* Plans */}
      {!loading && plans.length > 0 && (

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="
          relative z-10
          max-w-6xl mx-auto mt-20
          grid gap-10
          md:grid-cols-2
          lg:grid-cols-3
          "
        >

          {plans.map((plan) => {

            const isPopular = !!plan.highlight;

            return (

              <motion.div
                key={plan._id}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="
                group relative rounded-3xl p-[1px]
                bg-gradient-to-br from-white/15 via-white/5 to-transparent
                "
              >

                <div
                  className={`
                  relative rounded-3xl p-8 backdrop-blur-2xl border
                  ${
                    isPopular
                      ? "border-emerald-400/40 bg-white/10 shadow-[0_0_45px_rgba(34,197,94,0.35)]"
                      : "border-white/12 bg-white/[0.06]"
                  }
                  transition-all duration-300
                  `}
                >

                  {isPopular && (
                    <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-300">
                      Most Popular
                    </div>
                  )}

                  <h2 className="text-2xl font-bold text-center">
                    {plan.name}
                  </h2>

                  <p className="text-center text-4xl font-extrabold mt-6">
                    ₹{formatINR(plan.price)}
                  </p>

                  <p className="text-center text-white/50 text-sm mt-1">
                    per month
                  </p>

                  <ul className="mt-8 space-y-3 text-white/70">
                    {(plan.features || []).map((f, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="text-emerald-400">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => choosePlan(plan)}
                    className={`
                    mt-8 w-full rounded-2xl py-3 font-semibold
                    transition-all duration-300
                    ${
                      isPopular
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 shadow-[0_12px_34px_rgba(34,197,94,0.25)]"
                        : "bg-white/10 hover:bg-white/20"
                    }
                    `}
                  >
                    Choose Plan
                  </button>

                </div>

              </motion.div>

            );

          })}

        </motion.div>

      )}

    </section>
  );
};

export default Plans;