import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE } from "../api";
// import toast from "react-hot-toast";

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

    return {
      calories: goal==="Weight Loss" ? 1800 : goal==="Muscle Gain" ? 2400 : 2100,
      protein: goal==="Muscle Gain" ? "120–140g" : goal==="Weight Loss" ? "90–110g" : "100–120g",
      carbs: goal==="Weight Loss" ? "160–200g" : goal==="Muscle Gain" ? "250–320g" : "200–260g",
      fats: goal==="Weight Loss" ? "45–55g" : goal==="Muscle Gain" ? "60–75g" : "55–70g",
    };

  },[height,weight,goal,pref]);

  const handleGenerate = async(e)=>{

    e.preventDefault();

    if(!height || !weight || !goal || !pref){
      // toast.error("Fill all fields");
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
        setError(res.data?.message || "Failed to generate plan");
        return;
      }

      setDietPlan(res.data.plan);
      // toast.success("Diet plan ready 🍽️");

    }catch(err){

      console.error(err);

      setError(
        err?.response?.data?.message ||
        "Failed to generate diet plan"
      );

    }finally{
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black"/>

      <motion.div
        className="relative max-w-6xl mx-auto px-6 py-20"
        initial={{opacity:0,y:14}}
        animate={{opacity:1,y:0}}
      >

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

          <div>
            <p className="text-emerald-400 tracking-[0.28em] text-xs font-semibold">
              SERVICES / DIET PLANNER
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
              Build a diet plan that{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                fits your goal
              </span>
            </h1>
          </div>

          {/* PRESETS */}
          <div className="flex flex-wrap gap-3">
            {["cut","bulk","veg"].map((t,i)=>(
              <motion.button
                key={i}
                whileHover={{scale:1.06}}
                whileTap={{scale:0.95}}
                onClick={()=>applyPreset(t)}
                className="
                  px-4 py-2 rounded-2xl
                  bg-white/5 border border-white/10
                  hover:border-emerald-400/40
                  transition
                "
              >
                {t==="cut"?"Fat Loss":t==="bulk"?"Muscle Gain":"Veg Mode"}
              </motion.button>
            ))}
          </div>

        </div>

        {/* GRID */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">

          {/* FORM */}
          <form
            onSubmit={handleGenerate}
            className="lg:col-span-2 bg-white/6 backdrop-blur-2xl border border-white/10 rounded-3xl p-8"
          >

            <h2 className="text-xl font-bold mb-6">
              Your Details
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              {[{
                val:height,set:setHeight,ph:"Height (cm)"
              },{
                val:weight,set:setWeight,ph:"Weight (kg)"
              }].map((f,i)=>(
                <input
                  key={i}
                  type="number"
                  placeholder={f.ph}
                  value={f.val}
                  onChange={(e)=>f.set(e.target.value)}
                  className="
                    px-4 py-3 rounded-2xl
                    bg-black/25 border border-white/10
                    focus:ring-2 focus:ring-emerald-400
                    outline-none transition
                  "
                />
              ))}

              <select value={goal} onChange={(e)=>setGoal(e.target.value)} className="input">
                <option value="">Select goal</option>
                <option>Weight Loss</option>
                <option>Muscle Gain</option>
              </select>

              <select value={pref} onChange={(e)=>setPref(e.target.value)} className="input">
                <option value="">Select preference</option>
                <option>Veg</option>
                <option>Non-Veg</option>
                <option>Mixed</option>
              </select>

            </div>

            {/* ERROR */}
            {error && (
              <p className="mt-4 text-red-400 text-sm">{error}</p>
            )}

            <motion.button
              type="submit"
              whileHover={{scale:1.04}}
              whileTap={{scale:0.96}}
              disabled={loading}
              className="
                mt-8 px-8 py-3 rounded-2xl font-semibold
                bg-gradient-to-r from-emerald-500 to-emerald-400
                text-black
                transition
                hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]
                disabled:opacity-60
              "
            >
              {loading ? "Generating..." : "Generate Diet Plan"}
            </motion.button>

          </form>

          {/* PREVIEW CARD */}
          {preview && (
            <div className="bg-white/6 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">

              <h3 className="text-lg font-bold mb-4">
                Quick Preview
              </h3>

              {Object.entries(preview).map(([k,v])=>(
                <div key={k} className="flex justify-between text-white/70 py-1">
                  <span>{k}</span>
                  <span className="text-emerald-400 font-semibold">{v}</span>
                </div>
              ))}

            </div>
          )}

        </div>

      </motion.div>

    </section>
  );
}