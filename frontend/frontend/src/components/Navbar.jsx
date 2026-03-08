import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api";

export default function Navbar({ onOpenServices }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);

  const hideOnRoutes = useMemo(() => ["/home/login", "/home/signup"], []);

  const shouldHide = hideOnRoutes.includes(location.pathname);

  const BASE_URL = useMemo(() => API_BASE.replace(/\/api\/?$/, ""), []);

  const isUserLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    let mounted = true;
    if (shouldHide) return;

    axios
      .get(`${API_BASE}/settings`)
      .then((res) => {
        if (!mounted) return;
        setLogo(res?.data?.logo || null);
      })
      .catch(() => {
        if (!mounted) return;
        setLogo(null);
      });

    return () => {
      mounted = false;
    };
  }, [shouldHide]);

  const openLogin = () => {
    navigate("/home/login", { state: { backgroundLocation: location } });
  };

  const goProtectedOrLogin = (path) => {
    if (!isUserLoggedIn) {
      openLogin();
      return;
    }
    navigate(path);
  };

  const scrollToSection = (id) => {
    if (id === "services" && onOpenServices) onOpenServices();

    if (location.pathname !== "/home" && location.pathname !== "/") {
      navigate("/home", { state: { scrollTo: id } });
      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (shouldHide) return null;

  return (
    <header className="sticky top-0 z-50">
      <nav className="h-16 bg-[#05070c]/80 backdrop-blur-xl border-b border-white/10 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-10 left-1/4 w-[420px] h-[120px] bg-green-400/12 blur-[80px] rounded-full" />
          <div className="absolute -top-10 right-1/4 w-[420px] h-[120px] bg-emerald-400/12 blur-[80px] rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto h-full px-6 md:px-8 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-3">
            {logo ? (
              <img
                src={`${BASE_URL}${logo}`}
                alt="FitTrack Logo"
                className="h-9 w-auto drop-shadow-[0_0_18px_rgba(34,197,94,0.45)]"
                onError={() => setLogo(null)}
              />
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

          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-300">
            <button
              type="button"
              onClick={() => goProtectedOrLogin("/home/about")}
              className="hover:text-white transition"
            >
              About
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("services")}
              className="hover:text-white transition"
            >
              Services
            </button>

            <button
              type="button"
              onClick={() => goProtectedOrLogin("/home/contact")}
              className="hover:text-white transition"
            >
              Contact Us
            </button>
          </div>

          {!isUserLoggedIn && (
            <Link
              to="/home/login"
              state={{ backgroundLocation: location }}
              className="px-5 py-2 text-sm font-semibold rounded-xl text-black bg-green-400 hover:bg-green-500 transition shadow-[0_0_28px_rgba(34,197,94,0.55)]"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}