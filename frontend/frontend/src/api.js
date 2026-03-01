// src/api.js

// ✅ Works in BOTH:
// - Local:   VITE_API_URL not set → uses localhost backend
// - Vercel:  VITE_API_URL set → uses Render backend
export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ✅ API base
export const API_BASE = `${BASE_URL}/api`;

/**
 * 🔐 Token handling
 * - Admin panel stores: adminToken
 * - User side stores:   token
 */
export const getUserToken = () => localStorage.getItem("token");
export const getAdminToken = () => localStorage.getItem("adminToken");

export const userAuthHeader = () => {
  const token = getUserToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const adminAuthHeader = () => {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/* =========================
   HELPERS
   ========================= */

// Safely parse JSON (handles empty / non-json responses)
export const safeJson = async (res) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};

// Unified response handler
const handleResponse = async (res, fallbackMsg) => {
  const data = await safeJson(res);

  if (!res.ok) {
    return {
      success: false,
      message: data?.message || fallbackMsg || "Request failed",
      data,
    };
  }

  return data ?? { success: true };
};

/* =========================
   AUTH (USER)  ✅ FIXED ROUTES
   ========================= */

// USER LOGIN  ✅ /users/login
export async function loginUser(email, password) {
  try {
    const res = await fetch(`${API_BASE}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    return await handleResponse(res, "Login failed");
  } catch (err) {
    console.error("LOGIN API ERROR:", err);
    return { success: false, message: "Network / server error" };
  }
}

// USER REGISTER ✅ /users/signup
export async function signupUser(payload) {
  try {
    const res = await fetch(`${API_BASE}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return await handleResponse(res, "Signup failed");
  } catch (err) {
    console.error("SIGNUP API ERROR:", err);
    return { success: false, message: "Network / server error" };
  }
}

// CHANGE PASSWORD (USER PROTECTED)
// ⚠️ If your backend route differs, change only this URL.
export async function changePassword(currentPassword, newPassword) {
  try {
    const res = await fetch(`${API_BASE}/users/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...userAuthHeader(),
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    return await handleResponse(res, "Change password failed");
  } catch (err) {
    console.error("CHANGE PASSWORD API ERROR:", err);
    return { success: false, message: "Network / server error" };
  }
}

/* =========================
   USERS (ADMIN)
   ========================= */

// ADMIN RESET USER PASSWORD (ADMIN PROTECTED)
// ⚠️ If backend differs, update route here.
export async function adminResetUserPassword(userId) {
  try {
    const res = await fetch(`${API_BASE}/users/${userId}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...adminAuthHeader(),
      },
    });

    return await handleResponse(res, "Reset failed");
  } catch (err) {
    console.error("RESET PASSWORD API ERROR:", err);
    return { success: false, message: "Network / server error" };
  }
}

/* =========================
   SETTINGS (logo, theme)
   ========================= */

export async function getSettings() {
  try {
    const res = await fetch(`${API_BASE}/settings`);
    return await handleResponse(res, "Failed to fetch settings");
  } catch (err) {
    console.error("GET SETTINGS ERROR:", err);
    return { success: false, message: "Network / server error" };
  }
}

/* =========================
   PLANS (PUBLIC)
   ========================= */

export async function getPlans() {
  try {
    // ⚠️ if your backend is /plans (not /plans/all), change here
    const res = await fetch(`${API_BASE}/plans/all`);
    const data = await safeJson(res);

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to fetch plans",
        plans: [],
      };
    }

    return { success: true, plans: data?.plans || [] };
  } catch (err) {
    console.error("GET PLANS API ERROR:", err);
    return { success: false, message: "Network / server error", plans: [] };
  }
}

/* =========================
   MEMBERSHIP
   ========================= */

export async function subscribeMembership(payload) {
  try {
    const res = await fetch(`${API_BASE}/users/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return await handleResponse(res, "Subscribe failed");
  } catch (err) {
    console.error("SUBSCRIBE API ERROR:", err);
    return { success: false, message: "Network / server error" };
  }
}

/* =========================
   PAYMENTS (UI-ONLY)
   ========================= */

export async function recordPayment(payload) {
  try {
    const res = await fetch(`${API_BASE}/payments/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return await handleResponse(res, "Failed to record payment");
  } catch (err) {
    console.error("RECORD PAYMENT API ERROR:", err);
    return { success: false, message: "Network / server error" };
  }
}

/* =========================
   EXPORTS
   ========================= */

// kept for backward compatibility
export const authHeader = () => userAuthHeader();