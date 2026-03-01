import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

// Axios instance for admin panel
export const adminApi = axios.create({
  baseURL: `${API_BASE}/api`,
});

// Attach token automatically
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});