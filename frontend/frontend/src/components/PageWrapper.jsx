import { motion } from "framer-motion";
import { useEffect } from "react";

export default function PageWrapper({ children }) {

  const variants = {
    initial: {
      opacity: 0,
      y: 28,
      scale: 0.985
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: -24,
      scale: 0.985
    }
  };

  const transition = {
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1]
  };

  // optional: scroll to top on page change
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
        willChange: "transform, opacity",
        transform: "translateZ(0)"
      }}
    >
      {children}
    </motion.div>
  );
}