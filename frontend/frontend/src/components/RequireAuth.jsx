import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children, adminOnly = false }) {
  const location = useLocation();

  // ✅ Accept both keys (prevents login loop bugs)
  const token = localStorage.getItem("token"); // user token
  const adminToken =
    localStorage.getItem("adminToken") || localStorage.getItem("token");

  const storedUser = localStorage.getItem("user");

  // 🔒 ADMIN ROUTES
  if (adminOnly) {
    if (!adminToken) {
      return (
        <Navigate
          to="/admin/login"
          replace
          state={{ from: location.pathname, state: location.state || null }}
        />
      );
    }
    return children;
  }

  // 🔐 USER ROUTES (admin token also allowed)
  if (!token && !adminToken) {
    return (
      <Navigate
        to="/home/login"
        replace
        state={{ from: location.pathname, state: location.state || null }}
      />
    );
  }

  // 🔁 FORCE PASSWORD CHANGE (users only)
  if (token) {
    try {
      const user = storedUser ? JSON.parse(storedUser) : null;

      const isOnChangePassword =
        location.pathname === "/change-password" ||
        location.pathname === "/home/change-password";

      if (user?.mustChangePassword === true && !isOnChangePassword) {
        return <Navigate to="/home/change-password" replace />;
      }
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return <Navigate to="/home/login" replace />;
    }
  }

  return children;
}