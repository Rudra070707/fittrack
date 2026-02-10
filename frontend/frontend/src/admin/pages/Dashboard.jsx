import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../auth";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    plans: 0,
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5000/api/users/all"),
      axios.get("http://localhost:5000/api/plans/all"),
    ])
      .then(([u, p]) => {
        setStats({
          users: u.data.users.length,
          plans: p.data.plans.length,
        });
      })
      .catch(console.error);
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="space-y-12">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div>
          <p className="text-green-400 font-semibold tracking-[0.25em] text-xs">
            ADMIN DASHBOARD
          </p>

          <h2 className="text-4xl font-extrabold mt-3 leading-tight">
            Dashboard Overview
          </h2>

          <p className="text-gray-400 mt-3 max-w-xl">
            Real-time snapshot of your gym platform — members, plans and growth insights.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="
            relative
            px-6 py-3 rounded-2xl
            bg-red-500/90
            text-white font-semibold
            shadow-[0_0_30px_rgba(239,68,68,0.45)]
            transition-all duration-300
            hover:bg-red-600
            hover:scale-[1.05]
          "
        >
          Logout
        </button>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* TOTAL USERS */}
        <div
          className="
            relative
            bg-white/[0.04] backdrop-blur-xl
            border border-white/10
            rounded-3xl
            p-8
            shadow-[0_25px_60px_rgba(0,0,0,0.65)]
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-[0_0_45px_rgba(34,197,94,0.35)]
          "
        >
          {/* glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-400/20 blur-[120px] rounded-full" />

          <p className="text-gray-400 text-sm tracking-wide">
            Total Members
          </p>

          <h3 className="text-5xl font-extrabold mt-4 text-white">
            {stats.users}
          </h3>

          <p className="text-gray-400 mt-3 text-sm">
            Registered users on the platform
          </p>
        </div>

        {/* ACTIVE PLANS */}
        <div
          className="
            relative
            bg-white/[0.04] backdrop-blur-xl
            border border-white/10
            rounded-3xl
            p-8
            shadow-[0_25px_60px_rgba(0,0,0,0.65)]
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-[0_0_45px_rgba(56,189,248,0.35)]
          "
        >
          {/* glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/20 blur-[120px] rounded-full" />

          <p className="text-gray-400 text-sm tracking-wide">
            Active Membership Plans
          </p>

          <h3 className="text-5xl font-extrabold mt-4 text-white">
            {stats.plans}
          </h3>

          <p className="text-gray-400 mt-3 text-sm">
            Plans currently available for users
          </p>
        </div>

      </div>

      {/* OPTIONAL FUTURE PLACEHOLDER (looks real, no logic) */}
      <div
        className="
          bg-white/[0.03]
          border border-white/10
          rounded-3xl
          p-8
          text-center
          text-gray-400
          shadow-[0_20px_50px_rgba(0,0,0,0.55)]
        "
      >
        📊 Analytics & activity insights will appear here
      </div>

    </div>
  );
}
