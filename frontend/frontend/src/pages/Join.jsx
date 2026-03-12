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

  const selectedPlan = useMemo(() => {
    if (!plans.length) return null;

    if (form.planCode) {
      return plans.find((p) => p.code === form.planCode) || null;
    }

    return plans.find((p) => p.name === form.planName) || null;
  }, [plans, form.planCode, form.planName]);

  useEffect(() => {
    if (!plans.length) return;
    if (form.planCode) return;

    const match = plans.find((p) => p.name === form.planName);

    if (match?.code) {
      setForm((prev) => ({ ...prev, planCode: match.code }));
    }
  }, [plans, form.planCode, form.planName]);

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
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black"/>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]"/>

        <motion.div
          className="absolute inset-0 opacity-80"
          animate={{
            background:[
              "radial-gradient(circle at 15% 25%, rgba(16,185,129,0.28), transparent 60%), radial-gradient(circle at 85% 35%, rgba(59,130,246,0.20), transparent 55%)",
              "radial-gradient(circle at 70% 20%, rgba(59,130,246,0.26), transparent 60%), radial-gradient(circle at 35% 80%, rgba(99,102,241,0.18), transparent 55%)",
              "radial-gradient(circle at 30% 70%, rgba(16,185,129,0.24), transparent 62%), radial-gradient(circle at 85% 60%, rgba(99,102,241,0.20), transparent 55%)"
            ]
          }}
          transition={{duration:16,repeat:Infinity,ease:"easeInOut"}}
        />

      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-20">

        <motion.div
          initial={{opacity:0,y:35}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.6}}
          className="grid lg:grid-cols-2 gap-8"
        >

          {/* LEFT FORM */}
          <motion.div
            whileHover={{scale:1.01}}
            className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl shadow-[0_26px_90px_rgba(0,0,0,0.65)] overflow-hidden"
          >

            <div className="px-8 pt-8 pb-6 border-b border-white/10">

              <p className="text-emerald-400 font-semibold tracking-[0.25em] text-xs">
                MEMBERSHIP CHECKOUT
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
                Confirm your{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  membership
                </span>
              </h2>

              <p className="text-white/60 mt-3">
                Enter your details to activate your plan instantly.
              </p>

            </div>

            <form onSubmit={(e)=>e.preventDefault()} className="px-8 py-8 space-y-5">

              {["name","email","phone","age"].map((field,i)=>(
                <div key={field}>
                  <label className="text-sm text-white/70 font-medium capitalize">
                    {field}
                  </label>

                  <div className="mt-2 flex items-center gap-3 rounded-2xl bg-black/30 border border-white/12 px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-400">

                    <input
                      type={field==="age"?"number":field==="email"?"email":"text"}
                      className="w-full bg-transparent outline-none text-white placeholder-white/40"
                      placeholder={`Enter ${field}`}
                      value={form[field]}
                      onChange={(e)=>setForm({...form,[field]:e.target.value})}
                    />

                  </div>
                </div>
              ))}

              {/* Plan display */}
              <div>
                <label className="text-sm text-white/70 font-medium">
                  Selected Plan
                </label>

                <div className="mt-2 flex items-center justify-between rounded-2xl bg-white/6 border border-white/12 px-4 py-3">

                  <div>
                    <p className="text-emerald-300 font-bold">
                      {form.planName}
                    </p>

                    <p className="text-xs text-white/50">
                      Plan selected from previous page
                    </p>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-400/15 border border-emerald-400/25 text-emerald-300">
                    Locked
                  </span>

                </div>
              </div>

              <DemoCheckout
                planName={form.planName}
                amount={selectedPlan?.price || 0}
                disabled={!canPay}
                userId={form.email}
                onSuccess={async () => {

                  if (!selectedPlan?.code) {
                    return alert("Plan not found.");
                  }

                  const res = await subscribeMembership({
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    planCode: selectedPlan.code,
                  });

                  if (!res.success) return alert(res.message);

                  alert("Membership Activated Successfully 🎉");

                }}
              />

            </form>

          </motion.div>

          {/* RIGHT SUMMARY */}
          <motion.div
            initial={{opacity:0,x:20}}
            animate={{opacity:1,x:0}}
            className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl shadow-[0_26px_90px_rgba(0,0,0,0.65)] h-fit overflow-hidden"
          >

            <div className="px-8 pt-8 pb-6 border-b border-white/10">

              <p className="text-emerald-400 font-semibold tracking-[0.25em] text-xs">
                ORDER SUMMARY
              </p>

              <h3 className="text-2xl font-extrabold mt-3">
                Your plan details
              </h3>

            </div>

            <div className="px-8 py-8 space-y-6">

              <div className="rounded-2xl border border-white/12 bg-black/30 p-6">

                <p className="text-emerald-300 text-xs font-semibold tracking-wider">
                  {meta.tag}
                </p>

                <h4 className="text-2xl font-extrabold mt-2">
                  {form.planName}
                </h4>

                <p className="text-white/70 mt-2">{meta.priceText}</p>

                <ul className="mt-6 space-y-2 text-white/80">

                  {meta.perks.map((p,idx)=>(
                    <li key={idx} className="flex gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      {p}
                    </li>
                  ))}

                </ul>

              </div>

              <p className="text-xs text-white/40">
                By confirming, you agree to FitTrack membership terms.
              </p>

            </div>

          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}