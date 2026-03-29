import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import "./index.css";
import AdminLayout from "./admin/AdminLayout";

// 🔥 NEW: Toast import
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>

      {/* 🔥 GLOBAL TOASTER (ADD HERE) */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0b0f14",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#000",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#000",
            },
          },
        }}
      />

      <Routes>

        {/* Redirect root → /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Customer App */}
        <Route path="/home/*" element={<App />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/*" element={<AdminLayout />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />

      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);