import { motion } from "framer-motion";
import { useState } from "react";

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  error,
  success,
  disabled,
  ...props
}) {
  const [focused, setFocused] = useState(false);

  const isActive = focused || value;

  return (
    <div className="relative w-full">

      {/* 🔥 INPUT */}
      <motion.input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
        className={`
          w-full px-4 pt-6 pb-2 rounded-xl
          bg-white/5 backdrop-blur-md
          border transition-all duration-300
          text-white outline-none

          ${error
            ? "border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
            : success
            ? "border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
            : "border-white/10 focus:border-green-400 focus:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
          }

          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      />

      {/* 🔥 FLOATING LABEL */}
      <motion.label
        animate={{
          y: isActive ? -18 : 0,
          scale: isActive ? 0.8 : 1,
        }}
        transition={{ duration: 0.2 }}
        className={`
          absolute left-4 top-3 text-sm pointer-events-none
          ${error
            ? "text-red-400"
            : success
            ? "text-green-400"
            : "text-white/50"
          }
        `}
      >
        {label}
      </motion.label>

      {/* 🔥 GLOW EFFECT */}
      {!error && !disabled && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-green-400/10 blur-xl -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: focused ? 0.4 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* 🔥 ERROR TEXT */}
      {error && (
        <p className="text-red-400 text-xs mt-1">{error}</p>
      )}

      {/* 🔥 SUCCESS TEXT */}
      {success && !error && (
        <p className="text-green-400 text-xs mt-1">{success}</p>
      )}

    </div>
  );
}