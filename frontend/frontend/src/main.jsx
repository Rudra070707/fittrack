import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import "./index.css";
import AdminLayout from "./admin/AdminLayout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>

      {/* OPEN PROJECT → ADMIN LOGIN */}
      <Route path="/" element={<Navigate to="/admin/login" replace />} />

      {/* CUSTOMER SIDE */}
      <Route path="/home/*" element={<App />} />

      {/* ADMIN PANEL */}
      <Route path="/admin/*" element={<AdminLayout />} />

      {/* SAFETY FALLBACK */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />

    </Routes>
  </BrowserRouter>
);