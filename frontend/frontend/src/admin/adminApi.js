// frontend/src/admin/adminApi.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

// ✅ Axios instance for admin panel (Vercel → Render)
export const adminApi = axios.create({
  baseURL: `${API_BASE}/api`,
});

// ✅ Attach admin token automatically for protected routes
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");

    // ensure headers object exists
    config.headers = config.headers || {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);