import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import "./index.css";

import SelectRole from "./pages/SelectRole";
import AdminLayout from "./admin/AdminLayout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>

      {/* FIRST ENTRY → ROLE SELECTION */}
      <Route path="/" element={<SelectRole />} />

      {/* CUSTOMER SIDE */}
      <Route path="/home/*" element={<App />} />

      {/* ADMIN SIDE */}
      <Route path="/admin/*" element={<AdminLayout />} />

      {/* SAFETY REDIRECT */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  </BrowserRouter>
);
