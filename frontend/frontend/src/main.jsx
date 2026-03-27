import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import "./index.css";
import AdminLayout from "./admin/AdminLayout";

const isDev = import.meta.env.DEV;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>

        {/* Redirect root → /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Customer App */}
        <Route path="/home/*" element={<App />} />

        {/* Admin (dev only) */}
        {isDev && (
          <Route path="/admin/*" element={<AdminLayout />} />
        )}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />

      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);