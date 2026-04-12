import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_BASE } from "../api";

export default function Diet() {

  const [height,setHeight] = useState("");
  const [weight,setWeight] = useState("");
  const [goal,setGoal] = useState("");
  const [pref,setPref] = useState("");

  const [goalOpen,setGoalOpen] = useState(false);
  const [prefOpen,setPrefOpen] = useState(false);

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

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black"/>

        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-emerald-400/10 blur-[220px] rounded-full"/>
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-green-400/10 blur-[220px] rounded-full"/>

        <motion.div
          className="absolute inset-0 opacity-70"
          animate={{
            background:[
              "radial-gradient(circle at 20% 30%, rgba(16,185,129,0.25), transparent 60%)",
              "radial-gradient(circle at 70% 20%, rgba(59,130,246,0.25), transparent 60%)",
              "radial-gradient(circle at 30% 70%, rgba(16,185,129,0.25), transparent 60%)"
            ]
          }}
          transition={{duration:16,repeat:Infinity}}
        />
      </div>

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

            <h1 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight">
              Build a diet plan that{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,197,94,0.9)]">
                fits your goal
              </span>
            </h1>
          </div>

          {/* PRESETS */}
          <div className="flex flex-wrap gap-3">
            {["cut","bulk","veg"].map((t,i)=>(
              <motion.button
                key={i}
                whileHover={{scale:1.08,y:-2}}
                whileTap={{scale:0.95}}
                onClick={()=>applyPreset(t)}
                className="
                  px-5 py-2 rounded-2xl
                  bg-white/5 border border-white/10
                  hover:border-emerald-400/60
                  hover:bg-emerald-400/10
                  hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]
                  transition-all duration-300
                "
              >
                {t==="cut"?"Fat Loss":t==="bulk"?"Muscle Gain":"Veg Mode"}
              </motion.button>
            ))}
          </div>

        </div>

        {/* GRID */}
        <div className="mt-14 grid lg:grid-cols-3 gap-10">

          {/* FORM */}
          <form
            onSubmit={handleGenerate}
            className="
              group relative lg:col-span-2
              bg-white/5 backdrop-blur-2xl
              border border-white/10 rounded-3xl p-10
              transition-all duration-300
              hover:shadow-[0_0_60px_rgba(34,197,94,0.25)]
            "
          >

            <div className="pointer-events-none absolute -inset-3 opacity-0 group-hover:opacity-100 bg-emerald-400/20 blur-2xl rounded-3xl transition duration-500"/>

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
                    bg-black/30 border border-white/10
                    focus:ring-2 focus:ring-emerald-400
                    hover:border-emerald-400/50
                    focus:shadow-[0_0_25px_rgba(34,197,94,0.4)]
                    outline-none transition-all duration-300
                  "
                />
              ))}

              {/* 🔥 CUSTOM GOAL DROPDOWN */}
              <div className="relative">
                <div
                  onClick={()=>setGoalOpen(!goalOpen)}
                  className="px-4 py-3 rounded-2xl bg-black/30 border border-white/10 cursor-pointer"
                >
                  {goal || "Select goal"}
                </div>

                <AnimatePresence>
                  {goalOpen && (
                    <motion.div
                      initial={{opacity:0,y:-10}}
                      animate={{opacity:1,y:0}}
                      exit={{opacity:0,y:-10}}
                      className="absolute w-full mt-2 bg-[#020617] border border-white/10 rounded-xl overflow-hidden z-50"
                    >
                      {["Weight Loss","Muscle Gain"].map((g,i)=>(
                        <div
                          key={i}
                          onClick={()=>{setGoal(g);setGoalOpen(false)}}
                          className="px-4 py-3 hover:bg-green-400/20 cursor-pointer"
                        >
                          {g}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 🔥 CUSTOM PREF DROPDOWN */}
              <div className="relative">
                <div
                  onClick={()=>setPrefOpen(!prefOpen)}
                  className="px-4 py-3 rounded-2xl bg-black/30 border border-white/10 cursor-pointer"
                >
                  {pref || "Select preference"}
                </div>

                <AnimatePresence>
                  {prefOpen && (
                    <motion.div
                      initial={{opacity:0,y:-10}}
                      animate={{opacity:1,y:0}}
                      exit={{opacity:0,y:-10}}
                      className="absolute w-full mt-2 bg-[#020617] border border-white/10 rounded-xl overflow-hidden z-50"
                    >
                      {["Veg","Non-Veg","Mixed"].map((p,i)=>(
                        <div
                          key={i}
                          onClick={()=>{setPref(p);setPrefOpen(false)}}
                          className="px-4 py-3 hover:bg-green-400/20 cursor-pointer"
                        >
                          {p}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {error && (
              <p className="mt-4 text-red-400 text-sm">{error}</p>
            )}

            <motion.button
              type="submit"
              whileHover={{scale:1.05}}
              whileTap={{scale:0.95}}
              disabled={loading}
              className="
                mt-8 px-8 py-3 rounded-2xl font-semibold
                bg-gradient-to-r from-emerald-500 to-emerald-400
                text-black
                transition-all duration-300
                hover:shadow-[0_0_40px_rgba(34,197,94,0.7)]
                disabled:opacity-60
              "
            >
              {loading ? "Generating..." : "Generate Diet Plan"}
            </motion.button>

          </form>

          {/* PREVIEW */}
          {preview && (
            <motion.div
              initial={{opacity:0,y:20}}
              animate={{opacity:1,y:0}}
              className="
                relative
                bg-white/5 backdrop-blur-2xl border border-white/10
                rounded-3xl p-8
                shadow-[0_0_60px_rgba(0,0,0,0.7)]
              "
            >

              <div className="absolute -inset-2 bg-emerald-400/10 blur-2xl opacity-60 rounded-3xl"/>

              <h3 className="text-lg font-bold mb-6">
                Quick Preview
              </h3>

              {Object.entries(preview).map(([k,v])=>(
                <div key={k} className="flex justify-between py-2 border-b border-white/10 text-white/70">
                  <span>{k}</span>
                  <span className="text-emerald-400 font-semibold">{v}</span>
                </div>
              ))}

            </motion.div>
          )}

        </div>

      </motion.div>

    </section>
  );
}