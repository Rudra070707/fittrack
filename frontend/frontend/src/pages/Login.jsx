import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Redirect back to intended route after login
  const redirectTo = location.state?.from || "/home";
  const redirectState = location.state?.state || null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return alert("Please enter email & password");

    try {
      const data = await loginUser(email, password);

      if (!data?.success) return alert(data?.message || "Login failed");

      // ✅ Save token + user
      if (data.token) localStorage.setItem("token", data.token);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful ✅");

      // ✅ Go back to intended page
      navigate(redirectTo, { replace: true, state: redirectState });
    } catch (err) {
      console.error(err);
      alert("Network / server error");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-6 text-white">
      {/* Premium glows + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-green-500/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 -right-24 w-[560px] h-[560px] bg-emerald-400/10 blur-[170px] rounded-full" />
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:26px_26px]" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="
          relative z-10 w-full max-w-md
          bg-white/10 backdrop-blur-xl
          border border-white/15
          shadow-[0_25px_90px_rgba(0,0,0,0.75)]
          rounded-3xl p-10
        "
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <p className="text-green-400 font-semibold tracking-[0.28em] text-xs">
            FITTRACK ACCESS
          </p>
          <h2 className="text-4xl font-extrabold mt-3">
            Welcome <span className="text-green-400">Back</span>
          </h2>
          <p className="text-gray-300 mt-3">
            Login to continue your fitness journey
          </p>
        </div>

        {/* Email */}
        <label className="text-sm text-gray-300 font-medium">Email</label>
        <div className="mt-2 relative">
          <input
            type="email"
            placeholder="you@example.com"
            className="
              w-full px-4 py-3 rounded-2xl
              bg-black/30 border border-white/10
              text-white placeholder-gray-500
              outline-none
              focus:ring-2 focus:ring-green-400/80
              focus:border-green-400/40
              transition
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
            @
          </span>
        </div>

        {/* Password */}
        <label className="text-sm text-gray-300 font-medium block mt-5">
          Password
        </label>
        <div className="mt-2 relative">
          <input
            type="password"
            placeholder="••••••••"
            className="
              w-full px-4 py-3 rounded-2xl
              bg-black/30 border border-white/10
              text-white placeholder-gray-500
              outline-none
              focus:ring-2 focus:ring-green-400/80
              focus:border-green-400/40
              transition
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
            🔒
          </span>
        </div>

        {/* Button */}
        <button
          className="
            mt-7 w-full py-3 rounded-2xl
            bg-green-400 text-black font-semibold
            shadow-[0_0_30px_rgba(34,197,94,0.6)]
            hover:bg-green-500
            hover:shadow-[0_0_45px_rgba(34,197,94,0.75)]
            hover:scale-[1.02]
            transition-all duration-300
          "
        >
          Login
        </button>

        {/* Bottom */}
        <p className="text-center mt-6 text-gray-300">
          No account?{" "}
          <span
            className="text-green-400 cursor-pointer font-semibold hover:underline"
            onClick={() => navigate("/home/signup")}
          >
            Signup
          </span>
        </p>

        <p className="text-center text-gray-500 text-xs mt-5">
          © {new Date().getFullYear()} FitTrack • Secure Login
        </p>
      </form>
    </div>
  );
}
