// frontend/src/admin/auth.js

export function getAdminToken() {
  return localStorage.getItem("adminToken");
}

export function isAdminLoggedIn() {
  // ✅ token is the source of truth
  return !!getAdminToken();
}

export function loginAdmin(token) {
  // ✅ always store token here (so no other file forgets)
  if (token) localStorage.setItem("adminToken", token);

  // ✅ optional flag (helps if you ever check this anywhere)
  localStorage.setItem("isAdmin", "true");

  window.dispatchEvent(new Event("storage"));
}

export function logoutAdmin() {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminRole");
  localStorage.removeItem("isAdmin");

  window.dispatchEvent(new Event("storage"));
}
