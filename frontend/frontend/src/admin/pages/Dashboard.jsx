import { useEffect, useState } from "react";
import { adminApi } from "../adminApi";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    plans: 0,
  });

  // 🔥 NEW: animated counters
  const [displayUsers, setDisplayUsers] = useState(0);
  const [displayPlans, setDisplayPlans] = useState(0);

  useEffect(() => {
    Promise.all([
      adminApi.get("/users/all"),
      adminApi.get("/plans/all"),
    ])
      .then(([u, p]) => {
        const users = (u.data.users || []).length;
        const plans = (p.data.plans || []).length;

        setStats({
          users,
          plans,
        });

        // 🔥 animate users
        let uStart = 0;
        const uInterval = setInterval(() => {
          uStart += Math.ceil(users / 20);
          if (uStart >= users) {
            uStart = users;
            clearInterval(uInterval);
          }
          setDisplayUsers(uStart);
        }, 30);

        // 🔥 animate plans
        let pStart = 0;
        const pInterval = setInterval(() => {
          pStart += Math.ceil(plans / 20);
          if (pStart >= plans) {
            pStart = plans;
            clearInterval(pInterval);
          }
          setDisplayPlans(pStart);
        }, 30);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-12">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        <div>
          <p className="text-green-400 font-semibold tracking-[0.25em] text-xs">
            ADMIN DASHBOARD
          </p>

          <h2 className="text-4xl font-extrabold mt-3 leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Dashboard Overview
          </h2>

          <p className="text-gray-400 mt-3 max-w-xl">
            Real-time snapshot of your gym platform — members, plans and growth insights.
          </p>
        </div>

      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* TOTAL USERS */}
        <div
          className="
            relative group
            bg-white/[0.04] backdrop-blur-2xl
            border border-white/10
            rounded-3xl
            p-8
            shadow-[0_30px_80px_rgba(0,0,0,0.75)]
            transition-all duration-500
            hover:-translate-y-2
            hover:scale-[1.03]
            hover:shadow-[0_0_70px_rgba(34,197,94,0.55)]
            overflow-hidden
          "
        >

          {/* glow */}
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-green-400/25 blur-[130px] rounded-full animate-pulse" />

          {/* 🔥 NEW: bottom glow */}
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-emerald-400/20 blur-[130px] rounded-full" />

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent" />

          {/* 🔥 shine animation */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
            <div className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-white/20 blur-md group-hover:translate-x-[250%] transition duration-1000" />
          </div>

          {/* 🔥 live pulse */}
          <div className="absolute top-4 right-4">
            <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>

          <p className="text-gray-400 text-sm tracking-wide">
            Total Members
          </p>

          <h3 className="text-5xl font-extrabold mt-4 bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,197,94,0.5)]">
            {displayUsers}
          </h3>

          <p className="text-gray-400 mt-3 text-sm">
            Registered users on the platform
          </p>

          {/* 🔥 mini chart */}
          <div className="mt-5 flex items-end gap-[3px] h-10">
            {[5, 8, 6, 10, 7, 12, 9].map((h, i) => (
              <div
                key={i}
                className="w-[6px] rounded bg-gradient-to-t from-green-400 to-emerald-500 animate-pulse"
                style={{
                  height: `${h * 3}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>

        </div>

        {/* ACTIVE PLANS */}
        <div
          className="
            relative group
            bg-white/[0.04] backdrop-blur-2xl
            border border-white/10
            rounded-3xl
            p-8
            shadow-[0_30px_80px_rgba(0,0,0,0.75)]
            transition-all duration-500
            hover:-translate-y-2
            hover:scale-[1.03]
            hover:shadow-[0_0_70px_rgba(56,189,248,0.55)]
            overflow-hidden
          "
        >

          {/* glow */}
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-blue-400/25 blur-[130px] rounded-full animate-pulse" />

          {/* 🔥 bottom glow */}
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-cyan-400/20 blur-[130px] rounded-full" />

          {/* 🔥 shine animation */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
            <div className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-white/20 blur-md group-hover:translate-x-[250%] transition duration-1000" />
          </div>

          {/* 🔥 live pulse */}
          <div className="absolute top-4 right-4">
            <span className="absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </div>

          <p className="text-gray-400 text-sm tracking-wide">
            Active Membership Plans
          </p>

          <h3 className="text-5xl font-extrabold mt-4 bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.5)]">
            {displayPlans}
          </h3>

          <p className="text-gray-400 mt-3 text-sm">
            Plans currently available for users
          </p>

          {/* 🔥 mini chart */}
          <div className="mt-5 flex items-end gap-[3px] h-10">
            {[3, 6, 4, 7, 5, 9, 6].map((h, i) => (
              <div
                key={i}
                className="w-[6px] rounded bg-gradient-to-t from-blue-400 to-cyan-400 animate-pulse"
                style={{
                  height: `${h * 3}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>

        </div>

      </div>

      {/* ANALYTICS PLACEHOLDER */}
      <div
        className="
          relative
          bg-white/[0.04]
          border border-white/10
          rounded-3xl
          p-10
          text-center
          text-gray-400
          shadow-[0_25px_70px_rgba(0,0,0,0.7)]
          backdrop-blur-2xl
          overflow-hidden
        "
      >

        {/* glow background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-green-400/10 blur-[120px]" />
        </div>

        <p className="text-lg tracking-wide">
          📊 Analytics & activity insights will appear here
        </p>

        <p className="text-sm mt-2 text-gray-500">
          (Charts, growth trends, and performance metrics coming soon)
        </p>

      </div>

    </div>
  );
}