import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getPlans, subscribeMembership } from "../api";
import DemoCheckout from "../components/DemoCheckout";

export default function Join() {
  const location = useLocation();

  const selectedPlanName = location.state?.plan || "Basic Plan";
  const selectedPlanCode = location.state?.planCode || "";

  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    planName: selectedPlanName,
    planCode: selectedPlanCode,
  });

  // ✅ Fetch latest plans from backend
  useEffect(() => {
    const run = async () => {
      setLoadingPlans(true);
      const res = await getPlans();
      if (res.success) setPlans(res.plans || []);
      else setPlans([]);
      setLoadingPlans(false);
    };
    run();
  }, []);

  // ✅ Selected plan object from backend
  const selectedPlan = useMemo(() => {
    if (!plans.length) return null;

    if (form.planCode) return plans.find((p) => p.code === form.planCode) || null;
    return plans.find((p) => p.name === form.planName) || null;
  }, [plans, form.planCode, form.planName]);

  // ✅ If only plan name was passed, auto-fill planCode once plans load
  useEffect(() => {
    if (!plans.length) return;
    if (form.planCode) return;

    const match = plans.find((p) => p.name === form.planName);
    if (match?.code) {
      setForm((prev) => ({ ...prev, planCode: match.code }));
    }
    // eslint-disable-next-line
  }, [plans]);

  const formatINR = (num) => Number(num || 0).toLocaleString("en-IN");

  const getTag = (plan) => {
    if (!plan) return "Selected Plan";
    if (plan.highlight) return "Most Popular";
    if (plan.code === "premium") return "Best Value";
    return "Selected Plan";
  };

  const meta = useMemo(() => {
    if (loadingPlans) {
      return {
        tag: "Loading...",
        priceText: "Loading...",
        perks: ["Loading plan benefits..."],
      };
    }

    if (!selectedPlan) {
      return {
        tag: "Selected Plan",
        priceText: "—",
        perks: ["Gym Access", "Workout Planner", "Progress Tracking"],
      };
    }

    return {
      tag: getTag(selectedPlan),
      priceText: `₹${formatINR(selectedPlan.price)} / month`,
      perks: selectedPlan.features || [],
    };
  }, [loadingPlans, selectedPlan]);

  const canPay =
    !!selectedPlan?.code && !!form.name && !!form.email && !!form.phone;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Premium grid + glows */}
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
      </div>

      <div className="absolute -top-20 left-10 w-[520px] h-[520px] bg-green-400/20 blur-[160px] rounded-full" />
      <div className="absolute bottom-0 right-10 w-[620px] h-[620px] bg-green-600/15 blur-[170px] rounded-full" />
      <div className="absolute top-1/3 -right-20 w-[520px] h-[520px] bg-blue-500/10 blur-[180px] rounded-full" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8">
          {/* LEFT: Checkout Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="
              bg-white/7 backdrop-blur-xl
              border border-white/12
              rounded-3xl
              shadow-[0_25px_90px_rgba(0,0,0,0.75)]
              overflow-hidden
            "
          >
            <div className="px-8 pt-8 pb-6 border-b border-white/10">
              <p className="text-green-400 font-semibold tracking-[0.22em] text-xs">
                MEMBERSHIP CHECKOUT
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
                Confirm your <span className="text-green-400">membership</span>
              </h2>
              <p className="text-gray-300 mt-3">
                Enter your details to activate your plan instantly.
              </p>
            </div>

            {/* ✅ Prevent default submit */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="px-8 py-8 space-y-5"
            >
              {/* Name */}
              <div>
                <label className="text-sm text-gray-300 font-medium">
                  Full Name
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl bg-black/30 border border-white/10 px-4 py-3 focus-within:ring-2 focus-within:ring-green-400/80">
                  <span className="text-green-400">👤</span>
                  <input
                    className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                    placeholder="Enter full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-300 font-medium">
                  Email
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl bg-black/30 border border-white/10 px-4 py-3 focus-within:ring-2 focus-within:ring-green-400/80">
                  <span className="text-green-400">📧</span>
                  <input
                    type="email"
                    className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-gray-300 font-medium">
                  Phone Number
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl bg-black/30 border border-white/10 px-4 py-3 focus-within:ring-2 focus-within:ring-green-400/80">
                  <span className="text-green-400">📞</span>
                  <input
                    className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="text-sm text-gray-300 font-medium">Age</label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl bg-black/30 border border-white/10 px-4 py-3 focus-within:ring-2 focus-within:ring-green-400/80">
                  <span className="text-green-400">🎂</span>
                  <input
                    type="number"
                    className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                    placeholder="Enter age"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                  />
                </div>
              </div>

              {/* Selected Plan */}
              <div>
                <label className="text-sm text-gray-300 font-medium">
                  Selected Plan
                </label>
                <div className="mt-2 flex items-center justify-between gap-4 rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-green-300 font-bold truncate">
                      {form.planName}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      You can change plan from Plans page anytime
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-green-400/15 border border-green-400/25 text-green-300">
                    Locked
                  </span>
                </div>

                <input className="hidden" value={form.planName} readOnly />
                <input className="hidden" value={form.planCode} readOnly />
              </div>

              {/* ✅ Payment Button (opens payment UI modal) */}
              <DemoCheckout
                planName={form.planName}
                amount={selectedPlan?.price || 0}
                disabled={!canPay}
                userId={form.email} // temporary unique id for college project
                onSuccess={async () => {
                  if (!selectedPlan?.code) {
                    return alert(
                      "Plan not found. Please go back and choose a plan again."
                    );
                  }

                  const res = await subscribeMembership({
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    planCode: selectedPlan.code,
                  });

                  if (!res.success) return alert(res.message || "Failed");

                  alert("Membership Activated Successfully 🎉");
                }}
              />

              <div className="pt-3 flex flex-wrap gap-3 text-xs text-gray-400">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  ✅ Instant activation
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  🔒 Secure details
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  📈 Track progress
                </span>
              </div>
            </form>
          </motion.div>

          {/* RIGHT: Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="
              bg-white/6 backdrop-blur-xl
              border border-white/12
              rounded-3xl
              shadow-[0_25px_90px_rgba(0,0,0,0.65)]
              overflow-hidden
              h-fit
            "
          >
            <div className="px-8 pt-8 pb-6 border-b border-white/10">
              <p className="text-green-400 font-semibold tracking-[0.22em] text-xs">
                ORDER SUMMARY
              </p>
              <h3 className="text-2xl font-extrabold mt-3">Your plan details</h3>
              <p className="text-gray-300 mt-3">
                Here’s what you’ll unlock with this membership.
              </p>
            </div>

            <div className="px-8 py-8 space-y-6">
              <div className="relative rounded-2xl border border-white/10 bg-black/25 p-6 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-400/15 blur-3xl rounded-full" />

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-green-300 text-xs font-semibold tracking-wider">
                      {meta.tag}
                    </p>
                    <h4 className="text-2xl font-extrabold mt-2 truncate">
                      {form.planName}
                    </h4>

                    <p className="text-gray-300 mt-2">{meta.priceText}</p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-green-400/15 border border-green-400/25 text-green-300 text-xs">
                    Active
                  </span>
                </div>

                <div className="mt-6">
                  <p className="text-xs text-gray-400 tracking-wider">INCLUDED</p>
                  <ul className="mt-3 space-y-2 text-gray-200">
                    {meta.perks.map((p, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="text-green-400 font-bold">✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs text-gray-400 tracking-wider">
                  WHY THIS FEELS LIKE A REAL GYM WEBSITE
                </p>
                <p className="text-gray-200 mt-3 leading-relaxed">
                  This page works like a checkout: user fills details → sees plan
                  summary → completes payment → activates membership.
                </p>
              </div>

              <p className="text-xs text-gray-500">
                By confirming, you agree to FitTrack membership terms.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
    </div>
  );
}
