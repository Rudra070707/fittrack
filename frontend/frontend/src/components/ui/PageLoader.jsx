import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <div className="
      fixed inset-0 z-[999]
      flex items-center justify-center
      bg-[#05070c]/95 backdrop-blur-md
    ">

      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/3 w-[400px] h-[400px] bg-green-400/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-400/10 blur-[120px] rounded-full" />

        {/* 🔥 EXTRA DEPTH GLOW */}
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[300px] -translate-x-1/2 -translate-y-1/2 bg-cyan-400/10 blur-[140px] rounded-full" />
      </div>

      {/* 🔥 SUBTLE GRID */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] [background-size:22px_22px]" />

      {/* 🔄 Loader */}
      <div className="relative flex items-center justify-center">

        {/* 🔥 OUTER PULSE RING */}
        <div className="
          absolute
          w-20 h-20
          rounded-full
          bg-green-400/10
          animate-ping
        " />

        {/* 🔥 ROTATING GRADIENT RING (NEW) */}
        <motion.div
          className="absolute w-20 h-20 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #22c55e, #06b6d4, #22c55e)",
            maskImage: "radial-gradient(circle, transparent 60%, black 61%)",
            WebkitMaskImage: "radial-gradient(circle, transparent 60%, black 61%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />

        {/* Outer Ring */}
        <div className="
          w-12 h-12
          border-[3px] border-green-400/30
          rounded-full
        " />

        {/* 🔥 SECOND RING */}
        <div className="
          absolute
          w-16 h-16
          border border-green-400/10
          rounded-full
        " />

        {/* Inner Spinner */}
        <div className="
          absolute
          w-12 h-12
          border-[3px] border-green-400 border-t-transparent
          rounded-full animate-spin
          shadow-[0_0_25px_rgba(34,197,94,0.7)]
        " />

        {/* 🔥 COUNTER ROTATION */}
        <div className="
          absolute
          w-10 h-10
          border-[2px] border-emerald-300/40 border-b-transparent
          rounded-full animate-spin
        " style={{ animationDirection: "reverse", animationDuration: "1.2s" }} />

        {/* 🔥 INNER BREATHING GLOW (NEW) */}
        <motion.div
          className="absolute w-6 h-6 rounded-full bg-green-400/20 blur-xl"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Center Dot */}
        <div className="
          absolute w-2.5 h-2.5
          bg-green-400 rounded-full
          shadow-[0_0_14px_rgba(34,197,94,1)]
        " />

      </div>

      {/* 🔥 LOADING TEXT (UPGRADED) */}
      <motion.div
        className="absolute bottom-20 text-white/60 text-sm tracking-wide"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading experience...
      </motion.div>

    </div>
  );
}