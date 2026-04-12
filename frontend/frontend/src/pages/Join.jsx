import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getPlans, subscribeMembership } from "../api";
import DemoCheckout from "../components/DemoCheckout";
import toast from "react-hot-toast"; // 🔥 NEW

export default function Join() {
  const location = useLocation();

  const selectedPlanName = location.state?.plan || "Basic Plan";
  const selectedPlanCode = location.state?.planCode || "";

  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  const [processing, setProcessing] = useState(false);

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

      {/* 🌌 BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black"/>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]"/>

        {/* 🔥 EXTRA DEPTH */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-400/10 blur-[200px] rounded-full"/>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-400/10 blur-[200px] rounded-full"/>

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
            className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-white/10 to-transparent"
          >

            {/* 🔥 FIXED OVERLAY */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-emerald-400/10 blur-xl"/>

            <div className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl shadow-[0_26px_90px_rgba(0,0,0,0.65)] overflow-hidden">

              <div className="px-8 pt-8 pb-6 border-b border-white/10">

                <p className="text-emerald-400 text-xs">MEMBERSHIP CHECKOUT</p>

                <h2 className="text-3xl font-extrabold mt-3">
                  Confirm your membership
                </h2>

              </div>

              <form onSubmit={(e)=>e.preventDefault()} className="px-8 py-8 space-y-5">

                {["name","email","phone","age"].map((field)=>(

                  <input
                    key={field}
                    value={form[field]}
                    disabled={processing}
                    onChange={(e)=>setForm({...form,[field]:e.target.value})}
                    placeholder={field}
                    className="
                      w-full p-3 rounded-xl
                      bg-black/30 border border-white/10
                      focus:ring-2 focus:ring-emerald-400
                      hover:border-emerald-400/40
                      focus:shadow-[0_0_20px_rgba(34,197,94,0.25)]
                      outline-none transition-all duration-300
                      disabled:opacity-60
                    "
                  />

                ))}

                <DemoCheckout
                  planName={form.planName}
                  amount={selectedPlan?.price || 0}
                  disabled={!canPay || processing}
                  userId={form.email}
                  onSuccess={async () => {

                    if (processing) return;
                    setProcessing(true);

                    try {

                      if (!selectedPlan?.code) {
                        toast.error("Invalid plan ❌");
                        return;
                      }

                      const res = await subscribeMembership({
                        name: form.name,
                        email: form.email,
                        phone: form.phone,
                        planCode: selectedPlan.code,
                      });

                      if (!res.success) {
                        toast.error("Payment failed ❌");
                        return;
                      }

                      toast.success("Membership activated 🎉");

                    } catch {
                      toast.error("Something went wrong ⚠️");
                    } finally {
                      setProcessing(false);
                    }

                  }}
                />

                {processing && (
                  <p className="text-emerald-400 text-sm animate-pulse">
                    Processing payment...
                  </p>
                )}

              </form>

            </div>

          </motion.div>

          {/* RIGHT SUMMARY */}
          <motion.div className="bg-white/6 border border-white/12 rounded-3xl p-6 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]">

            <h3 className="text-xl font-bold">Summary</h3>

            {loadingPlans ? (
              <div className="animate-pulse space-y-2 mt-4">
                <div className="h-4 bg-white/10 rounded"></div>
                <div className="h-4 bg-white/10 rounded"></div>
              </div>
            ) : (
              <>
                <p className="mt-4 text-emerald-400 font-semibold">{meta.priceText}</p>

                <ul className="mt-4 space-y-2 text-white/70">
                  {meta.perks.map((p,i)=>(
                    <li key={i}>✓ {p}</li>
                  ))}
                </ul>
              </>
            )}

          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}