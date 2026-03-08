import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children, adminOnly = false }) {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");
  const storedUser = localStorage.getItem("user");

  // Admin routes
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

  // User routes
  if (!token && !adminToken) {
    return (
      <Navigate
        to="/home/login"
        replace
        state={{
          from: location.pathname,
          backgroundLocation: { pathname: "/home" },
        }}
      />
    );
  }

  // Force password change for user
  if (token) {
    try {
      const user = storedUser ? JSON.parse(storedUser) : null;

      const isOnChangePassword =
        location.pathname === "/home/change-password" ||
        location.pathname === "/change-password";

      if (user?.mustChangePassword === true && !isOnChangePassword) {
        return <Navigate to="/home/change-password" replace />;
      }
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return (
        <Navigate
          to="/home/login"
          replace
          state={{ backgroundLocation: { pathname: "/home" } }}
        />
      );
    }
  }

  return children;
}