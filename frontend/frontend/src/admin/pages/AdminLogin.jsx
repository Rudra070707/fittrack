import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../auth";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        alert(data.message || "Invalid credentials");
        return;
      }

      // ✅ clear old tokens (avoid mixing user/admin)
      localStorage.removeItem("token");
      localStorage.removeItem("userToken");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminRole");
      localStorage.removeItem("isAdmin");

      // ✅ store role if returned
      if (data.role) localStorage.setItem("adminRole", data.role);

      // ✅ IMPORTANT: pass token to loginAdmin (stores adminToken + isAdmin)
      if (data.token) {
        loginAdmin(data.token);
        navigate("/admin/dashboard");
      } else {
        alert("Token missing from server response.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Make sure backend is running on port 5000.");
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden text-white flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800" />

      {/* Glows + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-green-500/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 -right-24 w-[560px] h-[560px] bg-emerald-400/10 blur-[170px] rounded-full" />
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:26px_26px]" />
      </div>

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="
          relative z-10 w-full max-w-md mx-6
          bg-white/6 backdrop-blur-xl
          border border-white/10
          rounded-3xl p-10
          shadow-[0_25px_80px_rgba(0,0,0,0.65)]
        "
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_18px_rgba(34,197,94,0.7)]" />
            <p className="text-[11px] tracking-[0.35em] uppercase text-gray-300">
              FitTrack Admin
            </p>
          </div>

          <h2 className="text-4xl font-extrabold mt-5">
            Admin <span className="text-green-400">Login</span>
          </h2>

          <p className="text-gray-300 mt-3">
            Secure sign-in to manage members, plans and settings.
          </p>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.22em] text-gray-400">
            Email
          </label>
          <input
            type="email"
            placeholder="admin@fittrack.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-4 py-3 rounded-2xl
              bg-black/30 border border-white/15
              text-white placeholder-gray-500
              outline-none
              focus:ring-2 focus:ring-green-400/80
              focus:border-green-400/40
              transition
            "
          />
        </div>

        {/* Password */}
        <div className="space-y-2 mt-5">
          <label className="text-xs uppercase tracking-[0.22em] text-gray-400">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full px-4 py-3 rounded-2xl
              bg-black/30 border border-white/15
              text-white placeholder-gray-500
              outline-none
              focus:ring-2 focus:ring-green-400/80
              focus:border-green-400/40
              transition
            "
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="
            mt-7 w-full py-3.5 rounded-2xl
            bg-green-400 text-black font-semibold
            shadow-[0_0_28px_rgba(34,197,94,0.55)]
            hover:bg-green-500
            hover:shadow-[0_0_45px_rgba(34,197,94,0.75)]
            hover:scale-[1.02]
            transition-all duration-300
          "
        >
          Login
        </button>

        {/* Footer */}
        <div className="mt-7 flex items-center justify-between text-xs text-gray-500">
          <span>© {new Date().getFullYear()} FitTrack</span>
          <span className="px-3 py-1.5 rounded-2xl bg-white/[0.04] border border-white/10 text-gray-300">
            Secure Access
          </span>
        </div>
      </form>
    </section>
  );
}
