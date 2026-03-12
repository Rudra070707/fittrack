import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { getPlans } from "../api";

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
    <section className="relative py-32 px-6 text-white overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto text-center">

        <p className="text-green-400 tracking-[0.3em] text-xs font-semibold">
          PRICING
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold mt-4">
          Membership <span className="text-green-400">Plans</span>
        </h1>

        <p className="text-white/60 mt-6 text-lg max-w-2xl mx-auto">
          Choose a plan that matches your fitness journey.
        </p>

      </div>

      {loading && (
        <div className="text-center mt-16 text-white/60">
          Loading plans...
        </div>
      )}

      {!loading && plans.length > 0 && (

        <div className="max-w-6xl mx-auto mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">

          {plans.map((plan) => {

            const isPopular = !!plan.highlight;

            return (

              <motion.div
                key={plan._id}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent"
              >

                <div className={`relative rounded-3xl p-8 backdrop-blur-xl border
                  ${isPopular
                    ? "border-green-400/40 bg-white/10"
                    : "border-white/10 bg-white/[0.05]"
                  }
                `}>

                  {isPopular && (
                    <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-green-400/20 border border-green-400/40 text-green-300">
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
                        <span className="text-green-400">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => choosePlan(plan)}
                    className={`mt-8 w-full rounded-2xl py-3 font-semibold
                    ${isPopular
                      ? "bg-green-400 text-black"
                      : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    Choose Plan
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