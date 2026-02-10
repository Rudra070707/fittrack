import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children, adminOnly = false }) {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");
  const storedUser = localStorage.getItem("user");

  // 🔒 ADMIN-ONLY ROUTES
  if (adminOnly) {
    if (!adminToken) {
      return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
    }
    return children;
  }

  // 🔐 USER ROUTES (admin is also allowed)
  if (!token && !adminToken) {
    return <Navigate to="/home/login" replace state={{ from: location.pathname }} />;
  }

  // 🔁 FORCE PASSWORD CHANGE (users only)
  if (token) {
    let user = null;
    try {
      user = storedUser ? JSON.parse(storedUser) : null;
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return <Navigate to="/home/login" replace />;
    }

    if (
      user?.mustChangePassword === true &&
      location.pathname !== "/home/change-password"
    ) {
      return <Navigate to="/home/change-password" replace />;
    }
  }

  return children;
}
