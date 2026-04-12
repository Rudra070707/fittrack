import { useEffect } from "react";
import { motion } from "framer-motion";

export default function AuthModal({ title, children, onClose }) {

  // ✅ Lock scroll + ESC close
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >

      {/* 🔥 GLOBAL DEPTH BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#05080f] via-[#05080f] to-black" />
      </div>

      {/* BACKDROP */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >

        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 backdrop-blur-[20px]" />

        {/* 🔥 CENTER LIGHT */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-[520px] h-[320px] -translate-x-1/2 -translate-y-1/2 bg-emerald-400/10 blur-[150px]"
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* glow */}
        <motion.div
          className="absolute -top-56 -left-56 h-[520px] w-[520px] rounded-full bg-emerald-400/25 blur-[150px]"
          animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute -bottom-64 -right-64 h-[620px] w-[620px] rounded-full bg-sky-400/20 blur-[170px]"
          animate={{ x: [0, -90, 0], y: [0, -60, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute top-[30%] left-[20%] h-[300px] w-[300px] rounded-full bg-green-400/15 blur-[140px]"
          animate={{ x: [0, 60, 0] }}
          transition={{ duration: 16, repeat: Infinity }}
        />

        {/* texture */}
        <div className="absolute inset-0 opacity-[0.16] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.10)_1px,transparent_0)] [background-size:20px_20px]" />

        {/* noise */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"
          }}
        />

      </motion.div>

      {/* MODAL CARD */}
      <motion.div
        className="relative z-10 w-full max-w-md rounded-[30px]"
        initial={{ y: 50, scale: 0.92, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 25, scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* 🔥 FLOATING SHADOW */}
        <motion.div
          className="absolute -inset-6 translate-y-6 bg-black/50 blur-3xl rounded-[40px]"
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* outer glow */}
        <div className="pointer-events-none absolute -inset-[2px] rounded-[32px] bg-gradient-to-r from-emerald-400/40 via-sky-400/30 to-indigo-400/30 blur-[18px] opacity-90" />

        <div className="relative rounded-[30px] border border-white/10 bg-[#08101c]/80 backdrop-blur-2xl shadow-[0_40px_160px_rgba(0,0,0,0.85)] overflow-hidden">

          {/* 🔥 TOP LIGHT */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

          {/* shine */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-20 h-72 w-72 rotate-12 bg-white/10 blur-2xl" />
            <div className="absolute top-10 right-8 h-28 w-48 rotate-12 bg-white/8 blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] via-transparent to-black/40" />
          </div>

          {/* HEADER */}
          <div className="relative flex items-center justify-between px-6 py-4 border-b border-white/10">

            <p className="text-white/80 text-xs tracking-[0.4em] uppercase">
              {title}
            </p>

            <button
              onClick={onClose}
              className="
                group h-10 w-10 rounded-2xl
                border border-white/10
                bg-white/[0.05]
                hover:bg-white/[0.2]
                hover:scale-110
                hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]
                transition-all duration-300
                flex items-center justify-center
              "
              aria-label="Close modal"
              type="button"
            >
              <span className="text-white/70 group-hover:text-white text-xl transition">
                ×
              </span>
            </button>

          </div>

          {/* BODY */}
          <div className="relative p-6">

            {children}

          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}