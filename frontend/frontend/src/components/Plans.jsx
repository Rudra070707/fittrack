import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlans } from "../api";

const Plans = () => {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const res = await getPlans();
      if (res.success) setPlans(res.plans || []);
      else setPlans([]);
      setLoading(false);
    };
    run();
  }, []);

  const formatINR = (num) => Number(num || 0).toLocaleString("en-IN");

  const choosePlan = (plan) => {
    navigate("/home/join", {
      state: {
        plan: plan.name,
        planCode: plan.code,
      },
    });
  };

  return (
    <section
      id="plans"
      className="relative py-28 px-6 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden"
    >
      {/* Background visuals */}
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
      </div>

      <div className="absolute -top-16 left-6 w-[520px] h-[520px] bg-green-400/18 blur-[170px] rounded-full" />
      <div className="absolute bottom-0 right-6 w-[620px] h-[620px] bg-green-600/14 blur-[190px] rounded-full" />

      {/* Heading */}
      <div className="relative max-w-6xl mx-auto text-center">
        <p className="text-green-400 font-semibold tracking-[0.25em] text-xs">
          PRICING
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold mt-4">
          Membership <span className="text-green-400">Plans</span>
        </h1>

        <p className="text-gray-300 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
          Choose a plan that matches your fitness journey. Upgrade anytime.
        </p>
      </div>

      {/* Loading / Empty state */}
      {loading && (
        <div className="relative max-w-6xl mx-auto mt-16 text-center text-gray-300">
          Loading plans...
        </div>
      )}

      {!loading && plans.length === 0 && (
        <div className="relative max-w-6xl mx-auto mt-16 text-center text-gray-300">
          No plans found.
        </div>
      )}

      {/* Cards */}
      {!loading && plans.length > 0 && (
        <div className="relative max-w-6xl mx-auto mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {plans.map((plan) => {
            const isPopular = !!plan.highlight;

            return (
              <div
                key={plan._id}
                className={`
                  group relative rounded-3xl overflow-hidden
                  border transition-all duration-300
                  ${
                    isPopular
                      ? "border-green-400/35 bg-white/8 shadow-[0_25px_70px_rgba(0,0,0,0.65)]"
                      : "border-white/10 bg-white/6 shadow-[0_22px_60px_rgba(0,0,0,0.55)]"
                  }
                  backdrop-blur-xl
                  hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(34,197,94,0.25)]
                `}
              >
                {isPopular && (
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-400/15 border border-green-400/25 text-green-300">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8 flex flex-col h-full">
                  <h2 className="text-2xl font-extrabold text-center mt-2">
                    {plan.name}
                  </h2>

                  <div className="mt-5 text-center">
                    <p className="text-4xl font-extrabold">
                      ₹{formatINR(plan.price)}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">per month</p>
                    <p className="text-xs text-gray-400 mt-3">
                      Cancel anytime • Instant activation
                    </p>
                  </div>

                  <div className="my-7 h-[1px] bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                  <ul className="text-gray-200 flex-1 space-y-3">
                    {(plan.features || []).map((f, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="text-green-400 font-bold">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => choosePlan(plan)}
                    className={`
                      mt-8 w-full rounded-2xl py-3 font-bold transition-all duration-300
                      ${
                        isPopular
                          ? "bg-green-400 text-black shadow-[0_0_30px_rgba(34,197,94,0.55)] hover:bg-green-500"
                          : "bg-white/10 text-white border border-white/12 hover:bg-white/16"
                      }
                      hover:scale-[1.02] active:scale-[0.99]
                    `}
                  >
                    Choose Plan
                  </button>

                  <p className="text-center text-xs text-gray-500 mt-4">
                    Best for{" "}
                    {plan.name?.includes("Elite")
                      ? "advanced users"
                      : plan.name?.includes("Premium")
                      ? "all-round fitness"
                      : "getting started"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Plans;
