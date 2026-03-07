import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import "./index.css";

import AdminLayout from "./admin/AdminLayout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* DIRECT ENTRY → HOME PAGE */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* CUSTOMER SIDE */}
      <Route path="/home/*" element={<App />} />

      {/* LOGIN / SIGNUP MODAL ROUTES */}
      <Route path="/login" element={<App />} />
      <Route path="/signup" element={<App />} />

      {/* ADMIN SIDE */}
      <Route path="/admin/*" element={<AdminLayout />} />

      {/* SAFETY REDIRECT */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  </BrowserRouter>
);