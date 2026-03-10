import { motion } from "framer-motion";

export default function PageWrapper({ children }) {

  const variants = {
    initial: {
      opacity: 0,
      y: 30,
      scale: 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: -30,
      scale: 0.98
    }
  };

  const transition = {
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1]   // smoother easing
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      style={{
        minHeight: "100vh",
        willChange: "transform, opacity"
      }}
    >
      {children}
    </motion.div>
  );
}