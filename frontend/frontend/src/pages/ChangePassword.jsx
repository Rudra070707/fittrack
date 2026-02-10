import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirm) {
      return alert("All fields required");
    }

    if (newPassword !== confirm) {
      return alert("New password and confirm password do not match");
    }

    try {
      setLoading(true);
      const res = await changePassword(currentPassword, newPassword);
      setLoading(false);

      if (!res?.success) return alert(res?.message || "Failed");

      // ✅ IMPORTANT: update localStorage user to unlock routes
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        u.mustChangePassword = false;
        localStorage.setItem("user", JSON.stringify(u));
      }

      alert("Password changed ✅");
      navigate("/home", { replace: true });
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex items-center justify-center px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-10 shadow-[0_25px_90px_rgba(0,0,0,0.75)]"
      >
        <h2 className="text-3xl font-extrabold">
          Change <span className="text-green-400">Password</span>
        </h2>
        <p className="text-gray-300 mt-2">
          For your security, please set a new password.
        </p>

        <label className="text-sm text-gray-300 font-medium block mt-6">
          Current Password
        </label>
        <input
          type="password"
          className="w-full mt-2 px-4 py-3 rounded-2xl bg-black/30 border border-white/10 outline-none focus:ring-2 focus:ring-green-400/80 transition"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
        />

        <label className="text-sm text-gray-300 font-medium block mt-5">
          New Password
        </label>
        <input
          type="password"
          className="w-full mt-2 px-4 py-3 rounded-2xl bg-black/30 border border-white/10 outline-none focus:ring-2 focus:ring-green-400/80 transition"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />

        <label className="text-sm text-gray-300 font-medium block mt-5">
          Confirm New Password
        </label>
        <input
          type="password"
          className="w-full mt-2 px-4 py-3 rounded-2xl bg-black/30 border border-white/10 outline-none focus:ring-2 focus:ring-green-400/80 transition"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirm new password"
        />

        <button
          disabled={loading}
          className="mt-7 w-full py-3 rounded-2xl bg-green-400 text-black font-semibold shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:scale-[1.02] transition-all disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Tip: Use at least 8 characters with numbers/symbols for stronger security.
        </p>
      </form>
    </div>
  );
}
