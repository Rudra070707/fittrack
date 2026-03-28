// frontend/src/admin/auth.js

// ==========================================================
// 🔐 ADMIN AUTH UTILS (Production Ready - Improved)
// ==========================================================

// ==============================
// 🔍 GET TOKEN
// ==============================
export function getAdminToken() {
  return localStorage.getItem("adminToken");
}

// ==============================
// ✅ CHECK LOGIN
// ==============================
export function isAdminLoggedIn() {
  return !!getAdminToken();
}

// ==============================
// 🔑 LOGIN ADMIN
// ==============================
export function loginAdmin(token, user = null) {
  if (!token) {
    console.error("❌ loginAdmin called without token");
    return;
  }

  // 🧹 Clear conflicting keys (VERY IMPORTANT)
  localStorage.removeItem("token");       // user token
  localStorage.removeItem("userToken");
  localStorage.removeItem("user");

  // 💾 Save admin session
  localStorage.setItem("adminToken", token);
  localStorage.setItem("isAdmin", "true");

  // Optional: store user info
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  // 🔄 Notify UI (Navbar update etc.)
  window.dispatchEvent(new Event("storage"));

  console.log("✅ Admin logged in");
}

// ==============================
// 🚪 LOGOUT ADMIN (FIXED)
// ==============================
export function logoutAdmin() {
  console.log("👋 Admin logout");

  // 🧹 Clear ALL admin-related data
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminRole");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("user");

  // 🔄 Update UI everywhere
  window.dispatchEvent(new Event("storage"));

  // 🔥 IMPORTANT FIX → FORCE REDIRECT
  window.location.href = "/admin/login";
}

// ==============================
// ⚠️ CLEAR ALL AUTH (GLOBAL RESET)
// ==============================
export function clearAdminAuth() {
  console.warn("⚠️ Clearing all admin auth");

  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminRole");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("user");

  window.location.href = "/admin/login";
}