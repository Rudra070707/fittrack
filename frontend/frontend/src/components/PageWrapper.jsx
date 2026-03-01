import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  const variants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const transition = { duration: 0.4, ease: "easeInOut" };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      style={{ minHeight: "100vh" }}
    >
      {children}
    </motion.div>
  );
}