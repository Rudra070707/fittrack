import { useNavigate } from "react-router-dom";

export default function SelectRole() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-6 text-white">
      
      {/* BACKGROUND GLOWS + GRID */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[560px] h-[560px] bg-green-500/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-0 -right-32 w-[560px] h-[560px] bg-emerald-400/10 blur-[200px] rounded-full" />
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:26px_26px]" />
      </div>

      {/* CARD */}
      <div
        className="
          relative z-10
          w-full max-w-md
          bg-white/10 backdrop-blur-xl
          border border-white/15
          shadow-[0_30px_100px_rgba(0,0,0,0.8)]
          rounded-3xl p-10
          text-center
        "
      >
        {/* TITLE */}
        <p className="text-green-400 font-semibold tracking-[0.3em] text-xs mb-2">
          FITTRACK PLATFORM
        </p>

        <h1 className="text-4xl font-extrabold">
          Welcome to <span className="text-green-400">FitTrack</span>
        </h1>

        <p className="text-gray-300 mt-4">
          Choose how you want to access the platform
        </p>

        {/* ACTIONS */}
        <div className="mt-10 space-y-5">

          {/* USER */}
          <button
            type="button"
            onClick={() => navigate("/home/login")}
            className="
              w-full py-4 rounded-2xl
              bg-green-400 text-black font-semibold text-lg
              shadow-[0_0_35px_rgba(34,197,94,0.6)]
              hover:bg-green-500
              hover:shadow-[0_0_55px_rgba(34,197,94,0.75)]
              hover:scale-[1.03]
              transition-all duration-300
            "
          >
            User Login
          </button>

          {/* ADMIN */}
          <button
            type="button"
            onClick={() => navigate("/admin/login")}
            className="
              w-full py-4 rounded-2xl
              bg-blue-500/90 text-white font-semibold text-lg
              border border-blue-400/30
              shadow-[0_0_30px_rgba(59,130,246,0.45)]
              hover:bg-blue-600
              hover:shadow-[0_0_50px_rgba(59,130,246,0.65)]
              hover:scale-[1.03]
              transition-all duration-300
            "
          >
            Admin Login
          </button>

        </div>

        {/* FOOTER */}
        <p className="text-gray-500 text-xs mt-10">
          © {new Date().getFullYear()} FitTrack • Smart Gym Management
        </p>
      </div>
    </div>
  );
}
