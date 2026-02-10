export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top bar */}
      <div
        className="
          h-16
          bg-gradient-to-b from-[#0b0f14]/90 via-[#0e131a]/80 to-[#0b0f14]/90
          backdrop-blur-xl
          border-b border-white/10
          shadow-[0_10px_40px_rgba(0,0,0,0.55)]
          relative overflow-hidden
        "
      >
        {/* subtle glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-20 w-[380px] h-[380px] bg-green-500/10 blur-[140px] rounded-full" />
          <div className="absolute -top-24 right-10 w-[360px] h-[360px] bg-emerald-400/10 blur-[150px] rounded-full" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] [background-size:28px_28px] opacity-40" />
        </div>

        <div className="relative max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Left: Page context */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-[11px] uppercase tracking-[0.22em] text-gray-400">
                FitTrack
              </span>
              <span className="text-white font-semibold text-base">
                Admin Console
              </span>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_16px_rgba(34,197,94,0.6)]" />
              <span className="text-sm text-gray-300">
                Manage users, plans & settings
              </span>
            </div>
          </div>

          {/* Right: badge + avatar */}
          <div className="flex items-center gap-4">
            <span
              className="
                text-[11px] uppercase tracking-[0.22em]
                px-4 py-2 rounded-full
                border border-green-400/25
                bg-green-400/10
                text-green-300
                shadow-[0_0_0_1px_rgba(34,197,94,0.10)]
              "
            >
              Admin Panel
            </span>

            <div
              className="
                w-11 h-11 rounded-2xl
                bg-gradient-to-br from-green-400/25 via-emerald-500/15 to-white/5
                border border-white/10
                flex items-center justify-center
                shadow-[0_14px_40px_rgba(0,0,0,0.45)]
                ring-1 ring-green-400/20
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
