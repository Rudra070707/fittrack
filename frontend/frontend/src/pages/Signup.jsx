import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { signupUser } from "../api";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ----- ULTRA motion / glow (same style as AdminLogin) -----
  const wrapRef = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 120, damping: 25, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 120, damping: 25, mass: 0.6 });

  const bgX = useTransform(sx, (v) => (v - window.innerWidth / 2) * 0.012);
  const bgY = useTransform(sy, (v) => (v - window.innerHeight / 2) * 0.012);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXS = useSpring(tiltX, { stiffness: 140, damping: 18 });
  const tiltYS = useSpring(tiltY, { stiffness: 140, damping: 18 });

  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowXS = useSpring(glowX, { stiffness: 200, damping: 28 });
  const glowYS = useSpring(glowY, { stiffness: 200, damping: 28 });

  const [isFinePointer, setIsFinePointer] = useState(true);

  useEffect(() => {
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

    glowX.set(relX);
    glowY.set(relY);

    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const dx = (relX - cx) / cx;
    const dy = (relY - cy) / cy;

    tiltX.set(-dy * 6);
    tiltY.set(dx * 8);
  };

  const onLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.gender) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      const data = await signupUser(form);

      if (!data?.success) {
        setError(data?.message || "Signup failed");
        return;
      }

      // ✅ Success → go to login
      navigate("/home/login");
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden text-white flex items-center justify-center px-6 bg-slate-950"
      onMouseMove={isFinePointer ? onMove : undefined}
      onMouseLeave={isFinePointer ? onLeave : undefined}
    >
      {/* BACKGROUND (ULTRA) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />

        <motion.div
          className="absolute inset-0 opacity-80"
          style={isFinePointer ? { x: bgX, y: bgY } : undefined}
          animate={{
            background: [
              "radial-gradient(circle at 20% 25%, rgba(16,185,129,0.28), transparent 60%), radial-gradient(circle at 85% 40%, rgba(59,130,246,0.18), transparent 55%)",
              "radial-gradient(circle at 70% 15%, rgba(59,130,246,0.24), transparent 60%), radial-gradient(circle at 30% 80%, rgba(99,102,241,0.16), transparent 55%)",
              "radial-gradient(circle at 35% 70%, rgba(16,185,129,0.22), transparent 62%), radial-gradient(circle at 85% 60%, rgba(99,102,241,0.18), transparent 55%)",
              "radial-gradient(circle at 20% 25%, rgba(16,185,129,0.28), transparent 60%), radial-gradient(circle at 85% 40%, rgba(59,130,246,0.18), transparent 55%)",
            ],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute -top-52 -right-52 h-[760px] w-[760px] rounded-full bg-emerald-500/18 blur-[220px]"
          animate={{ x: [0, -70, 0], y: [0, 55, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 -left-60 h-[820px] w-[820px] rounded-full bg-sky-500/14 blur-[240px]"
          animate={{ x: [0, 70, 0], y: [0, 50, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-72 left-1/2 h-[920px] w-[920px] -translate-x-1/2 rounded-full bg-indigo-500/12 blur-[260px]"
          animate={{ y: [0, -70, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-0 opacity-[0.22] bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.16)_1px,transparent_0)] [background-size:34px_34px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      {/* WRAPPER */}
      <div ref={wrapRef} className="relative z-10 w-full max-w-md">
        {isFinePointer && (
          <motion.div
            className="pointer-events-none absolute -inset-10"
            style={{
              background: useTransform(
                [glowXS, glowYS],
                ([x, y]) =>
                  `radial-gradient(260px circle at ${x}px ${y}px, rgba(34,197,94,0.16), rgba(59,130,246,0.10), transparent 65%)`
              ),
            }}
          />
        )}

        <div className="pointer-events-none absolute -inset-[1px] rounded-[26px] bg-gradient-to-r from-emerald-500/35 via-sky-500/25 to-indigo-500/30 blur-[14px] opacity-70 animate-pulse" />

        <motion.form
          onSubmit={handleSubmit}
          style={
            isFinePointer
              ? { rotateX: tiltXS, rotateY: tiltYS, transformStyle: "preserve-3d" }
              : undefined
          }
          initial={{ opacity: 0, scale: 0.985, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-9 shadow-[0_26px_90px_rgba(0,0,0,0.65)] overflow-hidden"
        >
          {/* soft highlights */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-64 w-64 rotate-12 bg-white/10 blur-2xl" />
            <div className="absolute top-10 right-8 h-24 w-44 rotate-12 bg-white/7 blur-xl" />
            <div className="absolute bottom-10 left-8 h-20 w-56 -rotate-6 bg-white/5 blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-black/25" />
          </div>

          {/* Heading */}
          <div className="relative text-center mb-8" style={{ transform: "translateZ(18px)" }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.06] border border-white/12">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(34,197,94,0.7)]" />
              <p className="text-[11px] tracking-[0.35em] uppercase text-white/70">
                Join FitTrack
              </p>
            </div>

            <h2 className="text-4xl font-extrabold mt-5">
              Create{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
                Account
              </span>
            </h2>

            <p className="text-white/65 mt-3">Start your fitness journey with FitTrack.</p>
          </div>

          {/* Name */}
          <div className="relative space-y-2" style={{ transform: "translateZ(14px)" }}>
            <label className="text-xs uppercase tracking-[0.22em] text-white/55">
              Full Name
            </label>
            <input
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl bg-black/25 border border-white/12 text-white/90 placeholder-white/35 outline-none transition focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20"
            />
          </div>

          {/* Email */}
          <div className="relative space-y-2 mt-5" style={{ transform: "translateZ(14px)" }}>
            <label className="text-xs uppercase tracking-[0.22em] text-white/55">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl bg-black/25 border border-white/12 text-white/90 placeholder-white/35 outline-none transition focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20"
            />
          </div>

          {/* Password */}
          <div className="relative space-y-2 mt-5" style={{ transform: "translateZ(14px)" }}>
            <label className="text-xs uppercase tracking-[0.22em] text-white/55">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl bg-black/25 border border-white/12 text-white/90 placeholder-white/35 outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-sky-400/20"
            />
          </div>

          {/* Gender */}
          <div className="relative space-y-2 mt-5" style={{ transform: "translateZ(14px)" }}>
            <label className="text-xs uppercase tracking-[0.22em] text-white/55">
              Gender
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl bg-black/25 border border-white/12 text-white/90 outline-none transition focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20"
            >
              <option value="" className="bg-slate-950">
                Select Gender
              </option>
              <option value="Male" className="bg-slate-950">
                Male
              </option>
              <option value="Female" className="bg-slate-950">
                Female
              </option>
              <option value="Other" className="bg-slate-950">
                Other
              </option>
            </select>
          </div>

          {/* Error */}
          {error ? (
            <div
              className="relative mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              style={{ transform: "translateZ(14px)" }}
            >
              {error}
            </div>
          ) : null}

          {/* Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.99 }}
            className="relative mt-7 w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-semibold shadow-[0_12px_34px_rgba(34,197,94,0.25)] transition disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
            style={{ transform: "translateZ(18px)" }}
          >
            <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
              <span className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-white/35 blur-md translate-x-0 group-hover:translate-x-[260%] transition duration-700" />
            </span>

            <span className="relative inline-flex items-center justify-center gap-2">
              {loading && (
                <span className="h-4 w-4 rounded-full border-2 border-black/30 border-t-black/70 animate-spin" />
              )}
              {loading ? "Creating..." : "Create Account"}
            </span>
          </motion.button>

          {/* Bottom */}
          <div
            className="relative mt-6 flex items-center justify-between text-xs text-white/55"
            style={{ transform: "translateZ(12px)" }}
          >
            <button
              type="button"
              onClick={() => navigate("/home/login")}
              className="hover:text-white/85 transition"
            >
              Already registered? <span className="text-emerald-300">Login</span>
            </button>

            <span className="px-3 py-1.5 rounded-2xl bg-white/[0.06] border border-white/12 text-white/70">
              Secure Signup
            </span>
          </div>

          <p
            className="relative text-center text-white/35 text-xs mt-5"
            style={{ transform: "translateZ(10px)" }}
          >
            © {new Date().getFullYear()} FitTrack
          </p>
        </motion.form>
      </div>
    </section>
  );
}