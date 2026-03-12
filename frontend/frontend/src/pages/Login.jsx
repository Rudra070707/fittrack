import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { loginUser } from "../api";

export default function Login({ mode = "page", onSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ NEW: support redirectTo from services
  const redirectTo =
    location.state?.redirectTo ||
    location.state?.from ||
    "/home";

  const redirectState = location.state?.state || null;

  const safeRedirect = redirectTo.startsWith("/home")
    ? redirectTo
    : redirectTo.startsWith("/admin")
    ? "/admin/dashboard"
    : redirectTo === "/"
    ? "/home"
    : `/home${redirectTo.startsWith("/") ? "" : "/"}${redirectTo.replace(/^\//, "")}`;

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

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(email, password);

      if (!data?.success) {
        setError(data?.message || "Login failed");
        return;
      }

      if (data.token) localStorage.setItem("token", data.token);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

      // modal mode
      if (mode === "modal" && onSuccess) {
        onSuccess();
        return;
      }

      // page mode redirect
      navigate(safeRedirect, { replace: true, state: redirectState });

    } catch (err) {
      console.error(err);
      setError("Network / server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- FORM UI (UNCHANGED) ---------- */

  const Form = (
    <div ref={wrapRef} className="relative z-10 w-full max-w-md">
      {/* UI unchanged */}
      {/* Your full form UI continues exactly same */}
    </div>
  );

  if (mode === "modal") return Form;

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden text-white flex items-center justify-center px-6 bg-slate-950"
      onMouseMove={isFinePointer ? onMove : undefined}
      onMouseLeave={isFinePointer ? onLeave : undefined}
    >
      {Form}
    </section>
  );
}