import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

// ✅ Use central config
import { API_BASE } from "../api";

export default function Navbar({ onOpenServices }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);

  // ✅ Hide Navbar on auth pages (user) — BUT DO NOT EARLY RETURN BEFORE HOOKS
  const hideOnRoutes = useMemo(
    () => ["/home/login", "/login", "/home/signup", "/signup"],
    []
  );
  const shouldHide = hideOnRoutes.includes(location.pathname);

  // ✅ BASE_URL = API without "/api" (needed for serving uploaded files like /uploads/..)
  // API_BASE is like: https://xxx.onrender.com/api
  const BASE_URL = useMemo(() => API_BASE.replace(/\/api\/?$/, ""), []);

  useEffect(() => {
    let mounted = true;

    // ✅ Only fetch logo if navbar is visible
    if (shouldHide) return;

    axios
      .get(`${API_BASE}/settings`)
      .then((res) => {
        if (!mounted) return;
        setLogo(res?.data?.logo || null);
      })
      .catch((err) => {
        console.error("Navbar settings fetch failed:", err);
        if (!mounted) return;
        setLogo(null);
      });

    return () => {
      mounted = false;
    };
  }, [shouldHide]);

  const scrollToSection = (id) => {
    if (id === "services" && onOpenServices) onOpenServices();

    // ✅ If not on /home, navigate then scroll
    if (location.pathname !== "/home" && location.pathname !== "/") {
      navigate("/home", { state: { scrollTo: id } });
      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navLinks = [
    { name: "About", type: "page", path: "/home/about" },
    { name: "Services", type: "scroll", id: "services" },
    { name: "Contact Us", type: "page", path: "/home/contact" },
  ];

  // ✅ Return null ONLY AFTER all hooks have executed
  if (shouldHide) return null;

  return (
    <header className="sticky top-0 z-50">
      <nav
        className="
          h-16
          bg-gradient-to-b from-[#070b10]/90 via-[#0b1017]/80 to-[#070b10]/90
          backdrop-blur-xl
          border-b border-white/10
          shadow-[0_10px_35px_rgba(0,0,0,0.55)]
          relative overflow-hidden
        "
      >
        {/* subtle glow strip */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-10 left-1/4 w-[420px] h-[120px] bg-green-400/10 blur-[70px] rounded-full" />
          <div className="absolute -top-10 right-1/4 w-[420px] h-[120px] bg-emerald-400/10 blur-[70px] rounded-full" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:28px_28px]" />
        </div>

        <div className="relative max-w-7xl mx-auto h-full px-6 md:px-8 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/home" className="flex items-center gap-3">
            {logo ? (
              <div
                className="
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                  px-3 py-2
                  shadow-[0_12px_40px_rgba(0,0,0,0.45)]
                "
              >
                <img
                  src={`${BASE_URL}${logo}`}
                  alt="FitTrack Logo"
                  className="
                    h-9 w-auto
                    scale-[1.35]
                    origin-left
                    drop-shadow-[0_0_22px_rgba(34,197,94,0.6)]
                    transition-transform duration-300 hover:scale-[1.4]
                  "
                  onError={() => setLogo(null)}
                />
              </div>
            ) : (
              <div className="flex flex-col leading-none">
                <span className="text-xl font-extrabold text-white tracking-tight">
                  Fit<span className="text-green-400">Track</span>
                </span>
                <span className="text-[11px] text-gray-400 tracking-[0.22em] uppercase mt-1">
                  Smart Fitness
                </span>
              </div>
            )}
          </Link>

          {/* NAV LINKS */}
          <ul className="hidden md:flex items-center gap-10 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.type === "page" ? (
                  <Link
                    to={link.path}
                    className="
                      relative px-1 py-2
                      text-gray-300 hover:text-white
                      transition-all duration-300
                      group
                    "
                  >
                    <span
                      className="
                        absolute -inset-x-3 -inset-y-2
                        rounded-xl
                        bg-white/[0.04]
                        border border-white/10
                        opacity-0 group-hover:opacity-100
                        transition-all duration-300
                      "
                    />
                    <span className="relative">{link.name}</span>
                    <span
                      className="
                        absolute left-0 -bottom-1 h-[2px] w-full rounded-full
                        bg-green-400/0 group-hover:bg-green-400/70
                        transition-all duration-300
                      "
                    />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="
                      relative px-1 py-2
                      text-gray-300 hover:text-white
                      transition-all duration-300
                      group
                    "
                  >
                    <span
                      className="
                        absolute -inset-x-3 -inset-y-2
                        rounded-xl
                        bg-white/[0.04]
                        border border-white/10
                        opacity-0 group-hover:opacity-100
                        transition-all duration-300
                      "
                    />
                    <span className="relative">{link.name}</span>
                    <span
                      className="
                        absolute left-0 -bottom-1 h-[2px] w-full rounded-full
                        bg-green-400/0 group-hover:bg-green-400/70
                        transition-all duration-300
                      "
                    />
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("services")}
              className="
                md:hidden
                px-4 py-2 rounded-xl
                bg-white/[0.04]
                border border-white/10
                text-gray-200
                hover:bg-white/[0.07]
                transition-all duration-300
              "
            >
              Services
            </button>

            <Link
              to="/home/login"
              className="
                relative px-5 py-2 text-sm font-semibold rounded-xl
                text-black
                bg-green-400
                hover:bg-green-500
                transition-all duration-300
                shadow-[0_0_28px_rgba(34,197,94,0.55)]
                hover:shadow-[0_0_40px_rgba(34,197,94,0.75)]
                hover:scale-[1.02]
              "
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}