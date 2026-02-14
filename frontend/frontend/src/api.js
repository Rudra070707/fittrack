// src/api.js
const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

/**
 * 🔐 Token handling (separate)
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

// Safely parse JSON (handles empty responses)
const safeJson = async (res) => {
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
   AUTH (USER)
   ========================= */

// USER LOGIN
export async function loginUser(email, password) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
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

// USER REGISTER
export async function signupUser(payload) {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
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
export async function changePassword(currentPassword, newPassword) {
  try {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
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
   PLANS (PUBLIC)
   ========================= */

// GET ALL PLANS
export async function getPlans() {
  try {
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

// ACTIVATE MEMBERSHIP (Join Page)
export async function subscribeMembership(payload) {
  try {
    const res = await fetch(`${API_BASE}/users/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // if you want this protected later, add ...userAuthHeader()
      },
      body: JSON.stringify(payload), // { name, email, phone, planCode }
    });

    return await handleResponse(res, "Subscribe failed");
  } catch (err) {
    console.error("SUBSCRIBE API ERROR:", err);
    return { success: false, message: "Network / server error" };
  }
}

/* =========================
   PAYMENTS (UI-ONLY, NO REAL MONEY)
   ========================= */

// SAVE PAYMENT RECORD
export async function recordPayment(payload) {
  try {
    const res = await fetch(`${API_BASE}/payments/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // { userId, amount, plan, status, txnId, method }
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
export const authHeader = () => userAuthHeader();


export { API_BASE, safeJson };
