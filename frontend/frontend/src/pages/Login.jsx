import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { loginUser, isAdminUser } from "../api";

export default function Login({ mode = "page", onSuccess }) {

  const navigate = useNavigate();
  const location = useLocation();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

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

  // 🔥 FINAL HANDLE SUBMIT (ADMIN + USER)
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

      // ✅ store user
      if(data.token) localStorage.setItem("token",data.token);
      if(data.user) localStorage.setItem("user",JSON.stringify(data.user));

      // 🔥 ADMIN CHECK (from api.js)
      const isAdmin = isAdminUser(data.user, email);

      if(isAdmin){
        localStorage.setItem("adminToken", data.token);

        if(mode==="modal" && onSuccess){
          onSuccess("/admin/dashboard");
          return;
        }

        navigate("/admin/dashboard",{replace:true});
        return;
      }

      // ✅ USER FLOW
      if(mode==="modal" && onSuccess){
        onSuccess(safeRedirect);
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

        <div className="text-center mb-7">
          <h2 className="text-3xl font-extrabold">
            Welcome <span className="text-emerald-400">Back</span>
          </h2>
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-black/25 text-white mb-4 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-black/25 text-white mb-4 outline-none"
        />

        {error && (
          <p className="text-red-400 text-sm mb-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-emerald-400 text-black rounded-xl font-semibold"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {/* SIGNUP LINK */}
        <p className="text-center text-white/60 text-sm mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() =>
              navigate("/home/signup", {
                state: {
                  backgroundLocation:
                    location.state?.backgroundLocation || location,
                },
              })
            }
            className="text-emerald-400 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>

      </motion.form>

    </div>
  );

  if(mode==="modal") return Form;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-slate-950"
      onMouseMove={isFinePointer?onMove:undefined}
      onMouseLeave={isFinePointer?onLeave:undefined}
    >
      {Form}
    </section>
  );
}