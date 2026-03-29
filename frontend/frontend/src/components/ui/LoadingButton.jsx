import { motion } from "framer-motion";

export default function LoadingButton({ loading, children, ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      disabled={loading}
      {...props}
      className={`
        px-4 py-2 rounded-xl font-semibold
        bg-gradient-to-r from-green-400 to-emerald-400
        text-black transition
        flex items-center justify-center gap-2
        ${loading ? "opacity-70 cursor-not-allowed" : ""}
      `}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </motion.button>
  );
}