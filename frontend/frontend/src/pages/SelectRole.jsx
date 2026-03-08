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

  // Safe viewport center values
  const viewportW = typeof window !== "undefined" ? window.innerWidth : 1440;
  const viewportH = typeof window !== "undefined" ? window.innerHeight : 900;

  // Convert to parallax offsets (small movement)
  const bgX = useTransform(sx, (v) => (v - viewportW / 2) * 0.012);
  const bgY = useTransform(sy, (v) => (v - viewportH / 2) * 0.012);

  // Card tilt based on cursor position inside wrapper
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXS = useSpring(tiltX, { stiffness: 140, damping: 18 });
  const tiltYS = useSpring(tiltY, { stiffness: 140, damping: 18 });

  // Live cursor glow inside wrapper
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowXS = useSpring(glowX, { stiffness: 220, damping: 26 });
  const glowYS = useSpring(glowY, { stiffness: 220, damping: 26 });

  const glowBg = useTransform([glowXS, glowYS], ([x, y]) => {
    return `radial-gradient(280px circle at ${x}px ${y}px,
      rgba(34,197,94,0.22),
      rgba(59,130,246,0.12),
      transparent 66%)`;
  });

  const [isFinePointer, setIsFinePointer] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setIsFinePointer(!!mq.matches);
    update();

    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } else {
      mq.addListener(update);
      return () => mq.removeListener(update);
    }
  }, []);

  const onMove = (e) => {
    mx.set(e.clientX);
    my.set(e.clientY);

    if (!wrapRef.current) return;

    const rect = wrapRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    glowX.set(relX);
    glowY.set(relY);

    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const dx = (relX - cx) / cx;
    const dy = (relY - cy) / cy;

    tiltX.set(-dy * 7);
    tiltY.set(dx * 9);
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

  const particles = useMemo(() => {
    const n = 22;
    return Array.from({ length: n }).map((_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = 2 + Math.random() * 3.5;
      const dur = 6 + Math.random() * 10;
      const driftX = (Math.random() * 2 - 1) * 18;
      const driftY = -(18 + Math.random() * 38);
      const delay = Math.random() * 3;
      const opacity = 0.18 + Math.random() * 0.22;
      return { i, left, top, size, dur, driftX, driftY, delay, opacity };
    });
  }, []);

  const openLoginModal = () => {
    navigate("/home/login", {
      state: { backgroundLocation: { pathname: "/home" } },
    });
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center px-6 text-white"
      onMouseMove={isFinePointer ? onMove : undefined}
      onMouseLeave={isFinePointer ? onLeave : undefined}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#05070c] via-[#050a12] to-black" />

        <motion.div
          className="absolute inset-0 opacity-80"
          style={isFinePointer ? { x: bgX, y: bgY } : undefined}
          animate={{
            background: [
              "radial-gradient(circle at 22% 28%, rgba(16,185,129,0.28), transparent 62%), radial-gradient(circle at 82% 32%, rgba(59,130,246,0.22), transparent 58%), radial-gradient(circle at 55% 82%, rgba(99,102,241,0.18), transparent 62%)",
              "radial-gradient(circle at 70% 18%, rgba(59,130,246,0.25), transparent 62%), radial-gradient(circle at 30% 78%, rgba(16,185,129,0.22), transparent 60%), radial-gradient(circle at 88% 68%, rgba(99,102,241,0.18), transparent 60%)",
              "radial-gradient(circle at 18% 40%, rgba(16,185,129,0.26), transparent 62%), radial-gradient(circle at 78% 52%, rgba(99,102,241,0.20), transparent 60%), radial-gradient(circle at 52% 18%, rgba(59,130,246,0.18), transparent 62%)",
              "radial-gradient(circle at 22% 28%, rgba(16,185,129,0.28), transparent 62%), radial-gradient(circle at 82% 32%, rgba(59,130,246,0.22), transparent 58%), radial-gradient(circle at 55% 82%, rgba(99,102,241,0.18), transparent 62%)",
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute -top-56 -left-56 h-[820px] w-[820px] rounded-full bg-emerald-500/16 blur-[240px]"
          animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -top-40 -right-64 h-[860px] w-[860px] rounded-full bg-sky-500/14 blur-[260px]"
          animate={{ x: [0, -70, 0], y: [0, 55, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-72 left-1/2 h-[980px] w-[980px] -translate-x-1/2 rounded-full bg-indigo-500/12 blur-[290px]"
          animate={{ y: [0, -70, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-0">
          {particles.map((p) => (
            <motion.span
              key={p.i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
              }}
              animate={{
                x: [0, p.driftX, 0],
                y: [0, p.driftY, 0],
                opacity: [p.opacity, p.opacity + 0.18, p.opacity],
              }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}
        </div>

        <motion.div
          className="absolute -top-40 left-[-40%] h-[420px] w-[140%] rotate-[-10deg] opacity-[0.12]"
          animate={{ x: ["-8%", "8%", "-8%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.65) 20%, transparent 45%, rgba(255,255,255,0.35) 70%, transparent 100%)",
            filter: "blur(18px)",
          }}
        />
        <motion.div
          className="absolute bottom-[-220px] left-[-60%] h-[520px] w-[160%] rotate-[12deg] opacity-[0.10]"
          animate={{ x: ["10%", "-10%", "10%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(34,197,94,0.65) 25%, transparent 55%, rgba(59,130,246,0.45) 75%, transparent 100%)",
            filter: "blur(22px)",
          }}
        />

        <div className="absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.10)_1px,transparent_0)] [background-size:22px_22px]" />
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:100%_7px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.75)_100%)]" />
      </div>

      <div ref={wrapRef} className="relative z-10 w-full max-w-md">
        {isFinePointer && (
          <motion.div
            className="pointer-events-none absolute -inset-10"
            style={{ background: glowBg }}
          />
        )}

        <div className="pointer-events-none absolute -inset-[1px] rounded-[28px] bg-gradient-to-r from-emerald-500/45 via-sky-500/35 to-indigo-500/40 blur-[14px] opacity-75 animate-pulse" />

        <motion.div
          style={
            isFinePointer
              ? { rotateX: tiltXS, rotateY: tiltYS, transformStyle: "preserve-3d" }
              : undefined
          }
          initial={{ opacity: 0, scale: 0.985, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[28px] border border-white/15 bg-white/7 backdrop-blur-2xl shadow-[0_28px_110px_rgba(0,0,0,0.70)] overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-28 -left-28 h-72 w-72 rotate-12 bg-white/10 blur-2xl" />
            <div className="absolute top-10 right-10 h-24 w-44 rotate-12 bg-white/7 blur-xl" />
            <div className="absolute bottom-10 left-8 h-20 w-60 -rotate-6 bg-white/5 blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black/30" />
          </div>

          <motion.div
            className="pointer-events-none absolute -top-24 -left-40 h-64 w-64 rotate-12 bg-white/10 blur-2xl"
            animate={{ x: [0, 520, 0], y: [0, 160, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative p-9 text-center"
            style={{ transform: "translateZ(18px)" }}
          >
            <motion.div
              variants={item}
              className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs text-white/75"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(34,197,94,0.85)]" />
              FITTRACK PLATFORM
            </motion.div>

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

            <motion.div variants={item} className="mt-6 flex flex-wrap justify-center gap-2">
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
                  className="rounded-full border border-white/15 bg-white/7 px-3 py-1 text-xs text-white/80 shadow-sm"
                >
                  {c.e} {c.t}
                </motion.span>
              ))}
            </motion.div>

            <motion.div variants={item} className="mt-9 space-y-3">
              <motion.button
                type="button"
                onClick={openLoginModal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-4 py-3.5 text-base font-semibold text-slate-950 shadow-[0_12px_34px_rgba(34,197,94,0.28)] transition"
              >
                <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                  <span className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-white/40 blur-md translate-x-0 group-hover:translate-x-[260%] transition duration-700" />
                </span>
                <span className="relative inline-flex items-center justify-center gap-2">
                  <span className="text-lg">👤</span>
                  User Login
                </span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => navigate("/admin/login")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                className="w-full rounded-2xl border border-white/15 bg-white/7 px-4 py-3.5 text-base font-semibold text-white/90 shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition hover:bg-white/12"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <span className="text-lg">🛠️</span>
                  Admin Login
                </span>
              </motion.button>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex items-center justify-center gap-2 text-xs text-white/50"
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