import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { loginUser, isAdminUser } from "../api";

// 🔥 NEW (IMPORTANT)
const normalizeToken = (token) => {
  if (!token) return null;
  return token.startsWith("Bearer ") ? token.split(" ")[1] : token;
};

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

      const cleanToken = normalizeToken(data.token);

      if(cleanToken) localStorage.setItem("token", cleanToken);
      if(data.user) localStorage.setItem("user", JSON.stringify(data.user));

      console.log("LOGIN TOKEN:", cleanToken);

      const isAdmin = isAdminUser(data.user, email);

      if(isAdmin){
        localStorage.setItem("adminToken", cleanToken);

        if(mode==="modal" && onSuccess){
          onSuccess("/admin/dashboard");
          return;
        }

        navigate("/admin/dashboard",{replace:true});
        return;
      }

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

      {/* 🔥 GLOBAL GLOW BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-green-400/10 blur-[160px] -top-20 -left-20" />
        <div className="absolute w-[500px] h-[500px] bg-cyan-400/10 blur-[160px] bottom-0 right-0" />
      </div>

      {/* 🔥 Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-12"
        style={{
          background:useTransform([glowXS,glowYS],([x,y])=>
            `radial-gradient(300px circle at ${x}px ${y}px, rgba(34,197,94,0.2), rgba(59,130,246,0.12), transparent 70%)`
          )
        }}
      />

      {/* 🔥 BORDER GLOW */}
      <div className="pointer-events-none absolute -inset-[2px] rounded-[30px] bg-gradient-to-r from-emerald-400/50 via-sky-400/40 to-indigo-400/40 blur-[20px] opacity-90"/>

      <motion.form
        onSubmit={handleSubmit}
        style={{rotateX:tiltXS,rotateY:tiltYS,transformStyle:"preserve-3d"}}
        initial={{opacity:0,scale:0.96,y:20}}
        animate={{opacity:1,scale:1,y:0}}
        transition={{duration:0.5}}
        className="relative w-full bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-8 shadow-[0_40px_140px_rgba(0,0,0,0.9)] overflow-hidden"
      >

        {/* 🔥 SHINE */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-20 w-80 h-80 bg-white/10 blur-2xl rotate-12"/>
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black/50"/>
        </div>

        <div className="text-center mb-7 relative z-10">

          <motion.div
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 backdrop-blur-md mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            🔐 Secure Login
          </motion.div>

          <h2 className="text-3xl font-extrabold tracking-wide">
            Welcome <span className="text-emerald-400 drop-shadow-[0_0_12px_rgba(34,197,94,0.7)]">Back</span>
          </h2>
        </div>

        {/* 🔥 INPUTS (UPGRADED BUT SAME STYLE) */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          disabled={loading}
          onChange={(e)=>setEmail(e.target.value)}
          className="
            w-full px-4 py-3 rounded-2xl
            bg-white/5 backdrop-blur-md
            border border-white/10
            text-white mb-4 outline-none
            transition-all duration-300

            hover:border-white/20
            focus:border-emerald-400
            focus:ring-2 focus:ring-emerald-400/40

            shadow-inner shadow-black/20
            disabled:opacity-60
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          disabled={loading}
          onChange={(e)=>setPassword(e.target.value)}
          className="
            w-full px-4 py-3 rounded-2xl
            bg-white/5 backdrop-blur-md
            border border-white/10
            text-white mb-4 outline-none
            transition-all duration-300

            hover:border-white/20
            focus:border-emerald-400
            focus:ring-2 focus:ring-emerald-400/40

            shadow-inner shadow-black/20
            disabled:opacity-60
          "
        />

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm mb-3"
          >
            {error}
          </motion.p>
        )}

        {/* 🔥 BUTTON (UPGRADED) */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-3 rounded-xl font-semibold tracking-wide
            bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400
            text-black
            transition-all duration-300
            shadow-[0_0_30px_rgba(34,197,94,0.8)]
            hover:shadow-[0_0_70px_rgba(34,197,94,1)]
            hover:scale-[1.04]
            active:scale-[0.96]
            disabled:opacity-70
            relative overflow-hidden
          "
        >
          <span className="absolute inset-0 overflow-hidden">
            <span className="absolute w-1/2 h-full bg-white/20 blur-lg -left-1/2 animate-[shine_2s_infinite]" />
          </span>

          <span className="relative z-10">
            {loading ? "Signing in..." : "Login"}
          </span>
        </button>

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
      className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden"
      onMouseMove={isFinePointer?onMove:undefined}
      onMouseLeave={isFinePointer?onLeave:undefined}
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[700px] h-[700px] bg-green-400/10 blur-[160px] top-[-150px] left-[-150px]" />
        <div className="absolute w-[700px] h-[700px] bg-cyan-400/10 blur-[160px] bottom-[-150px] right-[-150px]" />
      </div>

      {Form}
    </section>
  );
}