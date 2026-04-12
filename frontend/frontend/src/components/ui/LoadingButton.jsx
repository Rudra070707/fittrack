import { motion } from "framer-motion";
import { useState } from "react";

export default function LoadingButton({ loading, children, ...props }) {
  const [ripples, setRipples] = useState([]);

  const createRipple = (e) => {
    if (loading) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const size = 120;

    const newRipple = {
      x: e.clientX - rect.left - size / 2,
      y: e.clientY - rect.top - size / 2,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <motion.button
      whileHover={!loading ? { scale: 1.06, y: -2 } : {}}
      whileTap={{ scale: 0.92 }}
      disabled={loading}
      onClick={createRipple}
      {...props}
      className={`
        px-4 py-2 rounded-xl font-semibold
        bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400
        text-black transition-all duration-300
        flex items-center justify-center gap-2
        shadow-[0_0_20px_rgba(34,197,94,0.5)]
        hover:shadow-[0_0_50px_rgba(34,197,94,0.95)]
        active:shadow-[0_0_20px_rgba(34,197,94,0.6)]
        relative overflow-hidden
        ${loading ? "opacity-70 cursor-not-allowed" : ""}
      `}
    >

      {/* 🔥 TOP LIGHT LINE */}
      <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-70" />

      {/* 🔥 SHINE (SMOOTHER) */}
      {!loading && (
        <span className="
          absolute inset-0
          opacity-20
          bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.35),transparent)]
          animate-[shine_3s_linear_infinite]
        " />
      )}

      {/* 🔥 INNER GLOW */}
      {!loading && (
        <span className="
          absolute inset-0
          opacity-0 hover:opacity-100
          bg-green-400/20 blur-xl
          transition duration-300
        " />
      )}

      {/* 🔥 RIPPLE EFFECT */}
      <span className="absolute inset-0 overflow-hidden">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 animate-[ripple_0.6s_linear]"
            style={{
              width: 120,
              height: 120,
              top: ripple.y,
              left: ripple.x,
            }}
          />
        ))}
      </span>

      {/* 🔄 Loader */}
      {loading && (
        <span className="
          w-4 h-4
          border-2 border-black/80 border-t-transparent
          rounded-full animate-spin
          shadow-[0_0_10px_rgba(0,0,0,0.4)]
        " />
      )}

      {/* 🔥 PRESS EFFECT */}
      <span className="absolute inset-0 opacity-0 active:opacity-20 bg-black transition duration-150" />

      {/* Content (fade on loading) */}
      <span className={`relative z-10 tracking-wide transition ${loading ? "opacity-60" : ""}`}>
        {children}
      </span>

    </motion.button>
  );
}