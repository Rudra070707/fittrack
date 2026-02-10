import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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

  // ✅ Load admin logo
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/settings")
      .then((res) => setLogo(res.data.logo))
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

    fetch("http://localhost:5000/api/contact", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));

        // If token is invalid/not admin, silently reset token
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminRole");
          setNewCount(0);
          return null;
        }

        return data;
      })
      .then((data) => {
        if (!data) return;

        if (data?.success && Array.isArray(data.data)) {
          const count = data.data.filter((m) => m.status === "new").length;
          setNewCount(count);
        } else {
          setNewCount(0);
        }
      })
      .catch((err) => {
        console.error(err);
        setNewCount(0);
      });
  }, [location.pathname]);

  return (
    <aside
      className="
        w-72 min-h-screen
        bg-gradient-to-b from-[#06090e] via-[#070c12] to-[#05070b]
        border-r border-white/10
        shadow-[0_20px_70px_rgba(0,0,0,0.65)]
        px-6 py-7
        flex flex-col
        relative overflow-hidden
      "
    >
      {/* subtle grid + glows (visual only) */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-24 -left-24 w-[360px] h-[360px] bg-green-500/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-0 -right-24 w-[360px] h-[360px] bg-emerald-400/10 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:26px_26px]" />
      </div>

      {/* BRAND */}
      <div className="relative mb-10">
        <div className="flex justify-center">
          <div
            className="
              w-full
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              p-5
              flex items-center justify-center
              shadow-[0_18px_55px_rgba(0,0,0,0.55)]
            "
          >
            {logo ? (
              <img
                src={`http://localhost:5000${logo}`}
                alt="FitTrack Logo"
                className="
                  h-20 w-auto object-contain
                  drop-shadow-[0_0_26px_rgba(34,197,94,0.45)]
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
                transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-green-400/20 via-green-400/10 to-transparent border-green-400/30 shadow-[0_0_0_1px_rgba(34,197,94,0.12),0_12px_35px_rgba(0,0,0,0.35)]"
                    : "bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20"
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
                        transition-all duration-200
                        ${
                          isActive
                            ? "bg-green-400 shadow-[0_0_18px_rgba(34,197,94,0.65)]"
                            : "bg-gray-600 group-hover:bg-gray-400"
                        }
                      `}
                    />

                    <span
                      className={`
                        font-medium
                        transition-colors duration-200
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
                          shadow-[0_0_16px_rgba(34,197,94,0.45)]
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
                      transition-all duration-200
                      ${
                        isActive
                          ? "text-green-300 translate-x-0"
                          : "text-gray-500 translate-x-1 group-hover:text-gray-300 group-hover:translate-x-0"
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
          <span className="px-2 py-1 rounded-lg bg-white/[0.03] border border-white/10">
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
