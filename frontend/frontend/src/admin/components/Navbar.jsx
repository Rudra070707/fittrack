import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔥 Clear all auth data
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("user");

    // ✅ Force redirect to homepage (full reset)
    window.location.href = "/home";
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top bar */}
      <div
        className="
          h-16
          bg-gradient-to-b from-[#0b0f14]/90 via-[#0e131a]/80 to-[#0b0f14]/90
          backdrop-blur-2xl
          border-b border-white/10
          shadow-[0_15px_60px_rgba(0,0,0,0.65)]
          relative overflow-hidden
        "
      >
        {/* 🔥 ENHANCED BACKGROUND GLOW */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-20 w-[420px] h-[420px] bg-green-500/15 blur-[160px] rounded-full" />
          <div className="absolute -top-24 right-10 w-[400px] h-[400px] bg-emerald-400/15 blur-[160px] rounded-full" />

          {/* animated subtle glow */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] [background-size:28px_28px]" />

          {/* extra neon highlight line */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-400/40 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

          {/* Left: Page context */}
          <div className="flex items-center gap-4">

            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-[11px] uppercase tracking-[0.22em] text-gray-400">
                FitTrack
              </span>

              <span className="text-white font-semibold text-base tracking-wide">
                Admin Console
              </span>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_20px_rgba(34,197,94,0.9)] animate-pulse" />

              <span className="text-sm text-gray-300 tracking-wide">
                Manage users, plans & settings
              </span>
            </div>

          </div>

          {/* Right: badge + avatar + logout */}
          <div className="flex items-center gap-4">

            {/* Admin badge */}
            <span
              className="
                text-[11px] uppercase tracking-[0.22em]
                px-4 py-2 rounded-full
                border border-green-400/30
                bg-green-400/10
                text-green-300
                shadow-[0_0_20px_rgba(34,197,94,0.25)]
                backdrop-blur-md
              "
            >
              Admin Panel
            </span>

            {/* Logout Button 🔴 */}
            <button
              onClick={handleLogout}
              className="
                px-4 py-2 rounded-xl
                bg-red-500/90 hover:bg-red-600
                text-white text-sm font-medium
                shadow-[0_12px_35px_rgba(239,68,68,0.45)]
                hover:shadow-[0_18px_45px_rgba(239,68,68,0.65)]
                hover:scale-[1.03]
                active:scale-[0.97]
                transition-all duration-300
              "
            >
              Logout
            </button>

            {/* Avatar */}
            <div
              className="
                w-11 h-11 rounded-2xl
                bg-gradient-to-br from-green-400/25 via-emerald-500/15 to-white/5
                border border-white/10
                flex items-center justify-center
                shadow-[0_16px_50px_rgba(0,0,0,0.55)]
                ring-1 ring-green-400/25
                hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]
                transition-all duration-300
              "
              title="Admin"
            >
              <span className="text-white/90 text-lg">👤</span>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}