import { motion } from "framer-motion";
import { useEffect } from "react";

export default function PageWrapper({ children }) {

  const variants = {
    initial: {
      opacity: 0,
      y: 32,
      scale: 0.985,
      filter: "blur(6px)"
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)"
    },
    out: {
      opacity: 0,
      y: -28,
      scale: 0.985,
      filter: "blur(4px)"
    }
  };

  const transition = {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1]
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      style={{
        minHeight: "100vh",
        willChange: "transform, opacity, filter",

        // ❌ THIS WAS BREAKING CHATBOT
        // transform: "translateZ(0)",

        // ❌ ALSO BREAKING
        // perspective: "1000px",

        // ❌ CLIPPING FLOATING ELEMENTS
        // overflow: "hidden",

        // ✅ SAFE VERSION
        position: "relative",
        overflow: "visible"
      }}
    >

      {/* 🔥 GLOBAL BACKGROUND BASE (NEW LAYER) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 30%, rgba(34,197,94,0.08), transparent 50%), radial-gradient(circle at 80% 20%, rgba(6,182,212,0.08), transparent 50%)",
          zIndex: 0
        }}
      />

      {/* 🔥 GLOBAL BACKGROUND GLOW LAYER */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          left: "-150px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(0,255,156,0.18), transparent 70%)",
          filter: "blur(140px)",
          zIndex: 0
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          right: "-150px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(0,194,255,0.18), transparent 70%)",
          filter: "blur(140px)",
          zIndex: 0
        }}
      />

      {/* 🔥 EXTRA DEPTH GLOW */}
      <motion.div
        style={{
          position: "absolute",
          top: "20%",
          left: "30%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(34,197,94,0.12), transparent 70%)",
          filter: "blur(120px)",
          zIndex: 0
        }}
        animate={{
          x: [0, 80, 0],
          y: [0, 40, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity
        }}
      />

      {/* 🔥 GRAIN */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          mixBlendMode: "overlay",
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
          zIndex: 0
        }}
      />

      {/* 🔥 CONTENT */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>

    </motion.div>
  );
}