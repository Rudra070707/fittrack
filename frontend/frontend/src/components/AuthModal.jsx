import { useEffect } from "react";
import { motion } from "framer-motion";

export default function AuthModal({ title, children, onClose }) {
  // ✅ ESC close + lock scroll
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
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 backdrop-blur-[10px]" />

        {/* moving aurora */}
        <motion.div
          className="absolute -top-56 -left-56 h-[520px] w-[520px] rounded-full bg-emerald-400/20 blur-[120px]"
          animate={{ x: [0, 70, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-64 -right-64 h-[620px] w-[620px] rounded-full bg-sky-400/16 blur-[140px]"
          animate={{ x: [0, -80, 0], y: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* grain */}
        <div className="absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.10)_1px,transparent_0)] [background-size:22px_22px]" />
      </motion.div>

      {/* Card */}
      <motion.div
        className="relative w-full max-w-md rounded-[28px] overflow-hidden"
        initial={{ y: 26, scale: 0.97, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 18, scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* outer glow frame */}
        <div className="pointer-events-none absolute -inset-[1px] rounded-[30px] bg-gradient-to-r from-emerald-400/35 via-sky-400/25 to-indigo-400/30 blur-[16px] opacity-70" />

        <div className="relative rounded-[28px] border border-white/10 bg-[#08101c]/75 backdrop-blur-2xl shadow-[0_35px_140px_rgba(0,0,0,0.78)] overflow-hidden">
          {/* inner shine */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-20 h-64 w-64 rotate-12 bg-white/10 blur-2xl" />
            <div className="absolute top-10 right-8 h-24 w-44 rotate-12 bg-white/7 blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black/30" />
          </div>

          {/* Header */}
          <div className="relative flex items-center justify-between px-6 py-4 border-b border-white/10">
            <p className="text-white/80 text-xs tracking-[0.35em] uppercase">
              {title}
            </p>

            <button
              onClick={onClose}
              className="group h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.10] transition flex items-center justify-center"
              aria-label="Close"
              type="button"
            >
              <span className="text-white/70 group-hover:text-white text-xl leading-none">
                ×
              </span>
            </button>
          </div>

          {/* Body */}
          <div className="relative p-6">{children}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}