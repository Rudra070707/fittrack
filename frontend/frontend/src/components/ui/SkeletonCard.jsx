import { motion } from "framer-motion";

export default function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        relative overflow-hidden
        rounded-3xl p-6
        bg-white/5 backdrop-blur-md
        border border-white/10
        shadow-[0_0_25px_rgba(0,0,0,0.4)]
      "
    >

      {/* 🔥 OUTER GLOW */}
      <div className="absolute -inset-3 opacity-30 bg-green-400/10 blur-2xl rounded-3xl pointer-events-none" />

      {/* 🔥 MAIN SHIMMER */}
      <div className="
        absolute inset-0
        bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)]
        animate-[shine_2.5s_linear_infinite]
      " />

      {/* 🔥 SECOND SHIMMER */}
      <div className="
        absolute inset-0
        opacity-30
        bg-[linear-gradient(90deg,transparent,rgba(34,197,94,0.08),transparent)]
        animate-[shine_3s_linear_infinite]
      " />

      {/* 🔥 NEW: SOFT GLOW SWEEP */}
      <motion.div
        className="absolute inset-0 bg-green-400/10 blur-2xl"
        animate={{ opacity: [0, 0.25, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* 🔥 NEW: FLOATING LIGHT (adds life) */}
      <motion.div
        className="absolute -top-10 left-1/2 w-40 h-40 bg-green-400/10 blur-3xl rounded-full"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* 🔥 TOP LIGHT LINE */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* 🔥 DEPTH OVERLAY (NEW) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />

      {/* Content */}
      <div className="relative">

        {/* 🔥 TITLE BAR */}
        <motion.div
          className="h-5 bg-white/10 rounded w-1/2 mb-5 relative overflow-hidden"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-white/5 blur-sm" />
        </motion.div>

        <div className="space-y-3">

          <motion.div
            className="h-4 bg-white/10 rounded w-full relative overflow-hidden"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <div className="absolute inset-0 bg-white/5 blur-sm" />
          </motion.div>

          <motion.div
            className="h-4 bg-white/10 rounded w-5/6 relative overflow-hidden"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="absolute inset-0 bg-white/5 blur-sm" />
          </motion.div>

          <motion.div
            className="h-4 bg-white/10 rounded w-3/4 relative overflow-hidden"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            <div className="absolute inset-0 bg-white/5 blur-sm" />
          </motion.div>

        </div>

      </div>

      {/* 🔥 NOISE */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"
        }}
      />

    </motion.div>
  );
}