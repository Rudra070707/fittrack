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
  if (!token) {
    return (
      <Navigate
        to="/home/login"
        state={{
          from: location.pathname,
          backgroundLocation: location,
        }}
      />
    );
  }

  // 🔁 FORCE PASSWORD CHANGE
  try {
    const user = storedUser ? JSON.parse(storedUser) : null;

    const isOnChangePassword =
      location.pathname === "/home/change-password" ||
      location.pathname === "/change-password";

    if (user?.mustChangePassword === true && !isOnChangePassword) {
      return <Navigate to="/home/change-password" replace />;
    }
  } catch (err) {
    console.error("Auth parse error:", err);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return (
      <Navigate
        to="/home/login"
        state={{ backgroundLocation: location }}
      />
    );
  }

  return children;
}