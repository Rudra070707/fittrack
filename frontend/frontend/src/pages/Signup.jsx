import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.gender)
      return alert("All fields required");

    try {
      const data = await signupUser(form);

      if (!data.success) return alert(data.message || "Signup failed");

      alert("Account created");
      navigate("/home/login"); // ✅ FIXED (was /login)
    } catch (err) {
      console.error(err);
      alert("Server error. Make sure backend running.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-6 text-white">
      {/* Premium glows + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 w-[520px] h-[520px] bg-green-500/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 -left-24 w-[560px] h-[560px] bg-emerald-400/10 blur-[170px] rounded-full" />
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
            JOIN FITTRACK
          </p>
          <h2 className="text-4xl font-extrabold mt-3">
            Create <span className="text-green-400">Account</span>
          </h2>
          <p className="text-gray-300 mt-3">
            Start your fitness journey with FitTrack
          </p>
        </div>

        {/* Name */}
        <label className="text-sm text-gray-300 font-medium">Full Name</label>
        <input
          name="name"
          placeholder="Your name"
          className="
            mt-2 w-full px-4 py-3 rounded-2xl
            bg-black/30 border border-white/10
            text-white placeholder-gray-500
            outline-none
            focus:ring-2 focus:ring-green-400/80
            focus:border-green-400/40
            transition
          "
          onChange={handleChange}
        />

        {/* Email */}
        <label className="text-sm text-gray-300 font-medium block mt-5">
          Email
        </label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          className="
            mt-2 w-full px-4 py-3 rounded-2xl
            bg-black/30 border border-white/10
            text-white placeholder-gray-500
            outline-none
            focus:ring-2 focus:ring-green-400/80
            focus:border-green-400/40
            transition
          "
          onChange={handleChange}
        />

        {/* Password */}
        <label className="text-sm text-gray-300 font-medium block mt-5">
          Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="Create a strong password"
          className="
            mt-2 w-full px-4 py-3 rounded-2xl
            bg-black/30 border border-white/10
            text-white placeholder-gray-500
            outline-none
            focus:ring-2 focus:ring-green-400/80
            focus:border-green-400/40
            transition
          "
          onChange={handleChange}
        />

        {/* Gender */}
        <label className="text-sm text-gray-300 font-medium block mt-5">
          Gender
        </label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="
            mt-2 w-full px-4 py-3 rounded-2xl
            bg-black/30 border border-white/10
            text-white
            outline-none
            focus:ring-2 focus:ring-green-400/80
            focus:border-green-400/40
            transition
          "
        >
          <option value="" className="bg-gray-900">Select Gender</option>
          <option className="bg-gray-900">Male</option>
          <option className="bg-gray-900">Female</option>
          <option className="bg-gray-900">Other</option>
        </select>

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
          Create Account
        </button>

        {/* Bottom */}
        <p className="text-center mt-6 text-gray-300">
          Already registered?{" "}
          <span
            className="text-green-400 cursor-pointer font-semibold hover:underline"
            onClick={() => navigate("/home/login")}
          >
            Login
          </span>
        </p>

        <p className="text-center text-gray-500 text-xs mt-5">
          © {new Date().getFullYear()} FitTrack • Secure Signup
        </p>
      </form>
    </div>
  );
}
