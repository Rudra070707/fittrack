import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE } from "../api";

export default function Diet() {

  const [height,setHeight] = useState("");
  const [weight,setWeight] = useState("");
  const [goal,setGoal] = useState("");
  const [pref,setPref] = useState("");

  const [dietPlan,setDietPlan] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const applyPreset = (type) => {

    if(type==="cut"){
      setGoal("Weight Loss");
      setPref("Mixed");
    }

    if(type==="bulk"){
      setGoal("Muscle Gain");
      setPref("Mixed");
    }

    if(type==="veg"){
      setPref("Veg");
    }
  };

  const preview = useMemo(()=>{

    const h = Number(height);
    const w = Number(weight);

    const ok = h>0 && w>0 && goal && pref;
    if(!ok) return null;

    const calories =
      goal==="Weight Loss" ? 1800 :
      goal==="Muscle Gain" ? 2400 : 2100;

    const protein =
      goal==="Muscle Gain"
        ? "120–140g"
        : goal==="Weight Loss"
        ? "90–110g"
        : "100–120g";

    const carbs =
      goal==="Weight Loss"
        ? "160–200g"
        : goal==="Muscle Gain"
        ? "250–320g"
        : "200–260g";

    const fats =
      goal==="Weight Loss"
        ? "45–55g"
        : goal==="Muscle Gain"
        ? "60–75g"
        : "55–70g";

    return {calories,protein,carbs,fats};

  },[height,weight,goal,pref]);

  const handleGenerate = async(e)=>{

    e.preventDefault();

    if(!height || !weight || !goal || !pref){
      alert("Please fill all fields ✅");
      return;
    }

    setError("");
    setLoading(true);
    setDietPlan(null);

    try{

      const res = await axios.post(`${API_BASE}/diet`,{
        height:Number(height),
        weight:Number(weight),
        goal,
        preference:pref
      });

      if(!res.data?.success){
        setError(res.data?.message || "Failed to generate diet plan ❌");
        return;
      }

      setDietPlan(res.data.plan);
      alert("Diet plan generated successfully 🎯");

    }catch(err){

      console.error(err);

      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to generate diet plan ❌"
      );

    }finally{
      setLoading(false);
    }
  };

  return (

    <section className="relative min-h-screen overflow-hidden text-white">

      {/* animated background like hero */}
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

      <motion.div
        className="relative max-w-6xl mx-auto px-6 py-20"
        initial={{opacity:0,y:14}}
        animate={{opacity:1,y:0}}
      >

        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

          <div>

            <p className="text-emerald-400 font-semibold tracking-[0.28em] text-xs">
              SERVICES / DIET PLANNER
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
              Build a diet plan that{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                actually fits
              </span>{" "}
              your goal.
            </h1>

            <p className="text-white/70 mt-4 max-w-xl">
              Enter your basics and generate a plan you can follow daily.
            </p>

          </div>

          {/* presets */}
          <div className="flex flex-wrap gap-3">

            {[
              {label:"Quick: Fat Loss",type:"cut"},
              {label:"Quick: Muscle Gain",type:"bulk"},
              {label:"Veg Mode",type:"veg"}
            ].map((b)=>(
              <motion.button
                key={b.label}
                whileHover={{scale:1.05}}
                whileTap={{scale:0.95}}
                onClick={()=>applyPreset(b.type)}
                className="px-4 py-2 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/10 transition"
              >
                {b.label}
              </motion.button>
            ))}

          </div>

        </div>

        {/* main grid */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">

          {/* form card */}
          <form
            onSubmit={handleGenerate}
            className="lg:col-span-2 bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-8 shadow-[0_26px_90px_rgba(0,0,0,0.65)]"
          >

            <h2 className="text-xl font-bold mb-6">
              Your Details
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="number"
                placeholder="Height (cm)"
                value={height}
                onChange={(e)=>setHeight(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-black/25 border border-white/12 text-white placeholder-white/40 outline-none focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20"
              />

              <input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e)=>setWeight(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-black/25 border border-white/12 text-white placeholder-white/40 outline-none focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20"
              />

              <select
                value={goal}
                onChange={(e)=>setGoal(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-black/25 border border-white/12 text-white outline-none"
              >
                <option value="">Select goal</option>
                <option>Weight Loss</option>
                <option>Muscle Gain</option>
              </select>

              <select
                value={pref}
                onChange={(e)=>setPref(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-black/25 border border-white/12 text-white outline-none"
              >
                <option value="">Select preference</option>
                <option>Veg</option>
                <option>Non-Veg</option>
                <option>Mixed</option>
              </select>

            </div>

            <motion.button
              type="submit"
              whileHover={{scale:1.03}}
              whileTap={{scale:0.96}}
              disabled={loading}
              className="mt-8 px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-semibold shadow-[0_12px_34px_rgba(34,197,94,0.25)]"
            >
              {loading ? "Generating..." : "Generate Diet Plan"}
            </motion.button>

          </form>

        </div>

      </motion.div>

    </section>
  );
}