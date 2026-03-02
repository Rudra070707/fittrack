import { motion } from "framer-motion";

export default function AuthModal({ title, children, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-[6px]"
        onClick={onClose}
      />

      <motion.div
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1220]/80 backdrop-blur-2xl shadow-[0_30px_120px_rgba(0,0,0,0.75)] overflow-hidden"
        initial={{ y: 18, scale: 0.98, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 12, scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <p className="text-white/80 text-sm tracking-[0.25em] uppercase">
            {title}
          </p>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="p-6">{children}</div>
      </motion.div>
    </motion.div>
  );
}