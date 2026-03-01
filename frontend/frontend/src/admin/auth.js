// frontend/src/admin/auth.js

// ==============================
// ADMIN AUTH UTILS (Production Ready)
// Works with Vercel + Render
// ==============================

// 🔐 Get token
export function getAdminToken() {
  return localStorage.getItem("adminToken");
}

// ✅ Check login state
export function isAdminLoggedIn() {
  return !!getAdminToken();
}

// ✅ Login (store token correctly)
export function loginAdmin(token) {
  if (!token) {
    console.error("❌ loginAdmin called without token");
    return;
  }

  // Clear any conflicting keys (avoid user/admin mix)
  localStorage.removeItem("token");
  localStorage.removeItem("userToken");

  // Save admin token
  localStorage.setItem("adminToken", token);
  localStorage.setItem("isAdmin", "true");

  // Notify other tabs/components
  window.dispatchEvent(new Event("storage"));

  console.log("✅ Admin token saved");
}

// 🚪 Logout
export function logoutAdmin() {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminRole");
  localStorage.removeItem("isAdmin");

  window.dispatchEvent(new Event("storage"));

  console.log("👋 Admin logged out");
}