import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import "./index.css";
import AdminLayout from "./admin/AdminLayout";

const isDev = import.meta.env.DEV;

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>

      {/* OPEN PROJECT */}
      {isDev ? (
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
      ) : (
        <Route path="/" element={<Navigate to="/home" replace />} />
      )}

      {/* CUSTOMER SIDE */}
      <Route path="/home/*" element={<App />} />

      {/* ADMIN PANEL (LOCAL ONLY) */}
      {isDev && (
        <Route path="/admin/*" element={<AdminLayout />} />
      )}

      {/* SAFETY FALLBACK */}
      {isDev ? (
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      ) : (
        <Route path="*" element={<Navigate to="/home" replace />} />
      )}

    </Routes>
  </BrowserRouter>
);