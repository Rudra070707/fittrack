import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children, adminOnly = false }) {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");
  const storedUser = localStorage.getItem("user");

  let user = null;

  // ✅ SAFE PARSE USER
  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.error("❌ Auth parse error:", err);

    // 🔥 FIXED: only remove corrupted user (NOT full clear)
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    return (
      <Navigate
        to="/home/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // =========================================================
  // 🔒 ADMIN ROUTE PROTECTION
  // =========================================================
  if (adminOnly) {
    if (!adminToken || user?.role !== "admin") {
      return (
        <Navigate
          to="/admin/login"
          replace
          state={{ from: location.pathname }}
        />
      );
    }

    return children;
  }

  // =========================================================
  // 🔐 USER ROUTE PROTECTION
  // =========================================================
  if (!token) {
    return (
      <Navigate
        to="/home/login"
        replace
        state={{
          from: location.pathname,
          backgroundLocation: location,
        }}
      />
    );
  }

  // =========================================================
  // ⚠️ EDGE CASE: TOKEN EXISTS BUT USER MISSING
  // =========================================================
  if (token && !user) {
    console.warn("⚠️ Token exists but user missing → fixing safely");

    // 🔥 FIXED: DO NOT CLEAR EVERYTHING
    localStorage.removeItem("token");

    return (
      <Navigate
        to="/home/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // =========================================================
  // 🔁 FORCE PASSWORD CHANGE
  // =========================================================
  const isOnChangePassword =
    location.pathname === "/home/change-password" ||
    location.pathname === "/change-password";

  if (user?.mustChangePassword === true && !isOnChangePassword) {
    return (
      <Navigate
        to="/home/change-password"
        replace
      />
    );
  }

  // =========================================================
  // ✅ ALL GOOD → ALLOW ACCESS
  // =========================================================
  return children;
}