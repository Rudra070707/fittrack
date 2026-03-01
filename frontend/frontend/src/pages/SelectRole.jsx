import { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function SelectRole() {
  const navigate = useNavigate();
  const wrapRef = useRef(null);

  // Mouse position (relative to viewport)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Smooth cursor-follow (springs)
  const sx = useSpring(mx, { stiffness: 120, damping: 25, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 120, damping: 25, mass: 0.6 });

  // Convert to parallax offsets (small movement)
  const bgX = useTransform(sx, (v) => (v - window.innerWidth / 2) * 0.012);
  const bgY = useTransform(sy, (v) => (v - window.innerHeight / 2) * 0.012);

  // Card tilt based on cursor position inside wrapper
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXS = useSpring(tiltX, { stiffness: 140, damping: 18 });
  const tiltYS = useSpring(tiltY, { stiffness: 140, damping: 18 });

  // Live cursor glow inside wrapper
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowXS = useSpring(glowX, { stiffness: 200, damping: 28 });
  const glowYS = useSpring(glowY, { stiffness: 200, damping: 28 });

  const [isFinePointer, setIsFinePointer] = useState(true);

  useEffect(() => {
    // Disable heavy cursor effects on touch devices
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setIsFinePointer(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const onMove = (e) => {
    mx.set(e.clientX);
    my.set(e.clientY);

    if (!wrapRef.current) return;

    const rect = wrapRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    // cursor glow relative to wrapper
    glowX.set(relX);
    glowY.set(relY);

    // tilt based on center
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const dx = (relX - cx) / cx; // -1..1
    const dy = (relY - cy) / cy; // -1..1

    // subtle tilt
    tiltX.set(-dy * 7); // rotateX
    tiltY.set(dx * 9); // rotateY
  };

  const onLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const container = useMemo(
    () => ({
      hidden: { opacity: 0, y: 14 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          staggerChildren: 0.08,
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    }),
    []
  );

  const item = useMemo(
    () => ({
      hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.45 },
      },
    }),
    []
  );

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center px-6 text-white"
      onMouseMove={isFinePointer ? onMove : undefined}
      onMouseLeave={isFinePointer ? onLeave : undefined}
    >
      {/* BACKGROUND (parallax) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Aurora gradient animation */}
        <motion.div
          className="absolute inset-0 opacity-70"
          style={isFinePointer ? { x: bgX, y: bgY } : undefined}
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(16,185,129,0.25), transparent 60%)",
              "radial-gradient(circle at 80% 40%, rgba(59,130,246,0.25), transparent 60%)",
              "radial-gradient(circle at 50% 80%, rgba(99,102,241,0.22), transparent 60%)",
              "radial-gradient(circle at 20% 30%, rgba(16,185,129,0.25), transparent 60%)",
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating glow blobs */}
        <motion.div
          className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-emerald-500/18 blur-[190px]"
          style={isFinePointer ? { x: bgX, y: bgY } : undefined}
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute top-20 -right-40 h-[620px] w-[620px] rounded-full bg-sky-500/16 blur-[210px]"
          style={isFinePointer ? { x: bgX, y: bgY } : undefined}
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute -bottom-60 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-500/12 blur-[240px]"
          style={isFinePointer ? { x: bgX, y: bgY } : undefined}
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Spotlight center glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.14] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:24px_24px]" />

        {/* Subtle noise overlay (no external URL) */}
        <div className="absolute inset-0 opacity-[0.04] bg-white/5 mix-blend-overlay" />

        {/* Dark vignette edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/65" />
      </div>

      {/* WRAPPER (used for glow coordinates) */}
      <div ref={wrapRef} className="relative z-10 w-full max-w-md">
        {/* Cursor glow (follows mouse) */}
        {isFinePointer && (
          <motion.div
            className="pointer-events-none absolute -inset-10"
            style={{
              background: useTransform(
                [glowXS, glowYS],
                ([x, y]) =>
                  `radial-gradient(260px circle at ${x}px ${y}px, rgba(34,197,94,0.18), rgba(59,130,246,0.10), transparent 65%)`
              ),
            }}
          />
        )}

        {/* Gradient border */}
        <div className="pointer-events-none absolute -inset-[1px] rounded-[26px] bg-gradient-to-r from-emerald-500/40 via-sky-500/30 to-indigo-500/35 blur-[14px] opacity-70 animate-pulse" />

        {/* CARD with tilt + glass reflections */}
        <motion.div
          style={
            isFinePointer
              ? { rotateX: tiltXS, rotateY: tiltYS, transformStyle: "preserve-3d" }
              : undefined
          }
          initial={{ opacity: 0, scale: 0.985, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-white/15 bg-white/6 backdrop-blur-2xl shadow-[0_26px_90px_rgba(0,0,0,0.65)] overflow-hidden"
        >
          {/* Glass reflections */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-64 w-64 rotate-12 bg-white/10 blur-2xl" />
            <div className="absolute top-8 right-10 h-24 w-40 rotate-12 bg-white/7 blur-xl" />
            <div className="absolute bottom-10 left-8 h-20 w-56 -rotate-6 bg-white/5 blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-black/25" />
          </div>

          {/* Moving shine sweep */}
          <motion.div
            className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rotate-12 bg-white/10 blur-2xl"
            animate={{ x: [0, 420], y: [0, 120] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative p-9 text-center"
            style={{ transform: "translateZ(20px)" }}
          >
            {/* Badge */}
            <motion.div
              variants={item}
              className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/7 px-3 py-1 text-xs text-white/70"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(34,197,94,0.85)]" />
              FITTRACK PLATFORM
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={item}
              className="mt-5 text-4xl font-semibold tracking-tight"
            >
              Welcome to{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
                FitTrack
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-3 text-sm leading-relaxed text-white/65"
            >
              Choose how you want to access the platform.
            </motion.p>

            {/* Chips */}
            <motion.div
              variants={item}
              className="mt-6 flex flex-wrap justify-center gap-2"
            >
              {[
                { t: "Progress", e: "📊" },
                { t: "Diet", e: "🥗" },
                { t: "Workouts", e: "🏋️" },
                { t: "Injury-safe", e: "🛡️" },
              ].map((c) => (
                <motion.span
                  key={c.t}
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.99 }}
                  className="rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs text-white/75 shadow-sm"
                >
                  {c.e} {c.t}
                </motion.span>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div variants={item} className="mt-9 space-y-3">
              {/* User Primary */}
              <motion.button
                type="button"
                onClick={() => navigate("/home/login")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-4 py-3.5 text-base font-semibold text-slate-950 shadow-[0_12px_34px_rgba(34,197,94,0.25)] transition"
              >
                {/* Button shine */}
                <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                  <span className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-white/35 blur-md translate-x-0 group-hover:translate-x-[260%] transition duration-700" />
                </span>
                <span className="relative">User Login</span>
              </motion.button>

              {/* Admin Secondary */}
              <motion.button
                type="button"
                onClick={() => navigate("/admin/login")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                className="w-full rounded-2xl border border-white/15 bg-white/6 px-4 py-3.5 text-base font-semibold text-white/90 shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition hover:bg-white/10"
              >
                Admin Login
              </motion.button>
            </motion.div>

            {/* Footer */}
            <motion.div
              variants={item}
              className="mt-8 flex items-center justify-center gap-2 text-xs text-white/45"
            >
              <span>© {new Date().getFullYear()} FitTrack</span>
              <span className="opacity-50">•</span>
              <span>Smart Gym Management</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}