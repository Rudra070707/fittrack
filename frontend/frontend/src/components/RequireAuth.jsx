import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children, adminOnly = false }) {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");
  const storedUser = localStorage.getItem("user");

  // 🔒 ADMIN ROUTES
  if (adminOnly) {
    if (!adminToken) {
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

  // 🔐 USER ROUTES
  if (!token && !adminToken) {
    return <Navigate to="/login" replace />;
  }

  // 🔁 FORCE PASSWORD CHANGE
  if (token) {
    try {
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (
        user?.mustChangePassword === true &&
        location.pathname !== "/change-password"
      ) {
        return <Navigate to="/change-password" replace />;
      }
    } catch {
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}
