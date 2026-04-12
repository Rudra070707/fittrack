import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminApi } from "../adminApi"; // ✅ use centralized admin axios

export default function Sidebar() {
  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Plans", path: "/admin/plans" },
    { name: "Payments", path: "/admin/payments" },
    { name: "Contact Messages", path: "/admin/contact-messages" },
    { name: "Settings", path: "/admin/settings" },
  ];

  const [logo, setLogo] = useState(null);
  const [newCount, setNewCount] = useState(0);

  const location = useLocation();

  // ✅ base for loading images from backend (Render)
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // ✅ Load admin logo
  useEffect(() => {
    adminApi
      .get("/settings") // ✅ FIXED (no localhost)
      .then((res) => setLogo(res.data?.logo || null))
      .catch((err) => console.error(err));
  }, [location.pathname]);

  // helper: always read fresh token
  const getAdminToken = () => localStorage.getItem("adminToken");

  // ✅ Fetch new contact messages count
  useEffect(() => {
    // Only fetch on admin routes
    if (!location.pathname.startsWith("/admin")) return;

    const token = getAdminToken();
    if (!token) {
      setNewCount(0);
      return;
    }

    // ✅ FIXED: use adminApi so token auto-attaches + correct baseURL
    adminApi
      .get("/contact")
      .then((res) => res.data)
      .catch((err) => {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminRole");
          setNewCount(0);
          return null;
        }
        console.error(err);
        setNewCount(0);
        return null;
      })
      .then((data) => {
        if (!data) return;

        if (data?.success && Array.isArray(data.data)) {
          const count = data.data.filter((m) => m.status === "new").length;
          setNewCount(count);
        } else {
          setNewCount(0);
        }
      });
  }, [location.pathname]);

  return (
    <aside
      className="
        w-72 min-h-screen
        bg-gradient-to-b from-[#020617] via-[#030712] to-[#020617]
        border-r border-white/10
        shadow-[0_30px_100px_rgba(0,0,0,0.85)]
        px-6 py-7
        flex flex-col
        relative overflow-hidden
        backdrop-blur-2xl
      "
    >

      {/* 🔥 ENHANCED BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-green-500/15 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 -right-24 w-[420px] h-[420px] bg-emerald-400/15 blur-[160px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] [background-size:26px_26px]" />
      </div>

      {/* BRAND */}
      <div className="relative mb-10">
        <div className="flex justify-center">
          <div
            className="
              w-full
              rounded-2xl
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-2xl
              p-5
              flex items-center justify-center
              shadow-[0_25px_70px_rgba(0,0,0,0.7)]
              hover:shadow-[0_0_40px_rgba(34,197,94,0.25)]
              transition-all duration-300
            "
          >
            {logo ? (
              <img
                src={`${API_BASE}${logo}`}
                alt="FitTrack Logo"
                className="
                  h-20 w-auto object-contain
                  drop-shadow-[0_0_30px_rgba(34,197,94,0.6)]
                "
                style={{ animation: "breathe 3.2s ease-in-out infinite" }}
              />
            ) : (
              <h1 className="text-2xl font-extrabold tracking-wide text-white">
                FitTrack<span className="text-green-400">Admin</span>
              </h1>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* SECTION TITLE */}
      <div className="relative mb-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400">
          Navigation
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="relative space-y-2">
        {links.map((link) => {
          const showBadge =
            link.path === "/admin/contact-messages" && newCount > 0;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end
              className={({ isActive }) =>
                `
                group
                flex items-center justify-between
                px-4 py-3 rounded-2xl
                border
                transition-all duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-green-400/25 via-green-400/10 to-transparent border-green-400/40 shadow-[0_0_0_1px_rgba(34,197,94,0.2),0_15px_45px_rgba(0,0,0,0.6)]"
                    : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                }
                `
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <span
                      className={`
                        h-2.5 w-2.5 rounded-full
                        transition-all duration-300
                        ${
                          isActive
                            ? "bg-green-400 shadow-[0_0_22px_rgba(34,197,94,0.9)]"
                            : "bg-gray-600 group-hover:bg-green-300"
                        }
                      `}
                    />

                    <span
                      className={`
                        font-medium
                        transition-all duration-300
                        ${
                          isActive
                            ? "text-white"
                            : "text-gray-300 group-hover:text-white"
                        }
                      `}
                    >
                      {link.name}
                    </span>

                    {showBadge && (
                      <span
                        className="
                          ml-2
                          text-[11px]
                          px-2 py-[2px]
                          rounded-full
                          bg-green-400 text-black
                          font-bold
                          shadow-[0_0_20px_rgba(34,197,94,0.9)]
                        "
                        title="New messages"
                      >
                        {newCount}
                      </span>
                    )}
                  </div>

                  <span
                    className={`
                      text-xs
                      transition-all duration-300
                      ${
                        isActive
                          ? "text-green-300 translate-x-0"
                          : "text-gray-500 translate-x-1 group-hover:text-green-300 group-hover:translate-x-0"
                      }
                    `}
                  >
                    ›
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="relative mt-auto pt-8">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>© 2025 FitTrack</span>
          <span className="px-2 py-1 rounded-lg bg-white/[0.05] border border-white/10 backdrop-blur-md">
            Admin
          </span>
        </div>
      </div>

      <style>
        {`
          @keyframes breathe {
            0% { transform: scale(1); }
            50% { transform: scale(1.06); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </aside>
  );
}