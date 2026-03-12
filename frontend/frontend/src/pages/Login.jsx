import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { loginUser } from "../api";

export default function Login({ mode = "page", onSuccess }) {

  const navigate = useNavigate();
  const location = useLocation();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [showPass,setShowPass] = useState(false);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const redirectTo =
    location.state?.redirectTo ||
    location.state?.from ||
    "/home";

  const redirectState = location.state?.state || null;

  const safeRedirect = redirectTo.startsWith("/home")
    ? redirectTo
    : redirectTo.startsWith("/admin")
    ? "/admin/dashboard"
    : redirectTo === "/"
    ? "/home"
    : `/home${redirectTo.startsWith("/") ? "" : "/"}${redirectTo.replace(/^\//,"")}`;

  const wrapRef = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx,{stiffness:120,damping:25,mass:0.6});
  const sy = useSpring(my,{stiffness:120,damping:25,mass:0.6});

  const bgX = useTransform(sx,v => (v-window.innerWidth/2)*0.012);
  const bgY = useTransform(sy,v => (v-window.innerHeight/2)*0.012);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const tiltXS = useSpring(tiltX,{stiffness:140,damping:18});
  const tiltYS = useSpring(tiltY,{stiffness:140,damping:18});

  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  const glowXS = useSpring(glowX,{stiffness:200,damping:28});
  const glowYS = useSpring(glowY,{stiffness:200,damping:28});

  const [isFinePointer,setIsFinePointer] = useState(true);

  useEffect(()=>{
    const mq = window.matchMedia("(pointer: fine)");
    const update = ()=>setIsFinePointer(!!mq.matches);
    update();
    mq.addEventListener?.("change",update);
    return ()=>mq.removeEventListener?.("change",update);
  },[]);

  const onMove = (e)=>{
    mx.set(e.clientX);
    my.set(e.clientY);

    if(!wrapRef.current) return;

    const rect = wrapRef.current.getBoundingClientRect();

    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    glowX.set(relX);
    glowY.set(relY);

    const cx = rect.width/2;
    const cy = rect.height/2;

    const dx = (relX-cx)/cx;
    const dy = (relY-cy)/cy;

    tiltX.set(-dy*6);
    tiltY.set(dx*8);
  };

  const onLeave = ()=>{
    tiltX.set(0);
    tiltY.set(0);
  };

  const handleSubmit = async(e)=>{

    e.preventDefault();
    setError("");

    if(!email || !password){
      setError("Please enter email and password.");
      return;
    }

    try{

      setLoading(true);

      const data = await loginUser(email,password);

      if(!data?.success){
        setError(data?.message || "Login failed");
        return;
      }

      if(data.token) localStorage.setItem("token",data.token);
      if(data.user) localStorage.setItem("user",JSON.stringify(data.user));

      if(mode==="modal" && onSuccess){
        onSuccess();
        return;
      }

      navigate(safeRedirect,{replace:true,state:redirectState});

    }catch(err){

      console.error(err);
      setError("Network / server error. Please try again.");

    }finally{
      setLoading(false);
    }
  };

  const Form = (

    <div ref={wrapRef} className="relative z-10 w-full max-w-md">

      <motion.div
        className="pointer-events-none absolute -inset-10"
        style={{
          background:useTransform([glowXS,glowYS],([x,y])=>
            `radial-gradient(260px circle at ${x}px ${y}px, rgba(34,197,94,0.16), rgba(59,130,246,0.10), transparent 65%)`
          )
        }}
      />

      <div className="pointer-events-none absolute -inset-[1px] rounded-[26px] bg-gradient-to-r from-emerald-500/35 via-sky-500/25 to-indigo-500/30 blur-[14px] opacity-70"/>

      <motion.form
        onSubmit={handleSubmit}
        style={{rotateX:tiltXS,rotateY:tiltYS,transformStyle:"preserve-3d"}}
        initial={{opacity:0,scale:0.98,y:12}}
        animate={{opacity:1,scale:1,y:0}}
        transition={{duration:0.35}}
        className="relative w-full bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-8 shadow-[0_26px_90px_rgba(0,0,0,0.65)] overflow-hidden"
      >

        <div className="relative text-center mb-7">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.06] border border-white/12">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(34,197,94,0.7)]"/>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/70">
              FitTrack Access
            </p>
          </div>

          <h2 className="text-3xl font-extrabold mt-4">
            Welcome{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              Back
            </span>
          </h2>

          <p className="text-white/65 mt-2 text-sm">
            Login to continue your fitness journey.
          </p>

        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.22em] text-white/55">
            Email
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-black/25 border border-white/12 text-white/90 placeholder-white/35 outline-none focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20"
          />
        </div>

        <div className="space-y-2 mt-4">

          <label className="text-xs uppercase tracking-[0.22em] text-white/55">
            Password
          </label>

          <div className="relative">

            <input
              type={showPass?"text":"password"}
              placeholder="••••••••"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-black/25 border border-white/12 text-white/90 placeholder-white/35 outline-none focus:border-sky-400/40 focus:ring-2 focus:ring-sky-400/20 pr-20"
            />

            <button
              type="button"
              onClick={()=>setShowPass(v=>!v)}
              className="absolute inset-y-0 right-3 flex items-center text-xs text-white/55 hover:text-white"
            >
              {showPass?"HIDE":"SHOW"}
            </button>

          </div>

        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{scale:loading?1:1.01}}
          whileTap={{scale:loading?1:0.99}}
          className="mt-6 w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-semibold shadow-[0_12px_34px_rgba(34,197,94,0.25)]"
        >

          {loading ? "Signing in..." : "Login"}

        </motion.button>

        <div className="mt-5 flex items-center justify-between text-xs text-white/55">

          <button
            type="button"
            onClick={() =>
              navigate("/home/signup",{
                state:{backgroundLocation:location.state?.backgroundLocation || location}
              })
            }
            className="hover:text-white transition"
          >
            No account? <span className="text-emerald-300">Signup</span>
          </button>

          <span className="px-3 py-1.5 rounded-2xl bg-white/[0.06] border border-white/12 text-white/70">
            Secure Login
          </span>

        </div>

      </motion.form>

    </div>
  );

  if(mode==="modal") return Form;

  return (
    <section
      className="relative min-h-screen overflow-hidden text-white flex items-center justify-center px-6 bg-slate-950"
      onMouseMove={isFinePointer?onMove:undefined}
      onMouseLeave={isFinePointer?onLeave:undefined}
    >
      {Form}
    </section>
  );
}